---
description: "Endpoints, request/response shape, error codes, and data formats for the Data API."
---

# Data API reference

::: tip
See [Data API](/integrations/data-api) for authentication and getting
started. For the same endpoints with live parameter/response docs and a
"Try it" panel, see the [API explorer](/integrations/data-api-explorer).
:::

## Endpoints

All paths are relative to your tenant's
[base URL](/integrations/data-api#base-url). Full request/response schemas
are in the Swagger/OpenAPI spec linked from the API documentation; this table
is what's available and what it's for.

### Health

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/v1/health/liveness` | Is the service running. Public — no token needed. |
| GET | `/api/v1/health/readiness` | Is the service ready to accept traffic. Public — no token needed. |
| GET | `/api/v1/build/info` | Build/version metadata. Requires a token. |

`liveness` samples CPU and memory against configured limits:

```json
{ "ok": true, "cpuPercent": 3.2, "memPercent": 41.0 }
```

A `500` means a limit was exceeded — "Liveness CPU Limit exceeded" or
"Liveness Memory Limit exceeded".

`readiness` checks the database connection state:

```json
{ "ok": true }
```

A `500` names the connection state when it isn't ready — "Database -
`<state>`".

`build/info` returns what was baked into `package.json` at build time:

```json
{
  "name": "exto-data-api",
  "version": "1.0.0",
  "branch": "release/26.5.0",
  "commit": "a1b2c3d",
  "date": "2026-09-30T12:00:00.000Z"
}
```

### Master records

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/v1/master-record/{masterName}` | Retrieve records from a master. Supports [filtering](/integrations/data-api-filtering) and pagination. |
| POST | `/api/v1/master-record/{masterName}` | Create or update (upsert) records in a master. |
| PATCH | `/api/v1/master-record/{masterName}` | Explicit update, separate from the upsert `POST`. |
| DELETE | `/api/v1/master-record/{masterName}` | Delete records. Requires a `userName` query parameter; body is an array of `{ recordNumber }` objects. |

### Hierarchy master records

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/v1/hierarchy-master-record/{masterName}` | Retrieve rows from a hierarchy master. |
| POST | `/api/v1/hierarchy-master-record/{masterName}` | Create a row. |
| PATCH | `/api/v1/hierarchy-master-record/{masterName}` | Update a row. |

Same engine as master records, shaped as a tree. See
[Hierarchy master records](/integrations/data-api-explorer-hierarchy-masters).

### Module records

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/v1/module-record/{moduleName}` | Retrieve records from a module. Supports [filtering](/integrations/data-api-filtering) and pagination. |
| POST | `/api/v1/module-record/{moduleName}` | Create or update (upsert) records in a module. Requires a `userName` query parameter. |
| PATCH | `/api/v1/module-record/{moduleName}` | Explicit update, separate from the upsert `POST`. Requires a `userName` query parameter. |
| DELETE | `/api/v1/module-record/{moduleName}` | Delete records. Requires a `userName` query parameter; body is an array of `{ recordNumber }` objects. |
| GET | `/api/v1/module-record/{moduleName}/expand` | Retrieve module records together with paginated sub-table data, in one call. See [Module records](/integrations/data-api-explorer-module-records). |

### Sub-tables

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/v1/sub-table/{tableId}` | Write rows into a sub-table. Requires `moduleName` and `recordId` query parameters. |
| GET | `/api/v1/sub-table/{tableId}` | Read a sub-table's rows, paginated. |
| DELETE | `/api/v1/sub-table/{tableId}` | Delete sub-table rows. Body is an array of `{ recordNumber }` objects. |

See [Sub-tables](/integrations/data-api-explorer-subtables).

### Workflow (v1)

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/v1/workflow/{moduleName}` | Take a workflow action on one or more records. Requires `actionName`, `userName`, and `spaceName` query parameters; body is an array of record Mongo IDs, up to 100. Returns an array of `{ workflowId, recordId }`. |

See [Workflow (v1)](/integrations/data-api-explorer-workflow-v1).

### Workflow (v2)

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/v2/workflow` | Current state of every workflow instance in a module, with full step/comment detail. Requires an `x-project-id` header. |
| GET | `/api/v2/workflow/history` | Get a record's step-by-step workflow history. |
| POST | `/api/v2/workflow/create` | Start a new workflow instance. |
| POST | `/api/v2/workflow/submit` | Submit from the current step. |
| POST | `/api/v2/workflow/return` | Return to a previous step. |
| POST | `/api/v2/workflow/revision` | Request a revision. |
| POST | `/api/v2/workflow/reopen` | Reopen a completed instance. |

Addressed by `moduleName` + `recordNumber` rather than the single-action `POST`
above. See [Workflow (v2)](/integrations/data-api-explorer-workflow-v2).

### Documents

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/v1/documents` | Bulk-upload documents, attached at record, sub-table, or checklist-item level. |
| GET | `/api/v1/documents/download/{id}` | Download a single document by ID. |
| GET | `/api/v1/documents/download/all/{recordId}` | Download every attachment on a record as a single ZIP. |

See [Documents](/integrations/data-api-explorer-documents) for
request/response detail.

### User management

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/v1/user/user-access` | Grant user access. |
| GET | `/api/v1/user/user-access` | Read user access configuration. |
| GET | `/api/v1/user/user-access/by-user` | Read access for a specific user. |
| GET | `/api/v1/user/groups` | List user groups. |
| PATCH | `/api/v1/user/activate-users` | Activate users. |
| PATCH | `/api/v1/user/deactivate-users` | Deactivate users. |
| DELETE | `/api/v1/user/user-access` | Revoke user access. |
| DELETE | `/api/v1/user/project-access` | Remove project access. |

### User management (v2)

Mirrors every endpoint above at `/api/v2/user/...`, plus:

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/v2/user/groups` | Same as v1, plus an `onlyWorkspaceGroups` filter. |
| DELETE | `/api/v2/user/workspace-access` | New in v2 — remove a user's access to workspace groups. |

See [User management (v2)](/integrations/data-api-explorer-users-v2).

### Workspace

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/v1/workspace` | Create a workspace. |
| GET | `/api/v1/workspace` | List workspaces. Supports [filtering](/integrations/data-api-filtering) and pagination. |
| GET | `/api/v1/workspace/{id}` | Get a single workspace. |
| PATCH | `/api/v1/workspace/{id}` | Update a workspace. |

See [Workspace](/integrations/data-api-explorer-workspace).

### Job status

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/v1/jobstatus/{projectID}` | List job status records for a project. |
| POST | `/api/v1/jobstatus` | Register a new background job. |
| PUT | `/api/v1/jobstatus/{id}` | Update a job — status, completion, duration. |
| POST | `/api/v1/jobstatus/{id}/logs` | Append log entries to a job. |

The same records behind the [job status page](/work/recycle-bin) in the UI.
See [Job status](/integrations/data-api-explorer-job-status).

## Response format

Every response is a JSON object or array — never a bare value.

### Success

```json
{
  "rows": [
    {
      "_id": "67bfcbd6117e4e25e1d31dd3",
      "customFields": { "...": "the record's field values" },
      "parentID": null,
      "slug": "iWlOE8K",
      "refId": "iWlOE8K",
      "tenantID": "cwWdTZK",
      "createdBy": "nivedita@exto360.com",
      "createdAt": "2025-02-27T02:20:06.958Z",
      "isDeleted": false,
      "projectID": "Vx6-j2Z",
      "id": "67bfcbd6117e4e25e1d31dd3"
    }
  ],
  "total": 1069,
  "page": 1,
  "pageSize": 10,
  "totalPages": 107
}
```

| Field | Holds |
| --- | --- |
| `rows` | The retrieved records. |
| `total` | Total records matching the request, across all pages. |
| `page` / `pageSize` | The page returned, and how many records are on it. |
| `totalPages` | Total pages at this `pageSize`. |

This is the shape for `GET` list endpoints. Create/update calls — master
records, module records, and sub-table rows — return
`{ insertedIds, insertedCount, updatedCount }` instead; see
[Master records](/integrations/data-api-explorer-masters#create-or-update-a-master-record).

### Errors

```json
{
  "code": 500,
  "timestamp": "2025-02-27T02:22:42.856Z",
  "path": "/api/v1/master-record/MASTER_31",
  "error": {
    "summary": "Service Exception",
    "detail": ["ITEM_MASTER not Found."]
  }
}
```

| Field | Holds |
| --- | --- |
| `code` | The HTTP status code. |
| `timestamp` | When the error occurred. |
| `path` | The endpoint that was called. |
| `error.summary` | A general description. |
| `error.detail` | Specific messages — there can be more than one. |

## Error codes

| Status | Name | Means |
| --- | --- | --- |
| 200 | OK | The request succeeded. |
| 201 | CREATED | A new resource was created. |
| 400 | BAD REQUEST | The request is malformed or has invalid parameters. |
| 401 | UNAUTHORIZED | The request lacks valid credentials. |
| 403 | FORBIDDEN | Authenticated, but not authorized for this tenant/project/action. |
| 404 | NOT FOUND | The resource doesn't exist. |
| 405 | METHOD NOT ALLOWED | That HTTP method isn't allowed on this resource. |
| 413 | PAYLOAD TOO LARGE | The request body is too large. |
| 414 | URI TOO LONG | The URI is too long to process. |
| 422 | UNPROCESSABLE ENTITY | Well-formed, but semantically invalid. |
| 429 | TOO MANY REQUESTS | Rate limit exceeded. |
| 500 | INTERNAL SERVER ERROR | An unexpected server-side failure. |
| 502 | BAD GATEWAY | An invalid response from an upstream server. |
| 503 | SERVICE UNAVAILABLE | Temporary overload or maintenance. |
| 504 | GATEWAY TIMEOUT | An upstream response timed out. |

## Data formats

### Currency

```json
"customFields": {
  "currency": {
    "label": "12.000 USD",
    "value": 12,
    "currency": "USD"
  }
}
```

`label` is the formatted, human-readable amount; `value` is the raw number;
`currency` is the ISO 4217 code.

### Dates and times

- **Date** fields are `YYYY-MM-DD` — e.g. `"2024-12-30"`.
- **Date-time** fields are ISO 8601 / RFC 3339, in UTC — e.g.
  `"2024-12-01T18:18:40.599Z"`. The trailing `Z` marks UTC; there is no
  local-time variant.

## Related

- [Data API](/integrations/data-api) — authentication and getting started.
- [Filtering records](/integrations/data-api-filtering)
- [Module records](/integrations/data-api-explorer-module-records)
- [Sub-tables](/integrations/data-api-explorer-subtables)
- [Documents](/integrations/data-api-explorer-documents)
- [Workflow (v1)](/integrations/data-api-explorer-workflow-v1)
- [Workflow (v2)](/integrations/data-api-explorer-workflow-v2)
- [User management (v2)](/integrations/data-api-explorer-users-v2)
- [Workspace](/integrations/data-api-explorer-workspace)
- [Job status](/integrations/data-api-explorer-job-status)
