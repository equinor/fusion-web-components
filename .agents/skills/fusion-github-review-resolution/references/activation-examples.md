# Review activation examples

## When to use

Use this skill when a pull request has unresolved inline review comments and you need a repeatable, auditable closure workflow.

Typical triggers (skill should activate on all of these):

**URL patterns — activate immediately:**
- `https://github.com/<owner>/<repo>/pull/<number>#pullrequestreview-<id>`
- `https://github.com/<owner>/<repo>/pull/<number>` (when context implies review work)

**Explicit user requests:**
- "Fix the review comments"
- "Address the review feedback on this PR"
- "There are unresolved review comments — fix them"
- "Resolve the conversations on this PR"
- "Handle all unresolved comments on this PR"
- "For each review comment: fix, test, commit, reply, resolve"
- "Close the open review threads"
- "Check this review and resolve the conversation when fixed"
- "Resolve outstanding review feedback"
- "The PR has changes requested — fix it"

**Implicit / agent-detected:**
- A PR is in "changes requested" state and the agent is asked to work on it
- A PR has unresolved review threads and the user asks to improve or merge the PR
- An agent working on a PR detects open review conversations

> **When a review URL is provided** (`github.com/<owner>/<repo>/pull/<number>#pullrequestreview-<id>`),
> auto-extract owner, repo, PR number, and review id from it.
> Only branch/worktree choice and validation commands still need confirming.


A supplied `#pullrequestreview-<id>` scopes original comments, not the full reply chain needed for judgment.
