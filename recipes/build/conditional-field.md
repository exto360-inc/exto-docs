---
description: "Making a field appear or become required only in certain cases."
---

# How do I make a field required only sometimes?

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

Conditional behaviour is not a field property — it is a **rule**. *"Required"* on
the field means always required.

## Steps

1. Open **Settings → Module designer → Forms** and open the form.
2. Go to the **rules** editor.
3. Describe the situation: *when Amount is greater than 5000*.
4. Choose the outcome: **make Approver mandatory**.
5. Save.

## Result

The rule runs on load, on change and on submit. The field becomes required only
when the condition holds.

Rules can also **show and hide** fields, make them **read only**, and **set
values**.

::: tip Rules take effect immediately
They are part of the form, so there is no separate publish. Save and it is live
for everyone.
:::

## Related

- [How do I stop a record being submitted with bad data?](./add-a-validation)
- [How do I add a field to a form?](./add-a-field)
