---
description: "Creating a module setup and choosing the context its records live in."
---

# Deploying a module

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

A **setup** is one deployment of one module into one context. Creating it is
what makes the module real for the people working there.

## Steps

1. Open **Settings → Module setup**.
2. Choose **Add new**.
3. Pick the **module** to deploy.
4. Pick the **context** — the tenant, workspace or project its records will
   live in.
5. Fill in the [access](/setup/access) and
   [step assignees](/setup/step-assignees) sections.
6. Save.

## Choosing the context

This is the decision that is hardest to undo.

| Level | Records live | Use when |
| --- | --- | --- |
| **Tenant** | Once, across everything | Reference data everyone shares. |
| **Workspace** | Per workspace | A process every project in that workspace runs. |
| **Project** | Per project | Work belonging to one project only. |

::: warning Decide the level before loading data
Moving a module between levels means moving every record it owns. Pick the
narrowest level that still lets the right people see the work.
:::

A project-level deployment **overrides** a workspace default for that project,
so a workspace-wide process can be specialised where it needs to be.

## The list

**Settings → Module setup** lists every deployment, not every module — one row
per module-and-context pair. It behaves like any other grid: filter, group,
slice, hide columns and save [views](/work/views).

A module deployed to six projects appears six times, which is the quickest way
to see where a process is actually running.

## Linked modules

A setup names which **other modules** its records may link to. With none
selected, nothing is linkable — the
[Linked records](/work/record-widgets) widget will have nothing to offer.

This is per deployment, so the same module can link to different things in
different projects.

## Related

- [Access and owners](/setup/access)
- [Workflow step assignees](/setup/step-assignees)
- [Projects & spaces](/concepts/projects-and-spaces) — what the contexts are.
