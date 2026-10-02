---
description: "Querying master and module records with the filter query parameter."
---

# Filtering records

::: tip
Applies to `GET /api/v1/master-record/{masterName}` and
`GET /api/v1/module-record/{moduleName}` — see the
[reference](/integrations/data-api-reference).
:::

The `filter` query parameter retrieves specific records by applying
conditional expressions to fields, combined with `and` / `or`.

```
GET /api/v1/module-record/{moduleName}?pageSize=1000&page=1&filter=number2:gt:2:and:email_id:cn:john
```

::: warning DATE filters need a timezone
Filtering on a `DATE` field requires the `localTimeZone` query parameter, in
IANA format (e.g. `America/Los_Angeles`). Without it, timezone differences in
date comparison can return the wrong records.
:::

## Syntax

```
fieldName:fieldType:operator:value
```

| Part | Is |
| --- | --- |
| `fieldName` | The field to filter on. |
| `operator` | A comparison operator — see below. |
| `value` | What to compare against. |

Conditions chain with `and` and `or`:

```
number1:eq:6:and:number2:eq:1:or:contact:eq:1234
```

reads as `(number1 = 6 AND number2 = 1) OR (contact = 1234)`.

## Operators

| Type | Operator | Means | Example |
| --- | --- | --- | --- |
| NUMBER | `eq` | Equals | `number_field:eq:1234` |
| NUMBER | `ne` | Not equals | `number_field:ne:4` |
| NUMBER | `ge` | Greater than or equal | `number_field:ge:2` |
| NUMBER | `gt` | Greater than | `number_field:gt:2` |
| NUMBER | `le` | Less than or equal | `number_field:le:2` |
| NUMBER | `lt` | Less than | `number_field:lt:2` |
| NUMBER | `eq:null` | Field is blank | `number_field:eq:null` |
| NUMBER | `ne:null` | Field is not blank | `number_field:ne:null` |
| STRING | `eq` | Equals | `email_id:eq:abc@xyz.com` |
| STRING | `cn` | Contains | `email_id:cn:m` |
| STRING | `sw` | Starts with | `email_id:sw:d` |
| STRING | `ew` | Ends with | `email_id:ew:m` |
| STRING | `nc` | Does not contain | `email_id:nc:com` |
| STRING | `eq:null` | Field is blank | `email_id:eq:null` |
| STRING | `ne:null` | Field is not blank | `email_id:ne:null` |
| PRIMITIVE | `ne` | Not equals | `addition:ne:0` |
| DATE | `eq` | Equals (`YYYY-MM-DD`) | `createdDate:eq:2024-03-22&localTimeZone=America/Los_Angeles` |
| DATE | `ne` | Not equals | `createdDate:ne:2024-03-22&localTimeZone=America/Los_Angeles` |
| DATE | `gt` | After | `createdDate:gt:2024-01-01&localTimeZone=America/Los_Angeles` |
| DATE | `lt` | Before | `createdDate:lt:2024-03-01&localTimeZone=America/Los_Angeles` |
| DATE | `ge` | On or after | `createdDate:ge:2024-02-01&localTimeZone=America/Los_Angeles` |
| DATE | `le` | On or before | `createdDate:le:2024-03-31&localTimeZone=America/Los_Angeles` |

`in` matches multiple values, separated by `|`:

```
number_field_1:in:2|10|15
```

returns records where `number_field_1` is 2, 10, or 15.

## Examples

| Scenario | Filter |
| --- | --- |
| Approved records | `status:eq:Approved` |
| By serial number | `serial_number:eq:1234` |
| One of several values | `number_field_1:in:2\|10\|15` |
| Date range | `createdDate:ge:2024-03-01:and:createdDate:le:2024-03-31&localTimeZone=America/Los_Angeles` |
| Blank field | `number_field_1:eq:null` |
| Non-blank field | `email_id:ne:null` |
| Text contains | `email_id:cn:m` |
| AND | `number_field_1:eq:10:and:number_field_2:eq:20` |
| OR | `number_field_1:eq:10:or:number_field_2:eq:20` |

## Limits

- Up to **1,000 records** per request — raise `pageSize` only within that
  ceiling.
- `in:` values are pipe-separated, not comma-separated.
- Date values must be `YYYY-MM-DD`; pair with `localTimeZone`.

## Related

- [Reference](/integrations/data-api-reference) — the endpoints this applies
  to, and pagination fields.
- [Data API](/integrations/data-api)
