---
description: "Versioned, approved questionnaires embedded in forms and stages."
---

# Checklists

A checklist is a reusable, version-controlled questionnaire that renders inside
a form or a [CX stage](/cx/). Unlike other masters it is not stored as flat
records — it is a definition that gets embedded where it is used.

<Shot src="build/checklists" alt="The checklists tab" pending
  caption="The checklists this module points at, with the version each record resolves." />

## Tenant-wide and versioned

Checklists live at tenant level, not inside a module. Every version of a
checklist shares one logical **ID**, and each version carries its own number
and status.

```
Draft → Under review → Approved
```

A record always resolves the **highest approved version**. A new version can
only be created from an approved one.

Three consequences follow, and they are what the module designer's
**Checklists** tab exists to show:

- The version a record resolves is not the version you last edited — it is the
  newest approved one.
- Editing a draft changes nothing for anybody until it is approved.
- Approving a new version changes what *new* records pick up, everywhere the
  checklist is used, in every module.

## Creating one

Checklists are created at **Settings → Checklist master → New**. A checklist has
an ID and a list of items.

## Items

Each item carries:

| Setting | What it does |
| --- | --- |
| **Description** | The question or instruction. |
| **UI type** | Single-select, multi-select, text, checkbox, date, numeric… |
| **Options** | The choices, for select types. |
| **Mandatory rule** | `NEVER`, `ALWAYS`, `WHEN_VALUE_IS`, or `LAST_STEP`. |
| **Notes** | An optional note field, with its own mandatory rule. |
| **Attachments** | Required files, with their own mandatory rule. |
| **Linked modules** | Requires related records from another module. |
| **Out of scope** | Lets the item be marked not applicable, with a custom label. |
| **Sub-items** | Nested items, for grouped checklists. |

### Mandatory rules

`WHEN_VALUE_IS` makes an item required only when another answer takes a
particular value — the checklist's own conditional logic, evaluated at runtime
against the record around it.

`LAST_STEP` requires the item only when the record reaches its final workflow
step, which is how you let people work through a checklist progressively
without blocking every save.

## Using one

In the [form designer](/build/forms), add a **Checklist** field and point it at
a checklist ID. At runtime the checklist renders inside the record.

The module designer's **Checklists** tab lists the checklists this module
points at alongside every other one in the tenant, with the version each
resolves — so you can see what your module actually uses without opening each
form.

Checklists also appear inside CX stages; see [Designing a
workbench](/cx/designer).

## Progress

When a CX stage has a checklist, the stage's progress comes from the
checklist's pass/fail counts rather than being binary. A stage without one is
0% or 100% by status. See [Completing a cell](/cx/completing-a-cell).

## Permissions

Pointing a module at a checklist, and creating, editing or approving checklist
versions, both happen under **Settings** and require <Perm role="PME" />.

Answering a checklist at runtime requires only access to the record or
[CX cell](/cx/completing-a-cell) it renders in.
