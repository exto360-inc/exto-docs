---
description: "Letting external systems read and write Exto data directly, over a REST API."
---

# Data API

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**, generates
keys, and reads the key log.
:::

Where a [webhook](/integrations/webhooks) tells, and an
[external service](/integrations/external-services) asks on Exto's behalf, the
Data API runs the other direction: your own systems call Exto directly, over a
REST API, using token-based authentication to read and write master records,
module records, sub-tables, and workflow actions programmatically.

<DFlow dir="right" :steps="[
  { title: 'Your system', body: 'Holds a Personal Access Token.' },
  { title: 'Calls the Data API', body: 'An HTTPS request with a Bearer token.', edge: 'HTTPS' },
  { title: 'Exto reads or writes', body: 'A master record, a module record, a workflow action.' },
]" />

## Before you start

- <Perm role="PME" /> access, to generate a token.
- The base URL for your region (below).
- An HTTPS client that can send an `Authorization: Bearer` header.

## Base URLs

| Region | Base URL |
| --- | --- |
| USA | `https://app-us.exto360.com/data` |
| India | `https://platform.exto360.com/data` |

Every path in the [reference](/integrations/data-api-reference) is relative to
the base URL for your tenant's region.

## Generating a key

Personal Access Tokens are created at **Settings → Integrations → Key
management**.

1. Open the **Settings** icon at the top right of the toolbar.
2. Go to **Integrations → Key management**.
3. Click **Create New**, fill in the fields, and click **Generate**.
4. Copy the generated **Key** immediately.
5. Close the window.

::: warning The key is shown once
Once the window is closed, the key cannot be retrieved again. If it's lost,
revoke it and generate a new one.
:::

The new key appears on the key log, where it can be **enabled**, **disabled**,
or **revoked** (right-click → **Actions**). A tenant can hold up to **5**
enabled or disabled keys at a time, and each expires on the date set when it
was generated.

::: tip Keys, not key IDs
Internally, a key is converted to a key ID and compared against a hashed value
for validation. The **key** itself — not the key ID — is what you send as the
Bearer token.
:::

## Authentication

Every request carries the token as a Bearer credential:

```
Authorization: Bearer your_token_here
```

| | |
| --- | --- |
| **Token lifetime** | 180 days, then it expires. |
| **Transport** | HTTPS only — every request and response is encrypted in transit. |
| **Rate limit** | 3 requests per second per token. |
| **Capacity** | Up to 5 enabled/disabled keys per tenant. |

::: warning Tokens are invalidated if the signing key rotates
If the Access Token Private Key on the API server changes, every Personal
Access Token issued against it stops working at once. Generate new tokens for
anything that broke.
:::

::: tip A second, login-based token flow is coming
A separate ID/access-token flow (`/api/auth/login`, `/api/auth/access-token`)
is being revised internally and isn't documented here yet. Personal Access
Tokens are the supported path today.
:::

### Sample requests

```bash
curl -X GET "https://platform.exto360.com/data/api/v1/health/readiness" \
     -H "Authorization: Bearer your_token_here" \
     -H "Content-Type: application/json"
```

```javascript
const axios = require("axios");

axios({
  method: "get",
  url: "https://platform.exto360.com/data/api/v1/health/readiness",
  headers: {
    Authorization: "Bearer your_token_here",
    "Content-Type": "application/json",
  },
})
  .then((response) => console.log(JSON.stringify(response.data)))
  .catch((error) => console.error(error));
```

Replace the URL with the endpoint you're targeting, and the token with the key
generated above.

## Using the API responsibly

- **Cache** what you retrieve rather than re-fetching it on every call.
- **Paginate** with `page` and `pageSize` instead of requesting an entire
  dataset at once.
- **Batch** bulk writes into reasonably sized groups rather than one record per
  request.
- Expect **rate limiting** — requests beyond the limit are blocked until the
  window resets, so design for retries rather than assuming every call
  succeeds.

## What's next

- [Reference](/integrations/data-api-reference) — endpoints, response shape,
  errors, and data formats.
- [API explorer](/integrations/data-api-explorer) — the same endpoints,
  interactive, with a live "Try it".
- [Filtering records](/integrations/data-api-filtering) — the `filter` query
  parameter.
- [Module records](/integrations/data-api-explorer-module-records) — get,
  upsert, and expand with sub-table data, in one call.
- [Documents](/integrations/data-api-explorer-documents) — bulk upload and
  download of attachments.

## Permissions

Generating, enabling, disabling, and revoking Personal Access Tokens all
happen under **Settings → Integrations → Key management** and require
<Perm role="PME" />.

A request authenticates as whatever the token was issued for — treat it like
any other credential, and rotate or revoke it the same way.
