# Combined pull requests

A combined PR bundles several similar changes, such as dependency updates from Dependabot or Renovate, into one branch. The maintainer's question is short: which of these need my attention, and what must happen before I merge? The list of included changes is the content, so it stays visible as a table.

This shape applies the aggregate and no-process-narration rules from `fusion-agent-content` (`references/writing-for-people.md`) to PR bodies. Per-update verdicts stay with `fusion-dependency-review`; this file only shapes the combined PR body.

## When it applies

- The PR combines three or more similar changes, usually updates that each have their own source PR.
- Use the regular outline for one or two changes.

## Shape

Keep the visible part to about one screen, in this order:

1. **Banner and TL;DR** with counts and the ask: "8 updates, 2 need a look. Merge after CI passes on this branch."
2. **Needs your attention**: only behavior changes, migrations, release notes, and holds. One or two plain sentences each, naming the update. When nothing needs a decision, say so in one line.
3. **Included updates**: a visible table with PR, update (from → to), one-line impact, and risk (low, medium, or high). One row per source PR. Below it, one line for any caveat shared by all rows.
4. **Before merging**: a one-line validation result for the checks that ran, then a short checklist of what the maintainer must confirm. Each check the agent could not run in its environment becomes one actionable line here, such as "CI passes on this branch".
5. **Updates not included**, only when some were left out: held updates in a `> [!WARNING]` alert, failed updates in a `> [!CAUTION]` alert, and updates still in progress (such as a pending regeneration or retry, expected in a later combined PR) in a `> [!NOTE]` alert, each with a one-line reason.
6. **Closing lines**: one `closes #123` line per included source PR that merging completes, as confirmed in step 6 of the skill, then any `refs` lines.
7. **Details**, folded: per-update validation table, commits, checks not run, and other supporting notes.
8. **References and evidence**, folded and last.

When the repository has a PR template, keep its headings and place these parts under the closest ones. Without one, fill `assets/combined-pr-outline.md.hbs`.

## Rules

- Write about the repository and the maintainer's decision. Leave out the agent's inputs, workers, coordinators, prompts, policy files, and temporary paths.
- Present a gap in the agent's environment as a check for the maintainer, never as the maintainer's problem to debug.
- Say a caveat once. "No update needs a migration" replaces "no migration needed" on every line.
- Leave out reassurance that changes no decision, such as "no package-specific benefit was verified" or "this review does not independently certify artifact safety".
- Keep risks, behavior changes, holds, failures, and closing lines visible. Fold the per-update evidence.

## Before and after

Based on a real combined dependency PR with eight updates; names, numbers, and hold reasons are generic.

Before (excerpt; the original had a paragraph like this for all eight updates and folded its only table):

```markdown
> **TL;DR:** Eight Dependabot updates are included for maintainer review into `main`. ... Focused checks passed, but required combined-candidate CI remains pending; nothing merges automatically.

## Included updates

**Zod 4.6.5 → 4.6.7 (#18)** updates validation of data and configuration across the shared frontend and both apps. ... no consumer regression or migration was identified. ... this review does not independently certify artifact safety.

**Layout 0.1.3 → 0.1.4 (#17)** ... No API migration is indicated. ... coordinator validation confirmed both release bumps.

Only #17 requires a frontend changeset. The other updates ... require no release artifact under the supplied repository policy.

## Validation and remaining gates

Frontend checks used Node 24 rather than required Node 26; the supplied environment lacked `libatomic.so.1`. ...
```

After:

```markdown
<sub>🤖 Drafted by <agent> (<tool>) · <model> · <effort> reasoning</sub>

> **TL;DR:** 8 updates, 2 need a look. Merge after CI passes on this branch.

## Needs your attention

- **Testing library 10.2.0 (#14):** unmapped discovery requests in tests now fail instead of reaching the network. Our test host already runs offline, so nothing changes today.
- **Layout 0.1.4 (#17):** native browser controls stay in light mode. Both apps get a patch release note for it.

## Included updates

| PR | Update | Impact | Risk |
| --- | --- | --- | --- |
| #11 | Cryptography.Xml 10.0.13 → 10.0.14 | Test override refresh | Low |
| #12 | Cryptography.Pkcs 10.0.13 → 10.0.14 | API override refresh | Low |
| #13, #15 | Playwright 1.63.0 → 1.64.1 | Fixes routed cross-origin redirects | Low |
| #14 | Testing library 10.1.2 → 10.2.0 | Offline discovery in tests | Medium |
| #16 | github-script v8 → v9 | Release step; no API use | Low |
| #17 | Layout 0.1.3 → 0.1.4 | Light-mode browser controls | Medium |
| #18 | Zod 4.6.5 → 4.6.7 | Stricter collection checks | Low |

No update needs a code migration.

## Before merging

Focused tests pass for all eight updates; full suites were not run here.

- [ ] CI passes on this branch (frontend checks here ran on Node 24, not the required Node 26).
- [ ] Journey and SQL Server suites pass in CI; they were not run here.

## Updates not included

> [!WARNING]
> **Held:**
> - #19: major version drops a config option the build still sets. Unblock by removing the option, then re-run.
> - #20: new licence terms need sign-off from the package owner before it can merge.

closes #11
closes #12
...

<details>
<summary>Details</summary>

Per-update validation table, commits, and checks not run.
</details>
```
