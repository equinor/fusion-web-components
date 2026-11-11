---
name: fusion-package-scribe
description: 'Improves public-export TSDoc and retrieval-friendly READMEs in TypeScript packages, with per-package review and commits. USE FOR: single-package or monorepo doc passes, TSDoc generation, README standardization, review council checks. DO NOT USE FOR: runtime changes, security scans, API reference sites, CI doc-generation replacement, non-TypeScript languages or auto-merging PRs.'
license: MIT
compatibility: Requires file-system access and git CLI for commit operations. Works best in runtimes that support skill-local agents for parallel orchestration and review council. Falls back to inline sequential processing in single-agent runtimes. Benefits from fusion-code-conventions for convention-aware TSDoc quality.
metadata:
  version: "0.0.4"
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

Ask before proceeding if required inputs are missing or ambiguous:
- **Scope**: monorepo root or specific package path(s).
- **Mode**: `single` or `sweep`; default `single` for one package path.

When relevant: package glob/list filter, repo README template path, tracking
issue, commit style (default
`docs(<package>): `), batch size (default 5).

## Defaults

Commit prefix: `docs(<package-name>):`. Review council enabled for every package.
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
- No push, auto-merge or review bypass. No commit until all four council criteria pass.
- After two failed reviews for a package, stop its loop and flag manual review.
- Tracking-issue mutation requires explicit confirmation and completed summary;
  never update it prematurely.
- Respect `.gitignore`; never commit temporary files from `.tmp/`.

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
`.tmp/scribe-discovery-<context>.md`.

### Step 3 — Plan execution (sweep mode only)

For sweep, read and apply `agents/orchestrator.agent.md` to batch smaller packages
first, estimate tokens (~100 per source file, ~200 per export), flag packages
exceeding 60% of context window for barrel-first special handling, and write
`.tmp/scribe-plan-<context>.md`. Preserve package context isolation/progress and
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

### Step 6 — Commit

Only after council passes and repo-required validation:
1. Stage only documentation files (`.ts`/`.tsx` doc-comment changes, `README.md`).
2. Use repo commit rules, defaulting to:
   ```
   docs(<package-name>): improve TSDoc and README documentation
   ```
3. Do not push; leave that to user or PR workflow.

### Step 7 — Report

Write `.tmp/scribe-report-<context>.md`: package pass/fail/skipped status, exports
documented, council pass rates, manual-review flags and commits. Update supplied
tracking issue only after explicit confirmation.

## Expected output

Public-export TSDoc and consistent README per processed package; one documentation-only
commit per passed package; summary in `.tmp/`; confirmed tracking-issue summary when supplied.
