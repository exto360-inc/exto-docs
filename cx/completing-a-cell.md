---
description: "Working an intersection: the checklist, the status, and what rolls up."
---

# Completing a cell

::: tip Who can do this
**Edit** on that stage, granted to your project groups.
**Reopen** is a separate grant again.
:::

A cell is one stage on one asset — the unit of commissioning work. Opening it,
working its checklist and setting its status is what a commissioning engineer
does all day, and everything else in the workbench exists to make it possible.

<Shot src="cx/cell-panel" alt="A stage cell open in the detail panel"
  caption="A cell open — the matrix stays on the left, the cell's form and checklist fill the panel on the right." />

## Opening one

Click a cell in the [matrix](/cx/matrix). A permission check runs first, then
the panel opens on the right.

::: tip Two panels, two clicks
Clicking a **stage cell** opens the cell's record, described here. Clicking the
**asset's name** in the left column opens
[the asset property panel](/cx/asset-panel) instead.
:::

- If a record already exists for the cell, it opens.
- If not, you are prompted to **create** one. The new record is stamped with its
  CX context — workbench, stage, asset — and auto-filled from the workbench's
  [field-mapping](/cx/designer) rules.

You will get read-only access, edit access, or a refusal, depending on the
stage's grants.

## The checklist

Where the stage has a [checklist](/build/checklists) attached, it renders inside
the cell as a tab strip, a status bar and a table of items.

<Shot src="cx/checklist" alt="A checklist being worked inside a cell"
  caption="The checklist table — one numbered item per row, its result in the Results column, and who filled it recorded underneath." />

Each item is answered **Pass**, **Fail** or **N/A**, and can carry notes,
attachments and linked records depending on how the checklist was configured.

### Filling one in

1. Scroll to the **Checklist** section of the open cell.
2. Expand the checklist by its name — a cell can carry more than one.
3. Answer each numbered item in the **Results** column.
4. Add an observation or attach evidence where the item asks for it.
5. Record the **Overall result** and any comments beneath the table.

Every answer is stamped with **who filled it and when**, shown under the item.
That line is the audit trail the handover pack is built from, which is why the
checklist cannot be edited once the cell is signed off — reopening it takes the
separate **Reopen** grant.

The status bar above the table counts as you go, and the cell's percentage
follows it.

::: tip The checklist decides the percentage
A stage **with** a checklist takes its percentage from the checklist's pass and
fail statistics. A stage **without** one is binary — 0% or 100% by status. This
is why attaching a checklist changes how progress reads, not just what the cell
shows.
:::

Items can be mandatory always, never, only when another answer takes a
particular value, or only at the last step — so a checklist can be worked
through progressively without blocking every save.

## Setting the status

| Status | Means |
| --- | --- |
| **Not started** | Nothing has begun. |
| **In progress** | Work is under way. |
| **Completed** | Done, with every gate cleared. |
| **Blocked** | A gate is unmet, or it was set by hand. |
| **Critical** | Flagged as high severity. |

On save, the cell's progress rolls up to the asset, and from there up the asset
hierarchy.

## When it will not close

Closing or progressing a cell runs its [gates](/cx/gates). An unmet gate leaves
the cell **blocked** — the transition simply does not happen.

Work down this list:

1. Read the cell's gates. Each names a target and the state it must reach.
2. Check the **target's** status, not this cell's.
3. A **level** gate needs every stage in that level, not one.
4. A **cross-asset** gate points at a different asset entirely.
5. **Gating modules** are gates too, and do not look like gates — their records
   must be completed.

## Reopening

A completed cell can be rolled back by someone with the **reopen** grant on that
stage. Reopening is deliberately a separate permission from editing: it undoes a
sign-off.

## The asset's tabs

With a cell open, the panel also exposes the asset around it:

| Tab | Holds |
| --- | --- |
| **General** | The record's fields. |
| **Stages** | Every stage instance on this asset — add, edit, manage gates. |
| **Dates** | The asset's four date pairs. See [Dates](/cx/dates). |
| **Documents** | Evidence on the asset. See [Documents](/cx/documents). |
| **Predecessors** | Asset-to-asset sequencing. |
| **Linked records** | Related records from linked modules. |
| **URLs** | External references. |
| **History** | The audit trail. |
| **Handover** | Package state for this asset. See [Handover](/cx/handover). |

## Permissions

Each stage grants access to project groups at three levels, in the **Stage
configurations** tab of the project:

- **View** — which groups see the stage at all.
- **Edit** — which groups may work its cells.
- **Reopen** — which groups may reopen a completed one.

::: warning Implicit deny
A stage with no configuration is treated as inaccessible. A new stage nobody can
see has usually never been granted.
:::

## Notifications

Stage notifications are **date-anchored** — they fire relative to a stage date
rather than to an event:

| Part | Values |
| --- | --- |
| **Pivot** | `START_DATE`, `DUE_DATE` or `COMPLETION_DATE`. |
| **Timing** | An amount, a unit — `HOURS` / `DAYS` / `WEEKS` — and `BEFORE` or `AFTER`. |
| **Recipients** | Users or groups beyond the default notifiers. |

For example: *three days **before** the **due date**, notify the Installation
group.*

## Related

- [The commissioning matrix](/cx/matrix) — finding the cell.
- [Gates & dependencies](/cx/gates) — why one is blocked.
- [Handover](/cx/handover) — what completing them all leads to.
