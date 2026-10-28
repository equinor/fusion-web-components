---
name: fusion-issue-authoring
description: Classify issue type, activate the matching agent mode for type-specific drafting, and enforce shared safety gates before GitHub mutation.
license: MIT
metadata:
  version: "0.4.2"
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

## Agent modes

This skill uses internal agent modes for type-specific drafting logic:

- `agents/bug.agent.md`: bug-focused issue drafting and triage structure
- `agents/feature.agent.md`: feature-focused scope and acceptance structure
- `agents/user-story.agent.md`: role/workflow/scenario-driven story structure
- `agents/task.agent.md`: checklist-first task decomposition and dependency planning
- `agents/devils-advocate.agent.md`: always-on quality collaborator that raises key concerns after classification (moderate mode) and runs a full structured interview when explicitly asked, when scope/criteria gaps are significant, or when invoked from `fusion-issue-task-planning` with two or more architecture-ambiguity signals present (interrogator mode)

Agent modes are activated internally based on issue type classification. Users never reference agent files directly. Shared gates (labels, assignee confirmation, draft review, publish confirmation, and mutation sequencing) remain in this skill.

## When to use

Use when turning ideas, bugs, feature requests, or user needs into clear, actionable GitHub issues, and as top-level router for creating and updating issues.

Typical triggers:
- "create an issue"
- "draft a ticket"
- "turn this into a GitHub issue"
- "help me structure this work item"
- "update / maintain / clean up this issue"
- "add this as a sub-issue / set parent issue / link as child"

## When not to use

- Implementing code changes
- PR authoring or review
- General research not resulting in an issue draft
- Mutating GitHub state without explicit user confirmation

## Required inputs

Collect before publishing:
- Target repository
- Issue intent/context and type (Bug, Feature, User Story, Task)
- Existing issue number/URL when updating
- Repository label set (or confirmation labels are intentionally skipped). Cache full label set per repo for session; filter locally. Prefer host session memory; otherwise `.tmp/` cache file (never committed).
- Parent/related issue links and dependency direction (sub-issue vs blocking)
- Assignee preference (`@me`, specific person, or unassigned). Reuse cached assignee-candidate results; skip searches when user gave `@me` or exact login.

If required details are missing, ask concise clarifying questions from `references/questions.md`.
If issue destination is unclear, ask explicitly where the issue should be created/updated before drafting mutation commands.

## Instructions

### Step 1 — Classify and route

Classify request as `Bug`, `Feature`, `User Story`, or `Task`, then activate the matching agent mode:
- Bug -> `agents/bug.agent.md`
- Feature -> `agents/feature.agent.md`
- User Story -> `agents/user-story.agent.md`
- Task -> `agents/task.agent.md`

If ambiguous, ask only essential clarifying questions.

Devil's advocate pass: `agents/devils-advocate.agent.md` is always active in moderate mode — it surfaces the 2–3 most important concerns after classification without interrupting flow. When the user asks to be "grilled", says "stress-test this", when scope/criteria gaps are significant, or when invoked from `fusion-issue-task-planning` with two or more architecture-ambiguity signals present, escalate to interrogator mode for a full structured interview before the type-specific agent. The devil's advocate returns confirmed decisions and noted risks, then hands off to the type-specific drafting agent.

### Step 2 — Resolve repository and template

- Resolve the destination repository before any mutation.
- When no explicit repository is given, check the active workspace for contributor guides (`CONTRIBUTING.md`, `contribute/`) that define default issue routing by type. Apply any routing rules found there before asking the user.
- If no routing guidance exists in the repo, ask explicitly where the issue should be created.
- Template precedence:
  1. repository template (`.github/ISSUE_TEMPLATE/`)
  2. specialist fallback template
- Either way, shape the body as described in [Human-first output](#human-first-output).

### Step 3 — Check duplicates

Run one focused duplicate search with `mcp_github::search_issues` and surface matches before drafting/publishing.
Do not run repeated broad duplicate scans unless the user changes scope/title materially.

### Step 4 — Draft first

Before writing, check user preferences and session memory for a preferred draft location. If a stored preference exists, use it. If no preference is found and the intent is ambiguous, ask once and remember the answer for the session. Default to `.tmp/{TYPE}-{CONTEXT}.md` when no preference is found and there is nothing to ask about. Write the draft using GitHub Flavored Markdown.

### Step 5 — Review and confirm

- Ask for content edits first.
- Ask explicit publish confirmation before mutation.
- Never publish/update in the same pass as first draft unless user explicitly confirms.

### Step 6 — Apply shared gates

Before mutation, confirm:
- labels (only labels that exist in the target repo)
- assignee intent (`@me`, specific login, or unassigned)
- milestone: set one only on `Feature` issues, unless repository guidance (for example `CONTRIBUTING.md` or `contribute/`) says otherwise. User stories, tasks, and bugs get no milestone, not even the parent's; they are tracked through their parent. When the user asks for a milestone on another type, explain the convention and suggest setting it on the parent Feature instead.

Shared gate cache policy:
- On the first label lookup for `owner/repo`, fetch the repository label set once and cache it for the active session. Prefer `/memories/session/<owner>-<repo>-labels.json` when the host exposes session memory; otherwise use `.tmp/issue-authoring-labels-<owner>-<repo>.json`.
- On cache hit, validate requested labels locally. Do not repeat point lookups for each requested label.
- If the host only exposes point label lookups and no cached label set exists yet, do not loop through labels one by one. Ask whether to skip optional labels or include only user-confirmed labels in the first `mcp_github::issue_write` call and handle a single rejection path.
- Skip `mcp_github::search_users` when the user already gave `@me` or an exact GitHub login.
- When assignee lookup is needed, cache candidate results for the active session keyed by owner/repo (or owner) and query. Prefer `/memories/session/<owner>-<repo>-assignee-candidates.json` or `/memories/session/<owner>-assignee-candidates.json`; otherwise use `.tmp/issue-authoring-assignee-candidates-<owner>-<repo>.json`.
- If rate limits block optional label or assignee enrichment, ask whether to continue without them instead of looping retries.

### Step 7 — Mutate via MCP (ordered)

After explicit confirmation, execute MCP mutations in this order:
1. `mcp_github::issue_write` create/update with the full known payload (`title`, `body`, and include `labels`, `assignees`, `type` only when supported)
2. Optional single follow-up `mcp_github::issue_write` only when required fields were unknown in step 1 and become available later
3. `mcp_github::sub_issue_write` only when relationship/order changes are requested
4. `mcp_github::add_issue_comment` only when blocker/status notes are explicitly requested

If mutation fails due to missing MCP server/auth/config:
- explain the failure clearly
- guide user to setup steps in `references/mcp-server.md`
- retry after user confirms setup is complete

Rate-limit behavior:
- Detect and report rate-limit failures clearly (`API rate limit exceeded`, `secondary rate limit`, GraphQL quota exhaustion).
- Stop non-essential lookups and skip optional enrichments when rate limits are hit.
- Keep draft artifacts and return a safe retry plan instead of looping retries.
- Prefer MCP tools over ad hoc `gh api`/GraphQL retries when equivalent MCP capability exists.
- When using GraphQL fallback: mutations cost 5 secondary-limit points each (vs 1 for queries), so batch fields into a single mutation call and pause at least 1 second between mutation calls.
- Respect `retry-after` and `x-ratelimit-reset` headers before retrying any request.

`type` rule:
- Only use `type` if the repository has issue types configured.
- Use cached issue types per organization when available.
- Call `mcp_github::list_issue_types` only on cache miss or invalid cache.
- If issue types are not supported, omit `type` for the rest of the session.

### Step 8 — Validate relationships

Before linking:
- use sub-issues for decomposition
- use sub-issue ordering to represent prerequisites
- ensure no contradictory dependency graph
- keep the sub-issue list as the only list of children: don't repeat child issues as a checklist or list in the parent body or in a parent comment. If sub-issues can't be used (for example across organizations), fall back to one list in the parent body and say why.

## Scope to the minimum

- Draft only the issues needed to resolve the request: the fewest user stories that deliver a feature, the fewest tasks that meet a story's acceptance criteria. Each issue must be needed by its parent.
- Keep requirements, acceptance criteria, and "Done when" to what is required to close the issue. Put desirable extras under a separate **Stretch goals** heading that does not block closing.
- After the minimum draft, list nice-to-have quality-of-life issues that could also be created, each with a title and one line of value, and ask whether to draft any. Don't draft or create them by default; in autopilot, list them in the report only.

Use detailed behavior and payload examples in `references/instructions.md` and `references/mcp-server.md`.

## Core behavior to preserve

- Classification-first workflow
- Route-to-agent-mode workflow
- Draft-first workflow
- Clarifying questions for missing critical context
- Explicit confirmation before any GitHub mutation

Use detailed authoring guidance in `references/instructions.md`.
Fallback template locations:
- Bug: `assets/issue-templates/bug.md.hbs`
- Feature: `assets/issue-templates/feature.md.hbs`
- User Story: `assets/issue-templates/user-story.md.hbs`
- Task: `assets/issue-templates/task*.md.hbs`

Before filling a fallback, read its `.hbs` slot header,
`assets/partials/agent-content/README.md`, and every named partial.
Fill as Markdown; no renderer ships with the skill.

## Human-first output

Issue bodies are read by people first. When `fusion-agent-content` is installed, shape the body with it. Otherwise follow this outline, which the fallback templates already carry:
- First line: `<sub>🤖 Drafted by <agent> (<tool>) · <model> · <effort> reasoning</sub>`; without custom agent, write `Drafted with GitHub Copilot`. Before fallback, resolve authoring-turn model/effort through supplied runtime metadata then bounded supported lookup per [shared fill rules](assets/partials/agent-content/README.md#resolve-drafter-metadata). Keep verified fields independently; unresolved model says `model not reported`, unresolved effort omitted. Never guess.
- A quoted TL;DR (`> **TL;DR:** ...`) of one to three sentences with the outcome and the ask. Skip it when the first template section already is the summary, such as a task's `Objective`.
- The template headings, in order, in plain prose. Keep acceptance criteria, decisions, risks, and blocking dependencies visible.
- A folded `Details` block for supporting material, then a folded `References and evidence` block last, listing the skills, references, and evidence used.
- With a repository template, keep its headings and add the banner, TL;DR, and folded blocks around them.

## Expected output
- Selected agent mode path
- Draft issue file path under `.tmp/`
- Template source used (repository template path or fallback asset path)
- Proposed title, body summary, and labels
- Issue type plan
- Dependency plan (order + proposed sub-issue/blocking links)
- Minimum issue set, and any stretch goals kept apart from required criteria
- Suggested nice-to-have issues (not drafted unless the user picks them)
- Assignee plan (who will be assigned, or explicit unassigned decision)
- Explicit status: `Awaiting user content approval` before any publish/update command
- Any related/duplicate issue links found
- Exact create/update command(s) to be run after confirmation
- Created/updated issue URL/number only after confirmed mutation
- Suggested template maintenance follow-up when repository templates are missing or weak

## Safety & constraints

Never:
- Run `mcp_github::issue_write` create/update without explicit user confirmation
- Publish/update an issue before the user confirms the draft content is correct
- Assume the user wants to publish to GitHub
- Request or expose secrets/credentials
- Perform destructive commands without explicit confirmation

Always:
- Keep drafts concise and editable
- Prefer WHAT/WHY over implementation HOW in issue text
- Use full repository issue references (for example `owner/repo#123`)
- When text will close issues on merge (PR bodies, commit messages, changesets), ask per issue whether to close it (`fixes`/`resolves`/`closes owner/repo#123`) or only reference it (`refs owner/repo#123`). Recommend the most logical choice: close when the work completes the issue (the usual case), reference for parent, multi-PR, or cross-repository tracking issues. Follow intent the user already stated; when the user is unavailable, apply the recommendation and say which issues will close
