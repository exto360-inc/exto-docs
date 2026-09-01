---
description: "The Y axis: creating, nesting, sequencing and importing assets."
---

# The asset registry

The **Y axis** of the [matrix](/cx/matrix). The registry is the workbench's
master list of the things being commissioned, arranged as a tree — and adding an
asset to it is what creates its row of stage instances.

<Shot src="cx/registry" alt="The asset registry" pending
  caption="The asset tree, with a child asset being added under its parent." />

## What an asset carries

| Group | Fields |
| --- | --- |
| **Identity** | Asset ID, name, description, type. |
| **Hierarchy** | Its parent, and the full path from the root. |
| **Template** | The stage template it was provisioned from. |
| **Dates** | Planned, baseline, forecast and actual pairs. |
| **Progress** | Total, completed, blocked and critical counts, and a percentage. |
| **Rules** | The parent–child dependency setting. |
| **Custom fields** | Whatever the workbench defines. |

## Adding an asset

Choose **Add asset**, optionally with a parent selected — a new asset created
under one inherits that parent automatically.

The **Asset ID** is required and is what everything else refers to. It is
**immutable once created**: the registry marks it read-only afterwards, so the
field is editable only on the way in.

::: warning The asset ID cannot be changed later
Gates and predecessors reference assets internally rather than by code, so they
survive a rename — but reports, imports and anything outside Exto will not.
Get it right at creation.
:::

### Choosing a stage template

An asset is provisioned against a **published** stage template — only published
versions are offered. That template decides which stages this asset gets, which
is to say, which cells appear on its row.

An asset provisioned under one template version keeps those stages even after a
newer version is published. See [Stage templates](/cx/stage-templates).

## The hierarchy

Assets nest, and the nesting is load-bearing rather than cosmetic:

- **Progress rolls up.** A parent's percentage reflects its children.
- **Gate counts roll up.** A parent shows everything blocked beneath it.
- **The matrix indents rows**, so a system reads as a system.

### Parent–child dependency

An asset with children carries a **parent–child dependency** setting, which
gates the parent's checklist completion against its children's activities. It is
meaningless on a leaf, so the control is disabled for assets with no children.

## Predecessors

Beyond the parent–child tree, assets can be sequenced against each other with
**predecessors** — *this asset cannot proceed until that one has*. A predecessor
may live in a different project.

Predecessors are asset-to-asset. Stage-to-stage sequencing is
[gates](/cx/gates); stage date maths is [dates](/cx/dates).

## Bulk import

Registries are rarely built by hand. Import from a spreadsheet to create many
assets at once, using parent references to express the tree.

Import is also the normal way to update a large registry — the same file with
changed values, re-imported.

## Updating an asset

Open an asset to edit it. Everything except the asset ID is editable, subject to
your permissions. The panel gives you tabs for the asset's stages, its
documents, its predecessors, its linked records and its history.

Changing an asset's **forecast dates** triggers the same cascade as changing a
stage's — see [Dates & scheduling](/cx/dates).

## Deleting

Deleting an asset affects everything beneath it. Check for descendants first —
a branch removal takes its children's stage instances, documents and history
with it.

## Permissions

The registry is maintained from the **execution view**, not from Settings, so it
follows the project's own grants rather than an application role.

The [stage templates](/cx/stage-templates) assets are provisioned from are
defined under Settings and require <Perm role="PME" />.

Working the cells an asset produces is governed separately again, per stage —
see [Completing a cell](/cx/completing-a-cell).

## Related

- [Levels & stages](/cx/levels-and-stages) — the other axis.
- [Stage templates](/cx/stage-templates) — what an asset is provisioned with.
- [Completing a cell](/cx/completing-a-cell) — working an asset's stages.
