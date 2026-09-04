---
description: "The schema editor and knowledge graph — what the AI knows about your data."
---

# Data setup

What Exto's AI features know about your data, and how that knowledge is built.
Two screens under **Settings → Data setup**: the **schema editor**, where you
describe your data in business terms, and the **knowledge graph**, which shows
the result.

This is the highest-leverage page in Administration. Everything the
[assistant](/ai/assistant) and [record insights](/ai/insights) get right or
wrong traces back to it.

<Shot src="admin/schema-editor" alt="The schema editor" pending
  caption="A collection's fields, with the editor panel open on one of them." />

## Why it exists

Your database calls a column `cst_nm`. Your people call it "the customer". Left
alone, an AI assistant answers in the first vocabulary and nobody recognises the
answer.

The schema editor is where you close that gap once, centrally, instead of
hoping every question is phrased in column names.

## The schema editor

### Collection lifecycle

Every collection moves through three states:

| State | Means |
| --- | --- |
| **Discovered** | Exto has found the collection. Nothing has been described. |
| **Registered** | It has been taken up for curation. |
| **Curated** | Someone has described it and its fields. |

A tenant where everything is still **discovered** has an assistant working from
raw column names. Curating the ten collections people actually ask about is
worth more than curating all of them badly.

### Describing a collection

Each collection takes a **display name**, a **description**, and **synonyms**.

### Describing a field

Select a field to open its editor:

| Setting | What it does |
| --- | --- |
| **Description** | What the field means, written for the AI. |
| **Display name** | The human-readable name. |
| **Synonyms** | The other words your business uses for it. |
| **Is display** | Marks it as one of the fields that identifies a record. |
| **Enum labels** | Human labels for coded values. |
| **Reference** | Points at another collection and field, naming the relationship. |

**Synonyms** are the setting that pays for itself. A `status` field with
synonyms *state*, *stage* and *where it is* answers three times as many
questions as one without.

**References** are what let the assistant follow a link — a question spanning
two collections needs to know they are related.

Each collection records who last edited it and when.

## The knowledge graph

**Settings → Data setup → Knowledge graph** visualises the tenant's schema as a
force-directed network: collections as nodes, references as edges.

<Shot src="admin/knowledge-graph" alt="The knowledge graph" pending
  caption="Collections and the references between them, with the last sync time." />

Use it to answer two questions the editor cannot:

- **Is anything isolated?** A collection with no edges is one the assistant
  cannot reach from anywhere else. Usually a missing reference.
- **Does the shape match the business?** If two things people always discuss
  together are not connected, that is a modelling gap, not an AI problem.

The diagram is read from a pre-computed graph rather than queried live, so it
is fast and reflects the **last schema sync** — the timestamp is shown in the
header. Refresh re-reads it.

## Schema sync

Curating a field does not take effect immediately. A **schema sync** rebuilds
what the AI uses, in two stages:

<DFlow dir="right" :steps="[
  { title: 'Graph', body: 'The structural picture: collections, fields, references' },
  { title: 'Vectors', body: 'The searchable embedding of your descriptions and synonyms' },
]" />

Each stage reports its own status, and the sync detail shows which
**collections** and **fields** were re-embedded. A sync reporting *"vectors
unchanged — no descriptions or synonyms were modified"* means your structural
change went through but you did not actually change any wording.

### While a sync is running

A **bootstrap** sync — the first full rebuild for a tenant — shows a banner
saying the knowledge base is being rebuilt, and stays up until it completes.
During it, the [assistant](/ai/assistant) may report that it is updating its
knowledge rather than answering from a partial picture.

Only one sync runs per tenant at a time. A job triggered while another is
running is recorded as skipped, with no changes applied — it is not a failure,
and re-triggering it once the first finishes is the fix.

::: tip Both halves are required
The assistant needs the graph *and* the vectors. If either is missing it says
so rather than guessing. See [Assistant](/ai/assistant).
:::

## A working order

1. Curate the collections people ask about most. Not all of them.
2. Write **descriptions** in business language, not schema language.
3. Add **synonyms** — the words people actually use out loud.
4. Set **references** between collections that relate.
5. Check the **knowledge graph** for isolated nodes.
6. Wait for the **sync**, then ask the assistant a real question.

Step 6 is the test that matters. Curation you have not verified by asking a
question is guesswork.

## Related

- [Assistant](/ai/assistant) — what this feeds.
- [Record insights](/ai/insights) — likewise.
- [Module designer](/build/module-designer) — module descriptions, the other
  half of what the AI reads.
- [Job status](/work/recycle-bin) — where sync jobs appear and can be retried.

## Permissions

Data setup is an administrator area under Settings, reached through the config
modules granted to your groups. Curating the schema changes what every AI
answer in the tenant is built on, so it warrants a narrow grant.
