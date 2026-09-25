---
description: "Letting somebody see a module's records beyond their own."
---

# How do I let someone see every record, not just theirs?

::: tip Who can do this
`Module setup` on your groups.
:::

By default people see the records their workflow step makes theirs. **View all
records** lifts that.

## Steps

1. Open **Settings → Module setup** and find the module's deployment.
2. Open its **owners and grants**.
3. Add the person or group to **View all records**.
4. Save.

## Result

They see every record in that module, at that deployment's level, regardless of
workflow step.

::: tip The default is usually right
Most people should see their own work. Granting View all records broadly turns a
focused task list into a firehose — and it is the usual reason somebody says
"there are thousands of records and I can't find mine".
:::

Two related grants live in the same place: **Revision owner** and **Reopen
owner**, which control who may revise or reopen completed records.

## Related

- [How do I find out why someone can't see something?](./diagnose-access)
- [How do I reopen a record that was already finished?](../work/reopen-a-record)
