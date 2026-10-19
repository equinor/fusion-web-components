---
name: fusion-pr-documentation
description: 'Researches, drafts, reviews, and updates pull request descriptions as durable project documentation, grounded in the diff, repository docs, and live GitHub issues and PRs. USE FOR: writing a PR body or PR description, updating a PR description after new commits, review guides, validation summaries, issue linkage, explaining how a change fits product work. DO NOT USE FOR: resolving review threads (use fusion-github-review-resolution), implementing an issue end-to-end (use fusion-issue-solving), drafting issues (use fusion-issue-authoring), or dependency PR verdicts (use fusion-dependency-review).'
license: MIT
compatibility: Requires git and read access to the target repository. Live GitHub verification needs the gh CLI, the GitHub MCP server, or Fusion PM MCP. Publishing needs write access and explicit user confirmation.
metadata:
  version: "0.1.1"
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

Treat every pull request body as durable project documentation. A future maintainer should understand why the change exists, how it advances the product, what behavior and boundaries changed, and where related work continues — without reconstructing the story from the diff.

Durable does not mean long. Write the body for people first: a reviewer with thirty seconds should get the outcome, the ask, the risks, and the validation result from the visible part, while file lists, command output, and evidence stay one click away in folded blocks.

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

## When not to use

- Resolving or replying to review threads — use `fusion-github-review-resolution`
- Implementing an issue end-to-end — use `fusion-issue-solving` (it can hand its PR-body step to this skill)
- Drafting or publishing issues — use `fusion-issue-authoring`
- Deciding whether to merge a dependency update — use `fusion-dependency-review`
- Writing changesets, release notes, or changelogs

## Required inputs

Collect before drafting; ask only for what cannot be derived:

- Target: current branch (new PR) or existing PR number/URL
- Base branch — propose the repository default, or the branch the current branch was cut from
- Related issues or PRs the user wants mentioned, and the exact wording they used ("reference", "link", "closes")
- Validation the user already ran, when it is not visible in this session

Derive the rest from the repository: diff, commits, PR template, docs, and repository-local instructions.

## Instructions

### 1. Establish implementation facts

Inspect the branch, merge base, diff, commits, and the validation actually run in this session or reported by the user. Identify user-visible behavior, operational behavior, security boundaries, data ownership, migrations, compatibility effects, and explicit non-goals. Never describe planned behavior as implemented.

### 2. Load repository conventions

- Inspect the PR template: `.github/pull_request_template.md`, `.github/PULL_REQUEST_TEMPLATE.md`, `docs/pull_request_template.md`, root `pull_request_template.md`, and `.github/PULL_REQUEST_TEMPLATE/`. When several templates exist, pick the one matching the change or ask.
- Read repository-local instructions (`.github/copilot-instructions.md`, files under `.github/instructions/`, `AGENTS.md`, contribution guides) for PR, issue-linking, and validation-evidence rules. They take precedence over this skill.
- For an existing PR, read the live body first and keep accurate content, reviewer-added notes, and checklist state.

### 3. Gather product context

Follow `references/evidence-sources.md`. Use sources by claim: the diff for what changed; repository docs (ADRs, specs, `CODEMAP.md`, README) for decisions and boundaries; live GitHub for scope, state, and hierarchy; an optional semantic index only to discover candidates. Run independent searches in parallel, refine once with terms found, and prefer a few strong relationships over a long list of adjacent results.

### 4. Verify relationships

Verify every candidate issue or PR live and read-only: title, type, state, parent/children, and body. Distinguish issues from PRs. Map the change to the owning feature or story, child work it enables, predecessor PRs that set the baseline, and adopted external work. Explain each relationship; never just list it.

### 5. Write the narrative in the human-first shape

Draft into a context-specific file such as `.tmp/pr-body-<issue-or-topic>.md` (never a shared `.tmp/pr-body.md`) unless repository instructions name another location. Preserve every template heading, comment, checklist item, and their order; replace placeholders with accurate content and expand them into a coherent account using `assets/pr-body-outline.md`. Without a repository template, use `assets/pr-body-outline.md.hbs` only. Read its `.hbs` slot header, `assets/partials/agent-content/README.md`, and every named partial before filling; no renderer ships with the skill.

Shape the body with `fusion-agent-content` when it is installed. Otherwise apply this summary of it:

1. **Banner** as the first line: `<sub>🤖 Drafted by <agent> (<tool>) · <model> · <effort> reasoning</sub>`. Take the agent, model, and reasoning effort from the runtime; never guess. Write `Drafted with <tool>` without a custom agent, and `model not reported` when the runtime does not say.
2. **TL;DR** as a quote block starting with `> **TL;DR:**`: one to three sentences on the outcome and what the reviewer should do or decide, without repeating the title. Quote any short list under it too.
3. **Template headings** in their order, written as short, natural prose for people. Use bullets only for real lists.
4. **Details**, folded as `<details><summary>Details</summary>`: file lists, command output, raw data, and a long review guide.
5. **References and evidence**, folded as `<details><summary>References and evidence</summary>` and always last: skills used, skill references read, and each verified issue, PR, doc, or command with one line on what it shows.

Keep visible what the reader must act on: the one-line validation result, risks, breaking changes, boundaries, and which issues close versus are referenced. Shorten by folding, never by dropping facts; aim for a visible part that fits on about one screen.

Avoid bodies that are only generated file lists, commit summaries, or test checklists. Name files in the visible part only in a short review guide or where ownership is unclear; put full file lists under **Details**.

### 6. Decide close or reference for each issue

Follow `references/issue-linking.md`:

- Ask, per linked issue, whether merging should close it (`closes owner/repo#123`) or only reference it (`refs owner/repo#123`), with the most logical choice preselected: close when this PR completes the issue (the usual case); reference for parent stories, multi-PR or rollout work, and other repositories this PR only supports.
- Follow intent the user already stated without asking.
- When the user is unavailable (autopilot), apply the recommendation and list which issues will close on merge.
- State what the PR does for each linked issue: completes, enables, supports, or follows.

### 7. Report validation honestly

Report only commands and outcomes actually observed, as exact commands with pass/fail. Keep a one-line result visible (for example "All 6 checks pass; e2e not run, needs CI") and fold the command table and output under **Details**. Separate pre-existing failures from failures caused by the change. State what was not run and why. Follow repository-specific evidence rules (for example visual baselines, screenshot environments, CI-only suites) from local instructions instead of inventing them.

### 8. Confirm, publish, and read back

Show the final draft and the intended operation: create or update, base, head, draft/ready, assignee, title. Do not create or update a PR without explicit user confirmation of that mutation. Then:

- Create: `gh pr create --base <base> --head <branch> --title "<title>" --body-file <draft>`, adding `--draft` or `--assignee` as confirmed
- Update: `gh pr edit <number> --body-file <draft>`
- GitHub MCP equivalents are fine when `gh` is unavailable

After publishing, read the live PR back and run `assets/publish-checklist.md`. If anything drifted, such as an unintended closing reference, fix the draft and re-confirm before editing again.

## Expected output

- Draft file path and the full proposed body in the human-first shape: runtime-sourced banner, quoted TL;DR, template headings in prose, folded **Details**, and folded **References and evidence** last
- Evidence used: diff range, docs, and verified issues/PRs with the role of each, recorded in the **References and evidence** block
- A note on anything unknown, such as an unreported model or a claim that could not be verified
- Issue references with their linking mode (close or reference), the recommendation, and whether the user chose it or it was applied automatically
- Validation summary: observed commands with outcomes, pre-existing failures, and what was not run
- After a confirmed publish: PR URL and read-back results, including `closingIssuesReferences`
- Open questions and claims that could not be verified

## Example

User: "Open a PR for this branch, it solves #57 and is part of story #212."

Agent: drafts `.tmp/pr-body-57-<topic>.md` from the repository template, opening with its runtime banner and a two-sentence quoted TL;DR (`> **TL;DR:** ...`), and verifies both issues live. It keeps the one-line validation result and closing choices visible, and folds the file list, command output, and evidence. It asks: "Close #57 on merge (recommended: this PR meets its acceptance criteria) and reference story #212 (recommended: two sibling tasks are still open)?" It writes `closes owner/repo#57` and `refs owner/repo#212` as confirmed. It publishes only after confirming base, draft state, and creation, then checks that `closingIssuesReferences` lists only #57.

Avoid: closing story #212 because the PR mentions it, leaving #57 open when the PR completes it, or opening the body with a file inventory.

## Repository-policy handoff

Defer to repository-local instructions for PR template choice, base-branch selection, issue-linking conventions, draft locations, validation-evidence rules, and review-request workflow. Point to those rules at the point of use instead of restating them. When local rules set a linking default, use it as the recommendation and still ask when the user is available.

## Safety & constraints

This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.

Never:

- Create or update a PR, post comments, or change issue state without explicit user confirmation
- Add a closing keyword the user did not choose, unless the user was unavailable and it was the stated recommendation
- Claim validation, screenshots, or CI results that were not observed
- Present an unrun check as passing, or blur pre-existing failures into the change
- Include secrets, tokens, credentials, or personal data in the body, folded blocks included
- Guess the model or reasoning effort in the banner, or fold risks, breaking changes, failures, or closing choices out of sight
- Drop reviewer-added content or template sections without saying why

Always:

- Inspect and preserve the repository PR template
- Verify consequential claims at their live or local source; semantic search results are pointers, not authority
- Read the published body back and verify it
