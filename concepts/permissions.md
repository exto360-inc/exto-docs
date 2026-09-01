---
description: "The four layers that decide access, and how to tell which one is blocking you."
---

# Permissions

Access in Exto is decided by **four independent systems**, layered on top of
each other. A refusal from any one of them looks identical from the outside, so
knowing which is which is most of the work of diagnosing a problem.

## The four layers

| Layer | Set on | Answers |
| --- | --- | --- |
| **Application role** | The user account | Can I reach administrative screens at all? |
| **Group grants** | Workspace or project groups | Can I open this module? |
| **Module setup** | The module's deployment | Which records can I see, and may I revise or reopen? |
| **Workflow step** | The published workflow's steps | Is *this* record mine to act on now? |

The CX workbench adds a fifth of its own, covered at the end.

## Layer 1 — the application role

Every user account carries exactly one **application role**:

| Role | Means |
| --- | --- |
| `USER` | An ordinary user. |
| `PME` | May open **Settings** — the whole administrative area. |
| `SITE_ADMIN` | Bypasses scope restrictions. |
| `LITE_USER` | A restricted user. |

This is a property of the account, not something a group grants.

::: warning Settings is one gate, not many
The entire **Settings** area — module designer, module builder, menu setup,
report and dashboard setup, checklist master, tags, categories, webhooks, data
setup and the CX workbench editor — is gated by a single check: is the user's
application role `PME`?

There is no per-page permission inside Settings. Anyone who can open one of
those pages can open all of them. Granting PME to let somebody edit a menu also
lets them redesign every module in the tenant.
:::

`SITE_ADMIN` bypasses the scope checks that constrain everyone else — including
ones with no exception for creators. See [Photos](/work/photos) for a worked
example.

## Layer 2 — group grants

Everything that is *not* Settings is granted through **groups**, never to
individuals.

A group grants four actions — **view**, **create**, **edit**, **delete** — on
**submodules**, at a **level**:

| | |
| --- | --- |
| **Submodules** | `master_data`, `hierarchical_master_data`, `user`, `group`, `module_setup`, `page`, `dashboard_setup`, `workflow` |
| **Levels** | `TENANT`, `WORKSPACE`, `PROJECT` |

A user's effective access is the **union** of everything their tenant,
workspace and project groups grant. A module granted only at project level is
reachable in that project and nowhere else.

Groups may contain other groups, so a hierarchy can be built without
duplicating membership lists.

### What the sidebar shows is what you may open

The navigation is built from the same permission feed that authorises the URLs.
A module you cannot see in the menu is one you cannot reach by pasting its
address either — the guard checks the URL against that same list.

That guard is a convenience, though. The real boundary is the API refusing the
call, so nothing is protected *only* by the menu.

## Layer 3 — module setup

Group grants get you into a module. [Module setup](/admin/settings) decides
what you may do with its records:

| Grant | Gives |
| --- | --- |
| **Module owner** | Can modify this module's setup. |
| **View all records** | Sees every record regardless of workflow step. |
| **Revision owner** | Can request revisions — only where the module enables revision. |
| **Reopen owner** | Can reopen completed records, to a step chosen here — only where the module allows reopening. |

Without **View all records**, people see the records their workflow step makes
theirs, and nothing else. That is usually correct, and it is the most common
reason a record appears to vanish after it moves on.

Revision and reopen are module-level switches set in the
[designer](/build/module-designer); setup can only assign owners once they are
on.

## Layer 4 — workflow steps

Each step names the users and groups responsible for it. Those people get the
record in [My tasks](/work/my-tasks), receive its notifications, and are the
only ones who can take its actions.

Assignees are set **per deployment** in module setup rather than on the canvas,
because one published workflow serves several projects with different people in
them.

A step's **completion rule** decides how many must act:

- **One** — the first response moves the record, and it leaves everyone else's
  list.
- **All** — every assignee must act.
- **Majority** — more than half.

## The CX layer

The [CX workbench](/cx/) grants **view**, **edit** and **reopen** per stage to
project groups, in the project's **Stage configurations** tab.

::: warning Implicit deny
A stage with **no configuration at all** is treated as inaccessible. A newly
added stage that nobody can see has usually never been granted, rather than
being deliberately restricted.
:::

Note that the CX *editor* is under Settings and needs `PME`, while *working* a
workbench needs none of that — only the project grants and the stage
configuration.

## Diagnosing a refusal

Work down in order:

| Symptom | Layer |
| --- | --- |
| No Settings at all | Application role is not `PME` |
| Module missing from the menu | Group grant, or no [menu entry](/admin/menu) |
| Module opens, list is empty | **View all records**, or nothing is on their step |
| Record visible, no buttons | Not one of the current step's assignees |
| Buttons but no reopen or revise | Module setup owners, or the module switch is off |
| CX stage invisible | Stage configuration — implicit deny |

There is a worked version of this in
[Diagnosing "I can't see it"](/recipes/cant-see-it).

::: tip Least privilege
Prefer groups over per-user grants, and grant the narrowest access that lets
people do their job. `PME` in particular is not a small grant — it is the whole
of Settings.
:::
