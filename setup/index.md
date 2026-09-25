---
description: "How a module reaches a project, and who can do what with its records."
---

# Module setup

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

Designing a module decides what it *is*. **Module setup** decides where it
**runs** and who can **use** it — which context its records live in, who owns
them, who sees all of them, and who each workflow step goes to.

A module with no setup is invisible. It exists in the designer and nowhere else.

<Shot src="admin/module-setup" alt="The module setup list"
  caption="Every deployment of every module, with the context it runs in." />

## Where it sits

```
Module designer  →  what the module IS
      ↓              fields, forms, rules, workflow
Module setup     →  where it RUNS and who may use it
      ↓              context, owners, step assignees
Menu             →  how people REACH it
```

All three are needed. Skipping setup is the usual reason a freshly built module
never appears for anyone.

## The pages here

| Page | Covers |
| --- | --- |
| [Deploying a module](/setup/deploying) | Creating a setup and choosing its context. |
| [Access and owners](/setup/access) | Module owner, View all records, revision and reopen. |
| [Workflow step assignees](/setup/step-assignees) | Who each step goes to, and their notifications. |
| [Importing a module](/setup/importing) | Bringing a module in from elsewhere. |

## One module, many setups

A module is designed **once** and deployed **many times** — the same Issues
module can run in five projects, each with different people on its steps.

That is why assignees live here rather than on the workflow canvas: one
published workflow serves every deployment, and each deployment names its own
people.

::: warning Changing a setup does not change the module
Setup changes take effect for that deployment only. To change what the module
*is* — its fields, forms or workflow — go to the
[module designer](/build/module-designer).
:::

## Related

- [Module designer](/build/module-designer) — designing the module.
- [Menu configuration](/menu/) — making it reachable.
- [Permissions](/concepts/permissions) — how setup fits the four layers.
