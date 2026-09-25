---
description: "Reading the error report and getting the rejected rows in."
---

# How do I fix an import that failed?

::: tip Who can do this
Whoever ran the import.
:::

A failed import names its reasons per row. Nothing is guessed at and nothing is
half-written.

## Steps

1. Open the import's **error report**.
2. Work down the list — each entry names a row and what was wrong with it.
3. Fix those rows in your spreadsheet.
4. Re-import.

## Result

The corrected rows go in. Here is what the common reasons actually mean:

| Reason | Fix |
| --- | --- |
| A required field is empty | Fill it, or check your template is current. |
| A value is not in the option list | Match the [data set](/build/tables-and-datasets) exactly — spelling and case. |
| A lookup does not resolve | The master row it points at does not exist yet. Load that master first. |
| A rule rejected the row | See [Rules](/build/rules) — the module is enforcing something. |
| A parent reference does not resolve | Hierarchies only — the named parent is missing or creates a loop. |

::: tip An import that appears to have done nothing
Large imports run as background jobs. Check [job status](/work/recycle-bin) —
a failed job has a reason attached and can be retried there.
:::

## Related

- [How do I import master data from a spreadsheet?](./import-master-data)
