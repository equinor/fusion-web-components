# Writing for people

Agent drafts tend to be long, list-heavy, and organized around what the agent did rather than what the reader needs. These rules turn that around. The standard is high signal to noise: every visible line helps the reader decide or act, and the agent compresses its draft to that standard before handing it over.

## One post, one decision

- The visible part of a post is for one group of people and asks them for one thing: a decision, a review, a fix, an answer. Name both in the TL;DR.
- Everything the agent found that does not serve that one ask goes below the fold, except the items SKILL.md Safety requires visible *for that ask*. It is still there for anyone, human or agent, who wants it; it is out of the way for everyone else.
- A post with several asks for several groups keeps the one due now visible and gives **each other ask its own fold**, titled with the ask and the group it is for (for example "Direct React Router imports in 6 apps — their maintainers"). Inside each fold the full material stays, including that ask's risks, criteria and open questions. Follow-up drafts go back to the caller, whose confirmation step governs posting them.
- The fold titles are the only navigation a reader needs; a maintainer scanning for their repository finds it by heading.
- Don't write a "start here" guide that routes different readers to different sections. If the post needs a map, the visible part is too long.

## Lead with the reader

- Put the outcome and the decision or action first, then the reasons.
- Say what changed for the reader, not what the agent did. "Settings now survive a reload" beats "I updated the store to load before saving".
- Make the TL;DR enough on its own for someone who reads nothing else.
- Write it as a quote block starting with `> **TL;DR:**`, so it stands apart from the body. When it needs a short list, quote the list lines too.

## Prose over lists

- Use natural, flowing sentences in short paragraphs of two to four sentences.
- Use bullets only for real lists such as steps, criteria, options, or a few parallel items. A paragraph of bullets that are each half a thought is prose in disguise.
- Use a table only when readers compare items across the same attributes.

## Many similar items

When the content covers three or more similar items, such as updates in a combined PR, entries in a batch report, or findings in a review, the list of items is the content.

- Put the items in a visible table, one row per item with the same few columns, such as item, change, one-line impact, and risk. Never fold that table.
- Write prose only for items that need a decision: behavior changes, migrations, release notes, or holds. One or two plain sentences each, above the table.
- Say a caveat that applies to every item once, in one line, instead of repeating it per row ("No update needs a migration").
- Leave out per-item reassurance that changes nothing for the reader, such as "no package-specific benefit was verified".
- Give counts and the ask in the TL;DR: "8 updates, 2 need a look. Merge after CI passes on this branch."
- Fold per-item evidence, such as validation output per update, under Details.

## Write about the work, not the agent's process

Readers decide about the repository, not about how the agent ran. Keep the agent's process out of the visible part.

- Don't name the agent's inputs, workers, coordinators, prompts, or policy files ("supplied repository policy", "worker-reported", "coordinator validation").
- Don't show sandbox or temporary paths such as `/tmp/...`, or tool names the reader never uses.
- Turn a gap in the agent's environment into one actionable line for the reader. The reader can't fix the agent's sandbox, but can check CI.
- Keep the evidence trail under **References and evidence**, where it belongs.

Before:

```markdown
Coordinator validation confirmed both release bumps under the supplied repository policy. Frontend checks used Node 24 rather than required Node 26; the supplied environment lacked `libatomic.so.1`.
```

After:

```markdown
Both apps get a patch release note for the light-mode change.

## Before merging
- [ ] CI passes on this branch (frontend checks here ran on Node 24, not the required Node 26).
```

## Name things, don't number them

Readers can't decode `#2227` or `1/7` without opening a tab. Every reference costs them a click unless the text names it.

- On first mention, give an issue, PR or epic its title and then its reference: "Collect app feedback through the portal (equinor/fusion-core-tasks#2231)". Later mentions can use a short name.
- Never write a list of bare numbers. Name each item. When there are many, name them in a fold.
- Write ratios in words: "none of its 5 sub-issues closed", not "0/5". Show a percentage only next to its count.
- Explain board states and label names the first time you use them, or translate them: "still waiting to be shaped (Triage)".
- Say each fact once. If the TL;DR gives a count, the body explains it instead of repeating it.
- Write status in words, not colour codes: "main risk", not 🔴.
- When readers must act on items, write them as a task list (`- [ ]`). Each item's first line should work as an issue title, followed by one line of context.

## Periodic reports

Weekly, monthly and quarterly status or retro reports are the worst offenders, because an agent has lots of numbers and no story. Lead with whether the team is on track and why, then what landed, what needs a decision, and the follow-ups. Fold the metrics table and the method notes. `fusion-report-authoring` ships a `progress` template and `references/progress-reports.md` for this.

## Plain and concrete

- Prefer plain words. Explain a term once when the reader needs it, or link to where it's explained.
- Cut filler: "This PR aims to…", "It is important to note that…", "In order to…", "As mentioned above…".
- Be concrete: names, numbers, links, and exact UI labels.
- Don't repeat the TL;DR in the body; the body adds the why and the how.
- Drop disclaimers about what the post is not: "this is not a ranking", "not an incident finding". State a real limitation once, where it changes what the reader should do.

## Length

- The visible part fits on one screen: banner, TL;DR, the one decision, the evidence for it and the required-visible items (see SKILL.md Safety).
- Shorten by moving supporting material into Details, never by dropping facts the reader needs.
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

## PR description example

User: "Turn your findings into a PR description."

Agent: writes the banner from its runtime metadata, then a two-sentence quoted TL;DR saying what changed and what the reviewer should check first. It fills the repository template in prose. It folds the file list and validation output under **Details**, and the skills, references, and sources it used under **References and evidence**. The one-line validation result and the issues that will close stay visible.

Avoid: a body that opens with a file inventory, repeats the title as a summary, or hides a breaking change inside a folded block.
