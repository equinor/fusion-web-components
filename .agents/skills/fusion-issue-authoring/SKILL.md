---
name: fusion-issue-authoring
description: Classify issue type, activate the matching agent mode for type-specific drafting, and enforce shared safety gates before GitHub mutation.
license: MIT
metadata:
  version: "0.5.0"
  status: active
  owner: "@equinor/fusion-core"
  skills:
    - fusion-agent-content
  tags:
    - github
    - issue-authoring
  mcp:
    required:
      - github
---

# Issue Authoring

## When to use

Draft/update issues; route ideas, bugs, features, user needs, maintenance and relationships. Triggers: "create an issue", "draft a ticket", "turn this into a GitHub issue", "help me structure this work item", "update / maintain / clean up this issue", "add this as a sub-issue / set parent issue / link as child".

## When not to use

Code implementation, PR authoring/review, research without issue drafting, or unconfirmed GitHub mutations.

## Required inputs

Before publishing: repo; intent/context/type (Bug, Feature, User Story, Task); update number/URL; labels or intentional skip; parent/related links and dependency direction (sub-issue vs blocking); assignee (`@me`, login, or unassigned).

Missing context: read `references/questions.md` for questions. Unclear destination: ask before mutation commands.

Draft with user, not for user: question rounds, staged drafting, provenance tags and assumption gate in `references/collaborative-drafting.md` apply to every type.

## Safety & constraints

- Never run `mcp_github::issue_write` create/update without explicit confirmation. Draft content approval first, publish approval second. No assumed permission or first-draft-pass mutation unless explicitly confirmed.
- No secrets/credentials requested/exposed; destructive commands require explicit confirmation.
- Confirm destination, labels/skip, assignee and milestone gate before mutation; relationships before linking.
- Missing MCP server/auth/config: explain; read `references/mcp-server.md` for setup. Retry only after user confirms readiness.
- Report rate-limit failures (`API rate limit exceeded`, `secondary rate limit`, GraphQL quota exhaustion); stop non-essential lookups/optional enrichment. Keep drafts/cache and safe retry plan; no retry loops. Respect `retry-after` and `x-ratelimit-reset`. Ask before continuing without optional labels/assignees. GraphQL fallback: batch fields, 5 secondary-limit points per mutation vs 1 per query, pause at least 1 second between mutations. When estimating limits/budget, read `references/rate-limits.md`.
- Prefer WHAT/WHY over implementation HOW; concise editable drafts, full refs (`owner/repo#123`). Repository-local routing/workflow instructions take precedence. For text that closes issues on merge, ask per issue whether to close (`fixes`/`resolves`/`closes owner/repo#123`) or reference (`refs owner/repo#123`); recommend closure for completed work, reference for parent/multi-PR/cross-repo tracking. Honor stated intent; unattended, apply recommendation and disclose which issues will close.

## Instructions

### Step 1 — Classify and route

Classify `Bug`, `Feature`, `User Story`, or `Task`; clarify essential ambiguity. Read/apply selected mode only, as Markdown instructions (inline unless supported adapter). Shared sequence below governs drafting; users need not name files.

| Type | Selected mode | Fallback template when repo template absent |
| --- | --- | --- |
| Bug | `agents/bug.agent.md` | `assets/issue-templates/bug.md.hbs` |
| Feature | `agents/feature.agent.md` | `assets/issue-templates/feature.md.hbs` |
| User Story | `agents/user-story.agent.md` | `assets/issue-templates/user-story.md.hbs` |
| Task | `agents/task.agent.md` | Selected `assets/issue-templates/task*.md.hbs` variant below |

Moderate devil's-advocate pass after classification: 2–3 concerns with recommended resolutions. Bug: repro/severity/environment; Feature: scope/testable criteria/dependencies; User Story: role/scenarios/testable acceptance; Task: decomposition/circular blockers/validation. Planning: premature splits, implicit contracts, hidden architecture assumptions. Resolve codebase answers silently (they become `[verified]`); ask user to accept/adjust/dismiss rest in same question round. Never keep agent recommendation as decision without user answer; unanswered becomes `[assumed]`. Keep brief, skip settled concerns. Skip pass for well-defined scope/criteria/dependencies or explicit no-pushback request; post-draft review remains Step 5.

When asked "grilled", "stress-test this", "poke holes", or equivalent, significant scope/criteria gaps exist, or `fusion-issue-task-planning` reports two or more architecture-ambiguity signals: read/apply `agents/devils-advocate.agent.md` in interrogator mode before type drafting. Return decisions/derived answers/noted risks; hand off. Ordinary moderate review does not load interview.

### Step 2 — Resolve repository and template

No explicit repo: apply active workspace `CONTRIBUTING.md`/`contribute/` type routing, otherwise ask. Repository template (`.github/ISSUE_TEMPLATE/`) before fallback; preserve headings and Human-first output.

### Step 3 — Check duplicates

One focused `mcp_github::search_issues` duplicate search; surface matches. Rescan only material scope/title change.

### Step 4 — Clarify, then draft

Before drafting, read `references/collaborative-drafting.md`. Unclear problem, outcome, criteria, scope or dependencies: run question rounds (1–3 questions, each with recommended answer) and staged drafting before full draft; skip when request already explicit or user asks for no questions. Always tag every substantive claim in every section `[stated]`, `[verified: <source>]` or `[assumed]` (untagged counts as assumed); cut unrequested, unevidenced content before presenting and list cuts in one line.

User/session preferred draft path first. Without preference and ambiguous intent, ask once/cache answer; otherwise `.tmp/{TYPE}-{CONTEXT}.md`, GitHub Flavored Markdown.

Minimum parent-needed issues; required requirements/criteria/"Done when" only, extras under **Stretch goals**. Suggest nice-to-have title/value afterwards; draft only selected, autopilot report only.

Task fallback: choose only needed variant: `assets/issue-templates/task.md.hbs`, `assets/issue-templates/task.documentation.md.hbs`, `assets/issue-templates/task.planning.md.hbs`, `assets/issue-templates/task.research.md.hbs`, `assets/issue-templates/task.spec.md.hbs`, `assets/issue-templates/task.testing.md.hbs`, `assets/issue-templates/task.ux.md.hbs`. For broad tasks/decomposition, read `references/instructions.md` for checks.

Before filling fallback, read selected `.hbs` header, `assets/partials/agent-content/README.md`, and named partials: `assets/partials/agent-content/banner.hbs`, `assets/partials/agent-content/tldr.hbs`, `assets/partials/agent-content/details.hbs`, `assets/partials/agent-content/references.hbs` only when named. Fill as Markdown; no renderer ships with skill.

### Step 5 — Review and confirm

Ask content edits/approval, then explicit publication approval; `Awaiting user content approval` until approved.

Assumption gate (adds to approval, never replaces it): interactive publish blocked until every `[assumed]` claim confirmed, edited or removed. Unattended = caller states no user can answer and pre-authorized this run; never inferred from silence or run mode. Unattended doesn't block on assumptions: list them in visible `Assumptions to confirm` section after summary (`TL;DR`, or `Objective` when template has none); without pre-authorized publish, stop at local draft. Before publish, drop all tags; verified sources go in References and evidence.

### Step 6 — Apply shared gates

- Labels: existing repo labels only; fetch/cache full set once per repo/session, filter locally. Point-only/no cache: ask skip optional labels or user-confirmed labels in first `mcp_github::issue_write`; one rejection path, no per-label loops. Requested label absent: ask to proceed with available labels.
- Assignee: confirm `@me`, login, unassigned. Skip `mcp_github::search_users` for `@me`/exact login; cache repo/owner+query candidates.
- Milestone: only `Feature`, unless repo guidance says otherwise. Bugs, user stories, tasks get none, even parent's; explain convention and suggest parent Feature when user requests another type.
- `type`: send only with configured repo issue types. Cache per organization; `mcp_github::list_issue_types` only cache miss/invalid cache. Unsupported: omit `type` rest of session.
- For cache hydration/validation, read `references/cache-policy.md` for locations/refresh/rejections. Session memory preferred, otherwise uncommitted `.tmp/`.

### Step 7 — Mutate via MCP (ordered)

After explicit confirmation:
1. `mcp_github::issue_write`: create/update full known payload (`title`, `body`, supported `labels`, `assignees`, `type`).
2. Optional single `mcp_github::issue_write` follow-up only for fields unknown initially and available later.
3. `mcp_github::sub_issue_write` only requested relationship/order changes.
4. `mcp_github::add_issue_comment` only explicitly requested blocker/status notes.

Prefer MCP equivalents over `gh api`/GraphQL. Before sub-issue calls, retrieve child/order object IDs, not issue numbers. For payloads/linkage troubleshooting, read `references/mcp-payloads.md`.

For MCP gaps only, read `assets/graphql/README.md` (header/cost) and selected document: lookup `assets/graphql/issue_lookup.github.graphql`; types `assets/graphql/issue_types_list.github.graphql`; type update `assets/graphql/issue_type_update.github.graphql`; add/remove/order `assets/graphql/sub_issue_write.github.graphql`, `assets/graphql/sub_issue_remove.github.graphql`, `assets/graphql/sub_issue_reprioritize.github.graphql`; verification `assets/graphql/linkage_verify.github.graphql`. Minimum file, cached IDs, small pages; no retry loops; return to MCP equivalents.

### Step 8 — Validate relationships

Before linking: decomposition via sub-issues, prerequisite order, no contradictory graph. Sole child list: sub-issues, never parent body/comment checklist. If unavailable (cross-organization), one parent-body list and reason.

## Human-first output

When drafting, use installed `fusion-agent-content` or read `references/human-first-output.md` for framing. Missing drafter fields: read `assets/partials/agent-content/README.md#resolve-drafter-metadata` for bounded lookup, never guess. Repo headings/AC/decisions/risks/blockers visible; Details then References and evidence last.

## Expected output

Return selected mode, draft path under `.tmp/`, template source, proposed title/body/labels/type, open `[assumed]` items and cuts, dependency order/links, minimum set/stretch goals, undrafted suggestions, assignee/unassigned plan, duplicates/related links, exact confirmed create/update commands. Status: `Awaiting user content approval` before any publish/update command. Issue URL/number only after confirmed mutation. Suggest template maintenance when repo templates missing/weak.
