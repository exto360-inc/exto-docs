---
description: "The matrix renderer, the date engine, gates and rollup."
---

# CX execution

Running a workbench: rendering a matrix that can be enormous, computing dates
across a dependency graph, evaluating gates, and rolling results up a tree.

## The matrix

Stages across, assets down, a **stage instance** at every intersection. A
project with five hundred assets and sixty stages is thirty thousand cells, and
that is the constraint the whole rendering approach answers to.

## Why the grid is drawn, not built

The matrix renders to a **canvas**, not to DOM nodes. There is no element per
cell — the grid paints only what is in the viewport, every frame.

| Concern | Approach |
| --- | --- |
| Rendering | A 2D canvas context |
| Tree data | A flat row array with parent and depth, not nesting |
| Columns | An array, with a frozen subset pinned left |
| Grouping | A shared group label on columns produces a merged header row |
| Editing | A floating input positioned over the active cell |
| Theming | CSS custom properties read into a theme object |

Rows are flat with a parent reference rather than nested, so expanding a node is
a visibility change, not a restructure.

### The render loop

Clear, draw the group header row, draw the column headers, then for each visible
row draw its scrollable cells and its frozen cells, then the frozen separator.
Everything is clipped to the viewport first.

Pixel-ratio scaling is applied once to the context, not per draw.

### Loading

Initial data and child expansion are computed off the main thread and appended
incrementally, so a large tree does not block interaction while it loads.

## Levels are column groups

A level is expressed as a shared label across its stage columns. The group
header row appears **only when there are two or more distinct labels** — with
one level there is nothing to group, so the row is not drawn at all.

Collapsing a level replaces its columns with a single stub that renders a
percentage per asset, computed from the cells the collapse hid.

A level's colour rolls up worst-first: any red, then any amber, then all green,
then grey.

## The date engine

Dates are computed, not entered — with one exception.

**A stage with no dependency is an anchor**, and only anchors accept manual
forecast dates. A stage that has a dependency is computed, and a direct
override is rejected. Clearing a dependency re-enables manual dates in the same
update; setting one disables them.

Editing an anchor cascades:

| Direction | Behaviour |
| --- | --- |
| Downstream | Recomputed forward |
| Upstream | Recomputed backward |
| Completed stages | **Never touched** |
| In-progress stages | End moves; start preserved |

The in-progress rule matters: work that has begun keeps the date it actually
began on.

Relationships are the standard four — finish-to-start, start-to-start,
finish-to-finish, start-to-finish — with a duration and a lag. Offsets step over
calendar days by default, or working days when the workbench opts in, skipping
non-working days and holidays. The calendar is resolved **once per recompute**
and threaded through, so the mode is decided in one place.

Planning updates are guarded by an **allowlist**: only user-editable fields are
accepted, and computed or identity fields are rejected rather than silently
ignored.

## Bulk date entry

Editing anchors per asset does not scale, so the bulk grid pages rows lazily,
searches server-side, tracks edits across pages, and saves them in one batched
call. A hundred thousand anchors never reach the client at once.

## Gates and counts

Gates are evaluated on transition. All gates on a stage must clear — there is no
"any of".

Gate counts are maintained as a stored summary and **roll up**: an asset's count
is its own open records plus every child stage's plus every descendant asset's.
That is what makes a parent row's blocked count meaningful.

Anything not explicitly closed counts as **open**, so an unexpected state
surfaces as actionable rather than disappearing.

::: warning The open/closed vocabulary is load-bearing
The rule "not closed means open" silently inflates the open count if a third
state is ever introduced. Adding one means auditing every consumer of these
counts first, or dashboards will read the new state as still-open and raise
phantom alerts.
:::

## Progress rollup

Each stage contributes total, completed, blocked and critical counts, and a
percentage. Where a stage has a checklist its percentage comes from the
checklist's pass and fail statistics; without one it is binary.

Progress aggregates up the asset hierarchy, which is what makes a
five-hundred-asset project readable from one row.

## Handover

Completion feeds a package pipeline. Eligibility is either full completion —
completed, at 100%, **no open gates** — or a named set of priority stages, with
open gates blocking under both.

Packages are queued rather than built inline, versioned per asset so a reopened
and re-completed asset produces a second version, and **invalidated** rather
than deleted when the workbench rule changes beneath a package that was already
ready. An invalidated package stays visible as a historical record and is not
downloadable.

## Where to look

| Concern | Path |
| --- | --- |
| Canvas grid | `src/components/canvas-grid/`, and its `ARCHITECTURE.md` |
| Grid integration and store | `src/features/cx/hooks/useCxGrid.ts`, `src/features/cx/store/` |
| Date engine | `server/service/cx/asset_stage_plan_service.go`, `anchor_dates_service.go`, `schedule_calendar.go` |
| Gates and counts | `server/service/cx/gates_evaluator.go`, `gate_counts.go` |
| Rollup | `server/service/cx/asset_progress_service.go`, `execution_service.go` |
| Handover | `server/service/cx/handover_*.go` |

## Related

- [The commissioning matrix](/cx/matrix) and
  [Completing a cell](/cx/completing-a-cell) — the product view.
- [CX designer](/architecture/cx-designer) — the definitions this runs on.
