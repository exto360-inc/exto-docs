---
description: "How a stored definition becomes a live, rule-driven form."
---

# The form engine

The engine that turns a stored form definition into a live screen — laying out
fields, running rules, computing formulas, and keeping a sub-table's rows
behaving like the form around them.

It is the most intricate part of the client, because everything a designer can
express has to be interpreted here.

## The pieces

```
definition  ──▶  runtime  ──▶  dependency graph  ──▶  change pipeline
  fields          rules            what depends            ordered
  rules           formulas          on what                operations
  formulas        engines
```

| Piece | Responsibility |
| --- | --- |
| **Runtime** | Holds the config, rules and formulas for one form scope, plus the engines that evaluate them. |
| **Dependency graph** | Precomputes which fields affect which others. |
| **Change pipeline** | Turns one edit into an ordered list of operations. |

## Two scopes, one base

A form and a sub-table are the same problem at different scales, so they share
a base runtime and differ only where they must:

- The **main form** runtime, for the record's own fields.
- The **detailed form** runtime, for the rows of a sub-table.

A sub-table row therefore gets the same rules, formulas and mandatory logic as
the form containing it, without that logic being written twice.

## The dependency graph

Before anything is evaluated, the engine works out what depends on what:

| Relationship | Means |
| --- | --- |
| **Formula, frontend** | A computed value this client can evaluate itself. |
| **Formula, backend** | A computed value the server must produce. |
| **Data source filter** | One field narrows another's options. |
| **Mirror copy** | A value copied into another field. |

Precomputing this is what lets a change fan out to exactly the affected fields
rather than re-evaluating the whole form on every keystroke.

## The change pipeline

An edit does not apply directly. It is **planned** into operations, and the plan
is then executed. Operations include setting a value, setting a cell in a
sub-table row, invalidating a data source, syncing a mirrored value across a
row, and asking the server to evaluate formulas or rules.

Two properties follow from planning before acting:

- **Order is explicit.** A formula that feeds a rule runs first because the plan
  says so, not because of the order fields happen to sit in.
- **Round trips are batched.** Every field needing server evaluation from one
  change goes in one request.

## Frontend and backend evaluation

Formulas are split. Simple arithmetic over loaded values runs in the client, for
immediacy. Anything needing data the client does not hold runs on the server.

Rules are similar: the engine applies what it can locally and defers the rest.

::: warning A validation is not a rule
Rules run against an open form. **Validations** run when the record is
submitted, including submissions from other systems. That is why they are stored
separately even though they are edited together. See
[Rules & validations](/build/rules).
:::

## Events

The engine evaluates on **load**, on **change** and on **submit** — the same
events a rule can be bound to. Load-time evaluation is what makes a form arrive
already consistent rather than correcting itself after the first edit.

## Sub-tables

Sub-table rows carry their own cell state — visible, enabled, mandatory,
readonly — per cell rather than per column, so a rule can make one row's cell
required without touching its neighbours.

Mirrored values propagate along a row: changing a source cell updates its
siblings in the same row rather than the same column.

## Where to look

| Concern | Path |
| --- | --- |
| Runtimes | `src/features/form-renderer-v2/runtime/` |
| Dependency graph | `src/features/form-renderer-v2/dependencies/` |
| Change pipeline | `src/features/form-renderer-v2/pipeline/` |
| Field types | `src/features/form-renderer-v2/types/` |
| Designer catalog | `src/features/module-designer/forms/formFieldCatalog.ts` |

## Related

- [Forms](/build/forms) and [Field types](/build/field-types) — the product view.
- [Module designer](/architecture/module-designer) — the editor that produces
  these definitions.
