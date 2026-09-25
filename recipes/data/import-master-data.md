---
description: "Loading many rows at once, and reading the result."
---

# How do I import master data from a spreadsheet?

::: tip Who can do this
**create**, and **edit** where the import updates existing rows.
:::

For more than a handful of rows, import beats typing — and unlike pasting into
the grid, it validates the whole file before writing anything.

## Steps

1. Open the master.
2. **Download the template.** It carries the correct columns and headers.
3. Fill it in.
4. Choose **Import** and select your file.
5. Read the report.

## Result

Valid rows are created. If some failed, the report names **each rejected row and
why** — two thousand rows with three bad ones tells you which three.

Fix those rows and re-import. Rows that succeeded are already in, so check
whether the module treats a repeat as an update or a duplicate before
re-importing the whole file.

::: warning Use the current template
A file assembled by hand, or a template downloaded before a field was added, is
the most common cause of an import that rejects everything.
:::

## Related

- [How do I fix an import that failed?](./fix-a-failed-import)
- [How do I add a row to a master list?](./add-master-row)
