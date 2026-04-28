# Dependency PR Review Tracker

Use this tracker while reviewing a dependency PR so the research, lens analysis, validation, and follow-up path stay explicit.

## Quick workflow

- [ ] Fetch existing top-level PR comments and review threads before analysis
- [ ] Summarize existing discussion, unresolved concerns, and already-answered items
- [ ] Capture PR context and update type
- [ ] Check branch state and whether rebase or sync is needed before patching
- [ ] Record the dependency package, versions, and changed files
- [ ] Gather release notes, changelog, advisories, and known-issue sources
- [ ] Summarize research findings
- [ ] Post the research checkpoint comment to the PR before any branch mutation
- [ ] Score security, code quality, and impact lenses
- [ ] Determine recommendation and confidence
- [ ] Identify required follow-up work
- [ ] Post the final verdict comment to the PR before any approval or merge action
- [ ] Ask for explicit maintainer confirmation before any approve/merge action

## Context

| Field | Value |
|-------|-------|
| Repository | |
| Pull request # / URL | |
| Package | |
| Ecosystem | |
| Current version | |
| Target version | |
| Update type | |
| Base branch | |
| Head branch | |
| Existing PR comments | |
| Review threads / unresolved | |
| Branch state / mergeability | |
| Changed files | |
| CI status | |

## Sources consulted

| Source type | Link / reference | Key finding |
|-------------|------------------|-------------|
| PR top-level comments | | |
| Review threads / review comments | | |
| Release notes / changelog | | |
| Security advisories | | |
| Issue tracker / regressions | | |
| Dependency graph / diff | | |
| Additional source | | |

## Validation plan

**Repository-specific checks**
```
(paste relevant commands here)
```

**Source-control plan**
```
(note whether branch refresh, rebase, conflict resolution, or push confirmation is needed)
```

**PR / package-specific checks**
```
(paste focused validation here)
```

## Lens tracking

| Lens | Assessment | Evidence | Notes |
|------|------------|----------|-------|
| Security | `clear / concern / blocking` | | |
| Code quality | `clear / concern / blocking` | | |
| Impact | `clear / concern / blocking` | | |

## Verdict

| Field | Value |
|-------|-------|
| Recommendation | `merge / merge with follow-up / hold / decline` |
| Confidence | `high / medium / low` |
| Rationale | |

## Follow-up handoff

If additional work is required, make the handoff explicit.

| Need follow-up? | Issue type | Destination skill / flow | Draft path / link |
|----------------|------------|--------------------------|-------------------|
| `yes / no` | `Task / Bug / User Story` | `fusion-issue-authoring` | |

## Final action gate

- [ ] Existing PR comments and review threads were reviewed before lens scoring
- [ ] Research summary is complete
- [ ] Research checkpoint comment posted to the PR before any rebase, push, approval, or merge action
- [ ] Lens assessments have evidence
- [ ] Unresolved reviewer concerns are reflected in the recommendation or explicitly rebutted
- [ ] Recommendation and confidence are consistent with the evidence
- [ ] Any required branch sync or rebase is explicit before patching
- [ ] Follow-up work is explicit instead of implied
- [ ] Final verdict comment posted to the PR before any approval or merge action
- [ ] Maintainer confirmation requested before any rebase, push, force-push, approve, or merge action