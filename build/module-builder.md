---
description: "The five-step wizard that reads a document and builds a module from it."
---

# Module builder

A guided wizard that takes a photograph or PDF of an existing form and builds
the module, the form, the checklist and a workflow from it. Five steps, at
**Settings → Module builder**.

It is the fast path. The [module designer](/build/module-designer) is the
complete one — build here, refine there.

<Shot src="build/module-builder" alt="The module builder wizard" pending
  caption="Step 1 — uploading a scanned form against a new module." />

## When to use it

| Situation | Use |
| --- | --- |
| You have a paper or PDF form to digitise | **Module builder** |
| You are starting from a blank page | [Module designer](/build/module-designer) |
| The module exists and needs another form | [AI form builder](/ai/form-builder) |
| You know exactly what you want | Module designer |

## The five steps

<DFlow numbered :steps="[
  { title: 'Module' },
  { title: 'Form' },
  { title: 'Checklist', note: 'only when the form has checklist fields' },
  { title: 'Preview' },
  { title: 'Workflow' },
]" />

### 1. Module

Two ways in:

- **Use an existing module** — pick it, then upload the document. The file is
  validated before you go on.
- **Create a new module** — upload the document, let it be analysed, then
  review what came back.

Uploads accept **PNG, JPEG, WebP and PDF**.

Creating a module asks for a **display name** and a **kind** — Workflow,
Master Data, or Hierarchical Master Data.

::: warning The system name is generated and permanent
It is derived from the display name as uppercase letters, digits and
underscores — starting with a letter, capped at ten characters. Like every
module name it cannot be changed afterwards. Check it before continuing.
:::

### 2. Form

The document is read and a form is proposed. You name it, then review the
fields.

This is the same review-before-anything-exists model as the
[AI form builder](/ai/form-builder): decisions come first, and nothing is
written until you accept them.

If the proposed form contains **checklist** fields, step 3 appears. If not, it
is skipped.

### 3. Checklist

Only shown when the form needs one. Name the checklist and give it its items —
each with a description and a UI type.

You can **skip** this step. The checklist fields stay on the form with nothing
to point at, and you attach a [checklist master](/build/checklists) later.

### 4. Preview

The form on a real designer canvas. Drag fields and layout containers to
reorder them, and see the sections and columns as users will.

This is a layout pass, not a field-editing pass. Getting the order right here
is much quicker than doing it later.

### 5. Workflow

| Situation | Offered |
| --- | --- |
| New module | Create a one-step workflow. |
| Existing module with no workflow | Create one. |
| Existing module that already has one | Told so, and allowed to skip. |

The workflow is named after the module by default. On the new-module path the
name auto-increments if one already exists, so you cannot collide by accident.

A **one-step** workflow is genuinely minimal — enough for records to exist and
move once. Real routing comes next.

## After the wizard

You have a working module, and a starting point rather than a finished design.
Open it in the [module designer](/build/module-designer) and:

1. Check **General** — record number pattern, reopen, revision.
2. Fix field types the read got wrong, in [Forms](/build/forms).
3. Add [rules](/build/rules) — nothing conditional is inferred.
4. Replace the one-step workflow with a real one. See
   [Workflows](/build/workflows).
5. Deploy it in [module setup](/admin/settings) and add it to the
   [menu](/admin/menu).

::: tip It reads layout, not intent
The wizard is good at getting eighteen fields off a scanned page and has no
opinion about which your business needs, which must be required, or who
approves them. Treat its output as a first draft.
:::

## Permissions

The wizard lives under **Settings**, so running it requires <Perm role="PME" />
— as does refining the result in the module designer afterwards.

The organisation-wide AI switch under **Settings → AI personalization** also
applies to the document read.
