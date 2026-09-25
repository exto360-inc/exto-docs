---
description: "Workspaces, projects, programs and spaces — where work lives."
---

# Projects

Everything in Exto happens somewhere. **Projects** are where the work lives, and
the hierarchy around them decides who can see it.

```
Tenant                  an isolated environment
└─ Workspace            a team or business area
   └─ Project           a body of work
      └─ Space          a subset of its people
```

A **program** is a project that contains other projects.

<Shot src="admin/projects" alt="The Projects area"
  caption="The Projects area — workspaces as group rows, with their projects nested underneath." />

## The pages here

| Page | Covers |
| --- | --- |
| [Workspaces](/admin/workspaces) | Creating and nesting them. |
| [Projects](/admin/projects) | Schedule, calendar, location, custom fields. |
| [Programs](/projects/programs) | Projects that contain projects. |
| [Spaces](/admin/spaces) | Scoping collaboration further. |
| [Projects & spaces](/concepts/projects-and-spaces) | The concept. |

## Why the level matters

A module is [deployed](/setup/deploying) at one of three levels, and that
decides where its records live:

| Deployed at | Records |
| --- | --- |
| **Tenant** | Shared across everything. |
| **Workspace** | Shared by that workspace's projects. |
| **Project** | Belong to that project alone. |

::: warning Decide the level before loading data
Moving a module between levels means moving every record it owns. Pick the
narrowest level that still lets the right people see the work.
:::

## What a project brings with it

Creating a project is not just a name. It carries a **schedule**, a **calendar**,
a **location** — which auto-fills currency and time zone — a **project
manager**, and any **custom fields** your tenant defines.

Those are not decoration: the location's currency frames every figure in the
project, and its time zone frames every timestamp.

## Related

- [Access control](/access/) — who can reach a project.
- [Module setup](/setup/) — deploying into one.
