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

```
Tenant
└─ Workspace
   └─ Project
      └─ Space

      Module  (deployed at tenant, workspace or project level)
      ├─ Form       — what you fill in
      ├─ Workflow   — where it goes, versioned
      └─ Records    — the actual data
                      ├─ field values
                      ├─ workflow instance (where it has been)
                      ├─ documents, comments, linked records
                      └─ history
```

A **module** is deployed into a **context** — tenant, workspace or project —
and that single choice decides where its records live, who can see them, and
which masters they can reach. It is the decision people most often get wrong,
so [Projects & spaces](/concepts/projects-and-spaces) covers it properly.

::: tip Save is not Submit
The single most common source of confusion. **Save** persists a draft where it
is; **Submit** takes a workflow action and moves the record on. See
[Taking actions](/work/taking-actions).
:::
