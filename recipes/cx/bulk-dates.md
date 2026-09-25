---
description: "Using the bulk grid instead of editing assets one at a time."
---

# How do I enter dates for many assets at once?

::: tip Who can do this
The project's grants on the workbench.
:::

Editing anchors one asset at a time does not scale past a few dozen. The
**Dates** tab lists every *(asset × anchor stage)* pair in the workbench in one
grid.

## Steps

1. Open the workbench and go to the **Dates** tab.
2. Search by asset id, asset name or stage name — search runs on the server, so
   it covers rows not yet loaded.
3. Type forecast start and end dates directly into the grid.
4. Keep going across pages — edits are tracked, and the count of unsaved changes
   is shown.
5. Press **Save** once.

## Result

Every edit is written in one batched call, and each one triggers the same
cascade as editing that stage individually.

Dates can also be **imported from a spreadsheet** rather than typed, and an
**external id** can be set per row for reconciling against another scheduling
system.

::: tip Only anchors appear here
The grid lists anchor stages — the ones that accept manual dates. Everything
else is computed, so there would be nothing to type.
:::

## Related

- [How do I set the dates for a stage?](./set-stage-dates)
