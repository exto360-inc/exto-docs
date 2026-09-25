---
description: "Bringing a module in from another tenant or environment."
---

# Importing a module

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

A module built in one place can be imported into another — moving a process from
a training tenant to a live one, or reusing a design across environments.

## Steps

1. Open **Settings → Module setup → Import**.
2. Follow the wizard, supplying the module definition.
3. Review what will be created before confirming.

## What comes across

The module's **definition** — its fields, forms, rules and workflow.

::: warning What does not come across
**Records, assignees and owners do not travel with a module.** A module arrives
designed but undeployed, and needs its own
[setup](/setup/deploying) in the destination — context, access and step
assignees, all named again.

Neither do the [masters](/concepts/masters) its fields point at. Load those
first, or its lookups resolve to nothing.
:::

## A working order

1. Import the **masters** the module depends on.
2. Import the **module**.
3. Create its **setup** — context, access, assignees.
4. Add it to the [menu](/menu/).
5. Open a record and check the lookups resolve.

Step 5 is the test that matters. A module that imports cleanly can still be
unusable if its reference data is missing.

## Related

- [Deploying a module](/setup/deploying)
- [Importing & exporting](/work/import-export) — data rather than definitions.
