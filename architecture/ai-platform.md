---
description: "How the AI platform is put together — one loop, one schema, one set of guards."
---

# The AI platform

Every AI surface in Exto — the assistant, insights, the builders, the CX
copilots — is built on the same three things: a **per-tenant knowledge base**, a
**reasoning loop**, and a **guard layer** that decides what any of it may read.

This page is the architectural overview. The product behaviour, and the deeper
mechanism of each part, live in the [AI lane](/ai/).

::: tip Scope
Application architecture only. Nothing here describes hosting, deployment or
the infrastructure the model provider runs on.
:::

## The shape of it

<DStack :layers="[
  {
    title: 'Web client',
    body: 'Docked chat panel · insight banners · builder wizards',
    note: 'turn (HTTP) · progress (SSE)',
  },
  { title: 'Entry gates', body: 'Tenant switch → seat / quota → session' },
  {
    title: 'Context assembly',
    body: 'Who · what they may see · where they are · what is remembered · what was said before',
  },
  { title: 'Reasoning loop', body: 'Guards → ( think → tool → observe ) × N' },
  {
    title: 'Guard layer',
    body: 'Collection access · record scope · pipeline sanitiser · output masking',
  },
  {
    title: 'Data',
    body: 'Tenant collections · knowledge base · memory file · conversation history',
  },
]" />

Nothing bypasses the guard layer. A tool that reads tenant data goes through the
same access check as a screen, and the query it produces is inspected before it
is executed.

## Three engines, one platform

| Engine | Answers | Shape |
| --- | --- | --- |
| **Reasoning loop** | Open questions about tenant data | Iterative: plan, act, observe, repeat |
| **Insight services** | "Summarise this one thing" | Fixed: gather, one model call, done |
| **Retrieval service** | Questions about document content | Retrieve, merge, check, synthesise |

They are separate on purpose. An insight has a known shape and a latency budget
a person waits through, so it does not deserve a loop. A question about the
tenant's data has no known shape, so it does.

### Why a loop and not a pipeline

The original assistant compiled a question straight into a database query. It
could not recover: a wrong collection, an empty result or a half-answered
question produced a wrong answer with no second attempt.

The loop makes each step observable and correctable. It plans one action, runs
it, reads the result, and decides again — so an empty result becomes a
different query rather than "no records found", and an ambiguous question
becomes a [clarification](/ai/assistant#when-it-asks-back) rather than a guess.

The cost is latency and tokens, which is why the loop is bounded — a fixed
iteration budget, a sliding window of observations, and a hard stop after
repeated tool failures. See [The reasoning loop](/ai/reasoning-loop).

## The per-tenant knowledge base

Each tenant has a knowledge base built by a [schema sync](/admin/data-setup):

<DStack inLabel="Curation" :layers="[
  {
    title: 'Knowledge graph',
    body: 'Structure: collections, fields, references · labels, synonyms, display fields',
  },
  { title: 'Vector store', body: 'Semantic search over descriptions' },
  { title: 'Business context', body: 'What this organisation is and does' },
]" />

The graph is the vocabulary, the access allowlist and the masking table all at
once. It decides what the model is told exists, how a collection is named back
to the user, and — after the access check — what a query may target.

It is loaded once per tenant and cached, and reloaded when a sync replaces it.
Both the graph and the vector store keep a previous copy, so a corrupt rebuild
degrades to the last good one instead of taking chat down. See
[Grounding & retrieval](/ai/grounding).

## Where context comes from

A turn is assembled, not stored. Five independent sources are gathered fresh
each time:

| Source | Is | Channel |
| --- | --- | --- |
| Permitted modules | A resolved fact about access | Instruction |
| Curated menu | An admin's soft focus | Instruction |
| Current page | A client-supplied hint | Instruction, advisory |
| Remembered facts | What the user told us before | **Fenced data** |
| Remembered preferences | How they want answers | Instruction |
| Recalled history | Their own past turns | **Fenced data** |

The split matters. Anything that originated in tenant records or a transcript is
fenced and declared non-instruction; only the platform's own resolved facts and
the user's own preferences are allowed to carry instruction weight. See
[Guardrails & permissions](/ai/guardrails).

Notably absent: the record or module itself. There is no preloaded briefing —
the page a user is on is a hint that steers a query, never a bundle of data
handed to the model in advance.

## Sessions are not scopes

Chat is one global experience. A session is a conversation thread — a title, a
turn count, a favourite flag — and nothing more. It carries no module, record or
workbench binding.

This replaced an earlier design where a session was pinned to the page it was
opened from. That design had two faults: the pinned identifiers arrived from the
client and were never authorised, and a pinned session refused perfectly
permitted questions about anything else. Both are gone. Access is decided per
collection, per turn, by the guard layer; the page is advisory and is validated
before it is trusted for anything.

## Guards, in order

<DStack inLabel="Message" outLabel="Answer" :layers="[
  { title: 'Is this about work at all?', note: 'domain guard' },
  { title: 'Is it about this tenant?', note: 'tenant-scope guard' },
  { title: 'May this user read this collection?', note: 'access check' },
  { title: 'Which records may they see?', note: 'record filter' },
  { title: 'Is this query shape allowed?', note: 'pipeline sanitiser' },
  { title: 'Does the output leak anything?', note: 'masking' },
]" />

The first two are model calls that decline early and cheaply. The rest are
deterministic and run on every data access regardless of how the loop got
there.

## Failure is a designed state

| Failure | Behaviour |
| --- | --- |
| Knowledge base missing | Chat declines and says it is rebuilding; a repair sync is triggered |
| Knowledge base corrupt | Falls back to the previous copy, flagged as degraded |
| Client disconnects | The turn continues and is persisted; the client re-fetches |
| Loop exhausts its budget | A constructive narrative of what was tried |
| Repeated tool failures | Bail out after three, rather than spinning |
| Model output unparseable | One retry, then a corrective observation and re-plan |

Nothing here is an exception path bolted on late — each is a state the loop can
be in, with a defined answer. See
[Limits, tracing & failure states](/ai/operations).

## Reading further

| Page | Covers |
| --- | --- |
| [AI overview](/ai/) | Every AI surface, and the switches that govern them |
| [The reasoning loop](/ai/reasoning-loop) | Think, act, observe; the tools; clarifications |
| [Grounding & retrieval](/ai/grounding) | The knowledge base, query building, document retrieval |
| [Guardrails & permissions](/ai/guardrails) | Access, scoping, sanitising, masking, prompt safety |
| [Memory](/ai/memory) | What is remembered, when it is captured, how it is used |
| [Limits, tracing & failure states](/ai/operations) | Budgets, audit, observability, degraded modes |

## Related

- [API layers](/architecture/api-layers) — the request path everything above sits on.
- [The data model](/architecture/data-model) — the collections the AI reads.
- [CX execution](/architecture/cx-execution) — the engine behind the CX insights.
