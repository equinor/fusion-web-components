# Clarifying questions

Use the smallest set of questions needed to start a useful dependency PR review.

## Resolve the target PR

- Which repository and PR should be reviewed?
- Do you already have a PR URL or PR number?
- If multiple dependency PRs are open, should I list the likely candidates for you to choose from?
- Which dependency or package name should I use to narrow the candidate PR list?

## Review focus

- What decision do you want from this review: merge, merge with follow-up, hold, or decline?
- Are there specific concerns to prioritize: security, CI failures, breaking changes, regressions, or blast radius?
- Is this mainly a runtime dependency, build dependency, test dependency, or dev-tooling update?

## Evidence and constraints

- Should I stay read-only, or should I prepare patching or rebase guidance if the PR is not merge-ready?
- Are there repository-specific checks or affected areas you want emphasized?
- If live GitHub context is incomplete, should I continue from a pasted PR summary or stop and ask for more detail?

## Decision gate

- If the review finds follow-up work, should I propose turning it into an issue?
- If the recommendation is merge, should I stop and wait for explicit confirmation before any approval or merge action?