---
description: "Registering a dashboard so it can be scoped and linked."
---

# Dashboard setup

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

**Settings → Dashboard setup** is the register of dashboards. Building one and
registering one are separate steps: the builder makes the thing, setup makes it
addressable.

<Shot src="build/dashboard-builder" alt="Dashboard setup"
  caption="The dashboards registered in this tenant, with the level each applies at." />

## What a registration holds

| Field | Notes |
| --- | --- |
| **Dashboard name** | The internal identifier used for lookup. |
| **Display name** | What people read — shown in menu setup and the sidebar. |
| **Description** | Optional. |
| **Applicable level** | `TENANT`, `WORKSPACE` or `PROJECT`. |

The two names do different jobs, and the distinction matters when a dashboard
stops appearing: the **name** is what the menu item points at, so renaming it
breaks the link. The **display name** is only ever read by people, so it can
change freely.

## Applicable level

The level decides where the dashboard can be linked and what it is scoped to:

| Level | Available |
| --- | --- |
| **Tenant** | Everywhere in the tenant. |
| **Workspace** | Within that workspace. |
| **Project** | Within that project. |

This mirrors how [modules are deployed](/setup/deploying) — same three levels,
same reasoning.

## Steps

1. Open **Settings → Dashboard setup**.
2. Choose **Add dashboard**.
3. Enter the **dashboard name**, **display name** and **level**.
4. Save.
5. Add a menu item of type **Dashboard** pointing at it. See
   [Menu configuration](/menu/).

::: warning Registering is not linking
A registered dashboard is reachable by nobody until a menu item points at it.
That is the most common reason a finished dashboard "does not appear".
:::

## Related

- [The dashboard builder](/analytics/dashboard-builder)
- [Menu configuration](/menu/)
