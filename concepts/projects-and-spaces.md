---
description: "Where records live, and who can see them."
---

# Projects & spaces

Exto organises everything into a four-level hierarchy. It decides where records
live, who can see them, and which masters they can reach — so it is worth
getting right before you build anything.

```
Company (Tenant)
└─ Workspace          top-level container; can nest
   └─ Project         a body of work; can be a program of sub-projects
      └─ Space        a collaboration area within a workspace or project
```

## Tenant

A tenant is an isolated environment with its own workspaces, modules, records
and users. Data never crosses a tenant boundary. An account may have access to
several; see [Choosing a tenant](/account/tenants).

## Workspace

A workspace groups projects, users and configuration for a team or area, and
can be **nested** under a parent workspace. Opening one gives you tabs for
**General**, **Groups**, **Spaces** and **Users**, subject to your permissions.

## Project

A project is a body of work inside a workspace, with its own schedule,
location, calendar and module set. Set a **parent project** to build a program
structure, or mark a project as a **program** so it can contain sub-projects.

A project carries more than a name:

- **Schedule** — start date, finish date, and a calendar.
- **Location** — picked from the location master, which auto-fills address,
  country, state, city, currency and time zone.
- **People** — a project manager, a project type, an optional external id.
- **Custom fields** — whatever your tenant has defined for projects.

## Space

A space is a collaboration area inside a workspace or project, with its own
**admins**, **members**, **groups** and **tags**. Spaces let a subset of people
work together without opening up the whole project.

Workspace spaces and project spaces behave identically — they differ only in
where they live.

## Deployment level — the decision that matters

A module is deployed at **tenant**, **workspace** or **project** level. That
choice is made once, in [module setup](/admin/settings), and it determines:

| Deployed at | Records live | Visible to |
| --- | --- | --- |
| **Tenant** | Once, tenant-wide | Anyone with the module granted, anywhere |
| **Workspace** | Per workspace | People in that workspace |
| **Project** | Per project | People in that project |

A project-level module keeps its records inside that project and can still
link out to workspace- and tenant-level masters. Project-level deployment
overrides a workspace default.

::: warning Pick the level before you load data
Moving a module between levels means moving every record it owns. Reference
data almost always belongs at tenant level; transactional work almost always
belongs at project level.
:::

## Related

- [Projects](/admin/projects) — creating and configuring them.
- [Users & groups](/admin/groups) — granting access at each level.
- [Permissions](/concepts/permissions) — how the grants combine.
