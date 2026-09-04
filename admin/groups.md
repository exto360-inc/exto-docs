---
description: "Where access actually comes from, and why permissions compound."
---

# Groups & permissions

Access outside **Settings** is granted through **groups**, never to individuals.
You put people into a group, and grant the group permissions on modules and
features.

<Shot src="admin/groups" alt="A project group" pending
  caption="A project group — its members on the left, its granted modules on the right." />

## Groups do not grant Settings

Worth stating first, because it is the most common misunderstanding.

The **Settings** area is gated by the user's **application role** being `PME`.
No group grants it, and no combination of group permissions substitutes for it.
Groups govern everything else — the working modules, the masters, the reports,
the projects.

See [Permissions](/concepts/permissions).

## Where groups live

| Level | Grants |
| --- | --- |
| **Workspace groups** | Workspace-level modules and masters. |
| **Project groups** | Project-level core modules, config modules, masters, CX, reports and dashboards. |

A group's membership is a set of **users and/or other groups** — nesting builds
a hierarchy without duplicating membership lists.

## What a group grants

Two kinds of thing.

### Core modules

The working modules of a project — what people use day to day. Among them:

`Issue` · `Contract` · `Change Order` · `Submittal` · `Cost Code` ·
`Cost Sheet` · `Document manager` · `Photo` · `Resource` · `Schedule` ·
`Daily progress report` · `MOM` · `Action Item` · `Collaboration` ·
`Forecast` · `CX` · `Billing`

### Config modules

Administrative capabilities within a project. These are the named permissions
that pages check for, so the exact spelling matters:

| Permission | Grants |
| --- | --- |
| `Project setting` | Opens the project's tabs. |
| `Project Update` | Editing the project. |
| `Project creation` | Creating projects. |
| `View All Projects` | Seeing every project. |
| `Delete/Recover` | Deleting and restoring. |
| `Users` | Managing a project's users. |
| `Invite users` | Inviting people. |
| `View Project groups` / `Edit project groups` | Seeing and changing groups. |
| `Edit project group users` | Changing who is in a group. |
| `View project space` / `Edit project space` | Seeing and changing spaces. |
| `Invite Users to project space` | Adding people to a space. |
| `Module setup` | Deploying and configuring modules. |
| `Workflow manager` | Managing workflows. |
| `Reports` | Reaching reports. |
| `View All Records` | Seeing every record in a module. |
| `Masters` | Reaching master data. |
| `Document Manager` / `Document Controller` | Documents. |
| `Photo` | The Photos gallery. |
| `Customfield setting` | Project custom fields. |
| `Menu Configurator` | Menu configuration. |
| `Cx Admin` / `CX Setting` / `CX Registry` / `CX Import` | CX capabilities. |
| `Location` / `Tag` / `Category` | Tenant-level lists. |

The workspace equivalents are named separately: `Workspace Setting`,
`Workspace Update`, `Workspace Creation`, `View Workspace Groups`,
`Edit Workspace Groups`, `Edit Workspace Group Users`,
`View Workspace Space`, `Edit Workspace Space`, `View All Workspace`.

## Permissions compound

This is the rule that explains most confusing behaviour.

Reaching something usually needs **several permissions at once**, and they must
be held in the **same context** — all at tenant level, or all at project level.

For example, changing who is in a project group needs all four of:

- `Project setting`
- `View Project groups`
- `Edit project groups`
- `Edit project group users`

::: warning Split across contexts, nothing works
`Project setting` at tenant level and `View Project groups` at project level
satisfies neither context. The Groups tab appears — tab visibility only needs
`Project setting` in *either* context — and loads nothing.

Grant both at the same level.
:::

## Submodule actions

Alongside named permissions, groups grant four **actions** — view, create, edit,
delete — on **submodules**:

`master_data` · `hierarchical_master_data` · `user` · `group` ·
`module_setup` · `page` · `dashboard_setup` · `workflow`

This is what governs whether someone can read a master versus change it.

## Groups are not the whole story

Getting into a module is one of four layers. The others are the application
role, [module setup](/admin/settings) — **View all records**, revision and
reopen owners — and the workflow step assignees that decide whose record it is
right now.

See [Permissions](/concepts/permissions) for how they combine, and
[Diagnosing "I can't see it"](/recipes/cant-see-it) for working down them.

::: tip Least privilege
Grant the narrowest access that does the job, and prefer groups to per-user
grants. A group you can read in one screen is a group you can audit.
:::

## Related

- [Users](/admin/users) — the accounts groups contain.
- [Workspaces](/admin/workspaces) and [Projects](/admin/projects) — where
  groups live.
