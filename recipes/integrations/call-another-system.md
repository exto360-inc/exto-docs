---
description: "Fetching a value from an external system when a field changes."
---

# How do I call another system when a field changes?

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

An **external service** is an outbound call whose response can land back on the
record — a vendor's credit limit, a stock level, a validation.

## Steps

1. Open **Settings → Module designer → External services**.
2. Add a service: its URL, method, and authentication.
3. Map the **request** — which record fields go out.
4. Map the **response** — which returned values land on which fields.
5. Set a **timeout**. The default is 3,000ms, which is short for a slow system.
6. On the field that should trigger it, set **Run after change**.

## Result

Changing that field calls the service and writes the mapped values back. The
result appears in the record's **External service** widget.

::: warning Check which identity the far end sees
Where the service uses a user access token, the call runs as the **user who
triggered it**. Otherwise it runs as the configured credentials.
:::

## Related

- [How do I find out why a webhook failed?](./debug-a-webhook)
- [External services](/integrations/external-services)
