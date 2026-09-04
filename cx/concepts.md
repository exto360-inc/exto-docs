---
description: "The objects in a workbench, the status model, and two dependencies that differ."
---

# Concepts

A workbench is built from a small set of objects. Learning them takes ten
minutes and makes everything else in this lane obvious.

## The matrix

<DMatrix
  xLabel="X: levels and stages"
  yLabel="Y: assets"
  :groups="[{ label: 'Level 1', span: 3 }, { label: 'Level 2', span: 2 }]"
  :columns="['Design', 'Approve', '…', 'Install', '…']"
  :rows="[
    { label: 'Pump A', cells: ['done', 'done', '', 'todo', ''] },
    { label: 'Seal', depth: 1, cells: ['done', 'done', '', 'part', ''] },
    { label: 'Motor', depth: 1, cells: ['done', 'part', '', 'todo', ''] },
    { label: 'Pump B', cells: ['done', 'todo', '', 'todo', ''] },
  ]"
  caption="Every intersection is one stage instance, carrying status, dates, a checklist and evidence." />

## The objects

| Term | What it is |
| --- | --- |
| **Workbench** | The container for one commissioning project. |
| **Level** | A grouping of stages — *L1 Design*, *L2 Installation*. Defines the column groups. |
| **Stage** | A unit of work, tied to a level. Defines a column. |
| **Stage template** | A reusable, versioned sequence of stages, applied when an asset is provisioned. |
| **Asset** | A real-world item being commissioned. Defines a row. Assets nest. |
| **Registry** | The workbench's master list of assets. |
| **Stage instance** | One asset's copy of one stage — the cell. Where the work is. |
| **Gate** | A rule blocking a transition until a target reaches a state. |
| **Predecessor** | An asset-to-asset dependency. |
| **Field mapping** | A rule auto-filling a new module record from context. |

## Two things that look alike and are not

This is the distinction that causes the most confusion, and the product keeps
them strictly apart:

| | **Depends on** | **Gates** |
| --- | --- | --- |
| Controls | **Dates** | **Completion** |
| Effect | Computes this stage's forecast dates from another's | Blocks this stage from starting or closing |
| Shape | One dependency, with a type and a lag | Any number, all of which must clear |
| Covered in | [Dates & scheduling](/cx/dates) | [Gates & dependencies](/cx/gates) |

A stage can depend on another for its dates and be gated by something else
entirely. Changing one does not change the other.

## Status

A stage instance is always in one of five states:

- **Not started** — the initial state.
- **In progress** — work has begun.
- **Completed** — done, with every gate cleared.
- **Blocked** — a gate is unmet, or it was set by hand.
- **Critical** — flagged as high severity.

## Progress

Each stage contributes counts: total, completed, blocked, critical, and a
percentage. Where a stage has a **checklist**, its percentage comes from the
checklist's pass and fail statistics; without one it is binary — 0% or 100% by
status.

Progress **aggregates up the asset hierarchy**, so a parent asset reflects
everything beneath it. That is what makes a five-hundred-asset project readable
from one row.

## Dates

Every asset and stage instance carries four date pairs, and they mean different
things:

| Pair | Meaning |
| --- | --- |
| **Planned** | The original intent. |
| **Baseline** | The agreed schedule, frozen for comparison. |
| **Forecast** | What is currently expected. This is what the date engine computes. |
| **Actual** | What happened. |

See [Dates & scheduling](/cx/dates).

## Where things live

| Task | Where | Who |
| --- | --- | --- |
| Build the workbench | Settings → CX workbench | A <Perm role="PME" /> user |
| Configure stage access | The project's Stage configurations tab | Whoever the project grants it to |
| Do the work | The workbench's execution view | Project users |

## Next

- [Designing a workbench](/cx/designer) — creating one.
- [The commissioning matrix](/cx/matrix) — reading it.
