---
description: "Teaching the assistant your business vocabulary."
---

# How do I make the assistant understand our terminology?

::: tip Who can do this
<Perm role="PME" /> — the application role that opens **Settings**.
:::

Your database calls a column `cst_nm`. Your people call it "the customer". The
schema editor closes that gap once, centrally.

## Steps

1. Open **Settings → Data setup → Schema editor**.
2. Pick a collection people actually ask about. Not all of them.
3. Give it a **display name** and a **description**.
4. For each field that matters, set its **description**, **display name** and —
   most importantly — its **synonyms**.
5. Set **references** between collections that relate.
6. Check the **knowledge graph** for isolated collections.
7. Wait for the **schema sync**, then ask a real question.

## Result

The assistant answers in your vocabulary rather than in column names.

::: tip Synonyms are what pay off
A `status` field with synonyms *state*, *stage* and *where it is* answers three
times as many questions as one without.
:::

::: warning Curation does not take effect immediately
A **schema sync** rebuilds what the AI uses, in two stages. Until it completes,
your wording changes are not live. A sync reporting *"vectors unchanged"* means
your structural change went through but you did not actually change any wording.
:::

Step 7 is the test that matters. Curation you have not verified by asking a
question is guesswork.

## Related

- [Data setup](/admin/data-setup)
- [How do I turn AI on for my organisation?](./turn-on-ai)
