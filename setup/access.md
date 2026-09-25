---
description: "Module owner, View all records, drafts, revision and reopen."
---

# Access and owners

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

The **Access** section of a setup decides *"who owns, views, and manages records
in this module"* — for this deployment only.

## The settings

| Setting | Gives |
| --- | --- |
| **Module owner** | Groups or users who own this deployment's records. |
| **Enable draft records** | Whether records can be saved before being submitted. |
| **View all records** | Who sees every record, regardless of workflow step. |
| **Revision owner** | Who may request a revision of a completed record. |
| **Reopen owner** | Who may reopen a completed record. |
| **Reopen step name** | Which step a reopened record returns to. |

Each owner field takes **groups or users**. Prefer groups — a group is one thing
to audit and one thing to change when someone joins.

## View all records is the one that matters most

Without it, people see only the records their **workflow step** makes theirs.
With it, they see everything in this deployment.

::: tip The default is usually right
Most people should see their own work. Granting View all records broadly turns a
focused task list into a firehose, and it is the usual reason somebody says
"there are thousands of records and I cannot find mine".
:::

It is also the first thing to check when a module opens but the list is empty.
See [Diagnosing "I can't see it"](/recipes/cant-see-it).

## Reopen needs two things

**Reopen owner** names who may do it. **Reopen step name** decides where the
record lands — and it is not necessarily the step it finished on.

::: warning No Reopen button has three possible causes
1. Reopening is switched off for the **module**, in the
   [designer](/build/module-designer).
2. The person is not a **Reopen owner** here.
3. The record is not actually complete.

They need different people to fix, which is why the button's absence is
ambiguous on its own.
:::

Revision works the same way: the module must enable it, and this section names
who may use it.

## Drafts

**Enable draft records** decides whether a record can exist before it is
submitted. With it off, a record enters the workflow the moment it is created —
there is no saving it for later.

## Notifications

**Disable default notifications** silences this deployment's standard
notifications. Per-step notification settings live in
[Workflow step assignees](/setup/step-assignees).

## Related

- [Workflow step assignees](/setup/step-assignees)
- [Permissions](/concepts/permissions) — where this sits among the four layers.
