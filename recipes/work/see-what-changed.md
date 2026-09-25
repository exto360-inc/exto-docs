---
description: "Reading a record's history, and what to do when there is none."
---

# How do I see what changed on a record, and who changed it?

::: tip Who can do this
Anyone who can open the record. Turning history **on** for a module requires
<Perm role="PME" />.
:::

History records field edits, sub-table rows, checklist items and workflow
transitions — but only once a module owner has switched it on.

## Steps

1. Open the record.
2. Open the **History** widget on the right-hand rail.
3. Read the timeline. Filter it by action type if it is long.
4. For one field's history, click the small history icon beside that field — a
   panel drops in underneath it.

## Result

You see who changed what, when, which step the record was on, and which action
closed each entry. Text fields offer **Show changes**, a word-level diff.

::: warning An entry per submit, not per save
In a **multi-step** workflow the timeline shows **one entry per submit**,
carrying the net change since the previous one. Draft saves in between are
folded into it.

That is a display choice — every save is still recorded. Single-step modules
show every save separately.
:::

## If the widget says history is off

Nothing was captured, and it cannot be recovered for the past. A
<Perm role="PME" /> user turns it on for the module; capture starts from that
moment.

If the widget works but a **particular field** has no history icon, that field's
own toggle is off — the data is there, it just is not being surfaced. See
[Forms](/build/forms).

## Related

- [How do I turn history on for a module?](../build/turn-on-history)
- [How do I send a record back for changes?](./return-for-changes)
