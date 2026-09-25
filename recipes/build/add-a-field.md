---
description: "Putting a new field on a form."
---

# How do I add a field to a form?

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

## Steps

1. Open **Settings → Module designer → Forms** and open the form.
2. Drag a field type from the **palette** onto the canvas.
3. Select it and set its **label** — the name is generated from it.
4. Set **help text**, **mandatory** and **read only** as needed.
5. Save.

## Result

The field is live **immediately**, for everyone, on every record using that
form. Forms are the one thing in Exto that does not need publishing.

::: tip Dragging an existing column binds to it
The palette creates a **new** column. Dragging a column that already exists
binds the field to it instead — which is how two forms show the same data.
:::

## Choosing a type

| You want | Use |
| --- | --- |
| A short fixed list | **Select** with a data set |
| Real entities users maintain | **Auto-complete** against a [master](/concepts/masters) |
| A value another system owns | **Auto populate** |
| A number derived from other fields | **Formula** |
| Rows of repeating data | **Table** |

See [Field types](/build/field-types) for all of them.

## Related

- [How do I make a field required only sometimes?](./conditional-field)
- [How do I stop a record being submitted with bad data?](./add-a-validation)
