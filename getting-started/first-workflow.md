---
description: "Draw three steps, publish, and send a record through them."
---

# Your first workflow

A workflow is the path a record takes: the steps it rests at, the people
responsible at each one, and the actions that move it on. This page draws a
three-step approval and sends a record through it.

<Shot src="getting-started/first-workflow" alt="A three-step workflow on the canvas" pending
  caption="Start → Request → Review → End, with approve and reject leaving Review." />

## 1. Open the designer

Go to **Settings → Module designer**, open your module, and choose the
**Workflows** tab. A new module starts with no workflow, so choose **Create**.

A fresh canvas is seeded with **Start → Step 1 → End**. That is already a
valid workflow; you are going to grow it.

## 2. Draw the steps

Drag from the palette onto the canvas:

- **Start** — where records enter. Exactly one.
- **Step** — somewhere a record waits for a person. This is the only node type
  that a human works at.
- **Condition** — a branch the engine evaluates instantly.
- **End** — where records leave. You may have several.

Rename **Step 1** to *Request*, then add a second step called *Review*.

## 3. Connect them with actions

Drag from one node's handle to another. The line you draw **is** an action —
the button someone presses to move the record.

Give the line leaving *Request* the action `submit`, then draw two lines out
of *Review*: `approve` to **End**, and `reject` back to *Request*.

Each action carries:

| Setting | Meaning |
| --- | --- |
| **Label** | The button text people actually see. |
| **Status** | The status stamped on the record — `approve` sets *Approved*. |
| **Group** | Primary actions get buttons; secondary ones sit in a menu. |
| **Comments mandatory** | The action cannot be taken without a comment. |

The `reject` line going backwards is what makes this a loop, and loops are the
point: a record that is sent back visits *Request* a second time, and
[Workflow progress](/work/workflow-progress) shows both visits rather than
collapsing them.

<Clip src="getting-started/draw-and-publish" pending
  caption="Adding a step, drawing two actions, and publishing · 30s" />

## 4. Attach a form to each step

Select a step and pick its **form** in the properties panel. That is the form
people see while the record sits there — which is how the same record can show
three fields at *Request* and twelve at *Review*.

## 5. Publish

Choose **Publish**. The designer validates first and refuses if the graph is
broken — an unreachable step, a step with no way out, or a missing name.

Publishing makes the version **read-only**. To change it later, use **Create
new version**; records already running on the old version keep following it.
See [Publishing & versions](/build/publishing).

## 6. Send a record through

Open your module, create a record, fill the form, and press **Submit**. The
record moves to *Review* and appears in the reviewer's
[My tasks](/work/my-tasks).

Open the record's **Workflow** widget to watch where it is, and its
[history](/work/history) to see how it got there.

## Next

- [Steps & actions](/build/steps-and-actions) — assignees, completion rules,
  turnaround targets.
- [Conditions](/build/conditions) — routing without a person.
- [Working in Exto](/work/) — the other side of the same workflow.

## Permissions

Designing and publishing a workflow happens under **Settings** and requires
the <Perm role="PME" /> application role.

Assigning people to its steps is separate, done per deployment in
[module setup](/admin/settings) — and *taking* an action on a record is
separate again, decided by whether you are one of that step's assignees.
