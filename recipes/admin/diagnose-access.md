---
description: "Working down the layers to find which one is blocking somebody."
---

# How do I find out why someone can't see something?

::: tip Who can do this
Anyone can follow the checks; fixing usually needs a project administrator.
:::

Five separate systems can hide something, and they all look identical from the
outside. Work down this list in order — it is ordered by how often each is the
answer.

## Steps

1. **Which tenant are they in?** Data never crosses tenants. If nothing at all
   looks right, this is why.
2. **Is it a Settings page?** All of Settings is gated by one thing: the
   application role must be `PME`. No group grant substitutes for it.
3. **Is the module granted to one of their groups?** If it is missing from the
   sidebar entirely, start here.
4. **Can they see all records?** Without **View all records** they see only
   records their workflow step makes theirs. An empty list usually means this.
5. **Are they a current step assignee?** A record they can see but not act on
   means the buttons belong to somebody else right now.

## Result

| Symptom | Layer |
| --- | --- |
| Nothing anywhere looks right | Wrong tenant |
| No Settings at all | Application role is not `PME` |
| Module missing from the sidebar | Group grant, or no menu entry |
| Module opens, list is empty | **View all records**, or nothing on their step |
| Record visible, no buttons | Not a current step assignee |
| Buttons but no Reopen or Revise | Module setup owners, or the module switch is off |
| CX stage invisible | Stage configuration — implicit deny |

::: warning Permissions compound, in the same context
Several grants are often needed together, and they must be held at the **same**
level. `Project setting` at tenant level plus `View Project groups` at project
level satisfies neither — the tab appears and loads nothing.
:::

## Related

- [How do I give someone access to a module?](./grant-module-access)
- [Permissions](/concepts/permissions)
