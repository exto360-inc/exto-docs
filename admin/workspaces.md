---
description: "Creating and nesting workspaces, and what each tab requires."
---

# Workspaces

A workspace is a top-level container grouping projects, users and configuration
for a team or area. Workspaces can nest under a parent.

<Shot src="admin/workspaces" alt="A workspace being edited" pending
  caption="A workspace's General tab, with the tabs your permissions allow." />

## Creating one

From the **Projects** area, choose **Create → Workspace**:

1. Enter a **name**. Required.
2. Optionally pick a **parent** workspace to nest under.
3. **Save** — the navigation tree refreshes and the workspace appears.

Creating a workspace requires the `Workspace Creation` permission. Without it
the action is not offered.

## The tabs

Opening a workspace gives four tabs, and **all four appear together or not at
all**: they are visible if you hold `Workspace Setting`.

| Tab | You manage |
| --- | --- |
| **General** | Name and parent. |
| **Users** | Users assigned to the workspace. |
| **Groups** | Workspace-level [groups](/admin/groups). |
| **Spaces** | Collaboration [spaces](/admin/spaces). |

Seeing a tab is not the same as being able to use it — see below.

## What each action requires

Permissions **compound**, and they must be held **in the same context**. Every
row here is an *and*, not an *or*:

| Action | Requires |
| --- | --- |
| See the tabs | `Workspace Setting` |
| Edit General | `Workspace Setting` + `Workspace Update` |
| Delete the workspace | `Delete/Recover` |
| See users | `Workspace Setting` + `Users` |
| See groups | `Workspace Setting` + `View Workspace Groups` |
| Edit groups | the above + `Edit Workspace Groups` |
| Change who is in a group | the above + `Edit Workspace Group Users` |
| See spaces | `Workspace Setting` + `View Workspace Space` |
| Edit spaces | the above + `Edit Workspace Space` |

::: warning A visible tab can still be empty
Tabs are shown on `Workspace Setting` alone, but the data inside each one needs
its own secondary permission. Someone holding only `Workspace Setting` sees all
four tabs and content in none of them. That is the configuration, not a fault.
:::

Note that `Delete/Recover` is checked on its own rather than compounded with
`Workspace Setting`.

## Nesting

Setting a **parent** nests one workspace under another. The navigation tree
reflects the nesting, and it is how a large organisation keeps a long list of
projects navigable.

## Scope

Modules deployed at **workspace** level apply across every project in that
workspace. A project-level deployment of the same module overrides that default
for its own project.

See [Projects & spaces](/concepts/projects-and-spaces).

## Related

- [Projects](/admin/projects) — what lives inside a workspace.
- [Groups & permissions](/admin/groups) — granting the permissions above.
- [Spaces](/admin/spaces) — scoping collaboration further.
