---
description: "Two worked examples: a POST lookup and a GET lookup, field by field."
---

# External service examples

Part of [External services](/integrations/external-services). Two complete
`Field`-type services, built end to end — a `POST` lookup that sends values
from the record, and a `GET` lookup with no request body at all.

## Example: a POST lookup

`Category_Lookup` runs on an auto-complete field and looks up site categories.

| | |
| --- | --- |
| **Type** | Field |
| **Name** | `Category_Lookup` |
| **Authentication Type** | None — pick whatever your own API needs; see [Authentication and Connectors](/integrations/external-services#authentication). |
| **Method** | `POST` |
| **URL** | `https://api.example.com/v1/category-lookup` |
| **Form field** | Category (`site_category`) on the Site Survey Form |

### Map form values to the request body

Three request mapping rows send the record's tenant ID, its project ID, and
the survey type selected on the form:

| Source field | Target field |
| --- | --- |
| `ctx.record.tenantId` | `body.tenantId` |
| `ctx.record.projectId` | `body.projectId` |
| `ctx.mainForm.survey_type` | `body.surveyType` |

Start every target with `body.`, then the API's own key, matching its case
exactly. Tick **Required** on a row the API can't work without — the call is
blocked rather than sent incomplete.

<Shot src="integrations/external-service-request-mapping"
  alt="Request mapping tab with three rows mapping tenant ID, project ID, and survey type to the request body" />

What the API receives:

```json
{
  "tenantId": "ABCDEFG",
  "projectId": "PRJABCD",
  "surveyType": "Structural"
}
```

### Link an auto-complete field to the service

Add an **Auto-complete** field (from the Selection group) to the form, then
set its **Data source** to **External service** and pick `Category_Lookup`.
Save the service before adding the field — its name list only shows services
already saved on the same module.

<Shot src="integrations/external-service-autocomplete-field"
  alt="Auto-complete field properties panel with Data source set to External service and Category_Lookup selected" />

::: tip Service missing from the list?
It only shows External Services saved on the *same* module. Save the service,
then reopen the field's properties.
:::

The field's own name (here `site_category`) is what you reference as
`ctx.mainForm.site_category` elsewhere — and it's locked once the field is
saved.

### Map the response to the form

Response mapping takes values from the reply and writes them onto the form.
Map a reply key straight to a field, or turn on **Code** to reshape the reply
with a script first — set **Target field** to `*` so the script's own return
value becomes the result.

<Shot src="integrations/external-service-response-mapping"
  alt="Response mapping tab with Code on and a transform script open" />

The sample API replies with every category; this script keeps only the active
ones, so users see Structural but not Electrical:

```json
{
  "success": true,
  "categories": [
    { "code": "STR", "name": "Structural", "active": true },
    { "code": "ELE", "name": "Electrical", "active": false }
  ]
}
```

```js
const resp = getResponseBody();
if (resp.success) {
  return resp.categories.filter(c => c.active);
}
return [];
```

::: tip Always return something
End the script with a fallback, such as `return [];`, so a failed or empty
reply doesn't break the field.
:::

### Declare the response fields

Response mapping can only pick fields declared here — one row per value you
want to use, named to match the reply exactly.

<Shot src="integrations/external-service-response-fields"
  alt="Response fields tab declaring name as Text" />

This example only needs one field, since the auto-complete just displays a
category name:

```
name         Text    "Structural"
```

Use **Text** for a single value like this one, or **Array** for a list with
its own child fields — for example, to also carry each category's `code`:

```
categories   Array
  code       Text    "STR"
  name       Text    "Structural"
```

::: tip Filling a sub-table?
Declare an **Array** with child fields, and turn off **Force single object**
on the Configuration tab. One lookup then fills several rows at once.
:::

## Example: a GET lookup

`User_Lookup` has no request body at all — a `GET` call sends nothing, so
Request mapping stays empty and only the response is mapped. Picking a user
also fills a second, auto-populated field.

| | |
| --- | --- |
| **Type** | Field |
| **Name** | `User_Lookup` |
| **Authentication Type** | None |
| **Method** | `GET` |
| **URL** | `https://api.example.com/v1/users` |
| **Request mapping** | None — leave it empty for `GET` calls. |
| **Form fields** | Inspector (`inspector`, auto-complete) and Country (auto-populated) on the Site Survey Form |

### Map the response

On **Response mapping**, add one row with **Code** on, and use the transform
script to shape each user in the reply — joining `firstName`/`lastName` into
one `fullName`, and lifting `country` out of a nested `address`.

<Shot src="integrations/external-service-get-response-mapping"
  alt="Response mapping tab for a GET call with a transform script joining name fields" />

One user in the sample reply (trimmed):

```json
{
  "id": 1,
  "firstName": "Emily",
  "lastName": "Johnson",
  "address": {
    "city": "Phoenix",
    "country": "United States"
  }
}
```

```js
const resp = getResponseBody();
const users = Array.isArray(resp) ? resp : (resp.users || []);
return users.map(u => ({
  fullName: `${u.firstName} ${u.lastName}`,
  country: u.address?.country || '',
}));
```

What it returns:

```json
[
  { "fullName": "Emily Johnson", "country": "United States" }
]
```

::: tip Map only what the form needs
APIs often return far more than you use, including personal details. Return
only the values the form actually shows.
:::

### Declare the response fields

Two **Text** fields, one per value the script returns: `fullName` (shown in
the Inspector list) and `country` (the value for the auto-populated field).

<Shot src="integrations/external-service-get-response-fields"
  alt="Response fields tab declaring fullName and country as Text" />

### Link the form fields

Link the **Inspector** auto-complete field to `User_Lookup` the same way as
the first example, then add **Country** as an auto-populated field — it
stays empty until a user is picked, then shows the mapped `country`.

<Shot src="integrations/external-service-get-link-fields"
  alt="Form builder showing Inspector linked to User_Lookup and an auto-populated Country field" />

What the form user sees: type part of a name in Inspector, pick someone from
the list, and Country fills in on its own.

## Related

- [External services](/integrations/external-services) — the full reference.
- [Forms](/build/forms) — auto-complete and auto-populate fields.
