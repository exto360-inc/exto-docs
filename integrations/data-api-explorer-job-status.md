---
outline: 2
title: Job status explorer
description: "Interactive reference for creating and tracking background job records, with a live Try it."
---

# Job status

Part of the [Data API explorer](/integrations/data-api-explorer). Four
endpoints for registering and tracking a background job — the same records
that back the [job status page](/work/recycle-bin) in the UI, for a job your
own integration kicks off.

**Auth:** Bearer — an [API Key](/integrations/data-api#generating-a-key), on
every operation below.

## List job status for a project

<Method method="get" /> `/api/v1/jobstatus/{projectID}`

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `projectID` | path | string | Required | The project's identifier. |
| `page` | query | integer | Optional — default 1 | Page number. Non-finite or `< 1` falls back to 1. |
| `pageSize` | query | integer | Optional — default 50, capped at 200 | Records per page. |

### Response — 200 OK

```json
{
  "data": [],
  "total": 0,
  "page": 1,
  "pageSize": 50
}
```

### Errors

| Status | Condition |
| --- | --- |
| 401 | Invalid authentication token. |
| 500 | Something went wrong on the server. |

### Try it

<OAOperation operation-id="getJobStatusByProject">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #responses></template>
</OAOperation>

## Create a job status record

<Method method="post" /> `/api/v1/jobstatus`

Registers a new job, before work starts.

### Request body

| Field | Type | Description |
| --- | --- | --- |
| `tenantID` / `projectID` | string | Scope the job belongs to. |
| `jobTitle` / `title` | string | Human-readable title — `title` is a REST alias accepted alongside the canonical `jobTitle`. |
| `jobType` / `type` | string | One of `Summarize`, `Spread`, `Import`, `Export`, `Load`, `Copy`, `Scenario_Creation`, `Schedule`, `CX`, `SSM`, `ItemMasterIntegration`, `CxStepDates`, `Slotting Job` — `type` is an alias of `jobType`. |
| `status` | string | One of `Not Started`, `In Progress`, `Completed`, `Failed`. |
| `createdBy` | string | The initiating user. |
| `log` | array | Log entries — see [Append logs](#append-logs-to-a-job). |
| `meta` | object | Context fields — populated depend on `jobType` (schedule, file, module). |

```json
{
  "tenantID": "cwWdTZK",
  "projectID": "Vx6-j2Z",
  "jobTitle": "Import — vendor master",
  "jobType": "Import",
  "status": "Not Started",
  "createdBy": "nivedita@exto360.com"
}
```

### Response — 201 Created

```json
{ "id": "66e7a1b2c3d4e5f678901234" }
```

### Errors

| Status | Condition |
| --- | --- |
| 400 | The request body is malformed or missing a required field. |
| 401 | Invalid authentication token. |
| 500 | Something went wrong on the server. |

### Try it

<OAOperation operation-id="createJobStatus">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
  <template #responses></template>
</OAOperation>

## Update a job status record

<Method method="put" /> `/api/v1/jobstatus/{id}`

Typically used to move `status` to `Completed` or `Failed`.

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `id` | path | string | Required | The job's identifier, returned by [Create a job](#create-a-job-status-record). |

### Request body

Narrower than [Create a job](#create-a-job-status-record)'s body — just the
fields being updated:

| Field | Type | Description |
| --- | --- | --- |
| `status` | string | Required. One of `Not Started`, `In Progress`, `Completed`, `Failed`. |
| `duration` | number | Optional. Milliseconds — computed server-side if omitted. |
| `completedAt` | ISO date string | Optional. Defaults to now if omitted. |

```json
{ "status": "Completed" }
```

### Response — 200 OK

```json
{ "message": "Job updated successfully." }
```

### Errors

| Status | Condition |
| --- | --- |
| 400 | The request body is malformed. |
| 401 | Invalid authentication token. |
| 404 | No job with that ID. |
| 500 | Something went wrong on the server. |

### Try it

<OAOperation operation-id="updateJobStatus">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
  <template #responses></template>
</OAOperation>

## Append logs to a job

<Method method="post" /> `/api/v1/jobstatus/{id}/logs`

Appends one log line to a job's `log` array, rather than replacing the whole
record via [Update](#update-a-job-status-record). Call it once per line —
the body is a single log object, not an array.

### Parameters

| Parameter | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `id` | path | string | Required | The job's identifier. |

### Request body

| Field | Type | Description |
| --- | --- | --- |
| `message` | string | Required. |
| `level` | string | Optional. |
| `duration` | number | Optional. |
| `timeStamp` | ISO date string | Optional. |

```json
{
  "message": "Row 412 of 900 processed",
  "level": "info",
  "duration": 1820
}
```

### Response — 200 OK

```json
{ "success": true }
```

### Errors

| Status | Condition |
| --- | --- |
| 400 | The request body is malformed. |
| 401 | Invalid authentication token. |
| 404 | No job with that ID. |
| 500 | Something went wrong on the server. |

### Try it

<OAOperation operation-id="appendJobStatusLogs">
  <template #header></template>
  <template #path></template>
  <template #description></template>
  <template #security></template>
  <template #parameters></template>
  <template #request-body></template>
  <template #responses></template>
</OAOperation>
