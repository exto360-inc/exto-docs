---
description: "Making a field available in the record list's column picker."
---

# How do I add a column to the record list?

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

If somebody says a field *"isn't in the list"* of columns they can show, this is
the page to change. Users pick from what a **log page view** offers.

## Steps

1. Open **Settings → Module designer → Log page views**.
2. Open the view, or create one.
3. Add the field to its **columns**, and put it where it belongs in the order.
4. Set a default filter and sort if useful.
5. Save.

## Result

The field is now available in that grid's column picker. Users can show it and
save it in their own [views](/work/views).

::: tip Two layers, deliberately
The **log page view** decides which columns are *available*. A user's **view**
decides which they are *using*. A module with a hundred fields would have a
useless column picker otherwise.
:::

## Related

- [How do I save a view I use every day?](../work/save-a-view)
