---
name: fusion-pr-documentation
description: 'Drafts and updates evidence-backed PR descriptions. USE FOR: PR body, combined PRs, stale descriptions, review guides, validation summaries, issue linkage. DO NOT USE FOR: review threads (use fusion-github-review-resolution), implementation (use fusion-issue-solving), issues (use fusion-issue-authoring), dependency verdicts (use fusion-dependency-review), release notes or unconfirmed publishing.'
license: MIT
compatibility: Requires git and read access to the target repository. Live GitHub verification needs the gh CLI, the GitHub MCP server, or Fusion PM MCP. Publishing needs write access and explicit user confirmation.
metadata:
  version: "0.2.0"
  status: experimental
  owner: "@equinor/fusion-core"
  skills:
    - fusion-agent-content
    - fusion-issue-solving
    - fusion-github-review-resolution
    - fusion-issue-authoring
    - fusion-dependency-review
    - fusion-pm-mcp
  tags:
    - github
    - pull-request
    - pr-description
    - documentation
    - issue-linking
    - review-guide
  mcp:
    suggested:
      - github
      - fusion-pm-mcp
---

# Pull Request Documentation

Write durable project documentation: why, product context, observable changes, boundaries and continuing work. Keep
outcome, reviewer ask, risks and validation visible; fold support rather than drop facts.

## When to use

New/stale PR descriptions, review guides, validation summaries, issue linkage or product-work explanations. Includes
another workflow's PR-body handoff and bodies containing only file lists, commit dumps or unfilled templates. When
interpreting a request or checking narrative shape, read `references/pr-example.md` for intact trigger/worked
examples.

## When not to use

- Review threads: use `fusion-github-review-resolution`.
- End-to-end implementation: use `fusion-issue-solving`; issues: use `fusion-issue-authoring`.
- Dependency merge verdicts: use `fusion-dependency-review`.
- Changesets, release notes or changelogs.

## Required inputs

Target current branch/new PR or existing PR number/URL; base branch (propose repository default or branch of
origin); requested issues/PRs and exact linking intent; checks user ran not visible here. Derive diff, commits,
template, docs and local rules; ask only for missing facts.

## Safety & constraints

This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.

- No PR create/update, comments or issue-state changes without explicit confirmation. Linking defaults in autopilot
  are not publication approval.
- Never include secrets, tokens, credentials or personal data, folded blocks included.
- No guessed model/effort or invented validation/screenshots/CI. Distinguish observed checks, user-reported results,
  pre-existing failures and unrun checks. Never present plans as implemented.
- Preserve template headings, comments, checklist items/order and reviewer-added content/checklist state. Explain
  any removal; never silently drop sections.
- Keep risks, breaking changes, boundaries, failures, validation summary and closing choices visible.
- Verify consequential claims at local/live source. Semantic/indexed hits are pointers, not authority; cached PM
  state can lag. Report unavailable repository-required index, never substitute guesses.
- Add closing keywords only for chosen issues, or stated autopilot recommendation; never imply partial/enablement
  work completes production behavior.
- Read published body back; drift corrections need renewed confirmation before another edit.

## Repository-policy handoff

At use, defer template choice, base selection, issue-linking/defaults, draft locations, validation-evidence and
review-request rules to repository-local instructions. Local defaults are recommendations; still ask when user is
available unless intent already stated.

## Instructions

### 1. Establish implementation facts

Inspect branch, merge base, diff, commits and checks observed here or reported by user. Identify user/operational
behavior, security, data ownership, migrations, compatibility and non-goals.

### 2. Load repository conventions

Inspect `.github/pull_request_template.md`, `.github/PULL_REQUEST_TEMPLATE.md`, `docs/pull_request_template.md`,
root `pull_request_template.md`, and `.github/PULL_REQUEST_TEMPLATE/`. Choose matching template or ask when
several exist. Read `.github/copilot-instructions.md`, relevant `.github/instructions/`, `AGENTS.md` and
contribution guides. Existing PR: read live body first; retain accurate content, reviewer notes and checklist state.

### 3. Gather product context

Use diff for implementation, base-branch ADRs/specs/`CODEMAP.md`/README for decisions and boundaries, live GitHub
for scope/state/hierarchy. Search independently in parallel, refine once, prefer few strong relationships.
Cache/reuse reads; stop optional enrichment on rate limits and continue with local evidence. When client, hierarchy
or repository-index lookup needs detail, read `references/evidence-sources.md` for read-only tool/source recipes.

### 4. Verify relationships

Verify each candidate live/read-only: title, type, state, body, parent/children. Distinguish issues from PRs. Map
owning feature/story, enabled child work, predecessor baseline and adopted external work; explain each role, don't
merely list adjacent results.

### 5. Write the narrative in the human-first shape

Draft context-specific `.tmp/pr-body-<issue-or-topic>.md`, never shared `.tmp/pr-body.md`, unless repo specifies
another location. Preserve template structure/order and replace placeholders with accurate narrative. Use installed
`fusion-agent-content`; when absent or template mapping needs guidance, read `assets/pr-body-outline.md` for
narrative questions and visible/folded shape.

Without repository template, also read `assets/pr-body-outline.md.hbs` as skeleton, its `.hbs` slot header,
`assets/partials/agent-content/README.md`, and named `assets/partials/agent-content/banner.hbs`,
`assets/partials/agent-content/tldr.hbs`, `assets/partials/agent-content/details.hbs`,
`assets/partials/agent-content/references.hbs`; fill by hand, no renderer.

Runtime banner first (`model not reported` if unknown); quoted `> **TL;DR:**`, 1–3 outcome/ask sentences, no title
repeat, quote lists. Ordered template prose; bullets for lists. Fold inventories/output/long guides under
`<details><summary>Details</summary>`; `<details><summary>References and evidence</summary>` last lists actual
skills/references/sources and evidence roles. Aim for one visible screen; visible filenames only for short guide or
unclear ownership.

For combined PR of 3+ similar changes (such as bundled dependency updates), follow `references/combined-pr.md`: TL;DR with counts and ask, **Needs your attention** for decisions only, visible **Included updates** table, **Before merging** checks, updates not included, closing lines, then folds. Without repository template, fill `assets/combined-pr-outline.md.hbs`.

### 6. Decide close or reference for each issue

Per local rules, recommend `closes owner/repo#123` only for completed acceptance criteria; `refs owner/repo#123` for
parent/multi-PR/rollout/acceptance-pending or supporting cross-repo work. Ask per issue unless intent stated;
unavailable user: apply recommendation and list merge-closing choices. Explain completes/enables/supports/follows
and remaining work. For ambiguous linkage or closing diagnostics, read `references/issue-linking.md` for criteria
and intact examples.

Scan whole draft, including boilerplate/changelog/quotes, for unintended closing words before references. Account
for Development-sidebar links too; verify `closingIssuesReferences` after publication.

### 7. Report validation honestly

Exact observed commands with pass/fail; one-line result visible, command table/output folded under Details. Separate
pre-existing and change-caused failures; state omissions/reasons. Apply local visual-baseline/environment/CI-only
evidence rules, never invent them.

### 8. Confirm, publish, and read back

When preparing publication, read `assets/publish-checklist.md` before requesting approval for preflight, and apply
again after read-back. Show final draft and create/update, base, head, draft/ready, assignee, title. Require
explicit confirmation, then use:

- Create: `gh pr create --base <base> --head <branch> --title "<title>" --body-file <draft>`, adding `--draft` or
  `--assignee` as confirmed.
- Update: `gh pr edit <number> --body-file <draft>`.
- GitHub MCP equivalents when `gh` unavailable.

Read live PR back; verify confirmed body/metadata and `closingIssuesReferences`. Report drift, correct local draft,
re-confirm before editing again.

## Expected output

Draft path and full proposed human-first body; diff range/docs/verified issue and PR roles in References and
evidence; unknowns/unverified claims; linking modes/recommendations and user/autopilot choices; exact
validation/results/omissions and pre-existing failures. After approved publication: PR URL/read-back results
including `closingIssuesReferences`. Report remaining questions.
