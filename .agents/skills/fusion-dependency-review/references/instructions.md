# Detailed workflow

Use this reference for the expanded execution contract. Keep `SKILL.md` focused on activation, high-level orchestration, outputs, and safety; use this file when the run needs step-by-step sequencing.

## Step 0 — Resolve the target PR

1. If the user already provided a PR URL or PR number, normalize owner, repo, and PR number from that input.
2. If the request is ambiguous (for example `review the dependency PR`), ask only the minimum follow-up needed to identify the target.
3. When repository context is known but the PR is not, use GitHub MCP to search or list open dependency PRs and present a shortlist for the user to choose from.
4. Prefer likely dependency-update candidates first: bot-authored PRs, titles with `deps`, `bump`, `update`, or ecosystem-specific dependency wording.
5. If multiple plausible PRs remain, do not guess. Wait for the user to choose the PR before continuing.
6. If live PR access is unavailable, ask the user to provide a PR URL, PR number, or pasted PR summary before starting research.

## Step 1 — Gather PR context

1. After a single target PR is selected, fetch PR metadata: title, description, changed files, CI status, labels.
2. Fetch existing top-level PR comments and review threads through GitHub MCP before any analysis, using PR tools that list both timeline comments and threaded review feedback so everything is captured.
3. Summarize the current PR discussion: maintainer requests, reviewer concerns, unresolved threads, prior agent comments, and decisions already made.
4. If live comment or review-thread retrieval fails, stop before analysis and tell the maintainer that the required PR discussion context could not be loaded.
5. Identify the dependency being updated: package name, ecosystem, current version, target version.
6. Determine the update type: patch, minor, or major.
7. Pull the diff to understand what files changed, typically lockfiles, manifests, or code adaptations.
8. Determine whether the PR branch is current, mergeable, or likely to require rebase before patching or revalidation.
9. If live PR access is unavailable, normalize the user-provided summary into the same fields and continue only if the summary is sufficient.

## Step 2 — Research and prepare the evidence packet

1. Start from the PR discussion summary created in Step 1 and refine it to highlight maintainer instructions, prior reviewer findings, unanswered questions, and unresolved review threads, clearly distinguishing open concerns from resolved or outdated discussion.
2. Summarize release notes or changelog changes between the old and new version.
3. Flag breaking changes, deprecations, peer shifts, or migration steps.
4. Check for known regressions or open issues against the target version.
5. Capture notable transitive dependency changes visible in the diff.
6. When the ecosystem provides audit tooling such as `npm audit`, `cargo audit`, or `pip-audit`, include that output as an additional evidence source.
7. Start from `assets/review-tracker.md` and fill the context, discussion inventory, validation plan, and source inventory first.
8. Draft detailed findings into `assets/research-template.md` either in `.tmp/` or as a PR comment draft, keeping the exact title prefix format `# 🤖 Bip Bop - <title>`.

## Step 3 — Run lens analysis and synthesize the verdict

1. Run `agents/security-advisor.md`, `agents/code-quality-advisor.md`, and `agents/impact-advisor.md` in parallel with the same normalized research packet.
2. Treat the lens advisors as evidence producers only; the parent skill still owns the unified review.
3. Chain the research output and lens outputs into `agents/verdict-advisor.md` for the recommendation, confidence, follow-up handoff, and explicit maintainer prompt.
4. If any lens has a `blocking` assessment, the recommendation must not be `merge` without addressing the blocker first.
5. Unresolved reviewer concerns or open review threads without an evidence-based resolution should reduce confidence and usually prevent a straight `merge` recommendation.
6. Treat the verdict as a comment-ready artifact. If patching, rebasing, or focused validation changes the branch state, fold those results into the final verdict before posting it.

## Step 4 — Live PR checkpoints and maintainer decision gates

1. Post the research checkpoint comment before any source-control mutation, rebase, push, approval, or merge.
2. If the runtime cannot post the research checkpoint comment, stop before mutation and tell the maintainer that the PR record could not be updated.
3. Post the final verdict comment before any approval, hold, decline, or merge action. Refresh it with any patching or validation results before posting.
4. Include the existing discussion summary, unresolved reviewer concerns or rationale for treating them as resolved or outdated, lens assessments, recommendation, confidence, follow-up items, and explicit confirmation prompt in the final verdict comment, and keep the exact title prefix format `# 🤖 Bip Bop - <title>`.
5. If the runtime cannot post the final verdict comment, stop before approval or merge and tell the maintainer that the PR record could not be updated.
6. If branch patching is required before approval or merge, use `agents/source-control-advisor.md` only after the verdict is accepted so branch-sync planning, rebase need, validation reruns, and push confirmation stay tied to the chosen next action.
7. Before any rebase, push, force-push, approval, or merge, ask for explicit maintainer confirmation.
8. If the maintainer approves merge, then approve and/or merge the PR via MCP.
9. If the maintainer requests hold, add a comment noting the hold reason and any follow-up criteria.
10. If the maintainer declines, add a comment with the rationale and close if requested.
11. If follow-up work is identified, propose a handoff through `fusion-issue-authoring` so the follow-up becomes an explicit `Task`, `Bug`, or `User Story` instead of an informal note.