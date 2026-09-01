---
description: "Module setup, tenant lists, reports, branding, AI and the logs."
---

# Settings

Everything under **Settings** that is not building a module or configuring the
menu: deploying modules into contexts, the tenant-wide lists, branding, and the
AI controls.

<Shot src="admin/module-setup" alt="The module setup list" pending
  caption="Configured modules, with the import wizard above." />

## Module setup

[Module designer](/build/module-designer) defines what a module *is*. Module
setup decides **where it is deployed and who runs it** — and the same module
can be set up differently in every project.

### Importing a module

The wizard has three steps:

1. **Choose the context** — tenant, workspace or project. You only see
   contexts you have access to.
2. **Choose the module** — from those available and not yet configured at that
   level.
3. **Configure it** — permissions, step assignees, notifications.

::: warning The context is the important choice
It decides where records live and who can see them. See
[Projects & spaces](/concepts/projects-and-spaces).
:::

### Permissions

| Grant | What it gives |
| --- | --- |
| **Module owner** | Can modify this module's setup. |
| **View all records** | Sees every record regardless of workflow step. |
| **Revision owner** | Can request revisions — only if the module enables revision. |
| **Reopen owner** | Can reopen completed records, to a step chosen here — only if the module allows reopening. |

Each is assigned to users and/or groups. **Revision** and **Reopen** are
module-level switches set in the [designer](/build/module-designer); setup can
only assign their owners once they are on.

### Workflow steps

For each step in the module's published workflow, assign the **users and
groups** responsible and control its notifications:

- **Disable default notifications** — globally, or per step.
- **Notify submitted** — notify when a record reaches the step.

Assignees are set here rather than on the canvas because one published workflow
serves several projects with different people in them.

## Tags

Tenant-level labels, at **Settings → Tags**. Create, rename, delete and search;
bulk-import from Excel with a `tagName` column, and download the template.

## Categories

Tenant-level, with a name and an optional description, at **Settings →
Category**. New entries start as a draft row. Search and sort by either field;
import and export via Excel.

::: warning Tags and categories are tenant-wide
A rename or a delete affects every workspace and project at once. Keep the
lists curated.
:::

## Checklist master

Create and version [checklists](/build/checklists) at **Settings → Checklist
master**. The log page groups every version under its checklist ID.

## Report setup

Define [reports](/build/dashboards): the report id and name, the level it
applies at, the module it draws from, its filter parameters, output format and
`.jrxml` template.

## Dashboard setup

Create and build [dashboards](/build/dashboards), then surface them through
[menu configuration](/admin/menu).

## Data setup

The **schema editor** and the **knowledge graph**, which together decide what
Exto's AI features understand about your data. Both have their own page —
see [Data setup](/admin/data-setup).

## General settings

Tenant **branding**, including the company logo.

## AI personalization

Two controls, at **Settings → AI personalization**:

- **AI chat access** — the organisation-wide switch for the
  [assistant](/ai/assistant). Off means off for everyone.
- **AI personalization** — **custom instructions** shaping how the assistant
  answers, and a **terminology** list mapping your words onto your data.

Both are capped in length and stamped with who last changed them.

## Logs

Exto keeps several separate logs. Knowing which one holds your answer saves
most of the search:

| Log | Where | Holds |
| --- | --- | --- |
| **User log** | Settings → User → User log | Sign-in activity per user. |
| **Location log** | Settings → Location → Log | Changes to the location master. |
| **External service log** | Settings → External service log | Outbound API calls. See [External services](/integrations/external-services). |
| **Webhook log** | Settings → Webhook log | Webhook deliveries. See [Webhooks](/integrations/webhooks). |
| **Checklist master log** | Settings → Checklist master | Every checklist version, grouped by ID. |
| **Job status** | Job status | Background jobs, with retry. See [Recycle bin & jobs](/work/recycle-bin). |
| **Record history** | On the record | Field changes and workflow transitions. See [History](/work/history). |

### User log

Sign-in activity for a user — when they signed in and from where. It is the
first thing to check if an account is suspected of being used by someone else,
and the only place that history is visible.

### Location log

The location master feeds project creation: picking a location auto-fills
address, country, state, city, currency and time zone. Because a change there
propagates into every project created afterwards, edits are logged separately
from ordinary [master](/concepts/masters) changes.

::: tip These logs are not the audit trail
Per-record accountability — who changed which field, on which step — is
[record history](/work/history). These logs cover the system around the
records.
:::

## Permissions

Each area under Settings is gated by its own config module — Module setup,
Reports, Users, Workflow manager and so on — granted to your groups at the
appropriate level. See [Permissions](/concepts/permissions).
