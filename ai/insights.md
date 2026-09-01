---
description: "An AI summary of one record, placed where you want it."
---

# Record insights

A short AI summary of one record, shown on the record. It answers "what is
this and what state is it in" without you reading every field and the whole
comment thread.

<Shot src="ai/insights" alt="A record insight" pending
  caption="The insight rendered as an inline banner above the form." />

## Where it appears

Two placements, and it is your own choice which:

| Placement | Looks like |
| --- | --- |
| **Inline banner** | A block above the form. |
| **Side panel** | A widget in the record's sidebar rail. |

And two triggers:

| Trigger | Behaviour |
| --- | --- |
| **Automatically on open** | The insight is generated and shown as the record loads. |
| **Only when opened manually** | Nothing happens until you open it. |

Both are set in [Your profile](/account/profile). Opening the sidebar widget
yourself always shows the insight, whatever your placement preference — you get
the same content in a different tab, which is harmless.

## Turning it off

**AI insights** is a per-user switch in your profile. With it off, no insight
is requested and the widget says so rather than sitting empty.

## Where it works

Insights appear on the standalone record page and on module grids. They do
**not** appear inside embedded forms — the record panel in a
[CX workbench](/cx/completing-a-cell), for instance.

## Module insights

A module can also carry an insight over its whole record set, shown above the
[record list](/work/record-list) — a summary of the module's current state
rather than one record's.

## What it is based on

The record's fields, its workflow state, and its comment activity, interpreted
through your tenant's schema. Which means the quality depends directly on:

- The **module description** in the [module designer](/build/module-designer).
- Field **display names**, **descriptions** and **synonyms** in the schema
  editor. See [Data setup](/admin/data-setup).

A module described as "expenses module" produces a worse insight than one
described as what it is actually for.

::: tip An insight is a summary, not a source
It is generated from the record and can be regenerated at any time. The record,
its [history](/work/history) and its
[workflow progress](/work/workflow-progress) are the authoritative account.
:::

## Permissions

Insights are generated from a record you can already open, and are governed by
the same [permissions](/concepts/permissions). The organisation-wide **AI chat
access** switch under **Settings → AI personalization** applies here too.
