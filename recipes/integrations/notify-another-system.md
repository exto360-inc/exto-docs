---
description: "Telling an external system when something happens in Exto."
---

# How do I notify another system when a record is approved?

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

A **webhook** points outward: when something happens in Exto, Exto tells
somebody else. It is the opposite direction to an
[external service](./call-another-system).

## Steps

1. Open **Settings → Webhooks**.
2. Add a webhook with the receiving **URL**.
3. Choose the **events** that should fire it.
4. Add any **headers** the receiving system needs to authenticate the request.
5. Save and enable it.

## Result

Exto posts to that URL when those events happen. Deliveries are recorded in the
**webhook log**.

::: warning Deliveries carry no user identity
Beyond what you put in the headers, the receiving system has nothing to identify
the caller. It should authenticate the request rather than trust its contents.
:::

## Related

- [How do I find out why a webhook failed?](./debug-a-webhook)
