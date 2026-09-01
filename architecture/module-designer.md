---
description: "The tab shell, the save contract, and the canvas editors."
---

# Module designer

Nine tabs over one module, sharing a shell. The interesting parts are the
contract between the shell and its tabs, and the fact that the same canvas
serves two different jobs.

## The tab registry

Tabs are declared in a registry rather than wired individually. Each entry gives
its id, label, icon, whether a native implementation exists, and a fallback path
for those that do not.

That last field is the point. Tabs that have not been rebuilt natively fall
through to the legacy designer, so the rebuild ships **tab by tab** without
breaking the others. Adding a tab, or flipping one to native, is a one-line
registry change plus a component — the shell needs no edit.

## The save contract

The shell owns the Save button; the tabs own the saving. They meet through a
context:

| The tab does | The shell does |
| --- | --- |
| Reports whether it is dirty | Enables Save, warns on navigation |
| Registers a save handler | Calls that handler on Save |
| Deregisters on unmount | Falls back cleanly |

Dirty state and save handlers are tracked **per tab**, so Save applies the tab
you are on and moving away from unsaved work warns you first.

Tabs also request **focus mode**, which collapses the shell's tab rail to icons.
The form designer uses it to free room for canvas and properties.

### The optional context

The workflow canvas is not only a designer tab — the record progress drawer
renders it read-only to show where a record has reached. There is no shell
there: no Save button to register with, no dirty state to track.

So there are two hooks. The strict one throws outside a shell. The optional one
returns a context that quietly absorbs those calls.

::: warning Editing surfaces must use the strict hook
Silently no-op'ing a save registration is exactly the bug nobody ever finds.
:::

## The form designer

Palette, canvas and properties, over a tree of fields.

The palette is a **catalog**: every entry declares its ui type, data type, group,
icon and defaults. Crucially, every ui type in it is one the
[form engine](/architecture/form-engine) can render — so what a designer can
draw is always renderable.

### Fields bind to columns by id

Dropping a palette field creates a column. Dragging an existing column binds to
it and creates nothing — the column's id **is** the binding, matched the same
way the server matches it.

Nothing else is stored to express that a field came from a table; it is derived
by matching ids. Inventing an extra marker would survive or vanish depending on
which endpoint last wrote the form, since fields are typed on one path and
untyped on another.

### Names

A field's name is generated from its label, lower-cased and underscored, with a
minimum length enforced — short labels like *Date* would otherwise generate
names too short to save, so they are padded rather than rejected.

### System columns arrive read-only

A column the platform writes is placed read-only, with mandatory cleared. A
required toggle or default on one would describe an input nobody can type into.

## Rules and validations in one editor

Rules and validations were separate tabs, and both began the same way — *when
this is true* — so you had to know which one your idea belonged to before you
could start.

They are now one editor: describe the situation once, then choose the outcome.
Behind it the two stores stay separate, because they are enforced in different
places — a rule runs against an open form, a validation runs on submit,
including submissions from other systems. Merging the storage would quietly drop
that guarantee; merging the editing costs nothing.

The warn-versus-block split rides an existing flag rather than a new rule type,
so it uses a path that already works end to end.

## The workflow canvas

A node-graph editor that serialises to the template shape described in
[the workflow engine](/architecture/workflow-engine). Beyond drawing, it
carries layout: automatic arrangement, edge routing that avoids boxes, and label
placement that avoids collisions.

Validation runs before publish and reports what would make an unrunnable
workflow — an unreachable step, a step with no way out, a missing name.

## AI assistance

Two AI surfaces sit inside the designer, both built the same way: **decide
first, create after**.

A read produces reviewable rows, each keepable, editable or droppable, with rows
that cannot be created as they stand saying why. Nothing is written until the
user accepts. Rows are revealed in sequence rather than at once — the read is a
single request, so this is presentation, not streaming, but eighteen fields
arriving one by one is legible where eighteen at once is a wall.

## Where to look

| Concern | Path |
| --- | --- |
| Tab registry | `src/features/module-designer/registry.ts` |
| Shell contract | `src/features/module-designer/context/ModuleDesignerContext.tsx` |
| Field catalog | `src/features/module-designer/forms/formFieldCatalog.ts` |
| Rules editor | `src/features/module-designer/forms/FormLogicEditor.tsx` |
| Workflow canvas | `src/features/module-designer/components/WorkflowDesigner.tsx` |
| AI review | `src/features/module-designer/ai/` |

## Related

- [Module designer](/build/module-designer) — the product view.
- [The form engine](/architecture/form-engine) — what the designer produces.
