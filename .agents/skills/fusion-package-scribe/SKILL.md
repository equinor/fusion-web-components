---
name: fusion-package-scribe
description: 'Improves public-export TSDoc and retrieval-friendly TypeScript package READMEs. USE FOR: package/monorepo doc passes, TSDoc, README standardization and review council checks. DO NOT USE FOR: runtime edits, security scans, API sites, CI doc-generation replacement, non-TypeScript languages or auto-merge.'
license: MIT
compatibility: Requires source access. Host owns git operations and scratch storage. Supports inline sequential processing without skill-local agents; benefits from fusion-code-conventions for convention-aware TSDoc quality.
metadata:
  version: "0.0.5"
  status: experimental
  owner: "@equinor/fusion-core"
  role: orchestrator
  skills:
    - fusion-code-conventions
  tags:
    - documentation
    - tsdoc
    - readme
    - monorepo
    - typescript
    - orchestration
    - review-council
  mcp:
    suggested:
      - github
---

# Package Scribe

## Experimental caveat

Experimental; behavior, structure and outputs may change between versions.

## When to use

Improve public-export TSDoc and retrieval-friendly READMEs in TypeScript packages,
single package or monorepo sweep. Triggers: "document all packages", "add TSDoc
to all public exports", "rewrite the README", "review the TSDoc quality".
Also use for missing/stub TSDoc, stale/inconsistent README or planned doc sweep.

## When not to use

Runtime changes, API reference sites/TypeDoc output, non-TypeScript languages,
auto-merging PRs/bypassing review, security scanning/performance profiling,
or replacing CI-based doc generation. Scope is TS/TSX doc comments and README only.

## Required inputs

Resolve from task context; interactive sessions ask when required inputs are missing or ambiguous:
- **Scope**: monorepo root or specific package path(s).
- **Mode**: `single` or `sweep`; default `single` for one package path.

When relevant: package glob/list filter, repo README template path, tracking
issue and batch size (default 5).

## Defaults

Review council criteria apply to every package.
README fallback: `references/readme-template.md`, only without repo template.

## Precedence and standards discovery

Highest applicable standard wins:
1. Repository instructions: `.github/instructions/`, `CONTRIBUTING.md`, `contribute/`.
2. Tooling: `tsconfig.json`, `biome.json`, `.editorconfig`.
3. Installed `fusion-code-conventions` for TSDoc, naming and intent quality.
4. Built-ins: `references/tsdoc-checklist.md`, `references/readme-template.md`.

Select TSDoc and README standards separately; read matching fallback only when
higher-priority standard is absent. Check companion installation; built-ins
support standalone use.

## Safety & constraints

This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.

- Defer commit conventions/granularity, validation, changesets and PR workflow
  to repository-local instructions at the affected step.
- Only doc comments and README edits; no runtime changes or invented API behavior.
- Preserve valuable existing documentation; never discard it during replacement.
- Never request, expose or store secrets/credentials.
- Host owns edit/commit authority, branches, scratch storage, publishing and post-PR review. Interactive: confirm edits/commits unless already explicitly authorized. Automated: follow authorized task scope; mode or silence grants no authority.
- No review bypass. Commit-ready only after all four council criteria pass; readiness never authorizes commit, push or merge.
- After two failed reviews for a package, stop its loop and flag manual review.
- Tracking-issue mutation needs host-authorized publication and completed summary; never update prematurely.
- Use host-provided scratch storage for discovery, plans, progress and reports; no fixed repository directory. Respect `.gitignore`; exclude scratch files and secrets from commits.

## Instructions

Read and apply selected `agents/*.agent.md` as Markdown instructions via supported
adapters when available, otherwise sequentially inline.

### Step 1 — Discover repository standards

Before writing docs, read applicable repo instructions, `tsconfig.json` for
modules/aliases/strictness and `biome.json` or equivalent for style.
If `fusion-code-conventions` is installed, use its authoritative TypeScript
TSDoc rules. Otherwise, without repo TSDoc standards, read
`references/tsdoc-checklist.md` for baseline tag/intent quality.
Without repo README template, read `references/readme-template.md` for structure
and writing guidance. Pass resolved standards to writer and reviewer once;
do not preload every candidate.

### Step 2 — Discover packages

Single: validate package path exists and contains TypeScript sources.
Sweep: read root `package.json` or workspace config (`pnpm-workspace.yaml`,
`lerna.json`, `turbo.json`), apply filter, sort by source-file count and write
`scribe-discovery-<context>.md` in host scratch storage.

### Step 3 — Plan execution (sweep mode only)

For sweep, read and apply `agents/orchestrator.agent.md` to batch smaller packages
first, estimate tokens (~100 per source file, ~200 per export), flag packages
exceeding 60% of context window for barrel-first special handling, and write
`scribe-plan-<context>.md` in host scratch storage. Preserve package context isolation/progress and
batch-failure stop. Skip coordinator in single mode.

### Step 4 — Process each package

For every package, read and apply `agents/documenter.agent.md` to inventory
barrel/re-exports, prioritize public API, understand implementation, improve
TSDoc with selected checklist and preserve/improve README with selected template.
Apply required tags by export kind; reject name-echo, use real exports and
keyword-rich headings. Tag rules remain in writer and selected checklist.

When using built-in README structure, fill `assets/readme-template.md.hbs`: read its slot header, fill by hand
(no renderer), and preserve valuable existing content; repo templates take precedence.

### Step 5 — Review council

After **every package**, read and apply `agents/reviewer.agent.md`. Produce
independent pass/fail evidence for all four criteria:
1. **Intent extraction**: accurate what/why, not name-echo.
2. **Code comprehension**: algorithms, states and side effects understandable from docs.
3. **User-facing quality**: newcomer can use README with working examples.
4. **Retrieval fitness**: domain terms in headings, summaries and realistic examples.

Any failure returns package to Step 4; two failures require manual review,
not another retry or premature commit.

### Step 6 — Prepare commit handoff

Only after council passes and repo-required validation, hand documentation-only changes to host commit workflow:
1. Stage only documentation files (`.ts`/`.tsx` doc-comment changes, `README.md`).
2. Follow host authority and repo commit rules; commit only when authorized.
3. Push/PR/merge remain with host workflow, outside documentation authority.

### Step 7 — Report

Write `scribe-report-<context>.md` in host scratch storage: package pass/fail/skipped status, exports
documented, council pass rates, manual-review flags and commits. Update supplied
tracking issue only through host-authorized publication.

## Expected output

Public-export TSDoc and consistent README per processed package; one documentation-only
commit-ready handoff per passed package, commits only when authorized; summary in host scratch storage; authorized tracking-issue summary when supplied.
