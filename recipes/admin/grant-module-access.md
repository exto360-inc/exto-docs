---
description: "Letting somebody into a module they cannot currently see."
---

# How do I give someone access to a module?

::: tip Who can do this
`Project setting` **and** `Edit project groups`, held in the same context.
:::

Access is granted through **groups**, never to individuals. You put the person
in a group, and grant the group the module.

## Steps

1. Open the project (or workspace) and go to its **Groups** tab.
2. Open the group they should be in — or create one.
3. Grant the module under **core modules**.
4. Add the person to the group under its members.
5. Save.

## Result

The module appears in their sidebar, and they can open its records. What they
see inside it depends on **View all records** — without it they see only records
their workflow step makes theirs.

::: warning Never use PME for this
`PME` is an application role that opens the whole of **Settings** — every module
designer, every menu, every report definition in the tenant. It is not the
answer to "they cannot see a module".
:::

## Related

- [How do I find out why someone can't see something?](./diagnose-access)
- [How do I let someone see every record, not just theirs?](./view-all-records)
