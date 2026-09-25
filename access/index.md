---
description: "The four systems that decide who can do what, and how to tell them apart."
---

# Access control

Access in Exto is decided by **four independent systems**, layered on top of
each other. A refusal from any one looks identical from the outside, which is
why most access problems are really identification problems.

| Layer | Set on | Answers |
| --- | --- | --- |
| **Application role** | The user account | Can I reach administrative screens? |
| **Group grants** | Workspace or project groups | Can I open this module? |
| **Module setup** | The module's deployment | Which records, and may I revise or reopen? |
| **Workflow step** | The published workflow | Is *this* record mine to act on now? |

The [CX workbench](/cx/) adds a fifth of its own.

## The pages here

| Page | Covers |
| --- | --- |
| [Permissions](/concepts/permissions) | The four layers in full. |
| [Users](/admin/users) | Accounts and application roles. |
| [Groups & permissions](/admin/groups) | Where access actually comes from. |
| [Stage configurations](/access/stage-configurations) | CX, granted per stage. |
| [Diagnosing "I can't see it"](/recipes/cant-see-it) | Working down the layers. |

## The one thing to remember

::: warning Settings is one gate, not many
The entire **Settings** area is opened by a single check: the user's application
role must be `PME`. There is no per-page permission inside it.

Granting `PME` so somebody can edit a menu also lets them redesign every module
in the tenant. It is never the fix for "they cannot see a module" — that is a
[group grant](/admin/groups).
:::

## Permissions compound

Reaching something usually needs **several grants at once**, held in the **same
context** — all at tenant level, or all at project level.

Splitting them across contexts satisfies neither, and the symptom is specific:
a tab appears and loads nothing. See [Projects](/admin/projects).

## Related

- [Groups & permissions](/admin/groups)
- [Module setup](/setup/access)
