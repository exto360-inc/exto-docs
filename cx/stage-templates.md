---
description: "Versioned stage sequences, and how one reaches an asset."
---

# Stage templates

A stage template is a reusable sequence of stages, applied to an asset when it
is provisioned. It is how one definition of "the work" reaches five hundred
assets without being retyped, and how you change that work later without
disturbing the assets already running.

<Shot src="cx/stage-templates" alt="The stage template form" pending
  caption="A template's stage grid — each stage with its lags, modules and gates." />

## List page

The **Stage templates** tab lists every template in the workbench, with its
version, its state and its effective dates.

| State | Means |
| --- | --- |
| **Draft** | Editable. No asset uses it. |
| **Published** | In use, within its effective dates. |
| **Retired** | Superseded. Assets already on it keep running. |

## Building one

Assemble [stages](/cx/designer) into a sequence. The template form shows the
whole sequence as a grid — each stage with its lags, its linked modules and its
gates — so you review the shape in one pass rather than opening every stage.

Stages must exist before a template can reference them.

## Versioning

Templates are versioned, and the lifecycle mirrors
[workflow versions](/build/publishing):

1. A template is a **draft** while you build it.
2. **Publish** it, within an **effective date range**, to make it usable.
3. **Retire** old versions when they are superseded.

Assets provisioned while a version is effective get that version's stages, and
keep them. Publishing a new version changes what *newly provisioned* assets
receive; it does not rewrite the assets already carrying stage instances.

::: warning Retiring is not deleting
A retired template stops being applied to new assets. Every asset already
running its stages continues exactly as before.
:::

## How a template reaches an asset

<DFlow :steps="[
  { title: 'Asset added to the registry' },
  { title: 'Published template, effective today' },
  { title: 'One stage instance per stage, on that asset' },
  { title: 'Progress rolls up the asset hierarchy' },
]" />

A **stage instance** is that asset's own copy of a stage: its status, its
dates, its checklist answers and its progress. The template is the definition;
the instance is what people actually work on.

## Effective dates

The date range decides which version is applied at provisioning time. Two
versions must not overlap for the same workbench — if they do, which one an
asset receives becomes a matter of ordering rather than intent.

## Related

- [Designing a workbench](/cx/designer) — creating the stages a template
  sequences.
- [Completing a cell](/cx/completing-a-cell) — what stage instances look like in use.

## Permissions

Creating, publishing and retiring stage templates happens under **Settings → CX
workbench** and requires <Perm role="PME" />.

Everyone else meets a template only through the stage instances it produced on
their assets.
