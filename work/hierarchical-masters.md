---
description: "Tree-shaped reference data: children, reparenting and hierarchy imports."
---

# Hierarchical masters

Reference data shaped as a **tree** — org structures, work breakdowns, cost-code
hierarchies. It behaves like [master data](/work/masters) with one difference
that changes everything: each row knows its parent.

<Shot src="work/hierarchical-master" alt="A hierarchical master" pending
  caption="The tree, part-expanded, with a child being added under its parent." />

## The tree

A hierarchical master opens at `/hierarchical-master/:moduleName`. Instead of a
flat list you get an expandable tree, with each row indented beneath its parent.

Three system fields hold the structure, and they are managed for you:

| Field | Holds |
| --- | --- |
| `sys_rowID` | The row's own identifier. |
| `sys_parentRowID` | Its parent's identifier. **This is what creates the hierarchy.** |
| `sys_path` | The full path from the root, as `parent/child/grandchild`. |

You never edit these directly. Adding a child fills them in; moving a node
rewrites them.

::: tip The record number column disappears in tree mode
The tree's own grouping column already identifies each row, so the record number
would be redundant. It returns if you group by a field instead.
:::

## Adding rows

**Add a root row** appends at the top level, with no parent.

**Add a child** requires a parent to be selected first. The new row inherits its
parent's path, and its parent reference is filled in — which is why adding a
child from the wrong selection is the usual way people put a node in the wrong
place.

## Editing

Inline editing works exactly as it does for [master data](/work/masters): typed
editors per field, edits accumulating across rows, one save. Fill operations and
the warning-versus-error distinction behave identically.

What differs is that **child rows are edited through their parent's context**, so
a bulk edit applied to a parent does not silently rewrite the rows beneath it.

## Restructuring

- **Expand and collapse** nodes to navigate.
- **Reparent** by moving a node under a different parent — its path and every
  descendant's path is rewritten.
- **Reorder** siblings within their parent.

::: warning Deleting a node affects everything under it
Removing a parent takes its subtree with it. Check for descendants before
deleting a branch — the rows beneath lose their place in the tree, and anything
referencing them loses its value.
:::

## Importing a hierarchy

The tree is built in a spreadsheet using **parent references**: each row names
its parent, and the import resolves them into the structure.

This is the only practical way to load a real hierarchy. Building a
thousand-node work breakdown by clicking *add child* is not a plan.

A failed import produces an error report naming the row and the reason — most
often a parent reference that does not resolve, or a cycle.

## Finding things

Search, column filters and sorting work as elsewhere. **Group by level** flattens
the tree into tiers when you want to see everything at one depth rather than
one branch.

## How records use it

Records reach a hierarchical master through **auto-complete** fields and
**linked records**, the same as a flat master. The tree matters for maintaining
the data; a record just points at one node.

## Permissions

Governed by the `hierarchical_master_data` submodule with separate **view**,
**create**, **edit** and **delete** grants at workspace or project level.

Because a single reparent can move an entire subtree, edit access here is worth
granting more narrowly than on a flat master.

## Related

- [Master data](/work/masters) — the flat equivalent, and the grid behaviour
  they share.
- [Masters](/concepts/masters) — choosing between the kinds.
