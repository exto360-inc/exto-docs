---
description: "Forms per step, completion rules, and what an action carries."
---

# Steps & actions

A **step** is where a record waits for a person. An **action** is the line
leaving it — the button someone presses. Between them they are the whole of a
workflow's behaviour; the canvas is just how you draw it.

<Shot src="build/step-properties" alt="A step selected on the canvas" pending
  caption="A step and its properties — form, completion rule, and confirmation." />

## Steps

Select a step on the canvas to edit it.

| Setting | What it does |
| --- | --- |
| **Name** | Identifies the step. Appears on the record and in history. |
| **Form** | The form shown while the record sits here. |
| **Completion rule** | How many assignees must act: `One`, `All` or `Majority`. |
| **Confirm before submit** | Asks for confirmation before the action goes through. |

### The form is per step

This is the setting people miss. Attaching a different form to each step is
how one record shows three fields to a requester and twelve to a reviewer,
without any rules at all.

### Completion rules

| Rule | Behaviour |
| --- | --- |
| **One** | The first assignee to act moves the record. It leaves everyone else's [My tasks](/work/my-tasks). |
| **All** | Every assignee must act before the record moves. |
| **Majority** | More than half must act. |

**One** is the right default for a queue; **All** is for sign-offs where every
name genuinely has to appear.

### Assignees

Who is responsible for a step is not set on the canvas — it is set per
deployment in [module setup](/admin/settings), because the same published
workflow serves several projects with different people in them. Module setup
also controls the step's notifications.

### Start and end

**Start** and **End** are terminal nodes and carry no settings. A workflow has
exactly one Start and may have several Ends; every End means the same thing —
the record is finished.

## Actions

Every line you draw between two nodes is an action.

| Setting | What it does |
| --- | --- |
| **Name** | The action's identifier — `submit`, `approve`, `reject`, `RETURN`, `WITHDRAW`, or your own. |
| **Label** | The button text people actually see. |
| **Status** | The status stamped on the record when it is taken. |
| **Group** | `primary` gets a button; `secondary` sits in the overflow menu. |
| **Type** | System (native) or custom. |

### Default statuses

Unless you set one, an action stamps a status from its name:

| Action | Status |
| --- | --- |
| `approve` | Approved |
| `reject` | Rejected |
| `submit` | Under review |
| `RETURN` | Under review |
| anything else | Under review |

### Action settings

| Setting | Effect |
| --- | --- |
| **Comments mandatory** | The action cannot be taken without a comment. On by default. |
| **Change assignees** | The person acting picks who the next step goes to. |
| **Restrict assignees** | Narrows the next step's assignee list. |
| **Stay on same page** | Keeps the user on the record afterwards instead of returning to the list. |
| **External service** | Calls an [external service](/integrations/external-services) as part of the action. |

**Comments mandatory** defaults to on for a reason: an approval with no
comment is a decision nobody can reconstruct six months later.

## Loops

An action may point backwards. A `RETURN` from *Review* to *Request* is what
makes rework possible, and it is the normal shape of an approval workflow.

A returned record visits the step a second time, and
[workflow progress](/work/workflow-progress) shows both visits rather than
collapsing them.

## Permissions

Editing steps and actions requires <Perm role="PME" />, the application role
that opens **Settings**.

A published version is read-only to everyone, PME included — see
[Publishing & versions](/build/publishing).

Who a step is *assigned to* is a separate decision, made per deployment in
[module setup](/admin/settings) rather than on the canvas.
