---
description: "Reparenting an item in a tree-shaped master."
---

# How do I move an item to a different parent?

::: tip Who can do this
`hierarchical_master_data` with **edit**.
:::

In a hierarchical master, an item's parent is what puts it where it is. Moving
it means changing that parent.

## Steps

1. Open the hierarchical master.
2. Find the item — expand the tree, or search.
3. Edit it and change its **parent**.
4. Save.

## Result

The item moves, and **everything beneath it moves with it**. Its stored path
updates, and so does every descendant's.

::: warning Check what is underneath first
Moving a node with children relocates the whole branch. Expand it before you
move it.

An item cannot become its own descendant — the platform refuses a move that
would make a loop.
:::

## Related

- [How do I import master data from a spreadsheet?](./import-master-data)
