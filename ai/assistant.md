---
description: "Asking questions of your data, and what grounds the answers."
---

# Assistant

A chat panel that answers questions about your tenant's data — "how many
inspections are open in Riverside", "show me last month's rejected expenses" —
and returns a table, a chart, or an answer in prose.

<Shot src="ai/assistant" alt="The assistant panel" pending
  caption="A question answered as a table, with the export action above it." />

## Asking

Type a question. The assistant works out whether you are asking about **data**,
following up on a previous answer, or asking a **general question**, and
answers accordingly.

It knows roughly where you are. The page you have open — a module, a record, a
project, a CX workbench — is sent as a hint, so "how many are overdue" means
something sensible without you naming the module.

::: tip The page hint is a default, not a filter
It nudges the assistant toward what you are looking at. It never restricts what
you can ask about, and it never widens what you are allowed to see.
:::

## What comes back

| Output | When |
| --- | --- |
| **Table** | A set of records or aggregates. |
| **Chart** | Something better seen than read. |
| **Markdown** | A prose answer. |
| **Download** | A generated file. |
| **Composite** | Several of the above together. |
| **Clarification** | The question was ambiguous — it asks rather than guesses. |

Table results can be exported as **XLSX**, **CSV** or **JSON**.

## Sessions

Conversations are kept as sessions, with a title, a turn count, and a
**favourite** flag. Follow-ups within a session keep their context, so "and
just the rejected ones" works.

## Attachments and documents

You can attach files to a question, or point the assistant at documents already
in [Drive](/work/documents). Documents indexed for AI show a status badge in
Drive.

## Grounding

The assistant answers from two things: a **knowledge graph** of your schema and
a **vector store** of your content. It needs both. When one is missing or is
being served from a backup, the assistant says it is updating its knowledge
rather than answering from a partial picture.

That state usually resolves on its own — a **bootstrap sync** rebuilding the
knowledge base shows a banner while it runs. If it persists, an administrator
should check [Data setup](/admin/data-setup) and the sync jobs on the
[job status](/work/recycle-bin) page.

## Making it better

The single most effective thing an administrator can do is curate the
**schema editor** — display names, descriptions and **synonyms** per field —
and write real **module descriptions** in the
[module designer](/build/module-designer). Synonyms are what let people ask in
their own words, and references are what let a question span two collections.

Curation only takes effect after a **schema sync**, and the
[knowledge graph](/admin/data-setup) shows whether anything is left isolated.
See [Data setup](/admin/data-setup).

**Custom instructions** and a **terminology** list, under **Settings → AI
personalization**, shape tone and vocabulary organisation-wide.

## Permissions

The assistant answers only from data you can already see. It is governed by the
same [permissions](/concepts/permissions) as every other screen — it is not a
way around them.

**AI chat access** is an organisation-wide switch under **Settings → AI
personalization**. With it off, the assistant is unavailable to everyone.
