# 🤖 Bip Bop - Dependency Update Research

Post this filled template to the PR as the research checkpoint comment before any branch mutation, rebase, push, approval, or merge.

## PR Snapshot

| Signal | Notes |
| ------ | ----- |
| Dependency | `<name>` (`<npm/pip/cargo/etc>`) |
| Version jump | `<from>` -> `<to>` |
| Update lane | `<patch/minor/major>` |
| Change scope | `<lockfile-only / manifest + lockfile / code changes>` |
| CI snapshot | `<passing/failing/pending/unknown>` |
| Branch health | `<current / behind base / conflicted / needs rebase>` |
| Consumer role | `<runtime / build / test / dev-tooling / mixed>` |

## Existing PR Discussion

| Signal | Notes |
| ------ | ----- |
| Top-level PR comments | `<count and key themes>` |
| Review threads | `<count total>; <count unresolved>; <count outdated if relevant>` |
| Maintainer requests | `<none / summary>` |
| Reviewer concerns to carry forward | `<none / summary>` |
| Already-answered or outdated discussion | `<none / summary>` |

## Upstream Delta

<!-- What changed upstream, the release character, and the changelog or release-note source. -->

## Breaking Changes And Migration Work

<!-- Concrete breakage, deprecations, peer shifts, or migration work. Use "None identified" if clean. -->

## Known Issues And Stability Signals

<!-- Regressions, rollback chatter, issue warnings, or "None found." Note if the release is too fresh for strong signal. -->

## Dependency Graph And Transitive Changes

<!-- New or removed packages, peer changes, install-script changes, or unusual lockfile churn. -->

## Branch And Validation Notes

<!-- Branch state, likely rebase need before patching, and focused validations to rerun after sync. -->

## Early Read

- Security signal: `<clear / concern / blocking>`
- Quality signal: `<clear / concern / blocking>`
- Impact signal: `<clear / concern / blocking>`
- Likely verdict direction: `<merge / merge with follow-up / hold / decline>`

## Sources Checked

- [ ] Existing PR comments: `<link or note>`
- [ ] Review threads / review comments: `<link or note>`
- [ ] Upstream changelog or release notes: `<link or note>`
- [ ] Security advisories: `<link or note>`
- [ ] Issue tracker or regressions: `<link or note>`
- [ ] PR diff and changed files: `<link or note>`
- [ ] CI or validation evidence: `<link or note>`
