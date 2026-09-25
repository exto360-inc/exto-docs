---
description: "Blocking a bad submission, or warning about a questionable one."
---

# How do I stop a record being submitted with bad data?

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

A **validation** runs when the record is submitted — including submissions from
other systems. That is what makes it different from a rule, which only runs
against an open form.

## Steps

1. Open the form's **rules** editor.
2. Describe the situation: *when End date is before Start date*.
3. Choose the outcome — and pick which kind:

| Outcome | Effect |
| --- | --- |
| **Warn** | A dialog explains the problem. The user can override and save. |
| **Block** | The save is refused. |

4. Write the message the user will see.
5. Save.

## Result

Submissions are checked. A **block** cannot be overridden by anyone.

::: warning Write the message as an instruction
The user sees only your message. *"Invalid date"* generates a support call;
*"End date must be on or after the start date"* does not.
:::

## Related

- [How do I make a field required only sometimes?](./conditional-field)
