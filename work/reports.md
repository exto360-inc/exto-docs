---
description: "Running a report and filling in its parameters."
---

# Reports

Reports render your data into a fixed document — a PDF or spreadsheet built
from a template, with parameters you fill in before it runs. They are for the
output that has to look the same every time: statements, certificates,
submissions.

<Shot src="work/reports" alt="The reports page" pending
  caption="The report list, with the parameter panel open for a selected report." />

## List page

Every report available to you in the current context, with its name and
description. The context chip above the list names the project or workspace
the reports belong to — a report defined at project level only appears when
you are in that project.

## Running a report

1. Pick a report.
2. Fill in its **filter parameters**. Which ones appear is defined per report,
   and they are typed: text, number, date, checkbox, boolean or dropdown.
3. Choose the **output format** if the report offers more than one.
4. Generate.

The report is produced server-side and downloaded. A report that fails to
generate says so rather than downloading an empty file — usually a parameter
combination that matches nothing.

::: tip Reports are not the record list
Exporting the [record list](/work/record-list) gives you the current view as
CSV, immediately, with no template. Use that for analysis; use a report when
the layout matters.
:::

## Dashboards

Dashboards are the live counterpart — charts and tiles that update as records
change, rather than a document you generate. They are built in
[Dashboards & reports](/build/dashboards) and appear in the navigation where
[menu configuration](/admin/menu) places them.

## Where reports come from

Reports are configured in **Settings → Report setup** by an administrator, who
defines the report id, its name, the level it applies at (tenant, workspace or
project), the module it draws from, its parameters, its output format, and the
template that renders it. See [Settings](/admin/settings).

## Permissions

Reports appear according to the **Reports** config module granted to your
groups, at the level the report is defined for. Creating and editing report
definitions requires access to Settings → Report setup, which is an
administrator task.
