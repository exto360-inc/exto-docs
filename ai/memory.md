---
description: "What the assistant remembers about you, when it decides to, and how to take it back."
---

# Memory

The assistant remembers a small number of durable things about you across
sessions — that you are a site engineer, that you want counts with the names
behind them, that you work in metric. It is deliberately small, deliberately
readable, and entirely yours to delete.

<Shot src="ai/memory" alt="The AI memory section" pending
  caption="Your remembered facts, listed by category, with the memory switch above them." />

## Two kinds of memory

They are easy to confuse and behave very differently.

| | Long-term memory | Conversation recall |
| --- | --- | --- |
| Holds | A few curated facts about you | Your own past turns, verbatim |
| Built by | Extraction, occasionally | Every completed turn, automatically |
| Used | Injected on every turn | Searched by meaning, per question |
| Visible to you | Yes — listed, deletable | No — it is your own history |
| Scope | You, in this tenant | You, in this tenant |

Both are per-user. Nothing you say reaches another person's assistant.

## What gets remembered

Facts are stored in five categories:

| Category | Example |
| --- | --- |
| **Preference** | "Show me counts with the record names" |
| **Role** | "I run commissioning for the north sites" |
| **Goal** | "Trying to close out the Q3 punch list" |
| **Constraint** | "I only have access to Riverside" |
| **Other** | Anything durable that fits none of the above |

Only durable statements about *you*. A question is not a fact; a one-off filter
is not a preference.

Each round of extraction produces a bounded set of decisions against what is
already stored — **add**, **update**, **delete** or **leave alone** — never a
copy of the conversation. A replacement names the exact line it replaces, so a
changed preference supersedes the old one rather than accumulating beside it.

## When it decides to remember

Four moments trigger extraction. All four run in the background; none of them
delays your answer.

<DStack :layers="[
  {
    title: 'You say something that sounds like a preference',
    body: '“call me Sam”, “I prefer bar charts”',
    note: 'extract now',
  },
  { title: 'A session passes 10 turns since it was last extracted', note: 'extract now' },
  { title: 'You start a new conversation', note: 'sweep your older ones' },
  { title: 'You delete a session', note: 'extract, then delete' },
]" />

The design intent behind each:

- **Preference intent** catches the direct statement — *"always show me metric"* —
  the moment you make it, rather than ten turns later. A session's first message
  always triggers one, since "call me Sam" as an opening line is the most likely
  way anyone states a preference.
- **The turn threshold** catches the long working session that never ends.
- **The new-session sweep** catches sessions you have moved on from without
  closing. It covers up to five of them.
- **Deletion** is a session's last chance to contribute anything.

::: warning Deleting a session extracts from it first
This is intentional — a conversation you are finished with is exactly when its
durable facts are worth keeping. If you want a session to leave nothing behind,
purge your memory as well.
:::

## How it is used

Remembered material reaches the assistant on two separate channels, and the
difference is the whole point:

<DSplit :columns="[
  {
    title: 'Facts',
    sub: 'role, goal, constraint',
    via: 'Fenced as reference data',
    items: [
      '“Here is what is known about this user”',
      'Cannot change what the assistant does',
    ],
  },
  {
    title: 'Preferences',
    sub: 'how you want to be answered',
    via: 'Carried as instructions',
    items: [
      '“Honour these on every turn”',
      'Can override the platform’s own defaults',
    ],
  },
]" />

A preference has to be able to change behaviour — *"give me the names behind the
count"* directly contradicts the platform's default of answering summary
questions with aggregates. So preferences travel as instructions and are told
explicitly that they win against that default.

Facts do not get that authority. They are reference material, fenced with
everything else retrieved during the turn.

### What a preference can never do

A preference is bounded, and the bound is stated to the assistant every time:

- It never overrides your **organisation's** AI guidance — that is
  administrator-mandated, and outranks an individual.
- It never relaxes a **security, permission, scope or masking** rule. A
  preference asking to see internal identifiers gets none.
- It cannot change the assistant's identity or reveal its instructions.

### Bounds on size

Memory is injected on **every** turn, so it is capped rather than allowed to
grow forever: preferences are limited in number and length, and each fact
category keeps only its most recent entries. Truncation keeps the newest — what
you said most recently is what survives.

## Conversation recall

Every completed turn is indexed by meaning. When you ask something, your own
past turns are searched and the few most relevant are added to the working
context — automatically, without the assistant having to think to look.

Relevance is not similarity alone. Three things are blended:

| Signal | Weight | Why |
| --- | --- | --- |
| Semantic match | Most of it | Does this past turn actually relate? |
| Recency | A little | Last week beats last year, all else equal |
| Same module | A little | A past turn about *this* module is likelier to help |

Recency decays smoothly — an old turn's contribution halves roughly every
month — so something old but genuinely on-point still surfaces.

## Managing your memory

Everything is under **your profile**, not Settings — it is your data, and
Settings is administrator-only.

| Action | Effect |
| --- | --- |
| **List** | See every remembered fact, by category |
| **Delete one** | Removes that fact |
| **Purge** | Removes everything remembered about you |
| **Turn memory off** | Stops all capture and all use |

Turning memory **off** does not delete anything. Existing facts stop being
captured, stop being recalled, and stop being injected — and are still there if
you turn it back on. Purge is the destructive one.

While memory is off, none of the four triggers fire — and importantly, none of
them silently marks a session as "already handled" either. Turning memory back
on does not leave a gap where the off period was.

## Where memory lives

One small, human-readable document per person, per tenant. Not a table of
opaque records — a file you could read.

Concurrent writes to it are serialised, so two extractions firing at once (a
turn threshold and a session deletion, say) cannot interleave and corrupt each
other. A writer that dies mid-write releases its claim automatically rather than
locking you out.

## Safety

The text that becomes a preference originates from an extraction over
conversation turns, and those turns can contain tenant record data — which
means, in principle, a poisoned record field could reach the one channel that
carries instruction weight. Three things bound that:

1. **Extraction produces decisions, not copies.** It cannot emit a verbatim
   block of transcript into your memory.
2. **Preferences are sanitised** before use — control and direction-override
   characters stripped, fence markers removed, length capped.
3. **Authority is bounded** by the rules above, which no preference can widen.

## Permissions

Memory is per-user and private to you. Deleting a session you do not own is
refused before its transcript is ever read — a session identifier is not enough
to have someone else's conversation extracted into your memory.

Memory follows the tenant's **AI access** switch: with AI off, nothing is
captured, recalled or injected.

## Related

- [Assistant](/ai/assistant) — the panel this personalises.
- [Context & scope](/ai/context) — the other four sources of per-turn context.
- [Your profile](/account/profile) — where the switch and the list live.
- [Guardrails & permissions](/ai/guardrails) — the fencing model in full.
