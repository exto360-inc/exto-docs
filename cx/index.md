---
description: "Stages across, assets down, and a unit of commissioning at every crossing."
---

# CX workbench

The CX workbench runs **multi-stage, hierarchical work** — most often asset
commissioning. It is a matrix: **stages across, assets down, and one unit of
commissioning at every intersection.**

<Shot src="cx/matrix" alt="The commissioning matrix" pending
  caption="Levels across the top with their stages, the asset tree down the side, and a cell at every crossing." />

## The idea in one picture

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
  ]" />

Each cell carries its own status, dates, checklist and evidence. Progress rolls
up the asset tree; gates decide what may proceed; and when an asset's cells are
done, its evidence compiles into a handover package.

## What it solves

A commissioning project has hundreds of assets, each going through the same
sequence of work, with dependencies between them. A workbench lets you define
the sequence **once** and apply it to every asset, enforce prerequisites, track
progress at any level of the tree, and produce the paperwork at the end.

## The pages

**Understanding it**

| Page | Covers |
| --- | --- |
| [Concepts](/cx/concepts) | The objects, the status model, and the two kinds of dependency. |

**Setting it up**

| Page | Covers |
| --- | --- |
| [Designing a workbench](/cx/designer) | General settings, custom fields, field mapping. |
| [Levels & stages](/cx/levels-and-stages) | The X axis — grouping work, and every stage setting. |
| [Gates & dependencies](/cx/gates) | Blocking a transition until something else is done. |
| [Stage templates](/cx/stage-templates) | Versioned stage sequences, and how one reaches an asset. |
| [The asset registry](/cx/assets) | The Y axis — creating, nesting and importing assets. |
| [Dates & scheduling](/cx/dates) | Anchor dates, dependency types, the calendar, the cascade. |

**Running it**

| Page | Covers |
| --- | --- |
| [The commissioning matrix](/cx/matrix) | Reading the grid, its five sections, KPIs and views. |
| [Completing a cell](/cx/completing-a-cell) | The pass/fail/NA checklist, status, and what rolls up. |
| [Documents](/cx/documents) | Where evidence goes, and why it matters. |
| [Handover](/cx/handover) | Eligibility, package states, versions, downloads. |

## The distinction to learn first

**Depends on** and **gates** look alike and do different jobs:

- **Depends on** computes a stage's **dates** from another stage.
- **Gates** block a stage's **progression** until a condition holds.

A stage can be scheduled from one stage and gated by three others. Getting these
confused is the single most common source of "why won't this close". See
[Concepts](/cx/concepts).

## Where it lives

| Task | Where | Who |
| --- | --- | --- |
| Build the workbench | Settings → CX workbench | A <Perm role="PME" /> user |
| Grant stage access | The project's Stage configurations tab | Whoever the project grants it to |
| Do the work | The workbench's execution view | Project users |
