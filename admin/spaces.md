---
description: "Scoping collaboration to a subset of a team."
---

# Spaces

A space is a collaboration area inside a workspace or project, with its own
members. Spaces let a subset of people work together without opening up the
whole project.

<Shot src="admin/spaces" alt="Creating a space" pending
  caption="A space with its admins, groups and tags." />

## What a space carries

| Field | Holds |
| --- | --- |
| **Name** | Required. |
| **Description** | Optional. |
| **Admins** | Users with full control of the space. |
| **Groups** | Permission [groups](/admin/groups) associated with it. |
| **Tags** | For categorisation. |
| **Members** | The users in it. |

## Where spaces live

Two places, behaving identically:

- The **Spaces** tab of a [workspace](/admin/workspaces).
- The **Space** tab of a [project](/admin/projects).

They differ only in where they sit. Use a project space to scope collaboration
to one project's team.

## What each action requires

Permissions compound and must be held in the **same context**.

### Workspace spaces

| Action | Requires |
| --- | --- |
| See them | `Workspace Setting` + `View Workspace Space` |
| Create and edit | the above + `Edit Workspace Space` |

### Project spaces

| Action | Requires |
| --- | --- |
| See them | `Project setting` + `View project space` |
| Create and edit | the above + `Edit project space` |
| Invite people into one | `Invite Users to project space` |

Inviting users to a project space is its own named permission, separate from
editing the space — you can be able to create a space and not to populate it.

## Spaces and records

Where a module uses spaces, taking a workflow action can ask which space the
record belongs to. After the first step that choice is normally fixed. See
[Taking actions](/work/taking-actions).

## Related

- [Workspaces](/admin/workspaces) and [Projects](/admin/projects) — where
  spaces live.
- [Projects & spaces](/concepts/projects-and-spaces) — the hierarchy.
