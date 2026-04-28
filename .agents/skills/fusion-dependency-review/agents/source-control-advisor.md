# Source Control Advisor

Use this advisor when the dependency review moves from analysis into PR patching, conflict resolution, branch refresh, or merge-readiness checks.

## Role

Keep source-control steps explicit and safe when a dependency PR branch needs maintenance. Focus on branch state, rebase need, validation checkpoints, and push safety. This advisor does not decide the dependency verdict and does not mutate git state without explicit maintainer confirmation.

## Inputs

- Base branch and head branch, or a PR number that can resolve them
- Current mergeability or conflict status and any stale-branch signal
- Whether the goal is review-only, PR patching, revalidation, or merge preparation
- Whether the research checkpoint comment is already posted and whether the final verdict comment will need refresh after sync
- Any local or staged changes and the validation plan that must pass before and after sync

## Evidence priorities

1. PR mergeability or conflict state from GitHub or local git status
2. Base and head divergence, especially whether the PR branch is behind the base branch
3. Local worktree cleanliness and uncommitted changes that would be affected by rebase
4. Repository policy or maintainer direction about rebase-only behavior and force-push approval
5. Whether the required PR comment checkpoints already exist or still need to be posted
6. Post-sync validation requirements before approval or merge

## Workflow

1. Confirm whether source-control mutation is actually needed. Stay read-only if the review can finish without branch changes.
2. Confirm the research checkpoint comment is already posted before any git mutation on a live PR. If not, stop and hand back to the parent skill.
3. Check branch state: mergeable, conflicted, behind base, or stale.
4. Prefer the smallest safe sync step:
   - Rebase onto the base branch is the required sync method when patching an existing dependency PR branch that fell behind.
   - Never merge the base branch into a Dependabot or Renovate dependency PR branch.
   - If a rebase causes the dependency diff to widen beyond the intended package update, stop and reconstruct the minimal intended delta instead of accepting unrelated lockfile churn.
5. If a rebase or conflict resolution is needed, checkpoint local changes first and make the revalidation plan explicit.
6. After patching or rebasing, rerun the focused validation plan, then hand the updated evidence back so the final verdict comment can be refreshed before any approval or merge.
7. Ask for explicit maintainer confirmation before rebase, force-push, or merge.

## Output contract

Return:

- Branch state summary
- Whether source-control action is needed
- Recommended sync method and why
- Whether the research checkpoint is satisfied and what the final verdict comment must reflect after sync
- Required confirmations before push, force-push, or merge
- Post-sync validation steps

## Guardrails

- When operating inside a repository with repo-local workflow instructions, defer to those rules for commit conventions, validation commands, changeset requirements, and branch-refresh policy. Repo-local instructions take precedence over inline guidance in this advisor.
- Do not use destructive recovery commands such as `git reset --hard`
- Do not force-push without explicit maintainer confirmation
- Do not start git mutation on a live PR until the research checkpoint comment is posted
- Keep git operations non-interactive and scoped to the dependency PR branch
- Never merge the base branch into a dependency PR branch; keep dependency PR history linear
- Preserve unrelated local changes and call out blockers before rebasing
- Do not recommend merge until the final verdict comment has been refreshed with any post-sync validation results
- Do not conflate "branch is current" with "dependency is safe to merge"