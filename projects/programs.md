---
description: "Projects that contain projects, and when to use one."
---

# Programs

::: tip Who can do this
`Project creation`, plus `Project setting` to change an existing one.
:::

A **program** is a project that contains other projects. It is how a large
undertaking — a campus, a fab, a multi-building site — is organised without
flattening it into one enormous project.

## Making one

Two ways, depending on which end you start from:

- **Mark a project as a program**, so it can contain sub-projects.
- **Set a parent project** on a project, putting it inside one.

Both produce the same structure.

## When to use one

| Situation | Shape |
| --- | --- |
| One team, one schedule, one handover | A **project** |
| Several buildings, each with its own team and dates | A **program** of projects |
| One building, several disciplines | A **project** — use [spaces](/admin/spaces) for the teams |

The test is whether the parts have **their own schedules and their own people**.
If they share both, they are one project.

## What a program aggregates

A program behaves like a project that also rolls up its children — so progress
and counts reflect everything beneath it, the same way a parent
[asset](/cx/assets) does in a workbench.

::: tip Access is still per project
Being in the program does not grant access to its children. Each project carries
its own [groups](/admin/groups), which is usually what you want: a contractor on
one building has no business seeing another.
:::

## Related

- [Projects](/admin/projects)
- [Projects & spaces](/concepts/projects-and-spaces)
