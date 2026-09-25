---
description: "Loading an asset register, hierarchy and all."
---

# How do I import a whole asset register?

::: tip Who can do this
The project's grants on the workbench.
:::

Registries are rarely built by hand. Import creates many assets at once, using
parent references to express the tree.

## Steps

1. Open the workbench's **asset registry**.
2. Download the import template.
3. Fill it in, naming each asset's **parent** to build the hierarchy.
4. Import, and read the report.

## Result

Assets are created and provisioned against their stage templates, so the matrix
fills in. Rejected rows are named individually with reasons.

Import is also the normal way to **update** a large registry — the same file
with changed values, re-imported.

::: warning Parent references must resolve
A parent that does not exist, or a reference that creates a loop, is reported
per row. Load parents before children, or include both in the same file.
:::

## Related

- [How do I add an asset to a workbench?](./add-an-asset)
- [How do I enter dates for many assets at once?](./bulk-dates)
