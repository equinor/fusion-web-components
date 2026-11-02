# PR documentation examples

## When to use

Typical triggers:

- "Write the PR description for this branch"
- "Draft a PR body for my changes to #123"
- "Update the description of PR #456 — it is stale after the last commits"
- "Open a PR and reference equinor/fusion#914"
- "Add a review guide and validation summary to this PR"
- "Explain in the PR how this fits the feature work"

Implicit triggers:

- Another workflow (for example `fusion-issue-solving`) reaches its PR-body step and this skill is installed
- A PR body is only a file list, a commit dump, or an unfilled template

## Example

User: "Open a PR for this branch, it solves #57 and is part of story #212."

Agent: drafts `.tmp/pr-body-57-<topic>.md` from the repository template, opening with its runtime banner and a two-sentence quoted TL;DR (`> **TL;DR:** ...`), and verifies both issues live. It keeps the one-line validation result and closing choices visible, and folds the file list, command output, and evidence. It asks: "Close #57 on merge (recommended: this PR meets its acceptance criteria) and reference story #212 (recommended: two sibling tasks are still open)?" It writes `closes owner/repo#57` and `refs owner/repo#212` as confirmed. It publishes only after confirming base, draft state, and creation, then checks that `closingIssuesReferences` lists only #57.

Avoid: closing story #212 because the PR mentions it, leaving #57 open when the PR completes it, or opening the body with a file inventory.
