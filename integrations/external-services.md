---
description: "Outbound calls whose response lands back on the record."
---

# External services

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

An external service is an outbound HTTP call Exto makes on your behalf, whose
response is mapped back onto the record. Use one to fetch a value from a system
of record, validate against it, or push a record into it as part of an action.

<DFlow dir="right" :steps="[
  { title: 'Form field', body: 'needs a value' },
  { title: 'External service', body: 'calls the API' },
  { title: 'Response', body: 'fills or validates the field' },
]" />

::: tip The opposite direction to a webhook
A [webhook](/integrations/webhooks) pushes Exto's own updates out to another
system. An external service pulls data in from another system while a form is
open.
:::

They are configured per module: **Settings → [Module designer](/build/module-designer)**,
then the module → **External Services**, the last item in its menu. See
[External service examples](/integrations/external-services-examples) for two
built end to end, field by field.

## List page

Every service defined on the module. Each has a **type**:

- **Field** — attached to a field, called when that field is used.
- **Form** — attached to the form, called on load or on demand.

A service can also be attached to a **workflow action**, so pressing Approve
makes the call. See [Steps & actions](/build/steps-and-actions).

::: warning A failing service blocks a workflow action
When a service is attached to a workflow action, a failed call — a network
error, a non-2xx response, a timeout, or a script error — aborts the whole
transition. It is not fire-and-forget: nothing is approved, submitted, or
completed until the call succeeds.
:::

::: tip There's no delete
A service can be edited at any time, but not removed — if it's no longer
needed, the clearest option is to clear its URL and turn off anything that
triggers it.
:::

## Defining a service

### Request

| Setting | Values |
| --- | --- |
| **Name** | Required. |
| **Type** | Field or Form. |
| **Method** | `GET`, `POST`, `PUT`, `PATCH`, `DELETE`. |
| **URL** | Required. |
| **Timeout** | Milliseconds, from 1,000 to 1,800,000. Defaults to 3,000. |

::: tip One attempt, no automatic retry
If the call fails — timeout, connection refused, a non-2xx response — Exto
doesn't retry it. A flaky API needs its own retry handling, or a generous
timeout, not a second automatic attempt from Exto's side.
:::

### Authentication

| Type | Needs |
| --- | --- |
| **None** | — |
| **Basic** | Username and password. |
| **Bearer** | A token. |
| **User MS access token** | Uses the signed-in user's Microsoft token. |
| **User Google access token** | Uses the signed-in user's Google token. |
| **Connectors** | A connector type — MS Dynamics, AutoDesk or SAP — and a connection. |

The two user-token options call out **as the user**, so the external system
sees who is acting rather than a shared service account — use them when the
result should depend on who's filling in the form, such as listing files that
person can see in their own account. Use Connectors, Basic, or Bearer when the
call should behave the same for everyone.

::: tip Connectors are shared credentials
A connector is a credential saved once — an OAuth client (`client_credentials`,
`password`, or `authorization_code` grant) or a Basic/Bearer pair — that any
number of services can point at instead of each holding its own copy. Updating
one changes it everywhere it's used, so check what else relies on it before
rotating its credentials.
:::

::: tip Saved secrets are masked
After you save a password or token, the field always shows `•••••`, and Exto
never displays it again. Leaving it untouched on a later edit keeps the
original secret — only type into it to replace it.
:::

### Mapping

Six tabs decide what leaves, what comes back, and what happens afterwards —
not every service needs all of them.

| Tab | What it's for |
| --- | --- |
| **Request mapping** | Places values on the outgoing call — a `Source field` → `Target field` row per value. See [Request mapping fields](#request-mapping-fields) for what a source can be. |
| **Response fields** | Declares the shape of the reply: each field is **Text** (a single value) or **Array** (a list, which can carry its own child fields — this is how a nested response fills a sub-table). |
| **Response mapping** | Takes values from the reply and writes them onto the form. Only fields declared under Response fields can be picked here. |
| **Success Script** | Optional custom handling after a successful call, for anything the mappings alone can't cover. |
| **Error mapping** | Turns a failed call into the message the user sees. See [Error mapping](#error-mapping). |
| **Configuration** | Context flags and logging — below. |

Each mapping row also takes:

| Option | Effect |
| --- | --- |
| **Required** | Blocks the call if that value is missing, instead of sending it anyway. |
| **Del. empty** | Drops the field instead of writing it — set this on response mappings so an empty reply doesn't wipe a value the user already entered. |
| **Code** | Produces the value with a script instead of a plain field-to-field copy. |
| **Order** | Rows run in ascending order — put one mapping first if a later one depends on it. |

::: tip Script limits: 10 seconds, 32 MB
Every script here — mapping **Code**, Success Script, and
[Error mapping](#error-mapping) — runs sandboxed, with a 10-second wall-clock
limit, a 10-second CPU limit, and a 32 MB memory limit. A script that hits one
of these fails the mapping, the same as any other script error.
:::

Configuration also holds:

- **Add tenant information** — includes tenant context in the request.
- **Add project information** — includes project context.
- **Add user information** — includes the calling user.
- **Force single object as response mapping when response is an array** — takes
  the first element when the endpoint returns a list but the field expects one
  value.

### Request mapping fields

Every source field starts with `ctx.` — the context of the form that's open.

| Source | Type | Holds |
| --- | --- | --- |
| `ctx.__SEARCH_INPUT__` | Text | What the user typed into an auto-complete search field. |
| `ctx.mainForm.<field name>` | Any | A field on the main form, by its field name. |
| `ctx.subTable.<subtableRefId>` | Array | A sub-table's rows, by its ref ID (the table field's name). Only the first 100 rows are available, and deleted rows are excluded. |

#### Record, tenant, and project

| Source | Type | Holds |
| --- | --- | --- |
| `ctx.record._id` | MongoId | The record's internal ID. |
| `ctx.record.recordNumber` | Text | The record's unique number. |
| `ctx.record.tenantId` | Text | The record's tenant ID. |
| `ctx.record.workspaceRefId` | Text | The workspace ID, when the record was created at workspace level. |
| `ctx.record.projectId` | Text | The record's project ID. |
| `ctx.record.createdBy` / `updatedBy` | Text | Username of whoever created / last updated the record. |
| `ctx.record.createdAt` / `updatedAt` | DateTime | When. |
| `ctx.tenant.name` / `tenantId` | Text | Tenant name, and its (usually 7-letter) ID. |
| `ctx.project.name` / `description` / `currency` / `projectId` / `timeZone` | Text | Project details. |
| `ctx.project.isActive` | Boolean | Whether the project is active. |
| `ctx.project.startDate` / `finishDate` | Date | Project dates. |
| `ctx.project.customFields.<field name>` | Any | Any custom field on the project details page. |

#### Workflow and signed-in user

| Source | Type | Holds |
| --- | --- | --- |
| `ctx.workflow._id` | MongoId | Internal ID of the record's workflow. |
| `ctx.workflow.currentStepName` / `actionName` / `nextStepName` / `status` | Text | The step the record is on, the action being taken, where it goes next, and the record's workflow status. |
| `ctx.user._id` / `userName` / `email` / `employeeId` | Text | The signed-in user's identity. |
| `ctx.user.firstName` / `lastName` / `fullName` | Text | Name. |
| `ctx.user.status` | Number | `1` active, `0` inactive. |
| `ctx.user.cellPhone` / `workPhone` / `homePhone` | Text | Phone numbers. |
| `ctx.user.fax` | Number | Fax number. |
| `ctx.user.company` / `department` / `designation` | Text | Org details. |
| `ctx.user.city` / `state` / `country` / `pincode` | Text / Number | Address. |

### Logging

| Setting | Effect |
| --- | --- |
| **Level** | `Debug`, `Info`, `Warn` or `Error`. |
| **Log data after mapping** | Records the mapped result, not just the raw response. |
| **Log request and response** | Records both bodies. |
| **Log headers** | Records headers too. |

::: warning Logging bodies logs whatever is in them
Request and response logging captures payloads verbatim, including anything
sensitive the endpoint returns. Raise the level while debugging, then lower it.
:::

## Error mapping

Error mapping is a short script that turns a failed call into the message a
form user sees.

| | |
| --- | --- |
| **When it runs** | Only on an HTTP status of 400 or above. Anything below that — `200`, `201`, `204`, `302`, `308`, and so on — counts as success, so error mapping doesn't run for it. |
| **Reading the error** | Call `getInput()`. It returns the error object — either a `message`, or the API's own response body (object or array). |
| **What to return** | A text string: the message shown to the user. |

```js
// Standard error message
const err = getInput();

if (err.message === 'Not found') {
  return 'API not found';
}

return err.message;
```

Some APIs describe the failure in their own response shape instead. Read the
field that signals it, and fall back to a general message:

```js
// Error response payload from the API:
// { "GroupId": 1058066, "ProcessingStatusCode": "ERROR", "ReturnStatus": "ERROR" }
const err = getInput();

if (err.ProcessingStatusCode === 'ERROR') {
  return 'Transaction failed at Fusion';
}

return err.message || 'Something went wrong. Contact your administrator.';
```

Write for the form user — what failed and what to do next, not a raw status
code — and always end with a fallback `return`, so no one sees a blank error.

## Reading the result

A service's result is stamped onto the record and shown in its **External
service** widget. An **Auto populate** field can copy a value from a service
directly into a field — see [Forms](/build/forms).

## The log

**Settings → External service log** records outbound calls, in the detail the
service's log level allows. When a service appears to do nothing, this is where
the reason is — usually a timeout, an auth failure, or a response shape that
does not match the mapping.

<Shot src="integrations/external-service-log" alt="The External service log"
  caption="The External service log — one row per outbound call, in the detail that service's log level allows." />

While building a service, turn on request, response, and header capture and
set the level to `Debug` — then dial it back once the service is stable.

::: tip The log ages out on its own
Entries live in a capped store (100 MB / 50,000 entries) — the oldest drop off
automatically as it fills, so there's nothing to clean up manually. A fresh
call can take a couple of seconds to appear, since entries are written in
batches rather than the instant the call completes.
:::

## Troubleshooting

Start with the log — it shows whether Exto made the call, and what came back.

| Symptom | Likely cause |
| --- | --- |
| Nothing appears in the log | Exto never made the call — check the service is on the right module, the **Type** is correct, and no **Required** request mapping was empty. |
| Log shows `401` or `403` | The API rejected the credentials — check the Authentication Type, the Connector it points at, and whether a token expired. For a current-user token, ask the user to sign in again. |
| Log shows `404` | The URL is wrong, or the endpoint doesn't exist — recheck it against the API's own documentation. |
| The call times out | The API didn't reply inside the configured timeout — raise it if the API is known to be slow. |
| Call succeeds, but the form doesn't fill in | The reply isn't reaching the form — check every value is declared under **Response fields** and mapped under **Response mapping**, with names matching the reply exactly. Turn on **Log data after mapping** to see what the mapping produced. |
| An unhelpful error message | Check the [error mapping](#error-mapping) script returns a string, with a fallback for errors it doesn't recognize. |
| A request value is empty | Check the source field name in Request mapping. Sub-tables only send their first 100 rows, and exclude deleted ones. |
| Fields get wiped when nothing is found | Set **Del. empty** on those response mappings, so an empty reply leaves the user's existing values alone. |
| Only one row fills when several were expected | Check **Force single object** is off, and the list is declared as an **Array** response field with child fields. |
| Results differ between users | Expected with current-user tokens — each person sees only what their own account can access. |

## Quick answers

**Field or Form — which do I pick?**
Field when the call is about one control — a lookup as the user types or
leaves a field. Form when the call needs the whole set of values entered so
far, not one field's worth.

**What's the difference between request mapping and response mapping?**
Request mapping sends form data out to the API. Response mapping takes the
reply and writes it back onto the form. Same row shape — [Required, Del.
empty, Code, Order](#mapping) — just opposite directions.

**Can two services share one login?**
Yes — point both at the same [Connector](#authentication) instead of
entering the credential twice. Update it once and both pick it up.

**Why a current-user token instead of a Connector?**
See [Authentication](#authentication) — in short, a current-user token when
the result should depend on who's filling in the form, a Connector/Basic/
Bearer credential when it shouldn't.

**Where do I check a failed lookup?**
[The log](#the-log). Turn on request/response capture in that service's
Configuration tab first if you need the exact bytes exchanged.

## Permissions

Defining external services, and reading the external service log, both happen
under **Settings** and require <Perm role="PME" />.

The call itself runs as the *user who triggered it* when the service uses a
user access token, and as the configured credentials otherwise — so check which
identity the far end will see before choosing an authentication type.
