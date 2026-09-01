---
description: "Switching environments, and why data never crosses between them."
---

# Choosing a tenant

A **tenant** is an isolated environment with its own workspaces, modules,
records and users. If your account can reach more than one, you choose which
you are working in.

<Shot src="account/tenant-picker" alt="The tenant picker" pending
  caption="Picking a tenant — everything below reloads into that environment." />

## Switching

Use the tenant picker. Everything reloads into that tenant: its workspaces, its
modules, its records, its menus.

Your access is not the same in every tenant. You may be an administrator in one
and a read-only user in another, because [groups](/admin/groups) are per
tenant.

## Isolation

Data does not cross a tenant boundary. Records, masters and settings in one
tenant are invisible from another, whatever your access. There is no
cross-tenant search, no cross-tenant report, and no cross-tenant link.

::: warning "The record has disappeared"
Being in the wrong tenant is the most common cause, and it looks exactly like
a permissions problem. Check the tenant before anything else.
:::

## Why a tenant might be missing from your picker

- Your account has not been granted access to it.
- Access was granted but you have not signed out and in again.
- The tenant is under maintenance or has been decommissioned.

Access to a tenant is tied to your account, so an administrator in the *target*
tenant has to grant it.

## Related

- [Signing in](/account/signing-in)
- [Projects & spaces](/concepts/projects-and-spaces) — the hierarchy inside a
  tenant.
