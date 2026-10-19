# Publish checklist

## Before asking to publish

- [ ] Repository PR template inspected; all headings, comments, checklist items, and order preserved
- [ ] Repository-local PR, linking, and evidence rules applied
- [ ] Every behavior claim matches the diff on the current head commit
- [ ] Every issue or PR reference verified live; role explained in prose
- [ ] Issues and PRs written as `owner/repo#123` (or `#123` in the same repository), not as Markdown links with custom labels
- [ ] Closing keywords (`close`, `closes`, `closed`, `fix`, `fixes`, `fixed`, `resolve`, `resolves`, `resolved`) appear only before the issues chosen for closing, including in template boilerplate and quoted text
- [ ] Every validation claim was observed; pre-existing failures separated; unrun checks named as not run
- [ ] Screenshots or visual evidence produced by the environment the repository prescribes, if any
- [ ] No secrets, tokens, credentials, or personal data, including inside folded blocks
- [ ] Banner is the first line and names the agent, tool, model, and reasoning effort as reported by the runtime, or says `model not reported`
- [ ] The quoted `> **TL;DR:**` gives the outcome and the ask in at most three sentences, without repeating the title
- [ ] Template headings read as short prose for people; the visible part fits on about one screen
- [ ] Visible: one-line validation result, risks, breaking changes, boundaries, and which issues close versus are referenced
- [ ] File lists, command output, and long review-guide detail sit under `<details><summary>Details</summary>`
- [ ] `<details><summary>References and evidence</summary>` comes last and lists only the skills, references, and sources actually used
- [ ] Every `<details>` block has a blank line after `<summary>` and is closed
- [ ] User confirmed: operation (create or update), base, head, title, draft or ready, assignee

## After publishing — read back

Read the live PR, for example:

```bash
gh pr view <number> -R <owner/repo> --json url,title,baseRefName,headRefName,isDraft,body,closingIssuesReferences
```

Verify:

- [ ] Base and head branches are the intended ones
- [ ] Body matches the confirmed draft, with banner, headings, boundaries, and folded blocks intact (no truncation or mangled Markdown)
- [ ] Required issue references are present and resolve to the intended repositories
- [ ] `closingIssuesReferences` lists exactly the issues chosen for closing
- [ ] Draft or ready state and assignee match the confirmation

If a check fails, report it, fix the draft, and ask before editing the PR again.
