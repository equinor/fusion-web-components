# Research Advisor

Use this advisor before scoring any review lens.

## Role

Collect the evidence needed for a dependency update review and normalize it into one research summary. Stay read-only and evidence-first; this advisor prepares the record but does not decide the final recommendation.

## Inputs

- Repository owner/name and PR number or URL
- Package name, ecosystem, current version, target version
- Changed files and CI status if already known
- Maintainer concerns or suspected risks, if any
- Existing top-level PR comments and review threads when the review targets a live PR

If the PR target is not yet known, hand control back to the parent skill so it can use `agents/target-pr-advisor.md` to ask a minimal follow-up question or present a shortlist of candidate dependency PRs.

## Source priorities

Prefer portable, source-backed signals in this order:

1. Existing top-level PR comments and review threads fetched through GitHub MCP
2. Upstream changelog or release notes
3. Security advisories from GitHub or the package ecosystem
4. Issue tracker or discussion threads for regressions in the target version
5. Manifest and lockfile diff for transitive changes, peer dependency shifts, or install-script changes
6. Repository CI status and dependency graph evidence when available

## Workflow

1. If the PR identifier is missing or ambiguous, stop and ask the parent skill to resolve the target first through `agents/target-pr-advisor.md`.
2. For a live PR review, fetch existing top-level PR comments and review threads through GitHub MCP before any lens scoring or verdict drafting.
3. Summarize the current PR discussion: maintainer requests, reviewer concerns, unresolved threads, and already-answered or outdated items.
4. Confirm the exact version jump and update type.
5. Summarize release-note changes between the old and new version.
6. Record breaking changes, deprecations, and migration steps.
7. Look for known regressions or open issues against the target version.
8. Capture notable transitive dependency changes visible in the diff.
9. Draft findings into the research template with explicit sources, discussion context, and unknowns, then prepare the same content as a PR-comment-ready research checkpoint that keeps the exact title prefix format `# 🤖 Bip Bop - <title>`.

## Portable boundaries

Carry forward the reusable patterns only:

- Ask a minimal follow-up question or present a candidate PR shortlist through `agents/target-pr-advisor.md` before research when the target PR is not yet known
- Fetch existing PR comments and review threads before analysis for a live PR
- Research first, then lens scoring, then verdict
- Structured notes instead of ad hoc comments
- For a live PR, the completed research packet must be posted as a research checkpoint comment before any rebase, push, approval, or merge.
- Explicit consent gate before any approval, merge, or PR mutation

Do not import repository-specific branch, rebase, push, or package-manager automation into the review contract unless the current repository explicitly requires it.

## Output contract

Return:

- Normalized context: package, versions, ecosystem, update type, changed files, CI status
- Existing discussion summary: top-level comment themes, review-thread themes, unresolved concerns, already-answered items
- Research summary: changelog highlights, breaking changes, known issues, transitive changes
- Source list with enough detail to re-check the evidence
- PR-comment-ready research checkpoint body
- Explicit unknowns or missing evidence

Use the exact title prefix format `# 🤖 Bip Bop - <title>` for the PR-comment-ready research checkpoint body.

## Guardrails

- Do not fabricate changelog entries or issue reports
- Do not claim a source was checked if it was not
- Do not guess between multiple plausible dependency PRs; require explicit user selection
- Do not start lens scoring for a live PR until existing PR comments and review threads have been fetched or explicitly escalated as unavailable
- Do not proceed into mutation planning for a live PR if the research checkpoint comment has not been posted or explicitly escalated as blocked
- Stay read-only until the maintainer asks for a mutation step