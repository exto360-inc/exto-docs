---
description: "Shared reference data that everything else points at."
---

# Masters

**Masters** are reusable reference data that other records point at, so the
same value means the same thing everywhere. Exto has five kinds, each suited to
a different shape of data.

| Master | Shape | Use it for |
| --- | --- | --- |
| **Master records** | Flat list | Lookup tables — vendors, equipment types, cost codes. |
| **Hierarchical masters** | Tree | Structured levels — org charts, work breakdowns. |
| **Checklist masters** | Versioned questionnaire | Approved checklists embedded in forms. |
| **Tags** | Tenant-level labels | Lightweight grouping. |
| **Categories** | Tenant-level name + description | Structured classification. |

## Masters are modules

Master records and hierarchical masters are ordinary modules with a master
**kind**. They are designed with the same [form designer](/build/forms),
governed by the same [group permissions](/concepts/permissions), and appear in
the same grids — they simply get a different screen and a different route.

Tags and categories are not modules. They are simple tenant-level lists.

## Master records

A flat list of reference values, at `/master-records/:moduleName`. Create,
edit and delete inline in the grid or through the detail panel; import in bulk
and export to CSV.

Governed by the `master_data` submodule (view / create / edit / delete).

## Hierarchical masters

The same thing with parent-child structure, at
`/hierarchical-master/:moduleName`. Each row carries system fields that place
it in the tree:

- `sys_rowID` — the row's own id.
- `sys_parentRowID` — its parent. This is what creates the hierarchy.
- `sys_path` — the full path from the root.

Those fields are managed for you. Expand and collapse to navigate, drag a node
onto a different parent to reparent, and import a whole hierarchy from Excel
using parent references.

Governed by the `hierarchical_master_data` submodule.

::: warning Deleting a parent affects its children
Check for descendants before removing a branch.
:::

## Checklist masters

A checklist is a reusable, version-controlled questionnaire — not a flat
record, but a definition that gets embedded into forms and CX stages.

Checklists are **tenant-wide** and versioned: documents sharing a logical ID,
each with its own version and status, moving through
`Draft → Under review → Approved`. A record always resolves the highest
**Approved** version, and a new version can only be created from an approved
one.

See [Checklists](/build/checklists).

## Tags & categories

Both are tenant-level, so a change affects every workspace and project.

- A **tag** is just a name. Create, rename, delete, search, and bulk-import
  from Excel with a `tagName` column.
- A **category** has a name and an optional description. Import and export via
  Excel with both columns.

Apply either to records through a tag or category field on the form.

## How records reach masters

- **Auto-complete** fields — search and pick a master value.
- **Select from table** / **Multi-select table** — pick one or many records.
- **Linked records** — relate a record to a master from the sidebar.

## Related

- [Master data](/work/masters) — maintaining a flat master day to day.
- [Hierarchical masters](/work/hierarchical-masters) — maintaining a tree.
- [Tables & data sets](/build/tables-and-datasets) — the other source of
  option lists.
