---
description: "Outbound calls whose response lands back on the record."
---

# External services

An external service is an outbound HTTP call Exto makes on your behalf, whose
response is mapped back onto the record. Use one to fetch a value from a system
of record, validate against it, or push a record into it as part of an action.

They are configured per module, in **Module designer → External services**.

<Shot src="integrations/external-service" alt="The external service editor" pending
  caption="A service's request tab — method, URL, auth, and the mapping below." />

## List page

Every service defined on the module. Each has a **type**:

- **Field** — attached to a field, called when that field is used.
- **Form** — attached to the form, called on load or on demand.

A service can also be attached to a **workflow action**, so pressing Approve
makes the call. See [Steps & actions](/build/steps-and-actions).

## Defining a service

### Request

| Setting | Values |
| --- | --- |
| **Name** | Required. |
| **Type** | Field or Form. |
| **Method** | `GET`, `POST`, `PUT`, `PATCH`, `DELETE`. |
| **URL** | Required. |
| **Timeout** | Milliseconds, from 1,000 to 1,800,000. Defaults to 3,000. |

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
sees who is acting rather than a shared service account.

### Mapping

Mapping decides what leaves and what comes back.

- **Add tenant information** — includes tenant context in the request.
- **Add project information** — includes project context.
- **Add user information** — includes the calling user.
- **Force single object as response mapping when response is an array** — takes
  the first element when the endpoint returns a list but the field expects one
  value.

**Response fields** describe what to read back. Each is **Text** or **Array**,
and array fields can carry children — which is how a nested response maps onto
a sub-table.

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

## Reading the result

A service's result is stamped onto the record and shown in its **External
service** widget. An **Auto populate** field can copy a value from a service
directly into a field — see [Forms](/build/forms).

## The log

**Settings → External service log** records outbound calls, in the detail the
service's log level allows. When a service appears to do nothing, this is where
the reason is — usually a timeout, an auth failure, or a response shape that
does not match the mapping.

## Permissions

Defining external services, and reading the external service log, both happen
under **Settings** and require <Perm role="PME" />.

The call itself runs as the *user who triggered it* when the service uses a
user access token, and as the configured credentials otherwise — so check which
identity the far end will see before choosing an authentication type.
