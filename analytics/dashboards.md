---
description: "What dashboards are in Exto, and the two kinds you may meet."
---

# Dashboards

A dashboard is a live screen of tiles and charts over your records. People open
it to see the state of things, not to work on an individual record.

## Where they appear

A dashboard reaches people through the [menu](/menu/). A menu item of type
**Dashboard** opens it in a **side panel** rather than as a full page — the same
way an embedded page opens — so it can sit beside what you were doing.

A dashboard can also be somebody's [landing page](/menu/), which is the
usual arrangement for a manager.

## Two kinds

Exto has two dashboard mechanisms, and they are served differently.

| | **Builder dashboards** | **Custom dashboards** |
| --- | --- | --- |
| Built in | The [dashboard builder](/analytics/dashboard-builder) | Built outside Exto |
| Registered in | [Dashboard setup](/analytics/dashboard-setup) | Menu setup, as an embedded page |
| Served by | Exto | A separate dashboard server |

::: tip Which one am I looking at?
If it was assembled in the builder under Settings, it is the first. If somebody
handed you a URL to embed, it is the second. They look similar to a reader and
are maintained in completely different places.
:::

## Getting one in front of people

Three steps, and all three are needed:

1. **Build it** — in the [dashboard builder](/analytics/dashboard-builder).
2. **Register it** — in [dashboard setup](/analytics/dashboard-setup), which
   names it and scopes it.
3. **Link it** — add a menu item of type **Dashboard**. See
   [Menu configuration](/menu/).

A dashboard that is built but not registered cannot be linked; one that is
registered but not linked is reachable by nobody.

## Who sees it

A dashboard appears for people whose permissions include its menu item, at the
level it is scoped to. The underlying figures obey the same record permissions
as everywhere else — a dashboard cannot show somebody records they could not
open.

## Related

- [Dashboard setup](/analytics/dashboard-setup)
- [Menu configuration](/menu/)
- [Reports](/work/reports) — the document equivalent.
