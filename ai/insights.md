---
description: "AI summaries of one record, one module or one asset — placed where you want them."
---

# Insights

An insight is a summary of **one thing you are already looking at**. It answers
"what is this and what state is it in" without you reading every field, the
whole comment thread and the workflow trail.

Insights are not chat. There is no conversation, no tool selection and no loop:
the platform gathers a known set of data, makes one model call, and renders the
result. That is why an insight arrives in seconds where a chat answer takes
longer.

<Shot src="ai/insights" alt="A record insight" pending
  caption="A record insight rendered as an inline banner above the form." />

## Four insights, four subjects

| Insight | Summarises | Appears on |
| --- | --- | --- |
| **Record** | One record | The record page, and module grids |
| **Module** | A module's whole record set | Above the [record list](/work/record-list) |
| **Asset** | One commissioning asset | The asset panel in a [CX workbench](/cx/matrix) |
| **Commissioning record** | One CX record, with its checklist | CX record pages |

## Record insights

Built from the record itself and everything hanging off it:

- Its **fields**, interpreted through your tenant's schema.
- Its **workflow state** — where it is, how many steps, what is next.
- Its **comment activity**.
- Its **linked records** and their status.
- Its **attachments** — named, and for readable file types, a preview of the
  content is folded into the summary.

The commissioning variant adds checklist progress on top of that.

### Where it appears

Two placements, and it is your own choice which:

| Placement | Looks like |
| --- | --- |
| **Inline banner** | A block above the form |
| **Side panel** | A widget in the record's sidebar rail |

And two triggers:

| Trigger | Behaviour |
| --- | --- |
| **Automatically on open** | Generated and shown as the record loads |
| **Only when opened manually** | Nothing happens until you open it |

Both are set in [Your profile](/account/profile). Opening the sidebar widget
yourself always shows the insight, whatever your placement preference — you get
the same content in a different tab, which is harmless.

Insights appear on the standalone record page and on module grids. They do
**not** appear inside embedded forms — the record panel in a
[CX workbench](/cx/completing-a-cell), for instance.

## Module insights

A module can carry an insight over its whole record set — a summary of the
module's current state rather than one record's.

It is built from parallel aggregations over the records **you can see**:

| Aggregation | Gives |
| --- | --- |
| Total accessible records | The denominator for everything else |
| Records awaiting you | Where the ball is in your court |
| By project / workspace | Where your work is concentrated |
| Workflow status distribution | The shape of the pipeline |
| New records per month | The trend |
| Key custom field breakdowns | Whatever the module actually tracks |

The record set is the same one the module's [record list](/work/record-list)
shows you. A module insight and the log page's count agree, because they are
built from the same filter.

Distributions with a handful of distinct values are rendered as **charts** in
the summary, each followed by a sentence saying what it means. A distribution
with one value is not charted — there is nothing to compare.

::: tip Master data modules are included
Master and hierarchical master modules get module insights too, scoped by the
entity-level permissions their log pages use rather than the workflow ones.
:::

## Asset insights

In a [CX workbench](/ai/cx), an asset's panel offers a summary of that asset:
its status, its progress against its stages, its key dates, its open
[gates](/cx/gates), and the state of the assets it depends on — including
predecessors in other projects.

## What quality depends on

An insight is only as good as the vocabulary it is written in. Which means:

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

## Turning it off

**AI insights** is a per-user switch in [your profile](/account/profile). With
it off, no insight is requested and the widget says so rather than sitting
empty.

The organisation-wide **AI access** switch under **Settings → AI
personalization** overrides it. With that off, there are no insights for anyone.

## Permissions

Insights are generated from things you can already open, and are governed by
the same [permissions](/concepts/permissions).

Module insights are the case worth stating plainly: they aggregate over
**exactly the records you may view**, not over the module. Two people on the
same module page can legitimately see different totals.

## Related

- [Record detail](/work/record-detail) and [Record widgets](/work/record-widgets) — where insights sit.
- [CX workbench AI](/ai/cx) — asset and commissioning-record insights in context.
- [Data setup](/admin/data-setup) — the curation everything above reads.
