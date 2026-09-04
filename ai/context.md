---
description: "What the assistant knows about where you are, and why that is a default rather than a wall."
---

# Context & scope

Chat is **one global experience**. There is no module chat, record chat or
workbench chat — there is one assistant that knows where you are standing.

This page explains what it knows, where each piece comes from, and what it is
allowed to do with it.

<Shot src="ai/context" alt="The assistant answering about the open record" pending
  caption="Asked how long this has been open, on a record page — the record is inferred, not named." />

## Context is a hint, not a wall

The governing rule, stated once because everything below follows from it:

> The page you are on **steers** a vague question. It never restricts a specific
> one, and it never grants access to anything.

Asked *"how many are overdue"* on the Inspections module, the assistant answers
about inspections. Asked *"and how many purchase orders are overdue"* on the
same page, it answers about purchase orders — provided you may open them.

This replaced an earlier design where opening chat from a page **pinned** the
conversation to it. Pinning refused permitted questions about anything else, and
— worse — the identifiers it pinned to arrived from the browser and were never
checked. Both problems are gone.

## The five things it knows

Every turn is assembled fresh from five independent sources.

<DBranch dir="in"
  :branches="[
    { label: 'Your access', note: 'resolved live from your groups and module permissions' },
    { label: 'Your curated menu', note: 'the sidebar an administrator gave you' },
    { label: 'The page you have open', note: 'advisory, and validated before it is trusted' },
    { label: 'Memory', note: 'durable facts and preferences from earlier sessions' },
    { label: 'Past turns', note: 'this session in order, earlier ones by meaning' },
  ]"
  :then="[{ label: 'Assembled per turn', note: 'nothing is stored between turns' }]"
  result="The assistant’s working context" />

### 1. What you can actually reach

Resolved live, per turn, from your groups and module permissions. It is the
same list the assistant would give you if you asked *"what can I access"*.

If it cannot be resolved — a lookup failure — the assistant is told nothing
rather than being told you have no access. A false "you have no access" is worse
than silence.

### 2. Your curated menu

The subset of modules and workbenches an administrator put on your sidebar. See
[Menu configuration](/admin/menu).

This is a **soft focus**, not a limit. It biases what the assistant leads with —
suggestions on an empty conversation, for instance — and is explicitly marked as
something that must never be used to refuse a permitted request.

### 3. The page you have open

Sent with each message, derived from the address you are on:

| You are on | It knows |
| --- | --- |
| A module log page | The module |
| A record | The record, and its module |
| A project | The project |
| A [CX workbench](/ai/cx) | The workbench |
| The guided setup wizard | Which step you are on |
| Anything else | Nothing — the hint is simply omitted |

Two properties of this hint matter:

- **It is advisory.** It is never used to decide what you may read. Every access
  decision is made independently, per collection, per turn.
- **It is validated before it is trusted.** A workbench named by the page is only
  adopted after it is checked against the workbenches you are actually permitted
  for. An unrecognised or malformed hint is dropped, not guessed at.

### 4. What is remembered about you

Durable facts and preferences from earlier sessions. See [Memory](/ai/memory).

### 5. What you asked before

Two different things, and they behave differently:

| | Covers | How it is found |
| --- | --- | --- |
| **This session** | The last few turns | Always included, in order |
| **Earlier sessions** | Your own past conversations | Searched by meaning, top few |

The second is what lets *"like the report I asked for last week"* work without
you finding that session. It searches only **your own** turns.

## Moving between pages mid-conversation

Changing page mid-conversation is a signal, not a reset. The assistant is told
which page the previous turn was about and which page you are on now, and weighs
that against your wording:

| You say | On a new page | Read as |
| --- | --- | --- |
| "which are overdue?" | after navigating away | A fresh question about the new page |
| "filter those to rejected" | after navigating away | Still about the previous results |
| "this module's open items" | anywhere | The page you are on **now** |
| "open items in Inspections" | anywhere | Inspections, named explicitly |

An explicitly named module, workbench, project or record always wins, whichever
page you are on.

## Asking about a record

There is no preloaded record briefing. When you ask about *"this record"*, the
assistant reads which record you have open from the page hint and then **queries
for it** like any other question — which is why the answer is subject to the
same permission checks as opening the record itself would be.

Child tables — line items, punch lists, attachment rows — are read by a separate
step that needs exactly one record identified first. Asking about *"the line
items"* on a record page therefore takes two steps: find the record, then read
its rows.

That step shows the newest few rows as a preview. The turn's download link
carries the whole filtered set, so you are never asked to narrow a question just
to see more.

## Asking about a module

A module question is answered over the module's **whole record set** — but only
the records you may see. The filter used is the same one that decides what
appears on that module's [record list](/work/record-list), so a count from the
assistant and a count from the log page agree.

Counts at a context level — a customer, a workspace, a project, or one named
project — are scoped by the platform rather than by a filter the model writes,
and a name you spell slightly wrong is corrected against the real list.

## Asking about aging and delay

Aging means **days since last submission**, and it is computed by the platform,
never by the model. Two modes:

| You ask | Behaviour |
| --- | --- |
| "show me the delayed records" | Returns only aged records, each with its aging in days |
| "how delayed is Material Inward/325" | Returns the records you named, aged or not, with their aging |

Words like *open*, *pending*, *overdue* and *delayed* are not statuses and are
not used as filters — the aging scope already restricts to active, in-progress
records.

## Related

- [Assistant](/ai/assistant) — the panel itself.
- [Memory](/ai/memory) — what carries across sessions.
- [Guardrails & permissions](/ai/guardrails) — how access is actually decided.
- [Permissions](/concepts/permissions) — the model all of this defers to.
