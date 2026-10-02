---
description: "Calling another system, telling one something happened, or letting one call you directly."
---

# Integrations

Exto rarely runs alone. A vendor's credit limit lives in your finance system;
your maintenance system needs to know the moment an inspection fails; your own
reporting pipeline wants to pull records on its own schedule.

Three features cover those, and they point in different directions.

| | [External services](/integrations/external-services) | [Webhooks](/integrations/webhooks) | [Data API](/integrations/data-api) |
| --- | --- | --- | --- |
| Direction | Exto calls out | Exto notifies out | Your system calls in |
| Triggered by | A field, a form, or a workflow action | An event on a record | Whenever your system needs it |
| Response | Read and mapped back onto the record | Ignored beyond delivery | Returned directly to your caller |
| Configured in | Module designer → External services | Settings → Webhooks | Settings → Integrations → Key management |
| Use for | Fetching data, validating against a system of record | Telling another system something happened | Reading or writing Exto data on your own schedule |

## Choosing between them

If you need the answer **on the record**, call an **external service** — it is
synchronous and its response can populate fields. If you only need to **tell**
someone, send a **webhook** — it is fire-and-forget and does not slow the user
down. If **your own system** needs to read or write Exto data directly — on a
schedule, in bulk, or outside any one record's lifecycle — use the
**Data API**.

## Logs

All three are logged, and each log is the first place to look when an
integration "did nothing":

- **External service log** — outbound calls, with request and response
  according to the service's log level.
- **Webhook execution log** — every delivery, its request, its response and
  whether it succeeded.
- **Key management log** — every Personal Access Token: who generated it, its
  expiry, and whether it's enabled, disabled, or revoked.

None of these failures surface on the record itself, so the log is not
optional reading.

## Related

- [External services](/integrations/external-services)
- [Webhooks](/integrations/webhooks)
- [Data API](/integrations/data-api)
- [Job status](/work/recycle-bin) — for background work that is neither.
