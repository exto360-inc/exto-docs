---
description: "Reading from an external system, and notifying it."
---

# Recipe: connecting an external system

Make a record read from another system while it is being filled in, and tell
that system when it is approved. About twenty minutes, plus whatever the other
system's API costs you.

**You will touch:** [external services](/integrations/external-services) ·
[forms](/build/forms) · [steps & actions](/build/steps-and-actions) ·
[webhooks](/integrations/webhooks)

## Decide which direction you need

| Need | Use |
| --- | --- |
| The answer, on the record | An **external service** — it is synchronous. |
| To tell someone it happened | A **webhook** — fire-and-forget. |

Most integrations are both, doing different jobs.

## 1. The inbound half — an external service

**Module designer → External services → New.**

- **Type**: `Field` if one field triggers it, `Form` if the whole form does.
- **Method** and **URL**.
- **Authentication** — for a user-scoped system, prefer the **user MS access
  token** or **user Google access token** so the far end sees who is acting,
  rather than a shared service account.
- **Timeout** — the default 3,000ms is short for a slow system. Raise it
  deliberately rather than after the first complaint.

### Map the response

Define **response fields** matching the payload. Use `Array` with children for
anything nested — that is how a list maps onto a sub-table.

If the endpoint returns a list but your field takes one value, turn on **force
single object as response mapping**.

### Use it on the form

Add an **Auto populate** field and point it at the service, or attach the
service to the form. See [Forms](/build/forms).

## 2. Debug it with logging on

Set the service's log level to **Debug** and turn on **log request and
response**. Run it once, read
**Settings → External service log**, then turn the logging back down.

::: warning Body logging captures everything
Including anything sensitive the endpoint returns. Do not leave it on.
:::

## 3. The outbound half — a webhook

**Settings → Webhooks → New.**

- **Event**: `RECORD_APPROVED`.
- **Filter by module** — without this it fires for every approval in the
  tenant, which is almost never what anyone means.
- **URL**, **auth** (`Basic HTTP` or `Bearer`), and any **headers**.
- **Enable** it.

One webhook listens for one event. Two events means two webhooks.

## 4. Optionally, call out on the action itself

An action can carry an external service, so pressing **Approve** makes a
synchronous call as part of the transition. Use this when the approval must
fail if the other system rejects it — a webhook cannot do that, because nothing
waits for it.

See [Steps & actions](/build/steps-and-actions).

## 5. Verify from the logs, not the record

Neither failure surfaces on the record. Check:

- **Settings → External service log** — the outbound call.
- **Settings → Webhook log** — the delivery, its response code and body.

If an integration "did nothing", one of those two logs says why.
