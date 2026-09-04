---
description: "Routes to controller to service to repository, and what belongs where."
---

# API layers

The server is layered, and the layers are strict about what they know. Reading
an unfamiliar endpoint means walking the same four steps every time.

<DFlow :steps="[
  { title: 'routes', body: 'Registers the URL, attaches middleware' },
  { title: 'controller', body: 'Parses the request, resolves context, shapes the response' },
  { title: 'service', body: 'The business logic — the thick layer' },
  { title: 'repository', body: 'Database access, one per collection' },
  { title: 'model', body: 'The shapes everything above agrees on' },
]" />

Roughly: ninety route files, a handful of controllers, **two hundred and fifty
service files**, ninety repositories and a hundred and twenty models. The
imbalance is the point — the rules live in services.

## What belongs where

| Layer | Knows | Must not |
| --- | --- | --- |
| **Routes** | URLs, middleware, grouping | Contain logic |
| **Controller** | Request and response shapes, the caller's context | Query the database |
| **Service** | The rules, and how operations compose | Know about HTTP |
| **Repository** | Queries, indexes, projections | Contain business rules |
| **Model** | Field shapes and enums | Depend on anything above |

A service takes a context and typed arguments, never a request object. That is
what lets one service back an HTTP endpoint, a background job and a test with no
adapter in between.

## Wiring

Services are constructed once at startup into a container and handed to
controllers, rather than reaching for globals. A service's dependencies are
therefore visible in its constructor, and a test can substitute them.

Some services are **optional by construction**: if the configuration for a
capability is absent, the constructor returns nothing and every caller degrades
rather than failing. That is how a capability can be switched off without a
feature flag threaded through the call sites.

## The context

Every authenticated request carries a **context** — who is calling and in which
tenant, workspace and project. It is resolved once, in middleware, and passed
down.

Nothing below the controller reads it from the request. A service that needs the
tenant takes it as an argument, which is why the same service works when called
from somewhere that has no request at all.

## Two routers

The server exposes an **internal** router alongside the public one. Internal
routes carry no user authentication and are separately protected; they exist for
system-to-system calls that have no user behind them.

The distinction matters when reading route files: an endpoint on the internal
router is not reachable the way a normal one is, and its handlers must not assume
a user.

## Validation and defaults

Defaults are stamped **on write**, not read. A validator fills in an omitted
value before it is stored, so every reader downstream sees a concrete value
rather than reimplementing the same fallback.

The consequence for anyone reading the code: a field that looks optional in the
model is often guaranteed present on stored documents. Check the validator
before adding another nil check.

## Migrations

Schema changes run as migrations under a lock, applied once, in order. They run
safely on every start because only pending ones execute.

## Where to look

| Concern | Path |
| --- | --- |
| Route registration | `server/routes/` |
| Request handling | `server/controller/` |
| Business rules | `server/service/` |
| Persistence | `server/repo/` |
| Shapes | `server/model/` |
| Composition root | `server/app_di/`, `server/main.go` |
