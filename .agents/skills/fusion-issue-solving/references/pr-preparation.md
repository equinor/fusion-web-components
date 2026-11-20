# PR preparation defaults

Repository-local workflow instructions take precedence over these portable defaults, including issue closure conventions.

9. Prepare PR-ready output
   - Summarize what changed and why.
   - Include validation evidence and known follow-ups.
   - Draft the PR body in a `.tmp/` file with an issue/context-specific name (for example, `.tmp/pr-body-issue-123-scope-summary.md`), not a shared `.tmp/pr-body.md`.
   - Base the draft on `.github/pull_request_template.md` and keep it updated as implementation evolves.
   - Shape the draft for human readers as described in [Human-first output](../SKILL.md#human-first-output).
   - Determine the base from repository and task evidence. If context establishes a verified, intended base (for example, the branch this work targets), propose it; otherwise read the repository-reported default. Verify every proposed branch exists. Never assume `main`/`master` or offer alternatives without evidence. Follow repository-local confirmation rules; otherwise ask only when the target is ambiguous or its intended/default branch cannot be established.
   - Open the PR as draft. Mark it ready only when it is ready for human review: after the review gate passes or a documented exception, or on the person's word when no gate applies.
   - Ask whether the PR should be assigned to the user and whether related issues should be linked.
   - For each linked issue, ask whether merging should close it (`closes owner/repo#123`) or only reference it (`refs owner/repo#123`), and present the most logical choice as the default:
     - close (the usual case) when this PR completes the issue's acceptance criteria, such as the issue being solved;
     - reference when the issue is a parent story or epic, needs more PRs, rollout, or acceptance, or is in another repository that this PR only supports.
   - If the user already stated the intent ("closes #123", "just reference #123"), follow it without asking.
   - When the user is unavailable (autonomous or autopilot runs), apply the recommended choice and state in the PR body and delivery report which issues will close on merge.
   - Never wait for CI checks to finish; report their state as observed. The review gate waits for review, not checks.
   - After publication and before requesting human review, follow repository-local Copilot review-gate policy through installed `fusion-github-review-resolution`. Carry gate status into delivery; ready status and PR creation do not imply human review was requested or the gate passed.
