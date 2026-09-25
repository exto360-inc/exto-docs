---
description: "The four designers — module, workflow, analytics and workbench."
---

# Designers

**For people who decide what everyone else sees.** Exto is configured, not
coded: you describe what you track and how it moves, and the product renders it.

Four designers, each owning a different part.

| Designer | Decides | Where |
| --- | --- | --- |
| **[Module designer](/build/module-designer)** | What a module stores and what people fill in | Settings → Module designer |
| **[Workflow designer](/build/workflows)** | Where a record goes after Submit | Inside the module designer |
| **[Analytics designer](/analytics/)** | Dashboards and report templates | Settings → Setups |
| **[Workbench designer](/cx/designer)** | Commissioning levels, stages and gates | Settings → CX workbench |

All four require <Perm role="PME" />, the application role that opens
**Settings**.

## Module designer

The module's own definition — nine tabs over one module.

| Page | Covers |
| --- | --- |
| [The designer](/build/module-designer) | The nine tabs and what each owns. |
| [Module builder](/build/module-builder) | The wizard that reads a paper form. |
| [Forms](/build/forms) | The canvas, and binding fields to columns. |
| [Field types](/build/field-types) | Every field in the palette. |
| [Rules & validations](/build/rules) | Change the form, warn, block, require files. |
| [Tables & data sets](/build/tables-and-datasets) | The columns records store, and option lists. |
| [Reference tables](/build/reference-tables) | Reading values another module owns. |
| [Log page views](/build/log-page-views) | Which columns the record list can offer. |
| [Checklists](/build/checklists) | Versioned, approved questionnaires. |

## Workflow designer

Where records go, drawn as a graph.

| Page | Covers |
| --- | --- |
| [Workflows](/build/workflows) | The canvas, its views, and what publishing validates. |
| [Steps & actions](/build/steps-and-actions) | Forms per step, completion rules, action settings. |
| [Conditions](/build/conditions) | Routing without a person. |
| [Publishing & versions](/build/publishing) | What freezes, and how to change it afterwards. |

::: warning Assignees are not designed here
The canvas defines the **shape**. **Who** staffs each step is set per
deployment in [module setup](/setup/step-assignees) — one workflow serves many
projects with different people in them.
:::

## Analytics designer

Live tiles and generated documents. See
**[Dashboards & reports](/analytics/)**.

## Workbench designer

Commissioning levels, stages, gates and stage templates. It sits with the rest
of commissioning — see **[Designing a workbench](/cx/designer)**.

## The order to work in

1. **[Module designer → General](/build/module-designer)** — create the module,
   set its identity and switches.
2. **Table** — the columns records will store.
3. **[Forms](/build/forms)** — what people fill in.
4. **[Rules](/build/rules)** — what is required, and when.
5. **[Workflows](/build/workflows)** — where records go. Publish it.
6. **[Module setup](/setup/)** — deploy it and name its assignees.
7. **[Menu](/menu/)** — make it reachable.

Steps 6 and 7 are not optional. A module that stops at step 5 exists in the
designer and nowhere else.
