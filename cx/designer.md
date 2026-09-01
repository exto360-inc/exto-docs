---
description: "General settings, workbench fields, and field mapping onto new records."
---

# Designing a workbench

Creating the workbench itself and the settings that apply across it. The two
axes have their own pages — [Levels & stages](/cx/levels-and-stages) for the
work, [The asset registry](/cx/assets) for the things it is done to.

Workbenches are built at **Settings → CX workbench**.

<Shot src="cx/designer" alt="The workbench editor" pending
  caption="The workbench editor, with its tabs down the side." />

## The tabs

| Tab | Owns | Covered in |
| --- | --- | --- |
| **General** | Identity, dates, linked and gating modules, schedule mode. | This page |
| **Levels** | The phases stages group under. | [Levels & stages](/cx/levels-and-stages) |
| **Stages** | The units of work. | [Levels & stages](/cx/levels-and-stages) |
| **Stage templates** | Reusable stage sequences. | [Stage templates](/cx/stage-templates) |
| **Fields** | Custom fields on the workbench. | This page |
| **Field mapping** | Auto-fill rules for new records. | This page |

::: tip Work them left to right the first time
Levels must exist before a stage can reference one, and stages before a template
can sequence them.
:::

## General

| Setting | Notes |
| --- | --- |
| **Name**, **display name**, **description** | Workbench identity. |
| **Type** | The kind of project. |
| **Start** and **end dates** | The project lifecycle. |
| **Linked modules** | Modules whose records appear inside the workbench. |
| **Gating modules** | Modules whose records must be completed to clear a stage. |
| **Schedule mode** | Calendar days, or business days with a working week and holidays. |

**Gating modules** are gates that do not look like gates — a record in one of
them blocks a stage as surely as a stage gate does. See
[Gates & dependencies](/cx/gates).

**Schedule mode** decides how every date offset in the workbench is counted. See
[Dates & scheduling](/cx/dates).

## Fields

Custom fields on the workbench itself — text, textarea, select, multi-select and
date. They appear on the workbench form and can be surfaced as columns in the
[matrix](/cx/matrix).

## Field mapping

Rules that auto-fill **new module records** created from the workbench — so a
commissioning record opens already carrying its asset name and today's date
rather than asking someone to retype them.

Each rule names a target field, an **active** toggle, and a source:

| Source | Pulls |
| --- | --- |
| **context** | A runtime value — `asset.sys_name`, `stage.stageCode`, `user.displayName`, or a workbench, project or space field. |
| **literal** | A fixed value. |
| **now** | Today's date, with an optional day offset. |

Rules are either **common**, applying to every linked module, or a **per-module
override**.

This is what makes [opening a cell](/cx/completing-a-cell) fast: the record is
stamped with its context before anyone sees it.

## What is not here

Three things that live on the workbench but are big enough to have their own
pages:

- **Gates** — attached to stages, and covered in
  [Gates & dependencies](/cx/gates).
- **The schedule** — how dates are actually computed, in
  [Dates & scheduling](/cx/dates).
- **The registry** — the assets themselves, in
  [The asset registry](/cx/assets).

## Permissions

The workbench editor lives under **Settings → CX workbench**, so building a
workbench — its levels, stages, templates, field mappings and form — requires
<Perm role="PME" />, the application role that opens Settings.

Two things are *not* gated that way, because they happen outside Settings:

- **Stage access** is granted per stage to project groups, in the project's
  **Stage configurations** tab. See
  [Completing a cell](/cx/completing-a-cell).
- **The asset registry** is maintained from the execution view, under the
  project's own grants. See [The asset registry](/cx/assets).
