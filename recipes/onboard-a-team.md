---
description: "Getting a project team seeing exactly what they should."
---

# Recipe: onboarding a project team

Get a group of people into a project seeing exactly what they should — no more,
no less. About twenty minutes.

**You will touch:** [projects](/admin/projects) ·
[users & groups](/admin/groups) · [module setup](/admin/settings) ·
[menu](/admin/menu)

## 1. Make sure the project exists

**Projects → Create → Project**, inside the right workspace. Set its schedule
and location; the location master fills in currency and time zone for you.

If the work belongs to several related projects, mark the parent as a
**program** rather than creating a flat list.

## 2. Design the groups before adding anybody

Sketch the roles first. Three or four is usually right:

| Group | Typically gets |
| --- | --- |
| Field | The working modules, view and create |
| Supervisors | The same, plus edit and the approval steps |
| Project administrators | Config modules — module setup, users, reports |
| Read-only | View on the working modules |

Groups can contain other groups. Nest rather than duplicating a membership
list in two places.

## 3. Create them

On the project's **Groups** tab, create each group and grant it:

- **Core modules** — the working modules people actually use.
- **Config modules** — only for the admin group.
- **Masters, CX, reports, dashboards** as needed.

Grant the narrowest thing that works. It is far easier to add a grant on
request than to discover a year later that everyone has delete.

::: warning Do not hand out `PME` to solve a group problem
`PME` is an **application role** on the account, not a group grant, and it opens
the whole of **Settings** — every module designer, every menu, every report
definition in the tenant. If somebody cannot reach a working module, the fix is
a group grant, never `PME`. See [Permissions](/concepts/permissions).
:::

## 4. Add the people

Invite users to the project, then add them to groups. Nobody should be granted
anything directly — a per-person grant is invisible in six months.

## 5. Make the records visible correctly

Group membership gets people **into** a module. It does not decide which
records they see. That is [module setup](/admin/settings):

- **View all records** — supervisors and admins, usually. Not field users.
- **Reopen owner** / **Revision owner** — a named group, not everybody.
- **Step assignees** — this is what puts work in someone's
  [My tasks](/work/my-tasks).

## 6. Check the menu

The project's people see the [menu](/admin/menu) that is active for them.
Confirm the modules you just granted are actually in it.

## 7. Verify as a real user

Ask one person from each group to sign in and tell you what they see. This
catches more than any amount of reviewing the configuration, because the three
grant layers only combine at runtime.

::: tip When someone sees nothing
Work down the layers: group grant → module setup → workflow step. See
[Diagnosing "I can't see it"](/recipes/cant-see-it).
:::
