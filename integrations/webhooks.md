---
description: "Notifying an external system when something happens in Exto."
---

# Webhooks

A webhook tells an external system that something happened in Exto, by sending
an HTTP request to a URL you control. It is fire-and-forget: the delivery is
logged, but nothing waits for the response.

Webhooks are tenant-level, at **Settings → Webhooks**.

<Shot src="integrations/webhooks" alt="The webhook list" pending
  caption="Configured webhooks, each with its event and enabled state." />

## List page

Every webhook in the tenant, with its title, the event it listens for, and
whether it is **enabled**. Disabling one stops deliveries without losing the
configuration.

## Creating a webhook

| Field | Notes |
| --- | --- |
| **Title** | What it is for. |
| **Description** | Optional. |
| **Event** | The one event that triggers it. |
| **URL** | Where the request goes. |
| **Authentication** | `None`, `Basic HTTP`, or `Bearer`. |
| **Headers** | Any key/value headers the target needs. |
| **Filters** | Narrow which occurrences fire. |
| **Enabled** | Whether it delivers. |

## Events

| Event | Fires when |
| --- | --- |
| `RECORD_CREATED` | A record is created. |
| `RECORD_UPDATED` | A record is updated. |
| `RECORD_SUBMITTED` | A record is submitted. |
| `RECORD_APPROVED` | An approving action is taken. |
| `RECORD_REJECTED` | A rejecting action is taken. |
| `RECORD_RETURNED` | A record is returned. |
| `RECORD_WITHDREW` | A record is withdrawn. |
| `DOCUMENT_UPLOADED` | A document is uploaded. |

One webhook listens for one event. Listening for two means two webhooks.

## Filters

Filters stop a webhook firing for everything in the tenant:

- **Module** — one or more modules.
- **Schedule name**, **project name**, **document path** — each with an
  operator: `Equals`, `Starts with` or `Contains`.

::: tip Filter by module first
A `RECORD_UPDATED` webhook with no module filter fires for every update in the
tenant. That is rarely what anyone means.
:::

## Authentication

| Type | Sends |
| --- | --- |
| **None** | Nothing. |
| **Basic HTTP** | A username and password. |
| **Bearer** | A token. |

Anything else your endpoint requires goes in **headers**.

## The execution log

**Settings → Webhook log** records every delivery: the request, the response,
and whether it succeeded. Opening an entry shows both bodies.

When a target reports it never received anything, check the log before
changing the configuration — the response code usually names the problem.

::: warning Deliveries are not retried indefinitely
If a target is unavailable, the log holds the failure. Confirm the endpoint is
reachable and the auth is still valid, then re-enable or re-trigger.
:::

## Webhooks versus external services

A webhook **tells**; an [external service](/integrations/external-services)
**asks**. If you need the answer back on the record, you want a service.

## Permissions

Creating and editing webhooks is an administrator task, reached through
Settings. Deliveries carry no user identity beyond what you put in the headers,
so the receiving system should authenticate the request rather than trust its
contents.
