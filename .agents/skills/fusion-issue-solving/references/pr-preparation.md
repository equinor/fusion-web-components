# PR preparation defaults

Repository-local workflow instructions take precedence over these portable defaults, including issue closure conventions.

9. Prepare PR-ready output
   - Summarize what changed and why.
   - Include validation evidence and known follow-ups.
   - Draft the PR body in a `.tmp/` file with an issue/context-specific name (for example, `.tmp/pr-body-issue-123-scope-summary.md`), not a shared `.tmp/pr-body.md`.
   - Base the draft on `.github/pull_request_template.md` and keep it updated as implementation evolves.
   - Shape the draft for human readers as described in [Human-first output](../SKILL.md#human-first-output).
   - Ask which base branch to target and propose a likely default (typically `main`, or the branch the current branch was cut from).
   - Ask whether the PR should be opened as draft or ready for review.
   - Ask whether the PR should be assigned to the user and whether related issues should be linked.
   - For each linked issue, ask whether merging should close it (`closes owner/repo#123`) or only reference it (`refs owner/repo#123`), and present the most logical choice as the default:
     - close (the usual case) when this PR completes the issue's acceptance criteria, such as the issue being solved;
     - reference when the issue is a parent story or epic, needs more PRs, rollout, or acceptance, or is in another repository that this PR only supports.
   - If the user already stated the intent ("closes #123", "just reference #123"), follow it without asking.
   - When the user is unavailable (autonomous or autopilot runs), apply the recommended choice and state in the PR body and delivery report which issues will close on merge.
