---
description: "Switching between tenants, and why data never crosses between them."
---

# Choosing a tenant

::: tip Who can do this
Anyone whose account reaches more than one tenant.
:::

A **tenant** is an isolated environment with its own projects, modules, records
and users. Many organisations run several — one for live work, one for training,
sometimes one per customer or site.

<Shot src="account/tenant-picker" alt="The tenant switcher"
  caption="The switcher at the top of the sidebar — search, then pick." />

## Switching

The switcher is the **button at the very top of the sidebar**, showing your
current tenant and its plan.

1. Click it. A list of every tenant you can reach drops down.
2. **Search** by name — the list is long in most organisations.
3. Click the one you want.

Your current tenant is marked **Current** and sits at the top.

Everything reloads into that environment: the sidebar, your projects, your
tasks. Each tenant is marked with its own initials and colour, which is the
fastest way to tell at a glance where you are.

## What does not follow you

::: warning Data never crosses between tenants
A record in one tenant does not exist in another. Neither do its modules,
masters, documents or users.

If something you expect has vanished, **check which tenant you are in before
anything else.** It is the single most common cause of "the record has
disappeared", and it looks identical to a permissions problem.
:::

Your [profile preferences](/account/profile) — date format, theme, AI insight
settings — are yours rather than the tenant's, so those do follow you.

## Why access differs between them

Your permissions are granted **per tenant**. Being an administrator in one
grants you nothing in another, and a module you use daily in one may not exist
in the other at all.

A sidebar that looks wrong after switching is usually correct: it is showing
what that tenant grants you. See [Permissions](/concepts/permissions).

## Related

- [Signing in](/account/signing-in)
- [How do I switch to a different tenant?](/recipes/account/switch-tenant)
