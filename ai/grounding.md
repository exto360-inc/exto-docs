---
description: "What the AI knows about your data, how a query is built, and how documents are searched."
---

# Grounding & retrieval

Nothing the AI knows about your business is built into the product. It is all
derived from your tenant — your collections, your field descriptions, your
vocabulary — and rebuilt when you change them.

This page describes what that knowledge base contains, how a question becomes a
query against it, and how document search works.

## The knowledge base

A [schema sync](/admin/data-setup) produces three things per tenant.

<DStack :layers="[
  {
    title: 'Knowledge graph',
    body: 'Collections · fields · types · references · display names · descriptions · synonyms · display fields · enum labels',
  },
  {
    title: 'Vector store',
    body: 'Your descriptions and synonyms, embedded for search',
  },
  {
    title: 'Business context',
    body: 'What this organisation is · its module inventory',
  },
]" />

### The graph does four jobs

It is worth understanding that this one artefact is load-bearing in four
different ways, because it explains a lot of behaviour:

| Job | Consequence when curation is thin |
| --- | --- |
| **Vocabulary** — what things are called | The assistant answers in column names |
| **Inventory** — what the model is told exists | It cannot find a module nobody described |
| **Allowlist** — what a query may target | Nothing outside the graph is reachable at all |
| **Masking table** — how things are named back | Raw internal names could leak into answers |

The fourth is why the graph is used even for output. Every collection name the
model produces — in the answer, in its visible reasoning, in an observation — is
replaced with its display name before you see it.

### Business context

A short document describing the organisation and its module inventory, written
from the tenant's own description and the graph. It is what lets the assistant
speak in the right register for a construction firm rather than in generic
enterprise-software terms.

It is tenant-wide and cached. Anything that differs per user — what you can
access, what is remembered about you — is deliberately kept out of it and
assembled per turn instead.

## Loading, caching and freshness

The knowledge base is loaded once per tenant and reused across every request.
Two properties keep that safe:

- **A sync replaces it atomically**, so nobody ever reads a half-written graph.
- **It is reloaded when it changes.** A sync's result is picked up without a
  restart and without a stale cache.

## What the model is told exists

The graph is filtered before the model sees it, on one axis: commissioning.

| You have | The model is shown |
| --- | --- |
| At least one permitted workbench | Everything, minus commissioning child tables |
| No permitted workbenches | Everything, minus commissioning collections — plus a plain note saying commissioning is not available |

Commissioning child tables are hidden because they are not directly queryable
and their presence in the list reliably tempted the model into using them
instead of the real collections.

This is **visibility, not authority**. Removing something from the list means
the model will not reach for it; the [access check](/ai/guardrails) is what
actually decides whether a query runs.

## From a question to a query

<DBranch
  source="Question"
  :branches="[
    { label: 'The graph', note: 'what exists, and what it is called' },
    { label: 'Your terminology', note: 'organisation-specific words' },
    { label: 'Your identity', note: 'who “my” and “me” resolve to' },
    { label: 'The page', note: 'what “this” probably refers to' },
  ]"
  :then="[
    { label: 'Choose a module' },
    { label: 'Build the query' },
    { label: 'Apply scope and permission' },
    { label: 'Sanitise' },
  ]"
  result="Execute" />

### Terminology

The **terminology** list under **Settings → AI personalization** is used twice,
in two different framings:

| Where | Purpose |
| --- | --- |
| Planning | Interpret a request — decide which module and fields it means |
| Answering | Word the reply in the organisation's vocabulary |

The planning copy is explicitly scoped to data requests only, so the glossary
never gets recited into a greeting. It is also explicitly subordinate to the
schema and the security rules: a term cannot name a collection that is not in
the graph, and cannot widen access.

### Your identity

"My records", "assigned to me" and "I raised" resolve to literal values — your
username, your email or your account identifier — chosen by the *type* of the
field being filtered rather than guessed. Placeholder and pattern filters are
explicitly forbidden, since a query with a placeholder left in it matches
nothing and reports zero convincingly.

### Context-level scoping

Counts at a customer, workspace or project level are **not** filtered by a
condition the model writes. The request names the level, or names one specific
context, and the platform resolves and applies the filter — correcting a
misspelled project name against the real list on the way.

## Document retrieval

Questions about [Drive documents](/ai/attachments) run a separate pipeline. It
is retrieval-augmented rather than agentic: no loop, no tool selection.

<DBranch
  source="Question"
  :branches="[
    { label: 'Dense search', note: 'meaning — finds paraphrases' },
    { label: 'Keyword search', note: 'exact terms — finds part numbers' },
    { label: 'Entity search', note: 'names the question mentions' },
  ]"
  :then="[
    { label: 'Merge the three rankings' },
    { label: 'Re-rank, then fill a context budget' },
    { label: 'Enough to answer?', note: 'if not, retrieve again — twice at most' },
  ]"
  result="Synthesise, citing the passages it used" />

Three properties are worth stating:

- **Three strategies, because one is not enough.** Dense search misses an exact
  identifier; keyword search misses a paraphrase. Merging their rankings rather
  than picking one is what makes both kinds of question work.
- **Sufficiency is checked, not assumed.** If the retrieved passages do not
  answer the question, it retrieves again — and after two extra passes, answers
  with what it has *and says what is missing*.
- **Citations are tracked internally and cleaned up.** The markers used to track
  which passage a claim came from never appear in what you read.

Document access is re-validated against your own permissions before retrieval,
so a document identifier is not a way to have a document read to you.

## Recall over your own conversations

Every completed turn is indexed by meaning, and relevant past turns are searched
automatically on each question rather than only when the model thinks to ask.
See [Memory](/ai/memory#conversation-recall).

One known gap: turns whose answer was a table or a chart carry their content in
structured form rather than prose, and are therefore weaker recall candidates
than a prose answer.

## When the knowledge base is not ready

The assistant needs the graph **and** the vector store. Either being genuinely
missing makes it non-functional, so it declines rather than answering from half
a picture.

Both keep a previous copy, and the behaviour differs by what is wrong:

| State | Behaviour |
| --- | --- |
| Graph present and valid | Normal |
| Graph unreadable, previous copy good | Serves the previous copy, flagged **degraded** |
| Graph and previous copy both unusable | Treated as missing — chat declines |
| Vector store missing, previous copy present | Serves the previous copy |
| Either genuinely missing | Chat declines, and a repair sync is triggered |

The repair is automatic and rate-limited, so a burst of requests during an
outage triggers one sync rather than a queue of them. Its progress appears on
the [job status](/work/recycle-bin) page.

::: warning A degraded graph is not a harmless state
Serving from the previous copy keeps chat alive, but it is answering against a
schema that may be behind reality. It is flagged for exactly that reason — an
administrator should re-run the sync rather than leaving it degraded.
:::

## Exports re-run the real query

Exporting a table answer does not export the rows on screen. It re-runs the
stored query with the preview limit removed.

What it re-runs is the **guarded** query — the one that actually executed, with
every scope and permission filter injected at execution time — not the one the
model originally produced. The collection is re-validated against the graph and
your ownership of the conversation is re-checked before anything runs.

## Related

- [Data setup](/admin/data-setup) — the curation and the sync, from the admin side.
- [Guardrails & permissions](/ai/guardrails) — what happens between "build the query" and "execute".
- [Attachments & documents](/ai/attachments) — the product view of document search.
- [The reasoning loop](/ai/reasoning-loop) — what decides to query in the first place.
