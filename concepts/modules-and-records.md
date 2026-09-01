---
description: "A module is a type of thing; a record is one of them."
---

# Modules & records

A **module** is a configurable container for a type of data — *Expenses*,
*Vendors*, *Issues*. A **record** is one entry in it. Everything else in Exto
hangs off this pair.

## Module

A module owns the fields its records hold, the forms that capture them, an
optional workflow they move through, and the permissions that govern all of it.

| Property | What it is |
| --- | --- |
| **Name** | The machine identifier used in routes (`/mod/expenses`). Fixed at creation. |
| **Display name** | The human label. Changeable. |
| **Kind** | Standard, master data, or hierarchical master data. |
| **Workflow type** | `WORKFLOW`, `TRANSACTIONAL`, `COMMISSIONING` or `CYCLE_COUNT`. |
| **Record number pattern** | The shape of generated record numbers, e.g. `EXP-{SEQ}`. |
| **Reopen** | Whether completed records can return to an earlier step. |
| **Revision** | Whether records can be versioned. |

**Reopen** and **Revision** are module-level switches. [Module
setup](/admin/settings) can only assign owners for them once they are on.

### Kinds

The **kind** decides which screens a module gets, not how it stores data:

- **Standard** — records at `/mod/:moduleName`, with workflow and forms.
- **Master data** — a flat lookup list at `/master-records/:moduleName`.
- **Hierarchical master data** — a tree at `/hierarchical-master/:moduleName`.

Masters are modules, designed with the same form designer and governed by the
same groups. See [Masters](/concepts/masters).

## Record

A record is one entry in a module. Beyond its field values it carries:

- A **record number**, generated from the module's pattern.
- A **status**, reflecting where it is in its workflow.
- A **workflow instance** — the log of every step it has visited.
- **Documents**, **comments**, **linked records** and **history**.
- A **context** — the tenant, workspace or project it belongs to.

### The lifecycle

```
New → Draft → in workflow → Completed
                   ↑              │
                   └── Reopened ──┘   (when the module allows it)
```

- **Draft** — saved, not submitted. Nothing has moved.
- **Submit** takes a workflow action, advances the record, and notifies whoever
  is responsible next.
- **Reopen** returns a completed record to a step chosen in module setup.
- **Revision** creates a new version of the record, optionally copying its
  documents.

::: warning Save ≠ Submit
Saving keeps a record exactly where it is. Only an action moves it. A record
nobody else can find is usually a draft that was never submitted.
:::

## Linked records

Records reference records in other modules. A link is either **explicit** —
someone created it from the Linked Records widget — or **implicit**, inferred
by the platform from a field that points at another module. Links stay live:
open one and you navigate to the record itself.

## Reserved fields

Some field names are managed by the platform and can never be user-editable:
`_id`, `recordNumber`, `createdAt`, `updatedAt`, `createdBy`, `updatedBy`,
`status`, and the workflow flags. The form designer places them read-only when
they appear on a form — a required toggle on one would describe an input that
can never be typed into.

## Related

- [Forms](/build/forms) — designing what a record looks like.
- [Record detail](/work/record-detail) — working with one.
- [Workflows & versions](/concepts/workflows-and-versions) — where it goes.
