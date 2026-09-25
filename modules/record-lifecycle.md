---
description: "A record from creation to close, and every place it leaves a trace."
---

# The life of a record

One record, end to end — what happens at each stage and where it shows up. If
you only read one page about how Exto works, this is the one.

## The path

```
Created  →  Draft  →  Submitted  →  Reviewed  →  Completed
                                      ↑   ↓
                                   Returned
                                              ↘ Reopened / Revised
```

## 1. Created

Somebody presses **Add new** on the [record list](/work/record-list), or a
record is created from a [CX cell](/cx/completing-a-cell).

The record is stamped with its **context** — tenant, workspace or project —
from the [module's deployment](/setup/deploying). Where the workbench defines
[field mapping](/cx/designer), some fields arrive already filled.

It gets a **record number** from the module's pattern.

## 2. Draft

If the deployment has **Enable draft records** on, the record can be saved
without being submitted. It belongs to its creator and is visible to them and to
anyone with **View all records**.

::: warning Saving is not submitting
A saved draft has moved nowhere and notified nobody. This is the most common
reason a colleague cannot find something you finished.
:::

With drafts off, the record enters the workflow the moment it is created.

## 3. Submitted

**Submit** — or any workflow action — moves the record to the next step.

At that moment:

- The record takes the **status** that action stamps.
- The **step's assignees** become responsible. They are named per deployment in
  [module setup](/setup/step-assignees), not on the workflow canvas.
- It appears in their [My Tasks](/work/my-tasks).
- Notifications go out, unless disabled for that step.
- An entry is added to the record's **workflow instance**.

## 4. Reviewed

The assignees see the **form for their step** — which may show different fields
from the one used to create it. Each step points at its own form.

They act: **Approve**, **Reject**, **Return**. How many must act depends on the
step's **completion rule** — one, all, or a majority.

**Return** sends it backwards. A returned record visits the same step twice, and
[workflow progress](/work/workflow-progress) shows both visits rather than
merging them — which is how you spot one that has been round three times.

## 5. Completed

The record reaches a terminal step. It stops appearing in anyone's tasks and
becomes read-only.

From here two doors remain, both needing their own grant in
[module setup](/setup/access):

| | Does |
| --- | --- |
| **Reopen** | Puts the same record back in play, at a step chosen in setup. |
| **Revision** | Creates a new version, keeping the original intact. |

Use **reopen** when the record was simply not finished; **revision** when the
original must survive as evidence of what was signed.

## What the record accumulates

Alongside its field values, a record gathers:

| | Where it shows |
| --- | --- |
| **Comments** | The Comments widget, attributed to the action they accompanied |
| **Attachments** | The Attachments widget, and [Drive](/work/documents) |
| **Linked records** | Linked records, and System links for those a field created |
| **Workflow instance** | [Workflow progress](/work/workflow-progress) |
| **History** | [History](/work/history) — if the module has it enabled |

## Deleted, not gone

Deleting sends the record to the [recycle bin](/work/recycle-bin), where it can
be restored until its retention expires.

::: tip History is not the recycle bin
History records changes to a record that still exists. The recycle bin holds
records that do not.
:::

## Related

- [Taking actions](/work/taking-actions) — the buttons at each stage.
- [Workflows & versions](/concepts/workflows-and-versions) — why publishing
  never disturbs a record in flight.
