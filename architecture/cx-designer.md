---
description: "Workbench definitions, gates, and what provisioning materialises."
---

# CX designer

Building a workbench: the definitions that decide what work exists, and the
provisioning step that turns them into work on real assets.

## The definition chain

<DTree root="Workbench" :nodes="[
  { label: 'Levels', note: 'groupings — become column groups' },
  { label: 'Stages', note: 'units of work — become columns', children: [
    { label: 'Scheduling', note: 'depends-on · type · duration · lag' },
    { label: 'Gates', note: 'blocking rules' },
    { label: 'Checklist', note: 'what completing it means' },
  ] },
  { label: 'Stage templates', note: 'versioned sequences of stages' },
]" />

<DFlow dir="right" :steps="[
  { title: 'Stage template' },
  { title: 'Asset', edge: 'provisioning' },
  { title: 'Stage instances', body: 'the cells' },
]" />

Everything above the instance is definition. The **instance** is the only thing
users work on, and it is created by provisioning, not by editing.

## Two dependencies that are not the same thing

The single most important distinction in the subsystem, and the code keeps them
apart deliberately:

| | **Depends on** | **Gates** |
| --- | --- | --- |
| Drives | Date calculation | Behavioural progression |
| Cardinality | One, with a type and lag | Many, all AND-ed |
| Effect if unsatisfied | None — dates are dates | The stage is blocked |

They are separate fields, evaluated by separate code. Changing one has no effect
on the other.

## Gates

A gate is a small polymorphic record: a **kind** (a stage or a level's
aggregate), a **trigger** (before starting, or before closing), a **condition**
(the target must have started, or completed), and a target asset.

Three implementation details worth knowing:

- **Defaults are stamped on write.** Trigger defaults to *close* and condition
  to *completed*, filled in by the validator, so readers never see empty values
  on stored documents.
- **Assets are referenced by id, never by code.** A code is mutable — a rename
  through an import would silently break every gate pointing at it. Ids are not.
- **A null asset is a sentinel.** At template design time it means "the asset
  this template materialises into", filled with the host asset's id when the
  template is applied.

Clearing all gates must persist an empty list rather than omitting the key,
otherwise the old gates survive the write.

## Provisioning

Adding an asset applies the **published** template effective at that moment,
materialising one stage instance per stage.

At this point the template's abstract gates become concrete: sentinel assets are
resolved to this asset, and cross-asset gates are checked against the registry —
references to assets that do not exist are dropped rather than left to block
forever.

::: warning Definitions do not flow to provisioned assets
Editing a stage changes the definition. Assets already provisioned keep the
instances they were given. New stages reach assets through a new template
version at provisioning — not by editing the stage.
:::

## Template versioning

Templates are draft, published or retired, with effective dates. Retiring stops
a version being applied to new assets and changes nothing about assets already
running it.

Two versions effective at once for the same workbench make provisioning a matter
of ordering rather than intent, so the ranges should not overlap.

## Field mapping

Rules that auto-fill records created from the workbench. Each names a target
field, an active flag, and a source: a **context** value resolved at runtime
(asset, stage, user, workbench, project or space), a **literal**, or **now**
with an optional day offset.

Rules are common to every linked module, or scoped as a per-module override.
This is what makes opening a cell fast — the record is stamped with its context
before anyone sees it.

## Codes are normalised

Level and stage codes are normalised on write, so lookups elsewhere can index by
code without every caller re-implementing the same trimming and casing.

## Where to look

| Concern | Path |
| --- | --- |
| Stage and template shapes | `server/model/cx/stage.go`, `stage_template.go` |
| Gate shape | `server/model/gating_target.go` |
| Provisioning and gate seeding | `server/service/cx/gates_seed.go`, `stage_template_*.go` |
| Validation | `server/service/cx/stage_template_validator.go`, `gates_validation.go` |
| Editor | `src/features/cx/components/workbench-editor/` |

## Related

- [Designing a workbench](/cx/designer) — the product view.
- [CX execution](/architecture/cx-execution) — what runs on these definitions.
