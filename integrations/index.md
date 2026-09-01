---
description: "Calling another system, versus telling one something happened."
---

# Integrations

Two ways to connect Exto to systems outside it, pointing in opposite
directions.

| | [External services](/integrations/external-services) | [Webhooks](/integrations/webhooks) |
| --- | --- | --- |
| Direction | Exto calls out | Exto notifies out |
| Triggered by | A field, a form, or a workflow action | An event on a record |
| Response | Read and mapped back onto the record | Ignored beyond delivery |
| Configured in | Module designer → External services | Settings → Webhooks |
| Use for | Fetching data, validating against a system of record | Telling another system something happened |

## Choosing between them

If you need the answer, call an **external service** — it is synchronous and
its response can populate fields. If you only need to tell someone, send a
**webhook** — it is fire-and-forget and does not slow the user down.

## Logs

Both are logged, and both logs are the first place to look when an integration
"did nothing":

- **External service log** — outbound calls, with request and response
  according to the service's log level.
- **Webhook execution log** — every delivery, its request, its response and
  whether it succeeded.

Neither failure surfaces on the record itself, so the log is not optional
reading.

## Related

- [External services](/integrations/external-services)
- [Webhooks](/integrations/webhooks)
- [Job status](/work/recycle-bin) — for background work that is neither.
