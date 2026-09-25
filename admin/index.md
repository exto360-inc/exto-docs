---
description: "Setting up a tenant, and the four systems that grant access."
---

# Projects & access

**For administrators.** Before anyone can use Exto, somebody has to decide where
the work lives and who can reach it — workspaces and projects to hold it, groups
to grant access, and the menu that leads people to it.

Most of it is done once, at the start, and revisited when a team changes.

## The pages

| Page | Covers |
| --- | --- |
| [Workspaces](/admin/workspaces) | Creating and nesting them, and what each tab needs. |
| [Projects](/admin/projects) | Schedule, calendar, location, templates, custom fields, programs. |
| [Spaces](/admin/spaces) | Scoping collaboration to a subset of a team. |
| [Users](/admin/users) | Accounts, application roles, assignment, the user log. |
| [Groups & permissions](/admin/groups) | Where access actually comes from. |
| [Menu configuration](/menu/) | What appears in the navigation, and where. |
| [Module setup](/setup/) | Deploying a module, its owners, and who staffs each step. |
| [Settings](/admin/settings) | Tags, categories, reports, branding, AI, logs. |
| [Data setup](/admin/data-setup) | Schema editor and knowledge graph — what the AI knows. |

## The order to set a tenant up in

1. **[Workspaces](/admin/workspaces)** then
   **[Projects](/admin/projects)** — nothing can be deployed without somewhere
   to deploy it.
2. **[Users](/admin/users)** and **[Groups](/admin/groups)** — invite people
   and build the groups that will hold the grants.
3. **Build a module** — see [Building](/build/).
4. **Module setup** — deploy it into a context, assign step assignees, and set
   its notifications. See [Settings](/admin/settings).
5. **[Menu configuration](/menu/)** — put it in the navigation, or nobody
   will find it.

Step 5 is the one people forget. A perfectly configured module that is not in
a menu is invisible.

## Four grant systems

Access is not one list. Work down these in order when someone cannot reach
something:

1. **Application role** — is the user `PME`? That, and only that, opens
   **Settings**. Nothing a group grants can substitute for it.
2. **[Group grants](/concepts/permissions)** — can they open the module at all?
3. **Module setup** — can they see every record, revise, reopen?
4. **Workflow steps** — is this particular record theirs to act on?

::: warning `PME` is not a small grant
It opens the whole of Settings, with no per-page distinction. Granting it so
somebody can edit one menu also lets them redesign every module in the tenant.
:::

## Related

- [Permissions](/concepts/permissions) — how the three layers combine.
- [Projects & spaces](/concepts/projects-and-spaces) — the hierarchy the
  grants hang off.
