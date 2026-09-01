---
description: "Schema-driven modules, stable ids, and how scope is applied."
---

# The data model

Exto is **schema-driven**. Modules are not code — they are documents describing
fields, forms and workflows, interpreted at runtime. Adding a module ships no
new screens, because every screen is already generic.

## The chain

```
Module          what kind of thing this is
  ├─ Table      the columns its records store
  ├─ Form(s)    what a person fills in
  ├─ Workflow   where records go
  └─ Record(s)  the actual data
        ├─ field values
        ├─ workflow instance
        ├─ documents · comments · linked records
        └─ history
```

Everything above the record is **definition**; the record is **data**. That
split is why one designer screen can produce any module, and why a module's
behaviour changes without shipping code.

## Identity

Definitions are referenced by **stable id**, never by name.

- A form field binds to a table column by the column's id, so relabelling a
  field cannot break it.
- A reference table points at its target by id, so renaming that module cannot
  break it.
- A CX gate names its target asset by id, so renaming an asset — including
  through a bulk import — cannot break it.

The names shown in the interface are resolved from those ids on read. When you
see a list rendering names it did not store, this is why.

The exception is a module's own **name**, which is its route and its key. That
one is fixed at creation precisely because so much refers to it.

## Scope

Every record belongs to a context:

```
Tenant
└─ Workspace
   └─ Project
      └─ Space
```

A module is **deployed** at tenant, workspace or project level, and that
decides where its records live and who can reach them. Scope is applied at the
query, not filtered afterwards.

Tenants are isolated. Nothing crosses that boundary — there is no cross-tenant
query, and a tenant identifier is part of the context on every call.

## Kinds

A module's **kind** selects which screens it gets, not how it stores data:

| Kind | Screen |
| --- | --- |
| Standard | The record list and record detail |
| Master data | A flat editable grid |
| Hierarchical master data | A tree |

Hierarchical rows carry three managed system fields — the row's own id, its
parent's id, and its full path. The parent reference is what creates the tree;
the path makes subtree queries cheap.

## System fields

Some fields are written by the platform and never by a user: identifiers,
record numbers, created and updated stamps, status, and the workflow flags.

The form designer places them read-only when they appear on a form, because a
required toggle on one would describe an input nobody can satisfy.

## Definitions evolve, data does not follow

The rule that explains most surprising behaviour:

| Change | Reaches existing records? |
| --- | --- |
| Editing a **form** | **Yes, immediately** |
| Publishing a **workflow version** | No — records finish on the version they started |
| Publishing a **CX stage template** | No — assets keep the stages they were provisioned with |
| Approving a **checklist version** | No — a record resolves the version it picked up |

Forms are the outlier, and worth remembering before editing one.

## Where to look

| Concern | Path |
| --- | --- |
| Module and record shapes | `server/model/` |
| Scope resolution | the request context, `server/app/` |
| Form and field definitions | `server/model/`, `src/features/form-renderer-v2/types/` |
