---
description: "A two-stage approval that routes small items past the second stage."
---

# Recipe: an approval workflow

Build a two-stage approval where small items skip the second stage. About
thirty minutes.

**You will touch:** [module designer](/build/module-designer) ·
[forms](/build/forms) · [workflows](/build/workflows) ·
[conditions](/build/conditions) · [module setup](/admin/settings) ·
[menu](/admin/menu)

## 1. The module

**Settings → Module designer → New module.**

- Name it. The name is permanent — it becomes the route.
- Workflow type: `WORKFLOW`.
- Record number pattern: something readable, e.g. `EXP-{SEQ}`.
- Turn **Reopen** on. You will want it eventually, and it cannot be assigned an
  owner later unless it is on now.

## 2. Two forms, not one

Create a **Request** form with the fields a requester fills, and a **Review**
form that adds the reviewer's fields.

This is the step most people skip, and it is what makes the workflow feel
designed rather than generic — the requester never sees the approval fields,
and the reviewer sees everything at once.

## 3. The workflow

**Workflows → Create.** Draw:

<DDecision
  start="Start"
  step="Request"
  stepEdge="submit"
  question="amount ≥ limit?"
  yesEdge="yes"
  review="Review"
  reviewEdge="approve"
  end="End"
  noEdge="no"
  rejectEdge="reject"
  joinEnd="End" />

- **Request** — attach the Request form.
- The **condition** — expression on the amount field. Draw both branches.
- **Review** — attach the Review form, completion rule **One**.
- Actions out of Review: `approve` to End, `reject` to End, and a `RETURN`
  back to Request so rework is possible.

Leave **comments mandatory** on for `reject` and `RETURN`. An approval with no
comment is a decision nobody can reconstruct later.

## 4. Publish

**Publish.** Validation refuses an unreachable step or a step with no way out —
usually the condition's second branch, which is easy to forget.

## 5. Deploy it

**Settings → Module setup → Import module.**

- Pick the **context** — project level for transactional work.
- Assign **step assignees**: the requesters group on Request, the approvers
  group on Review.
- Grant **View all records** to whoever needs to see the whole set; leave it
  off for everyone else so people see their own work.

## 6. Put it in the menu

**Settings → Menu setup.** Add an item pointing at the module. Without this,
nobody finds it.

## 7. Test it as a user

Raise a record under the limit and confirm it finishes without reaching Review.
Raise one over and confirm it lands in the approver's
[My tasks](/work/my-tasks). Return it and check
[workflow progress](/work/workflow-progress) shows **two** visits to Request.

## What to change later

Not the workflow — [create a new version](/build/publishing). Records already
running keep following the old one, which is the point.
