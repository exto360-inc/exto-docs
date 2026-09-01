---
description: "Working down the layers to the one actually blocking someone."
---

# Recipe: diagnosing "I can't see it"

Someone says a record, a module or a whole area has disappeared. Five systems
can cause that and they all look identical from the outside. Work down this
list in order — it is ordered by how often each one is the answer.

## 0. Which tenant are they in?

Before anything else. A [tenant](/account/tenants) is fully isolated, and being
in the wrong one looks exactly like a permissions problem.

Ask them to read the tenant name back to you rather than confirming they are in
the right one.

## 1. Is it a draft?

If a *specific record* is missing and its author can see it, it is almost
certainly a draft. **Save** does not submit.

Ask the author to open it and check whether it has ever left the first step.

## 1b. Is it Settings they cannot reach?

If what is missing is an **administrative** screen — the module designer, menu
setup, report setup, the CX workbench editor — stop here. All of Settings is
gated by one thing: the user's **application role** must be `PME`.

No group grant substitutes for it, and there is no per-page permission inside
Settings. Either they can open all of it or none of it.

## 2. Can they open the module at all?

- **No module in the menu** → either no [menu entry](/admin/menu) points at it,
  or they have no [group grant](/admin/groups) for it. Check the menu first;
  it is the more common oversight.
- **Module opens, list is empty** → go to step 3.

::: tip A menu entry is not a grant
An entry makes something findable. The grant makes it permitted. Missing either
one produces "I can't see it".
:::

## 3. Can they see the list but not the record?

This is **View all records** in [module setup](/admin/settings).

Without it, people see the records their workflow step makes theirs — which is
usually correct and is the single most common cause of a record "disappearing"
after it moves on.

Decide whether they should have the grant, rather than reflexively adding it.

## 4. Can they see it but not act on it?

Open the record's **Workflow** widget. It names the current step and the users
and groups responsible for it.

- **Not on the list** → the step's assignees, set per deployment in module
  setup, do not include them.
- **On the list but the record already moved** → the step's completion rule is
  **One**, and a colleague acted first. See
  [Taking actions](/work/taking-actions).

## 5. Can they act but not reopen or revise?

Those are separate owners in module setup, and they only work if the module's
**Reopen** and **Revision** switches are on in the
[designer](/build/module-designer).

A missing switch is a designer change and then a new setup — it is not a
permission you can grant your way out of.

## 6. Is it a CX stage?

The [CX workbench](/cx/completing-a-cell) has its own layer: **view**, **edit** and
**reopen** per stage, per project group.

A stage with **no configuration at all** is treated as inaccessible — implicit
deny. A brand-new stage that nobody can see has usually just never been
granted.

## 7. Was it deleted?

Check the [recycle bin](/work/recycle-bin). The **time machine** rewinds the
bin to a chosen number of days ago, which is how you find something when you
know roughly when it vanished but not what it was called.

## Summary

| Symptom | Layer |
| --- | --- |
| Nothing anywhere | Wrong tenant |
| No Settings at all | Application role is not `PME` |
| One record, only its author sees it | It is a draft |
| No module in the menu | Menu entry, or group grant |
| Empty list | View all records |
| Visible, no buttons | Step assignees |
| Buttons but no reopen | Module setup owners, or the module switch |
| CX stage invisible | Stage configuration — implicit deny |
| Was there yesterday | Recycle bin |

## Related

- [Permissions](/concepts/permissions) — how the layers combine.
