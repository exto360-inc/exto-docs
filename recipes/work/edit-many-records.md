---
description: "Correcting a column across many rows without opening each record."
---

# How do I edit lots of records without opening each one?

::: tip Who can do this
The same access as editing the record itself — and the record must be on your
step.
:::

Cells can be edited directly in the grid. For correcting one column across forty
rows this is the difference between a minute and an afternoon.

## Steps

1. Open the [record list](/work/record-list) and filter to the rows you want.
2. Click a cell and edit it. The editor matches the field type.
3. Keep going — edits accumulate across rows, and changed cells stay marked.
4. To repeat a value, drag a cell's fill handle down the rows beneath it.
5. Press **Save** once when you are done.

## Result

Everything is saved together, and the module's [rules](/build/rules) run. A
**warning** can be overridden; an **error** blocks the save and the offending
cells are marked — hover one for the reason.

An inline edit is a real edit: rules run, external services fire, and the change
lands in [history](/work/history).

::: warning Editing is not submitting
Changing cells does not move any record. And a record sitting on somebody else's
step is read-only in the grid, exactly as it is on the record.
:::

Some field types refuse fill on purpose — formula and auto-populate would be
overwritten on the next save, and sensitive, signature and record-number fields
are per record by definition.

## Related

- [How do I import master data from a spreadsheet?](../data/import-master-data)
- [How do I export what I'm looking at?](./export-a-grid)
