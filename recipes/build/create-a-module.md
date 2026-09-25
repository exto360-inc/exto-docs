---
description: "Creating a new type of record from scratch."
---

# How do I create a module?

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

A module is a type of thing you track — *Expenses*, *Inspections*, *Defects*. It
owns the fields its records hold, the forms that capture them, and the workflow
they move through.

## Steps

1. Open **Settings → Module designer**.
2. Choose **New module**.
3. Enter a **name** and a **display name**.
4. Pick a **kind** — standard, master data, or hierarchical master data.
5. Save.

## Result

An empty module exists. It has no fields, no form and no workflow yet — those
are the next three tabs.

::: warning The name is permanent
A module's name becomes its route and its key, and too much refers to it for it
to be changed later. The display name can change freely; the name cannot.
:::

## Next

1. **Table** — the columns records will store.
2. **Forms** — what people fill in.
3. **Workflows** — where records go after Submit.
4. Deploy it in [module setup](/setup/) and add it to the
   [menu](/menu/), or nobody will see it.

## Related

- [How do I turn a paper form into a digital one?](./from-paper-form)
- [How do I add a field to a form?](./add-a-field)
