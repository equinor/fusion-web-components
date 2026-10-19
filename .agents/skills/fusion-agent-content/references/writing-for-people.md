# Writing for people

Agent drafts tend to be long, list-heavy, and organized around what the agent did rather than what the reader needs. These rules turn that around.

## Lead with the reader

- Put the outcome and the decision or action first, then the reasons.
- Say what changed for the reader, not what the agent did. "Settings now survive a reload" beats "I updated the store to load before saving".
- Make the TL;DR enough on its own for someone who reads nothing else.
- Write it as a quote block starting with `> **TL;DR:**`, so it stands apart from the body. When it needs a short list, quote the list lines too.

## Prose over lists

- Use natural, flowing sentences in short paragraphs of two to four sentences.
- Use bullets only for real lists such as steps, criteria, options, or a few parallel items. A paragraph of bullets that are each half a thought is prose in disguise.
- Use a table only when readers compare items across the same attributes.

## Plain and concrete

- Prefer plain words. Explain a term once when the reader needs it, or link to where it's explained.
- Cut filler: "This PR aims to…", "It is important to note that…", "In order to…", "As mentioned above…".
- Be concrete: names, numbers, links, and exact UI labels.
- Don't repeat the TL;DR in the body; the body adds the why and the how.

## Length

- Aim for a visible part that fits on about one screen for a typical issue or PR.
- Shorten by moving supporting material into details, never by dropping facts the reader needs.
- Keep a reply to a single review comment to a few sentences: the decision, the reason, and the commit that addresses it.

## Before and after

Before:

```markdown
## Summary
This PR implements the following changes:
- Updated `settings-store.ts`
- Updated `settings.test.ts`
- Updated `versioned-settings.ts`
- Ran biome, tsc, vitest (all passed)
It is important to note that the store now loads before saving.
```

After:

```markdown
<sub>🤖 Drafted with GitHub Copilot · gpt-6-luna · medium reasoning</sub>

> **TL;DR:** Settings saved on one device were lost after a reload, because the store wrote its defaults before loading. It now loads first. Please check the migration note.

## Why
Users reported that their preferred grid view reset every morning. ...

All checks pass.

<details>
<summary>Details</summary>

Changed `settings-store.ts`, `versioned-settings.ts`, and their tests. ...
</details>
```
