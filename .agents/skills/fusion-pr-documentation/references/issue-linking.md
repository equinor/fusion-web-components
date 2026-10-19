# Issue linking

Whether merging a pull request should close an issue is the developer's decision. Ask, recommend the most logical answer, and make the outcome visible.

## Rules

1. For each linked issue, ask whether merging should **close** it or only **reference** it, and present the recommended choice as the default:
   - **Close** (`closes owner/repo#123`, or `fixes`/`resolves`) — the usual recommendation, when this PR completes the issue's acceptance criteria.
   - **Reference** (`refs owner/repo#123`) — when the issue is a parent story or epic, needs more PRs, still awaits rollout or acceptance, or is in another repository that this PR only supports.
2. Base the recommendation on the issue itself (type, acceptance criteria, sub-issues, open sibling PRs, repository), not on keyword-matching the user's wording.
3. If the user already stated the intent ("closes #57", "just reference #914"), follow it without asking.
4. When the user is unavailable (autonomous or autopilot runs), apply the recommendation and list in the PR body and report which issues will close on merge, so a reviewer can change it.
5. Repository instructions may set their own default; still ask when the user is available.
6. Explain each reference in prose: what the PR completes, enables, supports, or follows, and what remains.
7. Infrastructure, mocks, test enablement, and local workflows usually support a feature without completing it, so recommend a reference. Do not imply they implement production behavior such as authorization, persistence, or lifecycle rules.

## GitHub closing keywords

GitHub closes a linked issue on merge into the default branch when the PR body (or a commit message) contains any of these before the reference, in any case: `close`, `closes`, `closed`, `fix`, `fixes`, `fixed`, `resolve`, `resolves`, `resolved`. Scan the whole draft — including template boilerplate, changelog snippets, and quoted text — for these words directly before an issue reference.

Issues linked manually in the PR's Development sidebar also close on merge and appear in `closingIssuesReferences`.

## Examples

Good — the PR completes the task it was opened for; the developer accepted the recommended close:

```markdown
closes equinor/example-app#57

Adds export to CSV with the filters and columns listed in the task's acceptance criteria.
```

Good — the user asked to reference a cross-repository issue:

```markdown
## References

- refs equinor/fusion#914 — this PR adds the library support the cross-repository change needs; the portal rollout in equinor/fusion remains open.
```

Good — partial delivery of a story:

```markdown
refs equinor/example-app#212

Adds the read-only list view for the story. Editing and permissions follow in separate PRs, so the story stays open.
```

Bad — a parent story closed by its first PR, without asking:

```markdown
closes equinor/example-app#212
```

Bad — a bare list with no relationship explained:

```markdown
- #101
- #144
- #212
```

Bad — a closing word hidden in prose, closing an issue nobody chose to close:

```markdown
This fixes #144 by adding the missing mock.
```

Rewrite as: `Adds the missing mock that #144 depends on (refs owner/repo#144).`, or, if the developer chose to close #144, as an explicit `fixes owner/repo#144` line.
