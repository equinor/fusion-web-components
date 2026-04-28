---
name: fusion-dependency-review
description: 'Review dependency PRs with structured research, existing-PR-discussion capture, multi-lens analysis (security, code quality, impact), and a repeatable verdict template. USE FOR: dependency update PRs, Renovate/Dependabot PRs, library upgrade reviews, "review this dependency PR", "should we merge this update". DO NOT USE FOR: feature PRs, application code reviews, dependency automation/bot configuration, or unattended merge without confirmation.'
license: MIT
compatibility: Requires GitHub MCP server for PR context. Uses fusion-issue-authoring for follow-up handoff when post-merge work is identified.
metadata:
  version: "0.1.3"
  status: experimental
  owner: "@equinor/fusion-core"
  tags:
    - github
    - pull-request
    - dependency-review
    - dependency-updates
    - security
  mcp:
    required:
      - github
---

# Dependency Review

Structured review workflow for dependency update PRs. Produces consistent research notes that incorporate existing PR discussion, multi-lens analysis, and an actionable verdict with explicit maintainer confirmation before any merge action.

## When to use

Use this skill when a dependency PR needs review and you want a consistent, auditable decision process.

Typical triggers:

- "Review this dependency PR"
- "Should we merge this dependency update?"
- "Check this Renovate/Dependabot PR"
- "Review one of our open dependency PRs"
- "What changed in this library bump?"
- "Is this dependency update safe to merge?"
- A PR title contains dependency update patterns (for example `chore(deps):`, `fix(deps):`, `bump`, `update`)
- The user shares a PR URL for a dependency update

## When not to use

Do not use this skill for:

- Feature PRs or application code reviews (use standard code review workflows)
- Dependency automation or bot configuration
- Approving/merging without explicit user confirmation
- Deciding organizational dependency policy

## Required inputs

Collect before starting the review:

- **Repository** owner and name
- **PR number or URL** for the dependency update, or a copied PR summary that includes package name, version change, changed files, and CI status
- Optional: specific review concerns or areas of focus from the maintainer

If required details are missing, ask concise clarifying questions from `references/questions.md`.

If the PR target is missing or ambiguous:

- Ask only the minimal follow-up question needed to identify the target PR.
- When repository context is known, use GitHub MCP to list likely open dependency PRs and let the user choose instead of guessing.
- Keep the shortlist concise and decision-friendly: include PR number, title, dependency/package hint, author, and CI state when available.

Auto-extract from the PR when available:

- Package(s) being updated and version range (from → to)
- Changelog/release notes URL
- CI status
- Changed files and dependency ecosystem
- Existing top-level PR comments, review comments, and unresolved thread state

## Instructions

### Preferred advisor orchestration

When the runtime supports skill-local advisors, prefer this execution shape instead of a single long linear pass:

1. Run `agents/target-pr-advisor.md` first when the PR target is missing or ambiguous so the review starts from one explicit dependency PR.
2. Run `agents/research-advisor.md` to normalize the PR context, existing discussion, source list, and research notes.
3. Fan out the lens advisors in parallel with the same normalized inputs:
  - `agents/security-advisor.md`
  - `agents/code-quality-advisor.md`
  - `agents/impact-advisor.md`
4. Chain the combined research and lens outputs into `agents/verdict-advisor.md` for recommendation, confidence, handoff, and confirmation wording.
5. Chain into `agents/source-control-advisor.md` only if the accepted next step requires PR patching, rebase, conflict resolution, or merge-readiness work.

Keep the lens advisors narrow and independent. The parent skill owns the unified review and should preserve disagreement between advisors instead of flattening it early.

### Workflow summary

1. Resolve the target PR with `agents/target-pr-advisor.md` and the concise prompts in `references/questions.md`.
2. Gather context and build the shared evidence packet with `agents/research-advisor.md`, `assets/review-tracker.md`, and `assets/research-template.md`.
3. Run `agents/security-advisor.md`, `agents/code-quality-advisor.md`, and `agents/impact-advisor.md` in parallel with the same normalized research packet.
4. Use `agents/verdict-advisor.md` to produce the recommendation, confidence, follow-up, and explicit maintainer prompt.
5. Use `agents/source-control-advisor.md` only after the verdict is accepted and only when branch work is required.
6. Follow `references/instructions.md` for the detailed live-PR contract: target selection, checkpoint comments, decision gates, and handoff timing.

## Assets

- `assets/research-template.md`: research-comment structure for change summary, breaking changes, known issues, and sources
- `assets/verdict-template.md`: verdict structure for lens assessments, recommendation, confidence, and follow-up items
- `assets/review-tracker.md`: working checklist and tracker for context, validation, lens outcomes, and handoff decisions

## References

- `references/instructions.md`: detailed execution contract for target selection, live-PR checkpoints, and decision sequencing
- `references/questions.md`: concise follow-up questions for choosing the target dependency PR and scoping the review

## Advisors

- `agents/target-pr-advisor.md`: resolves the exact dependency PR to review or returns a shortlist for user selection
- `agents/research-advisor.md`: first pass; builds the shared evidence packet for all later advisors
- `agents/security-advisor.md`: parallel lens pass; checks security posture and attack-surface changes
- `agents/code-quality-advisor.md`: parallel lens pass; checks upstream stability, regressions, and API drift
- `agents/impact-advisor.md`: parallel lens pass; checks repository blast radius, CI, and follow-up work
- `agents/verdict-advisor.md`: chained synthesis pass; turns research and lens outputs into one decision
- `agents/source-control-advisor.md`: conditional final pass; handles rebase, sync, validation reruns, and push safety when patching the PR

If helper advisors are unavailable, follow the same orchestration inline: research first, lenses next, verdict after that, and source-control last only when mutation is needed.

## Expected output

If the PR target is unresolved, return:

- A concise shortlist of candidate dependency PRs when live PR search is available
- The minimal follow-up question required to let the user choose the correct PR
- Explicit status: `Awaiting user PR selection`

If the PR target is resolved, return a structured review containing:

- Package name, version change, and update type
- Existing PR discussion summary (top-level comments, review-thread themes, unresolved concerns)
- Research summary (changelog highlights, breaking changes, known issues)
- Security assessment with evidence
- Code quality assessment with evidence
- Impact assessment with evidence
- Verdict: recommendation, rationale, confidence, and follow-up items
- Handoff recommendation when follow-up work should become a tracked issue
- Explicit action prompt for the maintainer

## Safety & constraints

- This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.

Never:

- Merge or approve a dependency PR without explicit user confirmation
- Create a merge commit by merging the base branch into a Dependabot or Renovate PR branch
- Guess which PR to review when multiple plausible dependency PRs exist
- Skip the research checkpoint comment or final verdict comment on a live PR
- Ignore existing reviewer concerns because they are inconvenient or duplicative
- Claim CI passed or security is clear without checking actual status
- Expose secrets or tokens in comments or logs
- Dismiss security concerns for convenience
- Fabricate changelog entries or version details not found in sources

Always:

- Ask minimal follow-up questions when the target PR is missing or ambiguous
- Present evidence for each assessment (link to changelog, CVE, CI status)
- List candidate dependency PRs for user selection when repository context exists but the PR target does not
- Fetch existing PR comments and review threads via GitHub MCP before analysis on a live PR
- Reuse one shared research packet across advisors instead of rediscovering the same facts in each pass — this includes PR metadata, changed files, CI status, and existing discussion
- Do not re-fetch PR comments or review threads independently in each advisor; pass the pre-fetched data from the research advisor to all lens advisors
- Prefer parallel lens analysis when the runtime supports it, then chain synthesis after all lens outputs are ready
- Post the research checkpoint comment to the PR before any branch mutation on a live PR
- Post the final verdict comment to the PR before any approval or merge on a live PR
- Make branch-sync or rebase needs explicit before patching the PR
- Rebase dependency PR branches onto the latest base branch when refresh is required; do not merge the base branch into the PR branch
- Make follow-up work explicit rather than burying it in review notes
- Respect the maintainer as the final decision-maker
- Keep review output in a consistent, repeatable structure
