---
description: "Feature modules, services, stores, and how a route is guarded."
---

# The web client

A React single-page application organised by **feature**, not by file type.
Thirty-five feature modules, seventy-four services and six stores, with almost
no shared "components" dumping ground.

## The layout

```
src/
├── features/        one folder per product area — the bulk of the code
├── components/      genuinely shared UI, plus the canvas grid
├── services/        HTTP clients, one per domain
├── store/           global client state
├── routes/          the route table and its guards
├── contexts/        cross-cutting React context
└── hooks/           shared hooks, including permission hooks
```

A feature folder owns everything it needs — its pages, components, hooks, API
calls, types and tests. Code moves *into* `components/` or `services/` only once
a second feature genuinely needs it.

## Two kinds of state, kept apart

| Kind | Held in | Examples |
| --- | --- | --- |
| **Server state** | A query cache, keyed and invalidated per request | Modules, records, forms, permissions |
| **Client state** | Global stores | The session, chat, AI availability, feedback modals |

The distinction is load-bearing. Server state is *cached*, not owned — it has a
key, it goes stale, it refetches. Client state is owned and has no source of
truth elsewhere.

Feature-local state stays local. The CX workbench, for instance, keeps its own
store for grid data, panel visibility and view selection rather than pushing
that into the global ones.

## Services

One service per domain, wrapping the HTTP calls for it. A feature calls a
service; it does not assemble URLs itself.

Services also carry the small pieces of protocol knowledge that would otherwise
scatter — how a warning response differs from an error response, how a filter
model is encoded for the backend, how a column is named for a server-side sort.

## Route guards

Three layers, each answering a different question:

| Guard | Asks |
| --- | --- |
| **Protected route** | Are you signed in? |
| **Route access guard** | Are you allowed to open *this* URL? |
| **AI route guard** | Is AI available to you? |

The access guard checks the URL against the same permission feed that builds
the sidebar. Without it, a user who lacks access to a module could still reach
its page by pasting the URL, because the page component renders regardless of
what the sidebar shows.

Only known-sensitive route shapes are gated — modules, records, documents,
photos, reports, workbenches. Everything else renders immediately rather than
waiting on the menu.

::: warning The guard is not the security boundary
It is defence in depth and a better user experience. The real boundary is the
API refusing unauthorised calls. Nothing is protected by the client alone.
:::

The settings subtree is gated separately, by application role, and redirects a
non-admin *before* the lazy subtree mounts — otherwise they would land on a
blank page. See [Permissions](/concepts/permissions).

## Grids

Two different grid technologies, chosen deliberately:

| Grid | Used by | Why |
| --- | --- | --- |
| **A DOM data grid** | Record lists, masters, tasks, jobs | Rich cell editors, filters, grouping, charts |
| **The canvas grid** | The CX matrix | Thousands of cells with no DOM node per cell |

The canvas grid is described in [CX execution](/architecture/cx-execution).

## Where to look

| Concern | Path |
| --- | --- |
| Route table and guards | `src/routes/`, `src/utils/route-access.ts` |
| Permission checks | `src/services/permission.service.ts`, `src/hooks/` |
| Global stores | `src/store/` |
| Shared grid pieces | `src/components/ag-grid/`, `src/components/canvas-grid/` |
