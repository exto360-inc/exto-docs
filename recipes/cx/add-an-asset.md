---
description: "Putting a new asset into a workbench and giving it its stages."
---

# How do I add an asset to a workbench?

::: tip Who can do this
The project's grants on the workbench.
:::

Adding an asset to the registry is what creates its row of cells in the
[matrix](/cx/matrix). Until it is there, there is nothing to commission.

## Steps

1. Open the workbench and go to the **asset registry**.
2. Select a parent first if the new asset belongs under one — it inherits the
   parent automatically.
3. Choose **Add asset**.
4. Enter the **Asset ID** — required, and it cannot be changed later.
5. Fill in name, description, type and any custom fields.
6. Choose a **published stage template**. This decides which stages the asset
   gets.
7. Save.

## Result

The asset appears as a row in the matrix, with one cell per stage from the
template you chose. Its progress rolls up into its parent.

::: warning The Asset ID is permanent
Gates and predecessors reference assets internally, so they survive a rename —
but reports, imports and anything outside Exto will not. Get it right at
creation.
:::

## Related

- [How do I import a whole asset register?](./import-assets)
- [How do I set the dates for a stage?](./set-stage-dates)
