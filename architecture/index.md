---
description: "How Exto is put together, for the people who build it."
---

# Architecture

How Exto is put together, for people who build it. The
[manual](/getting-started/) explains what the product does; this explains why it
is shaped the way it is.

::: tip Scope
These pages describe the **application** — its layers, its engines and how a
feature is composed. They deliberately say nothing about infrastructure,
hosting or deployment.
:::

## The shape of the system

<DFlow :steps="[
  {
    title: 'Web client',
    body: 'Feature modules · services · stores · route guards',
  },
  {
    title: 'API server',
    body: 'Routes → controller → service → repository → model',
    edge: 'HTTP',
  },
]" />

Two applications, one contract. Nearly everything interesting happens in the
**service** layer of the API and in the **feature modules** of the client.

## Application architecture

| Page | Covers |
| --- | --- |
| [The web client](/architecture/web-client) | Feature modules, services, stores, and how a route is guarded. |
| [API layers](/architecture/api-layers) | Routes to controller to service to repository, and what belongs where. |
| [The data model](/architecture/data-model) | Schema-driven modules, records, and how scope is applied. |
| [The form engine](/architecture/form-engine) | How a definition becomes a live, rule-driven form. |
| [The workflow engine](/architecture/workflow-engine) | Template, version, instance, and the action registry. |
| [Records & audit](/architecture/records-and-audit) | The save path, and how history stays off it. |

## Feature architecture

| Page | Covers |
| --- | --- |
| [Module designer](/architecture/module-designer) | The tab shell, the save contract, and the canvas editors. |
| [CX designer](/architecture/cx-designer) | Workbench, levels, stages, templates, and provisioning. |
| [CX execution](/architecture/cx-execution) | The matrix renderer, the date engine, gates and rollup. |
| [The AI platform](/architecture/ai-platform) | The knowledge base, the reasoning loop, and the guard layer. |

## Reading these

Each page names the files it was written from. A claim you doubt is a file you
can open; a page you are changing tells you what to re-read.

Diagrams are drawn in the page rather than embedded as images, so they diff in
review and cannot drift out of step with a caption nobody updated.
