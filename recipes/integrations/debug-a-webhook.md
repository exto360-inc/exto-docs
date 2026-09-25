---
description: "Finding out why an outbound notification did not arrive."
---

# How do I find out why a webhook failed?

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

## Steps

1. Open **Settings → Webhook log**.
2. Find the delivery — filter by webhook, status or time.
3. Open it and read the response the receiving system returned.

## Result

You see what was sent, what came back, and the status code. That usually
separates the three common causes:

| What you see | Means |
| --- | --- |
| No delivery at all | The event did not fire — check the webhook's events and that it is enabled. |
| A 4xx response | The receiving system rejected it — usually authentication or payload shape. |
| A timeout | The receiver was too slow or unreachable. |

::: tip Outbound calls have a separate log
A webhook is Exto calling out on an event. An
[external service](./call-another-system) is Exto calling out on a field change,
and it has its own **external service log**. Check the right one.
:::

## Related

- [How do I notify another system when a record is approved?](./notify-another-system)
