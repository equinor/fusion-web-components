# Details and references

Two folded blocks keep the visible text short without losing anything: **Details** for supporting material, and **References and evidence** for provenance. Both use HTML `<details>`, which GitHub renders as a collapsed section.

## Markdown that renders

```markdown
<details>
<summary>Validation commands and output</summary>

Markdown here renders normally, because of the blank line after the summary.
</details>
```

- Leave a blank line after the `<summary>` line, and close each block with `</details>`.
- Write a summary that says what's inside, such as "Validation commands and output" or "Implementation notes".
- Nest blocks only when a section is very long; one level is usually enough.

## What goes into details

- Implementation notes, file inventories, and design alternatives considered.
- Commands run and their full output.
- Raw data, long tables, logs, and screenshots that support a claim.
- Checklists meant for agents or for auditing the process.

Fold a block inside the section it supports when it belongs there, such as validation output under "How it was tested". Otherwise put details just before the references block.

## Keep visible

Never fold these:

- Acceptance criteria and decisions the reader must make.
- Risks, breaking changes, migration steps, and security notes.
- A one-line validation result, such as "All checks pass" or "2 of 14 journeys fail, see details".
- Which issues close on merge and which are only referenced.
- Open questions addressed to the reader.

## References and evidence

The last block of every agent-written body. It shows which skills shaped the text and which sources support it, so a reviewer can check the reasoning and a later agent can pick up the trail.

```markdown
<details>
<summary>References and evidence</summary>

**Skills:** `fusion-pr-documentation` 0.1.0, `fusion-agent-content` 0.1.0, `fusion-audience-alignment` 0.1.0

**Skill references read:**
- `fusion-pr-documentation/references/issue-linking.md`: close-or-reference rules
- `fusion-agent-content/references/writing-for-people.md`

**Evidence:**
- equinor/example-app#57: acceptance criteria this PR completes
- `docs/adr/0006-use-react-query.md`: why server data stays out of the store
- `bun run validate:skills`: passed, output under Details

**Other agents:** subagent `explore` (gpt-6-luna) searched the repository for existing stores.
</details>
```

- List only skills and references actually loaded or read, with the version from their metadata when available.
- Give each piece of evidence one line on what it shows. Prefer references and links over pasted text.
- Name the commands used as evidence, with their result. Their full output belongs under Details.
- Leave out empty headings. If no skills were used, say so.
- Mark anything that could not be verified, rather than leaving it out.

## Referencing issues and pull requests

Write issues and pull requests as `owner/repo#123`, or `#123` within the same repository. GitHub then shows the item's current title and state, so readers see what it is and whether it's done. Never wrap them in a Markdown link with your own label: the label hides the title and state, and can go stale or mislead.

```markdown
Good: Builds on equinor/fusion-skills#267 and completes #2407.
Bad:  Builds on [the agent content PR](https://github.com/equinor/fusion-skills/pull/267).
```

Use Markdown links only for things that aren't issues or pull requests: files at a commit, docs, and external pages.

