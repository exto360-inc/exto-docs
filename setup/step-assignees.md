---
description: "Naming who each workflow step goes to, per deployment."
---

# Workflow step assignees

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

The **Workflow Steps** section *"assigns groups or users to each workflow step
and configures notification preferences"*.

This is where a published workflow meets real people.

## Why it is here and not on the canvas

A workflow is designed once and deployed many times. The same approval path runs
in five projects with five different sets of approvers.

So the **canvas** defines the shape — steps, actions, conditions — and the
**setup** names who staffs it. Publishing a new workflow version never disturbs
your assignees.

## What each step row holds

| Column | Holds |
| --- | --- |
| **Name** | The step, from the published workflow. |
| **Versions** | Which workflow versions this row applies to. |
| **Groups & users** | Who is responsible for the step. |
| **Disable notif.** | Silence notifications for this step. |
| **Notify submitted** | Notify when a record arrives at this step. |

## What assignees actually control

Being on a step is what makes a record **yours**:

- It appears in your [My Tasks](/work/my-tasks).
- You receive its notifications.
- You are the only one who can take its [actions](/work/taking-actions).

Someone who can open a record but has no buttons is looking at a step they are
not assigned to. That is the single most common "why can't I approve this".

## Versions

A step row names the **versions** it applies to, so a deployment running several
workflow versions at once can staff them differently. Records already in flight
keep following the version they started on — see
[Publishing & versions](/build/publishing).

## Completion rules are not here

How *many* assignees must act — one, all, or a majority — is part of the
**step**, set on the workflow canvas. This section decides *who*, not *how
many*. See [Steps & actions](/build/steps-and-actions).

## Related

- [Access and owners](/setup/access)
- [Taking actions](/work/taking-actions) — the other end of this.
