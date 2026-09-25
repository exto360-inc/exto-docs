---
description: "Everything held against one asset — its fields, its stages, its predecessors, documents, links and notes."
---

# The asset property panel

::: tip Who can do this
The project's grants on the workbench. Editing an asset's fields needs edit
access; the panel opens read-only without it.
:::

Two different panels open from the [matrix](/cx/matrix), and it is worth being
clear which is which:

| You click | You get |
| --- | --- |
| A **stage cell** — an intersection | That cell's record and its [checklist](/cx/completing-a-cell) |
| The **asset's name**, in the frozen left column | The **asset property panel**, described here |

The asset panel is everything Exto holds *about the thing itself*, rather than
about one stage of its commissioning.

<Shot src="cx/asset-panel" alt="An asset's property panel, General tab"
  caption="The asset panel for FDT-001 — details, custom fields, and the tab bar across the top." />

## The tabs

| Tab | Holds |
| --- | --- |
| **General** | The asset's own fields — identity, hierarchy, template, dates, and the workbench's custom fields. |
| **Stages** | Every stage instance on this asset, with its level, code and status. |
| **Documents** | Files and folders attached to the asset, including auto-generated handover packages. |
| **Predecessors** | Other assets this one waits on. |
| **URLs** | External links kept against the asset. |
| **Notes** | A running conversation about the asset. |
| *Module tabs* | **One per module** [linked or gating](/cx/designer) on the workbench. A workbench with two linked modules shows two — *System Issues* and *ISSUES*. |

The last group is why **no two workbenches show the same tab bar**. The module
tabs come from the workbench's own configuration, so one workbench may show a
single *System Issues* tab and another two or three. The first six are always
present.

## General

The fields split into three blocks:

| Block | Fields |
| --- | --- |
| **Asset Summary** | An AI-written précis of the asset's state. Present only where [AI](/ai/) is enabled for the tenant — otherwise the block is absent entirely. |
| **Details** | Asset ID, name, description, type, stage template, start and end dates, parent asset, weight, and the parent–child dependency setting. |
| **Custom fields** | Defined per workbench, so this block differs everywhere. One workbench shows *Capacity / Manufacturer / Model number / Serial number*; another shows *Building / Group / CX engineer / Room*. |

**Asset ID** is the system identifier and is **always read-only** — it renders
as text rather than a field, and is stripped from the save payload. It is
composed from the asset's position in the tree, so `BLDGABASBMSSRVBMS01` is
*BMS Server 01* under `BLDGABASBMSSRV`.

**Parent asset ID** is what places the asset in the tree; changing it moves the
asset and everything beneath it.

Edits are held until you **Save** — **Discard** throws them away. Neither button
becomes active until something actually changes.

::: warning Stage template is not retroactive
Changing the **stage template** on an asset that already has stages does not
rewrite them. It governs what gets provisioned next. Use the **Stages** tab to
add or remove a stage on an asset that already exists.
:::

## Stages

<Shot src="cx/asset-stages" alt="The Stages tab of an asset"
  caption="Stages — every stage instance on this asset, its level, its code and whether it has been completed." />

One row per stage instance, which is one cell of the asset's row in the matrix.

| Column | Means |
| --- | --- |
| **Stage Name** | The stage, as the workbench defines it. |
| **Code** | Its identifier, used by rules and integrations. |
| **Level** | The [level](/cx/levels-and-stages) it belongs to — `L1Documentation`, `L2Delivery`, `L5Integration`. |
| **External ID** | The identifier in whatever system this stage is mirrored from. |
| **Status** | `Completed`, `Not Started`, and the states in between. |

**Add Stage** puts an extra stage on this asset alone, without touching its
template or any other asset. A stage that has been started cannot be deleted —
the delete control only appears on `Not Started` rows, which is what the lock
icon on the completed rows is telling you.

## Predecessors

<Shot src="cx/asset-predecessors" alt="The Predecessors tab"
  caption="Predecessors — pick a project and an asset to link. The table then tracks that asset's status, dates and progress." />

A predecessor is an asset this one waits on. Pick the **project**, then the
**asset**, then **Add**.

Once linked, the table carries the predecessor's status, start and end dates,
percentage and whether it is **Blocked** — so a delay upstream is visible here
without opening the other asset.

Predecessors are a *sequencing* relationship between assets. They are not the
same as [gates](/cx/gates), which decide whether a stage may close. An asset can
have predecessors and no gates, or the reverse.

## Documents

<Shot src="cx/asset-documents" alt="The Documents tab of an asset"
  caption="Documents — folders per stage, plus the auto-generated Handover Packages folder." />

Files kept against the asset, in folders. Two kinds appear:

- **Stage folders** — evidence attached while working a cell, filed under the
  stage it was captured for.
- **Handover Packages** — generated rather than uploaded. See
  [Handover](/cx/handover).

**Upload** adds a file directly. The list/grid toggle beside the search box
switches how folders are shown.

## URLs and Notes

<Shot src="cx/asset-urls" alt="The URLs tab"
  caption="URLs — external links against the asset, each with a title." />

**URLs** keeps external links — a vendor portal, a drawing in another system —
each with a title, so the link is readable rather than a bare address.

**Notes** is a running conversation about the asset, posted and ordered like
comments. Both are per-asset, and neither is part of the handover package.

## Related

- [The asset registry](/cx/assets) — creating and importing the assets themselves
- [Completing a cell](/cx/completing-a-cell) — the *other* panel
- [Dates & scheduling](/cx/dates) — how the dates on the General tab are used
