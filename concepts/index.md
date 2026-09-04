---
description: "The five ideas that turn up on every other page."
---

# Core concepts

Five ideas turn up on nearly every page in Exto. Read them once and the rest
of the product stops needing explanation.

| Concept | The one-line version |
| --- | --- |
| [Modules & records](/concepts/modules-and-records) | A module is a type of thing; a record is one of them. |
| [Workflows & versions](/concepts/workflows-and-versions) | The path a record takes, frozen at publish. |
| [Permissions](/concepts/permissions) | Groups grant actions on submodules; nothing is granted per person. |
| [Projects & spaces](/concepts/projects-and-spaces) | Where records live, and who can see them. |
| [Masters](/concepts/masters) | Shared reference data everything else points at. |

## How they fit together

<DTree root="Tenant" :nodes="[
  { label: 'Workspace', children: [
    { label: 'Project', children: [
      { label: 'Space' },
    ] },
  ] },
]" />

<DTree root="Module" :nodes="[
  { label: 'Form', note: 'what you fill in' },
  { label: 'Workflow', note: 'where it goes, versioned' },
  { label: 'Records', note: 'the actual data', children: [
    { label: 'Field values' },
    { label: 'Workflow instance', note: 'where it has been' },
    { label: 'Documents, comments, linked records' },
    { label: 'History' },
  ] },
]" />

A **module** is deployed into a **context** — tenant, workspace or project —
and that single choice decides where its records live, who can see them, and
which masters they can reach. It is the decision people most often get wrong,
so [Projects & spaces](/concepts/projects-and-spaces) covers it properly.

::: tip Save is not Submit
The single most common source of confusion. **Save** persists a draft where it
is; **Submit** takes a workflow action and moves the record on. See
[Taking actions](/work/taking-actions).
:::
