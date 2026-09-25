---
description: "Adding a row to a shared lookup list."
---

# How do I add a row to a master list?

::: tip Who can do this
`master_data` with **create**, at the level the master is deployed to.
:::

Masters are the shared lists other records point at — vendors, equipment types,
cost codes. They have no workflow: a row is either there or it is not.

## Steps

1. Open the master from the sidebar.
2. Click into the empty row at the bottom of the grid, or choose **Add row**.
3. Fill the cells. Each editor matches its field type.
4. Press **Save**.

## Result

The row is live immediately, and appears in every auto-complete and dropdown
that points at this master — including on records already open elsewhere, next
time they load their options.

::: warning Rules still run
A **warning** can be overridden; an **error** blocks the save. Failing cells are
marked inline — hover one for the reason.
:::

## Related

- [How do I import master data from a spreadsheet?](./import-master-data)
- [How do I move an item to a different parent?](./move-in-hierarchy)
