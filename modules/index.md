---
description: "What a module is, what it owns, and where each part is documented."
---

# Modules

A **module** is a type of thing you track — *Issues*, *Inspections*, *Purchase
orders*, *Vendors*. It is the central object in Exto: almost everything else
either defines a module, deploys one, or works with its records.

## What a module owns

```
Module
├─ Table        the columns its records store
├─ Form(s)      what people fill in, one per workflow step
├─ Rules        what is required, and when
├─ Workflow     where records go after Submit
└─ Records      the actual data
```

Everything above **Records** is definition. The records are the data. That split
is why one designer screen can produce any module, and why a module's behaviour
changes without shipping code.

## The three kinds

A module's **kind** is chosen at creation and decides which screens it gets.

| Kind | Screen | Has a workflow? |
| --- | --- | --- |
| **Workflow** | Record list and record detail | Yes |
| **Master data** | A flat editable grid | No |
| **Hierarchical master data** | A tree | No |

::: tip Only workflow modules have a workflow type
Masters have no workflow, so they have no workflow type either — the designer's
workflow-type filter simply has nothing to offer for them.
:::

A **workflow type** further describes a workflow module — *Workflow* for an
ordinary process, *Commissioning* for one that participates in the
[CX workbench](/cx/).

Masters are covered in their own right under
[Master data](/work/masters) and
[Hierarchical masters](/work/hierarchical-masters).

## The life of a module

```
Design      →  Deploy      →  Link        →  Use
designer       module setup    menu           records
```

| Step | Where | Without it |
| --- | --- | --- |
| **Design** | [Module designer](/build/module-designer) | Nothing exists. |
| **Deploy** | [Module setup](/setup/) | It exists but runs nowhere. |
| **Link** | [Menu configuration](/menu/) | It runs but nobody can reach it. |
| **Use** | [Record list](/work/record-list) | — |

Missing any of the first three produces the same symptom: a module nobody can
find. See [Diagnosing "I can't see it"](/recipes/cant-see-it).

## Where each part is documented

**Defining one**

| Topic | Page |
| --- | --- |
| The designer and its tabs | [Module designer](/build/module-designer) |
| Building from a paper form | [Module builder](/build/module-builder) |
| Storage columns | [Tables & data sets](/build/tables-and-datasets) |
| Forms and fields | [Forms](/build/forms) · [Field types](/build/field-types) |
| Conditional behaviour | [Rules & validations](/build/rules) |
| Where records go | [Workflows](/build/workflows) |
| Which columns the list offers | [Log page views](/build/log-page-views) |

**Deploying one** — [Module setup](/setup/)

**Working with records**

| Topic | Page |
| --- | --- |
| Finding records | [Record list](/work/record-list) · [Views](/work/views) |
| One record | [Record detail](/work/record-detail) · [Widgets](/work/record-widgets) |
| Moving one on | [Taking actions](/work/taking-actions) |
| Many at once | [Editing in the grid](/work/grid-editing) · [Import & export](/work/import-export) |
| What changed | [History](/work/history) |

## Two things that never change

::: warning The name and the kind are permanent
A module's **name** becomes its route and its key, and too much refers to it for
it to change. Its **kind** decides which screens it gets and cannot be switched
afterwards.

The **display name** can change freely.
:::

## Related

- [Modules & records](/concepts/modules-and-records) — the concept.
- [Module designer](/build/module-designer) — building one.
- [Module setup](/setup/) — deploying one.
