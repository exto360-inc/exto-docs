---
description: "How a question becomes an answer — plan, act, observe, and the tools in between."
---

# The reasoning loop

The assistant does not translate your question into a query. It **works** on
your question: it plans one action, runs it, reads what came back, and decides
again — until it has an answer, needs to ask you something, or runs out of
budget.

This page describes that loop and everything it can do.

<Shot src="ai/steps" alt="The reasoning steps for one turn" pending
  caption="One turn's steps — what it decided, what it ran, and what came back." />

## The shape of a turn

<DStack inLabel="Message" outLabel="Answer" :layers="[
  { n: 1, title: 'Entry gates', body: 'Organisation AI on? Entitlement? Session ready? Earlier run stopped?' },
  { n: 2, title: 'Attachments', body: 'A file attached ⇒ read it, and stop here' },
  { n: 3, title: 'Assemble', body: 'Access · curated menu · page hint · memory · recalled turns' },
  { n: 4, title: 'Classify', body: 'New question / follow-up / general' },
  { n: 5, title: 'Guards', body: 'About work? About this tenant?' },
  { n: 6, title: 'Loop', body: 'Think → act → observe, repeated' },
  { n: 7, title: 'Compose', body: 'Format · link citations · export URL' },
  { n: 8, title: 'Persist', body: 'Turn · steps · audit · usage — then index it, and consider memory' },
]" />

Steps 1–5 are cheap and decide fast. Step 6 is where the cost is, which is why
so much is decided before reaching it.

## One prompt, one toolset

There is **one** planning prompt with the full toolset, for every session.

There used to be two — a "scoped" variant for sessions pinned to a page and an
unscoped one for everything else. It was a bug: the condition that chose between
them stopped meaning "pinned to a page" as soon as other notes started appending
to the same text, so in practice every session took the scoped branch, which
advertised two tools that were not available to it and hid two that were.

One experience, one prompt. The page, when there is one, is context *inside* the
prompt rather than a different prompt.

## Think, act, observe

Each iteration is three steps:

| Step | Does |
| --- | --- |
| **Think** | Chooses one action and states, in business language, what it is about to do |
| **Act** | Runs it |
| **Observe** | Summarises the result back into the loop |

The reasoning line from each Think is what you see in the step list. It is
required to lead with what the previous step found before stating the next
action, so the list reads as progress rather than as the same sentence repeated.

Only the last few observations stay in view. An older one having scrolled out is
why the loop is asked to state its conclusions as it goes rather than
re-deriving them at the end.

## What it can do

### Reading your data

| Action | For |
| --- | --- |
| **Query** | One module — counts, filters, groupings, aggregates |
| **Multi-query** | The same question across several modules at once |
| **Child table** | The rows inside one record — line items, punch lists |
| **Pick a module** | Only when two or more are genuinely ambiguous |

A few rules shape how these get used:

- **Aggregate first.** Unless you asked to see records, the query is written to
  return counts and groupings rather than a list. Aggregation in the database is
  both accurate and cheap; capping a raw list is neither.
- **Cross-module questions use multi-query,** not the same query repeated per
  module.
- **A query does not end the turn.** After it runs, the result is read: if it
  answers the question the loop finishes, and if it returned nothing or an
  obviously wrong count it reconsiders once rather than reporting a result it
  does not believe.
- **The same action with the same arguments is never repeated.**

Some things are deliberately computed by the platform rather than by the model —
[aging](/ai/context#asking-about-aging-and-delay) in days, checklist pass/fail
counts, and context-level scoping. Each of these was, at some point, hand-
counted by the model from raw nested data and got wrong.

### Orienting you

| Action | For |
| --- | --- |
| **Navigate** | "Where am I", "where should I look for X", "take me there" |
| **List access** | "What modules and workbenches can I see" |

They answer different questions and are not interchangeable. Navigate returns a
specific answer with a link; listing returns the inventory of your access.

### Everything else

| Action | For |
| --- | --- |
| **Recall context** | Pulling relevant earlier turns into view |
| **Web search** | Live external facts — prices, standards, regulations |
| **Direct answer** | Greetings, product questions, or composing after a web search |
| **Ask you** | Genuine ambiguity — ends the turn with a question |
| **Finish** | The answer is ready |

Web search is an **enrichment step**, usable before or after a data query, not a
fallback for when a query fails. A question mixing your data with industry
context can legitimately do both.

Direct answer has no access to your data, and is never used for a data
question — a rule stated explicitly because it is the tempting shortcut when a
query is hard.

In a commissioning workbench, three more become available. See
[CX workbench AI](/ai/cx#the-three-commissioning-abilities).

## Clarifying, and coming back

When the loop decides it cannot proceed without you, it ends the turn with a
**question** rather than a guess. Two kinds:

| Kind | Means | Options offered |
| --- | --- | --- |
| **Invalid value** | You named something that does not exist | Real projects, workspaces, modules, records or field values |
| **Missing parameter** | A required value was never given | None to offer — it just asks |

Where options come from matters:

- **Projects and workspaces** are read live.
- **Modules** are the ones you may actually open — filtered by permission, not
  by the page you are on.
- **Records** come from a named module's real display values.
- **Field values** are the distinct values actually present.

Answering resumes the original request. The question, your answer and the
original prompt are folded into one complete instruction — deterministically,
from the exact turn that asked, not inferred from conversation history. The work
already done is restored rather than repeated, and the remaining budget is what
was left, not a fresh allocation.

## Budgets and bail-outs

| Bound | Behaviour |
| --- | --- |
| **Iterations** | A fixed budget per turn; exhausting it produces a narrative of what was tried |
| **Observations in view** | Only the most recent few |
| **Consecutive failures** | Three failing actions in a row ends the loop constructively |
| **Wall clock** | A hard cap per turn, so nothing runs forever |

Two failures in a row also warn the planner explicitly, asking it to try a
different approach or finish with what it has.

## When the model's output is unusable

Two failure modes, both handled without ending the turn:

| Failure | Response |
| --- | --- |
| Output cannot be parsed | One immediate retry with a stricter instruction |
| A named action does not exist | A corrective note listing the real ones |

Either way the loop records what went wrong and thinks again. An unparseable
reply is a bad sentence, not a broken conversation.

## The step list you see

The trace is turned into a readable list before it reaches you:

- Repeated attempts against the same module are **collapsed** to the last one.
- Internal collection names are **replaced with display names** — in the visible
  reasoning as well as the observations.
- Internal identifiers are stripped.

## The legacy path

A non-loop pipeline still exists: it classifies intent, compiles a query,
executes it and formats the result, with no iteration. It is the pre-loop
design, kept as a fallback rather than as a supported experience — everything on
this page describes the loop.

## Related

- [Assistant](/ai/assistant) — the product view of all this.
- [Context & scope](/ai/context) — what step 3 assembles.
- [Grounding & retrieval](/ai/grounding) — what a query is built from.
- [Guardrails & permissions](/ai/guardrails) — what steps 5 and 6 are checked against.
- [Limits, tracing & failure states](/ai/operations) — budgets and observability.
