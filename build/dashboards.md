---
description: "Live tiles versus generated documents, and which to build."
---

# Dashboards & reports

Two ways of showing data back to people. A **dashboard** is live — tiles and
charts that move as records change. A **report** is a generated document that
looks the same every time. Pick by whether the layout matters.

<Shot src="build/dashboard-builder" alt="The dashboard builder" pending
  caption="Arranging tiles on a dashboard's grid." />

## Dashboards

### Setting one up

**Settings → Dashboard setup** lists the dashboards in the tenant. The wizard
asks for four things:

| Field | Notes |
| --- | --- |
| **Dashboard name** | The internal identifier used for lookup. |
| **Display name** | Shown in menu setup and the sidebar. |
| **URL / path** | Where the dashboard lives. |
| **Description** | Required. What it is for. |

### Building it

The dashboard builder arranges tiles on a grid — drag to place, drag to
resize. Each tile is bound to data from a module and rendered as a chart, a
count, or a list.

### Publishing it to people

A dashboard is not visible until it is in the navigation. Add it in
[Menu configuration](/admin/menu), where a menu entry can point at a
dashboard just as it can point at a module or a workflow template.

Access follows the **dashboard_setup** submodule and the dashboard grants on
your [groups](/concepts/permissions).

## Reports

### Setting one up

**Settings → Report setup** defines a report:

| Field | What it does |
| --- | --- |
| **Report ID** | The identifier. |
| **Report name** | What people see in the list. |
| **Applicable level** | Tenant, workspace or project — decides where it appears. |
| **Module** | The data it draws from. |
| **Workspaces / projects** | Which ones it is available in. |
| **Output format** | PDF, spreadsheet, and so on. |
| **Display report** | Whether it is listed for users. |
| **Filter parameters** | The inputs a user fills before running it, as a JSON array. |
| **Template** | The `.jrxml` file that renders it. |

Filter parameters are typed — text, number, date, checkbox, boolean or
dropdown — and become the form a user completes on the
[Reports](/work/reports) page.

::: warning Filter parameters must be valid JSON
The field takes a JSON array. A malformed one is rejected on save rather than
producing a report with no inputs.
:::

### Running one

Users run reports from [Reports](/work/reports), which shows the reports
available in their current context.

## Which to build

| Want | Build |
| --- | --- |
| A number people watch daily | Dashboard |
| A chart that answers "how are we doing" | Dashboard |
| A document to send outside the company | Report |
| Something whose layout is prescribed | Report |
| A quick one-off extract | Neither — export a [view](/work/views) to CSV |

## Permissions

Dashboard and report definitions require access to Settings, granted through
the **Reports** and dashboard config modules on your groups. Whether an
individual dashboard or report appears to a user is decided by its level, its
workspace and project scoping, and the grants on their groups.
