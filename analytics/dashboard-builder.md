---
description: "Where dashboard tiles are assembled, and how it fits the rest of Exto."
---

# The dashboard builder

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

**Settings → Setups → Dashboard builder** is where the tiles and charts of a
dashboard are assembled.

## What it is

The builder is an **embedded application**, served alongside Exto rather than
being one of its screens. It always appears in Settings — an administrator does
not have to register it first.

Because it runs on the same origin, your session carries into it: you do not
sign in again.

::: tip This page deliberately stops here
The builder's own canvas, widget types and data bindings belong to that
application and are documented with it. What this manual owns is everything
around it — registering the result, scoping it, and getting it in front of
people.
:::

## The path from build to reader

```
Dashboard builder   →  assemble the tiles
Dashboard setup     →  name it and set its level
Menu configuration  →  put it where people will find it
```

Miss any one and the dashboard exists but nobody sees it.

## Custom dashboards are a different thing

A dashboard built **outside** Exto and embedded by URL is not the builder's, and
is not registered in dashboard setup. It is added as a menu item of type
**URL** or **Dashboard** pointing at its own address, and it is maintained
wherever it was built.

The two are kept deliberately separate, so changing one cannot affect the other.
See [Dashboards](/analytics/dashboards).

## Related

- [Dashboard setup](/analytics/dashboard-setup) — the next step.
- [Dashboards](/analytics/dashboards) — the two kinds.
