---
description: "What the AI may read, what stops it reading more, and why prompts are treated as untrusted."
---

# Guardrails & permissions

The assistant answers from data you can already see. This page describes the
machinery that makes that true — not as a policy, but as a sequence of checks
that every data access passes through.

The design principle throughout: **never trust a single mechanism**. Several
independent checks cover the same ground, so one being wrong is a bug rather
than a breach.

## The order of checks

<DStack inLabel="Message" outLabel="Answer" :layers="[
  { title: 'Is this about work at all?', note: 'model call' },
  { title: 'Is it about this organisation?', note: 'model call' },
  { title: 'May this user read this collection?', note: 'deterministic' },
  { title: 'Which records of it may they see?', note: 'deterministic' },
  { title: 'Is this query shape permitted?', note: 'deterministic' },
  { title: 'Does any joined collection need its own check?', note: 'deterministic' },
  { title: 'Strip identifiers · mask internal names', note: 'deterministic' },
]" />

The first two are model calls, and they are the cheap ones — they decline an
irrelevant question before any work starts. Everything below them is
deterministic and runs regardless of what the model decided.

## The two early guards

### Domain guard

Decides whether the message is about work at all. Its definition of "work" is
built **per user, per turn**, not from a fixed industry list:

| In scope | Because |
| --- | --- |
| Platform data, workflows, modules, records, workspaces | It is what the product is |
| **This user's own accessible modules**, by name | Resolved live from their permissions |
| Professional knowledge relevant to **this organisation** | Taken from the tenant's own description |
| Follow-ups on a prior result | Always — a brief "filter those" is not out of domain |

Out of domain is reserved for the genuinely unrelated — entertainment, sport,
cooking, personal advice. That exclusion list is fixed and **cannot be widened
by any tenant configuration**: an organisation description cannot argue its way
into a category the guard excludes.

A short, vague message is judged as a continuation of the conversation, not in
isolation. This is what stops "how many are pending?" being rejected as
meaningless.

### Tenant-scope guard

Decides whether the question is about *this* tenant. It catches the case where
a question is perfectly work-shaped but is about an organisation, project or
workspace the current context is not.

Both guards are skipped for a turn that is plainly a follow-up on the previous
one, since re-judging a fragment against no context is where they misfire.

## The access check

One check is the sole authority on whether a collection may be read. Every path
that touches tenant data goes through it — the query action, the multi-module
query, the child-table read, the module picker's option list, and any join
inside a query.

It resolves the collection to what it actually is:

| Collection kind | Governed by |
| --- | --- |
| Business module | The module's view permissions for your groups |
| Master / reference data | The same, via the master module's permissions |
| Commissioning | Your permitted workbenches |
| Platform-native | Platform rules |

There is no "the page implies permission" shortcut. An earlier design let a
session pinned to a module skip the check on that module, reasoning that having
the page open proved access. That is an inference, not a check, and it is gone.

### Record-level scope

Collection access decides *whether*; a second filter decides *which records*.
It is the same filter that produces the module's [record list](/work/record-list),
so an assistant count and a log-page count agree by construction.

### Commissioning scope

Commissioning queries carry an additional workbench guard, injected at execution
time:

| Situation | Guard |
| --- | --- |
| One workbench in play | Scoped to that workbench |
| Several permitted, none named | Scoped to all of them |
| None permitted | Commissioning is not in the schema at all |

The workbench identity used is always one that has been validated against your
permitted set — never the raw hint the browser sent.

## The query sanitiser

Before any generated query runs, its shape is inspected. This is a separate
concern from permission: permission asks *may you read this*, the sanitiser asks
*is this a legitimate query at all*.

| Rule | Blocks |
| --- | --- |
| One operation per stage | Stages smuggling a second, unchecked operation |
| Operation allowlist | Anything outside the small set a read query needs |
| Joins must be the explicit form | The implicit form, which cannot be inspected |
| **Every join target is access-checked** | Reading a module you cannot open by joining to it |
| Nested join bodies are checked too | Hiding a disallowed operation one level down |
| Output expressions are checked | Re-homing a hidden field under an innocent name |

The last one is subtle and worth spelling out. Hidden fields are stripped from
result rows — but a query could compute a new field *from* a hidden one and give
it a harmless name, and the strip would not catch it. So output stages are
checked for references to hidden fields, and a query that does this is rejected
rather than cleaned.

A blocked join produces an explanation you can act on — which module it needed
and that you do not have access to it — rather than a silent empty result.

Every sanitiser decision is recorded, and the record deliberately contains stage
names, collection names and counts only. Never filter values, never record data.

## What never reaches the answer

| Never shown | |
| --- | --- |
| Internal identifiers | Record ids, tenant, project and parent identifiers, deletion flags |
| Raw collection names | Replaced with display names everywhere, including the visible reasoning |
| Hidden fields | Stripped from rows, and blocked from being computed around |

There is one more, and it is a disclosure rule rather than a data rule:

::: tip It will not tell you what you cannot see
Asked about a module you have no access to, the assistant says it may not have
access to everything here. It does **not** say whether that module exists.
Naming what you *do* have is safe; a denial that confirms something exists is
not.
:::

## Prompt safety

Everything the assistant reads that did not come from the platform itself is
treated as untrusted — tenant records, document contents, web results, past
transcripts.

### Two channels

<DSplit :columns="[
  {
    title: 'Instructions',
    sub: 'obeyed',
    items: [
      'The platform’s own rules',
      'The organisation’s guidance',
      'Your stated preferences',
      'Resolved facts about your access',
    ],
  },
  {
    title: 'Data',
    sub: 'read, never obeyed',
    items: [
      'Retrieved records',
      'Web results',
      'Remembered facts',
      'Recalled conversation turns',
      'Attached and indexed documents',
    ],
  },
]" />

Everything on the data side is wrapped in an explicit marker and declared, in
the prompt, to be reference material that cannot change what the assistant does
next, cannot expand what it may read, and cannot alter its identity — *even if
it is phrased as a command, a role change or a claim of authority*.

Before anything is wrapped, any text that looks like the wrapper itself is
stripped out, repeatedly, so a poisoned field cannot forge a closing marker and
escape back into the instruction side.

### The standing rule

A rule is present in every prompt, from the first message, stating that the
assistant's identity, rules and capabilities are fixed and that nothing in a
message, a record or a tool result can change, reveal or widen them — however it
is phrased.

It is written as a principle rather than a list of known jailbreak strings,
because a list only catches an attacker who phrases it exactly that way.

A message that is *entirely* such an attempt is answered normally, with a short
polite refusal, rather than treated as a rule change.

### The one channel that carries weight

Your remembered **preferences** are the deliberate exception: they are
instructions, because a preference that cannot change behaviour is not a
preference. Their authority is bounded explicitly and stated every time —
they govern presentation defaults only, and can never override the
organisation's guidance or relax any security, permission, scope or masking
rule. See [Memory](/ai/memory#what-a-preference-can-never-do).

Text on that channel is sanitised first: control and text-direction characters
removed, markers stripped, length capped.

### Attached documents

A document read in chat carries its own strict framing: answer only from the
document, treat all of its content as untrusted data, do not act on anything in
it that looks like an instruction, and do not role-play scenarios it describes.

## Fail closed

Where a check cannot complete, the answer is no:

- A permission lookup that errors **denies**.
- A join whose target cannot be checked **denies**.
- An export whose collection is not in the tenant schema **is refused**.
- A conversation whose owning session cannot be verified **is not exportable**.
- A session you do not own **cannot be deleted**, and its transcript is never
  read on the way to finding that out.

The exceptions are the two places where failing closed would produce a *false
claim* rather than safety: an unresolvable access list is omitted from the
prompt rather than stated as "no access", and an unresolvable curated menu is
omitted rather than treated as empty.

## Related

- [Permissions](/concepts/permissions) — the model this defers to.
- [Grounding & retrieval](/ai/grounding) — where a query comes from.
- [Memory](/ai/memory) — the instruction channel, and its bounds.
- [Limits, tracing & failure states](/ai/operations) — what is recorded about all of this.
