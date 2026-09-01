---
description: "Schedule, calendar, location, templates, custom fields and programs."
---

# Projects

A project is a body of work inside a workspace, with its own schedule, location,
people and module set. What the hierarchy *means* is
[Projects & spaces](/concepts/projects-and-spaces); this page is how to build
and configure one.

<Shot src="admin/projects" alt="The projects tree" pending
  caption="The navigation tree — workspaces, their projects, and sub-projects." />

## Creating a project

**Create → Project** asks for:

| Group | Fields |
| --- | --- |
| **Basics** | Project ID (generated), name, description, and the **workspace** it belongs to. |
| **Template** | An existing project to start from. Optional. |
| **Schedule** | Start date, finish date, a **calendar**, and a **master schedule**. |
| **Location** | From the location master — it auto-fills address, country, state, city, currency and time zone. |
| **People & type** | Project manager, project type, optional external project ID. |
| **Custom fields** | Whatever your tenant has defined for projects. |

Save with the button or <kbd>⌘</kbd><kbd>S</kbd>.

::: tip The location does more than record an address
Picking one fills in currency and time zone. Getting it wrong means every
figure and timestamp in the project is framed against the wrong ones.
:::

### Custom fields

Projects accept tenant-defined custom fields, assigned to the project from a
list of available definitions. Managing them requires `Customfield setting`.

## Programs

Set a **parent project** to build a program structure, or mark a project as a
**program** so it can contain sub-projects. A program behaves like a project
that also aggregates its children.

## The tabs

| Tab | You manage |
| --- | --- |
| **General** | Every project field, and deleting the project. |
| **Users** | Users assigned to the project. |
| **Groups** | Project [groups](/admin/groups). |
| **Space** | Project [spaces](/admin/spaces). |
| **Dashboard** | The project's dashboard configuration. |

## What each action requires

`Project setting` is the key that opens the door; each tab's *contents* then
need their own permission.

| Action | Requires |
| --- | --- |
| See the tabs | `Project setting` |
| Update the project | `Project Update` |
| Delete it | `Delete/Recover` |
| Create a project | `Project creation` |
| See all projects | `View All Projects` |
| Load users | `Project setting` + `Users` |
| Load groups | `Project setting` + `View Project groups` |
| Edit groups | the above + `Edit project groups` |
| Change group membership | the above + `Edit project group users` |
| Load spaces | `Project setting` + `View project space` |
| Edit spaces | the above + `Edit project space` |

### The same-context rule

This is the subtlety that produces the most confusing behaviour, and it is
deliberate.

A permission can be granted at **tenant** level or at **project** level. A tab
becomes **visible** when `Project setting` is present in *either* context — but
its data only **loads** when `Project setting` and the secondary permission are
both present in the **same** context.

::: warning A tab you can open but that shows nothing
Holding `Project setting` at tenant level and `View Project groups` at project
level satisfies neither context on its own. The Groups tab appears, and it
loads nothing.

This is not a bug. Grant both permissions at the same level to fix it.
:::

## Scope

Modules deployed at **project** level keep their records inside that project and
can still link out to workspace- and tenant-level
[masters](/concepts/masters). Project-level deployment overrides a workspace
default.

::: warning Decide the level before loading data
Moving a module between levels means moving every record it owns.
:::

## Related

- [Workspaces](/admin/workspaces) — what a project lives in.
- [Spaces](/admin/spaces) — scoping collaboration inside one.
- [Users](/admin/users) and [Groups & permissions](/admin/groups).
