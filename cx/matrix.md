---
description: "Reading the canvas: cells, sections, KPIs, filters and views."
---

# The commissioning matrix

The execution view is a matrix. **Stages run across the top, grouped by level.
Assets run down the side, in their hierarchy. Every intersection is one unit of
commissioning** — with its own status, dates, checklist and evidence.

That is the whole mental model. Everything else on this page is how to read it.

<Shot src="cx/matrix" alt="The commissioning matrix" pending
  caption="Levels across the top with stages beneath them, the asset tree down the side, and a coloured cell at every crossing." />

## The two axes

### Across — levels and stages

Each stage is a column. Columns are grouped under their **level**, and the level
header row appears automatically once the workbench has two or more levels; with
one level there is nothing to group, so the row is not drawn.

Click a level header to **collapse** it. A collapsed level folds its stages into
a single stub column showing that level's percentage for each asset — which is
how a workbench with sixty stages stays readable.

A level's colour rolls up from its cells, worst-first: any red makes the level
red, then any amber, then all green, then grey.

### Down — the asset hierarchy

Each asset is a row, indented under its parent. Expand and collapse to move
through the tree. Progress aggregates upward, so a parent reflects the combined
state of everything beneath it.

Beyond the stage columns, rows carry **system** columns (progress, records,
gating) and any **custom** fields the workbench defines.

### The cell

A cell is one stage on one asset. It shows a colour for status and, where the
stage has one, a count. Selecting it opens the panel where the work is done —
see [Completing a cell](/cx/completing-a-cell).

| Colour | Means |
| --- | --- |
| **Green** | Complete. |
| **Amber** | Attention — at risk, or partially done. |
| **Red** | Blocked or critical. |
| **Grey** | Not started. |
| **Blank** | The stage does not apply to this asset. |

A blank cell is not the same as a grey one: grey is work not yet begun, blank is
work that was never part of this asset's template.

## The five sections

Tabs across the top switch what you are looking at. The matrix is only the first.

| Section | Shows |
| --- | --- |
| **Cx** | The matrix itself. The default. |
| **Gantt** | Stage dates on a timeline, reflecting the dependency logic. |
| **SSM** | The dependency graph between stages. |
| **Documents** | Every file across the workbench. See [Documents](/cx/documents). |
| **Handover** | Package status per asset. See [Handover](/cx/handover). |

## KPI cards

Four cards sit above the matrix, and each is **clickable** — selecting one
filters the matrix to what it counts, which is the quickest way from a number to
the rows behind it.

| Card | Counts | Clicking filters to |
| --- | --- | --- |
| **Delayed** | Past planned end date. | Status *overdue*. |
| **At risk** | In the next 3 days. | Status *at risk*. |
| **Blocked** | Cannot proceed. | Status *blocked*. |
| **Ready for execution** | In the next 3 days. | A next-3-days date window. |

**At risk** and **Ready for execution** share a three-day horizon but answer
different questions — one is work about to be late, the other work about to
become startable.

A fifth card, **Visual insights**, appears only when AI is enabled for the
tenant. It opens a panel of charts — status, delays, upcoming work — rather than
filtering the matrix. See [CX intelligence](/ai/).

The cards can be collapsed out of the way when you want the full height for the
matrix.

## Finding your way around it

- **Search** free-text across asset name, code and custom fields.
- **Filter** by field, with operators — contains, equals, in, is empty.
- **Group** rows by a field, to several levels, with drag-to-reorder.
- **Sort** by any metadata or custom column.

**View settings** controls which columns appear, organised as **System**,
**Stages** and **Custom**. Stages keep their display order; the other two groups
sort alphabetically.

There is no slice-by here — the matrix already slices by stage.

## Views

Any combination of filters, grouping, sort and visible columns saves as a
**view**, either shared with the project or personal to you. Views appear as
chips above the matrix and can be renamed, duplicated, hidden and reordered.

## Permissions

Opening a cell runs a permission check before the panel appears. Each stage
grants **view**, **edit** and **reopen** to project groups in the **Stage
configurations** tab.

::: warning A stage with no configuration is invisible
Stage access is implicit-deny. A newly added stage that nobody can see has
usually never been granted. See
[Completing a cell](/cx/completing-a-cell).
:::

## Related

- [Levels & stages](/cx/levels-and-stages) — defining the across axis.
- [The asset registry](/cx/assets) — defining the down axis.
- [Completing a cell](/cx/completing-a-cell) — doing the work at an
  intersection.
