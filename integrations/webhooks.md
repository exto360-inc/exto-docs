---
description: "Notifying an external system when something happens in Exto."
---

# Webhooks

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

A webhook tells an external system that something happened in Exto, by sending
an HTTP request to a URL you control.

<DFlow dir="right" :steps="[
  { title: 'Something happens', body: 'A record is submitted, or a workflow action is taken.' },
  { title: 'Exto sends a webhook', body: 'An HTTP POST to the URL you configured.' },
  { title: 'Your system acts on it', body: 'Create a record, notify someone, or update another tool.' },
]" />

It is fire-and-forget: the delivery is logged, but nothing waits for the
response.

Webhooks are tenant-level, at **Settings → Integrations → Webhooks**.

<Shot src="integrations/webhooks-menu" alt="Settings menu open with Integrations expanded, showing Webhooks and Webhook logs"
  caption="Settings → Integrations → Webhooks." />

<Shot src="integrations/webhooks" alt="The webhook list"
  caption="Configured webhooks, each with its event and enabled state." />

## List page

Every webhook in the tenant: its **name**, **description**, the **event** it
listens for, who last updated it and when, and whether it is **enabled**.
Disabling one stops deliveries without losing the configuration.

## Before you start

- <Perm role="PME" /> access.
- A reachable **HTTPS** URL to send to.
- Whatever authentication the receiver expects — a token, a key, or headers.
- A clear idea of which **event**, and which **modules** or **projects**, it
  should cover.

## Creating a webhook

<Shot src="integrations/webhooks-create" alt="New Webhook form with Name, Description, Event, Enabled, URL, Authentication Type, Headers and Filters"
  caption="The New Webhook form: basics, where to send it, headers, and filters." />

| Field | Notes |
| --- | --- |
| **Name** | Required. |
| **Description** | Optional. |
| **Event** | Required. The one event that triggers it. |
| **Enabled** | On by default. |
| **URL** | Required. Must be `https://`. |
| **Authentication** | Required. `None`, `Basic HTTP`, or `Bearer` — defaults to `None`. |
| **Headers** | Any key/value headers the target needs, added one at a time. |
| **Modules** | One or more modules. Without one, the webhook fires for every module in the tenant. |
| **Schedule filter** | An operator (`Equals`, `Starts with`, `Contains`) and a value. |
| **Project filter** | An operator (`Equals`, `Starts with`, `Contains`) and a value. |
| **Document filter** | An operator (`Equals`, `Starts with`, `Contains`) and a value — sets the directory `DOCUMENT_UPLOADED` watches, and is required in practice for that event. |

::: tip Secrets are masked
Once saved, a **Basic HTTP** password or **Bearer** token always displays as
`•••••` and is never shown again. Leaving it untouched on edit keeps the
original value; typing into it replaces it. If you've lost it, generate a new
credential and paste it in.
:::

## Events

| Event | Fires when |
| --- | --- |
| `RECORD_CREATED` | A new record is created in the module. |
| `RECORD_UPDATED` | Any field on an existing record changes. |
| `RECORD_SUBMITTED` | A record is submitted into workflow. |
| `RECORD_RETURNED` | A record is sent back a step for rework. |
| `DOCUMENT_UPLOADED` | A document is uploaded into the directory the webhook's document filter names — this event is about documents, not records. |

One webhook listens for one event. Listening for two means two webhooks.

## Filters

Filters stop a webhook firing for everything in the tenant:

- **Modules** — one or more modules.
- **Schedule filter**, **project filter**, **document filter** — each with an
  operator (`Equals`, `Starts with`, `Contains`) and a value.

::: tip Filter by module first
A `RECORD_UPDATED` webhook with no module filter fires for every update in the
tenant. That is rarely what anyone means.
:::

## Authentication

| Type | Sends |
| --- | --- |
| **None** | Nothing — only appropriate for an endpoint that needs no auth. |
| **Basic HTTP** | A username and password, as an `Authorization: Basic …` header. |
| **Bearer** | A token, as an `Authorization: Bearer …` header. |

Anything else your endpoint requires goes in **headers**.

::: warning Exto does not sign webhooks
There is no signature header to verify. The Basic or Bearer credential is the
only proof a call came from Exto, so the receiving system should require the
authorization header and reject calls without it. **None** means an endpoint
that trusts any caller.
:::

## The payload

Every delivery is a single `POST` with the same shape:

```json
{
  "data": { "...": "the module record's fields, see the table below" },
  "moduleName": "issue",
  "moduleId": "issue",
  "tenantId": "...",
  "projectId": "...",
  "projectName": "...",
  "documentPath": "...",
  "eventId": "a1b2c3d",
  "eventName": "RECORD_CREATED",
  "identifier": "...",
  "workflow": {
    "id": "...",
    "currentStepName": "...",
    "actionName": "...",
    "nextStepName": "...",
    "status": "..."
  }
}
```

| Field | Holds |
| --- | --- |
| `data._id` / `data.recordNumber` | The internal ID, and the user-facing record number. |
| `data.customFields` | The record's field values, as entered on the form. |
| `data.status` / `data.bpname` | The current status, and the business process it belongs to. |
| `data.createdBy` / `data.updatedBy` | Who created it, and who last changed it. |
| `data.workflowTemplateId` | The workflow template governing the record. |
| `data.createdAt` / `data.updatedAt` | ISO-8601 timestamps, to millisecond precision. |
| `workflow` | Present for workflow events — the current step, the action taken, the next step, and the resulting status. |

::: tip Checklist data is not included
The payload is record-level fields only. Checklist answers and custom line
items aren't in it — fetch them separately if you need them.
:::

::: warning Reply within 5 seconds
Each delivery attempt gets 5 seconds to connect and receive a response, and
the whole event has a 30-second limit across any retries. Reply with a 2xx
immediately and do slow processing afterward — otherwise the delivery is
marked failed even if your system eventually handled it.
:::

## The execution log

**Settings → Integrations → Webhook logs** records every delivery: the
request, the response, and its status. Opening an entry shows both bodies.

| Status | Means |
| --- | --- |
| **Initiated** | Sent; waiting on a response. |
| **Success** | A 2xx response came back. |
| **Failed** | An error, a timeout, or a non-2xx response. |

When a target reports it never received anything, check the log before
changing the configuration — the response code and body usually name the
problem.

::: warning Deliveries are not retried indefinitely
If a target is unavailable, the log holds the failure. Confirm the endpoint is
reachable and the auth is still valid, then re-enable or re-trigger.
:::

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Nothing in the log | The event never fired for that record. | Check **Enabled**, the **Event**, and that the record matches **Modules**/filters — loosen them to test. |
| `401` / `403` in the log | Wrong or missing credentials. | Check **Authentication**, header values, and whether a token has expired. |
| `404` in the log | Wrong URL, or the endpoint doesn't exist. | Recheck the URL for typos or a missing path. |
| **Failed**, but the receiver's own logs show nothing | Likely a timeout — see [The payload](#the-payload). | Reply 2xx immediately and process afterward. |
| `5xx` in the log | An error on the receiver's side. | Read the captured response body and escalate to that system's owner. |
| Checklist data missing from the payload | Expected — see [The payload](#the-payload). | Fetch checklist data separately. |
| Can't see a saved token or password | Secrets always display as `•••••` and aren't shown again. | Generate a new credential and update the webhook. |
| The receiver gets duplicate messages | Two enabled webhooks share the same event and URL, or a retry redelivered. | Check for a duplicate webhook; make the receiver idempotent regardless. |

## Setup checklist

Before relying on a webhook in production:

- The **name** and **description** explain its purpose and who owns it.
- The **event** is the most specific one available for what you're watching.
- The **URL** is `https://`, and its owner has confirmed it.
- **Authentication** is `Basic HTTP` or `Bearer` — not `None`.
- The receiver replies **2xx within 5 seconds**.
- **Modules** and filters are narrowed to only the records you need.
- A test event was triggered and shows **Success** in the log.

## Webhooks versus external services

A webhook **tells**; an [external service](/integrations/external-services)
**asks**. If you need the answer back on the record, you want a service.

## Permissions

Creating and editing webhooks happens under **Settings** and requires
<Perm role="PME" />.

Deliveries carry no user identity beyond what you put in the headers, so the
receiving system should authenticate the request rather than trust its
contents.
