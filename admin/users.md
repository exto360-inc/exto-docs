---
description: "Accounts, application roles, assignment, and the user log."
---

# Users

People, their application role, and which projects and workspaces they belong
to. Access itself is granted through [groups](/admin/groups) — this page is
about the accounts.

<Shot src="admin/users" alt="The project users list" pending
  caption="Users assigned to a project, with their application role." />

## The application role

Every account carries exactly one **application role**. It is a property of the
user, not something a group grants.

| Role | Means |
| --- | --- |
| `USER` | An ordinary user. |
| `PME` | May open **Settings** — the whole administrative area. |
| `SITE_ADMIN` | Bypasses scope restrictions. |
| `LITE_USER` | A restricted user. |

::: warning `PME` opens all of Settings, not part of it
There is no per-page permission inside Settings. A `PME` user can open the
module designer, menu setup, report and dashboard setup, the checklist master,
tags, categories, webhooks, data setup and the CX workbench editor — every one
of them.

If somebody needs access to a working module, that is a
[group grant](/admin/groups). `PME` is never the answer to that problem.
:::

The user list shows each person's role alongside their details, so an
unexpected `PME` is visible at a glance.

## Assigning people

Users are **assigned** to a workspace or project from its **Users** tab, and
**invited** where they do not yet have an account.

| Action | Requires |
| --- | --- |
| See project users | `Project setting` + `Users`, in the same context |
| See workspace users | `Workspace Setting` + `Users`, in the same context |
| Invite people | `Invite users` |
| Invite into a project space | `Invite Users to project space` |

Assignment puts somebody in the container. It grants them nothing on its own —
that comes from the groups they are in.

## Sign-in activity

**Settings → User → User log** records sign-in activity per user: when they
signed in and from where. It is the only place that history is visible, and the
first thing to check if an account is suspected of being used by someone else.

Reaching it requires `PME`.

## What a user cannot do for themselves

Users manage their own name, picture and display preferences in
[their profile](/account/profile). They cannot change their own application
role, their group memberships, or which projects they are assigned to.

## Related

- [Groups & permissions](/admin/groups) — where access actually comes from.
- [Permissions](/concepts/permissions) — the four layers.
- [Signing in](/account/signing-in) — from the user's side.
