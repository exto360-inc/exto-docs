---
description: "Switching on change tracking for a module."
---

# How do I turn history on for a module?

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

History is **off** until somebody turns it on. Nothing is captured before that.

## Steps

1. Open the module's **General** settings in the platform designer — the
   **Enable History** button on a record's History widget takes you there.
2. Switch **Enable History** on.
3. Save.

## Result

From this moment on, field edits, sub-table rows, checklist items and workflow
transitions are recorded.

::: warning History is not retroactive
Nothing that happened before you switched it on can be recovered. If a module
matters, turn this on before it goes live, not after the first dispute.
:::

## Making a field's icon appear

The module switch decides what is **recorded**. Each field's own **Enable
history** toggle in the form designer decides whether its history **icon** is
shown.

Turning a field's toggle on later reveals history that was captured all along.

## Related

- [How do I see what changed on a record?](../work/see-what-changed)
- [History](/work/history)
