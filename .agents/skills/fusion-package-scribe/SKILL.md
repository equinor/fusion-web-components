---
name: fusion-package-scribe
description: 'Systematically improves TSDoc and README documentation across packages in a TypeScript monorepo. Discovers public API surfaces, generates or improves TSDoc on all exports, rewrites READMEs to a consistent retrieval-friendly structure, and commits each package independently. USE FOR: monorepo-wide documentation passes, single-package doc improvements, TSDoc generation on public exports, README standardization, review council quality checks. DO NOT USE FOR: runtime code changes, security scanning, API reference site generation, non-TypeScript languages.'
license: MIT
compatibility: Requires file-system access and git CLI for commit operations. Works best in runtimes that support skill-local agents for parallel orchestration and review council. Falls back to inline sequential processing in single-agent runtimes. Benefits from fusion-code-conventions for convention-aware TSDoc quality.
metadata:
  version: "0.0.1"
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

This skill is experimental and not yet stable. Behavior, structure, and outputs may change between versions.

## When to use

Use this skill when you need to systematically add or improve documentation across TypeScript packages — whether a full monorepo sweep or a single package.

Typical triggers:
- "document all packages"
- "improve docs for `packages/utils/observable`"
- "add TSDoc to all public exports in this package"
- "rewrite the README for this package"
- "run a documentation pass on the monorepo"
- "review the TSDoc quality in this package"

Implicit triggers:
- A package has public exports with missing or stub TSDoc
- A package README is outdated, inconsistent, or missing standard sections
- A documentation sweep is planned across multiple packages

## When not to use

Do not use this skill for:
- Modifying runtime code (only doc comments and README files)
- Generating API reference sites or TypeDoc output
- Non-TypeScript languages (initial scope is TS/TSX only)
- Auto-merging PRs or bypassing review workflows
- Security vulnerability scanning or performance profiling
- Replacing existing CI-based doc generation pipelines

## Required inputs

If required inputs are missing or ambiguous, ask before proceeding.

- **Scope**: monorepo root path or specific package path(s)
- **Mode**: `single` (one package) or `sweep` (multiple packages)

### Conditional inputs

- **Package filter**: glob or list when processing a subset of packages
- **README template path**: repo-specific template if not using the built-in default (for example under `.github/instructions/`)
- **Tracking issue**: issue number for lifecycle updates (assign, status, close)
- **Commit style**: repo-specific conventional commit format (defaults to `docs(<package>): `)
- **Batch size**: number of packages per batch for sweep mode (defaults to 5)

## Defaults

- Mode: `single` (if only one package path provided)
- Commit prefix: `docs(<package-name>):`
- Batch size: 5 packages per sweep batch
- README structure: built-in template from `references/readme-template.md`
- Review council: enabled (runs after every package)

## Precedence and standards discovery

This skill discovers and follows the target repository's own standards:

1. **Repository instructions** — applicable files under `.github/instructions/`, `CONTRIBUTING.md`, `contribute/`
2. **Tooling configuration** — `tsconfig.json`, `biome.json`, `.editorconfig`
3. **Companion skill** — `fusion-code-conventions` for TSDoc rules, naming conventions, and intent quality (when installed)
4. **Built-in defaults** — `references/tsdoc-checklist.md` and `references/readme-template.md`

Repository-level standards always win. When no repo standards exist, the built-in defaults apply.

## Agent modes

| Agent | Role | Activated for |
|---|---|---|
| `agents/orchestrator.agent.md` | Batch coordinator | Sweep mode — plans batches, manages token budgets, tracks progress |
| `agents/documenter.agent.md` | Per-package writer | Every package — scans API surface, generates TSDoc, rewrites README |
| `agents/reviewer.agent.md` | Review council | After each package — verifies intent, comprehension, retrieval fitness |

In single-agent runtimes, all three roles run inline sequentially.

## Instructions

### Step 1 — Discover repository standards

Before generating any documentation:

1. Search for repo-level documentation instructions:
   - applicable files under `.github/instructions/`
   - `CONTRIBUTING.md`, `contribute/`
2. Read `tsconfig.json` to understand module structure, path aliases, and strict mode settings
3. Read `biome.json` or equivalent linter config for style expectations
4. Check if `fusion-code-conventions` is available — if so, defer to its TSDoc rules from `references/typescript.conventions.md`
5. If no repo-level standards exist, use `references/tsdoc-checklist.md` as the quality baseline

### Step 2 — Discover packages

1. For **single mode**: validate the provided package path exists and has TypeScript source files
2. For **sweep mode**:
   - Read the root `package.json` or workspace config (`pnpm-workspace.yaml`, `lerna.json`, `turbo.json`) to find all packages
   - Filter by any provided glob/list
   - Sort packages by estimated size (file count) for batch planning
   - Write the discovery summary to `.tmp/scribe-discovery-<context>.md`

### Step 3 — Plan execution (sweep mode only)

Activate `agents/orchestrator.agent.md` (or run inline):

1. Group packages into batches of the configured batch size
2. Order batches: smaller packages (fewer source files) first to maximize early throughput
3. Estimate token budget per package: ~100 tokens per source file for reading, ~200 tokens per export for TSDoc generation
4. If a single package exceeds 60% of the estimated context window, flag it for special handling (barrel exports first, defer internal modules)
5. Write the execution plan to `.tmp/scribe-plan-<context>.md`

### Step 4 — Process each package

Activate `agents/documenter.agent.md` (or run inline) for each package:

#### 4a — Scan public API surface

1. Find the barrel export file (`index.ts`, `index.tsx`, or `main` field in `package.json`)
2. Trace all re-exports to identify the full public API surface
3. Categorize exports: functions, classes, types/interfaces, constants, hooks, enums
4. Prioritize: barrel exports first, then direct public exports, then internally-consumed-but-exported items

#### 4b — Generate or improve TSDoc

For each public export:

1. Read the existing implementation to understand intent, parameters, return values, error paths, and side effects
2. Check for existing TSDoc — improve rather than replace when present
3. Apply the TSDoc checklist (repo standards or `references/tsdoc-checklist.md`):
   - Summary line: explain *why* and *what problem it solves*, not just *what it does*
   - `@param` for every parameter with meaningful descriptions
   - `@returns` for every non-void function
   - `@template` for every generic type parameter
   - `@throws` for meaningful error paths
   - `@example` for user-facing and non-trivial public APIs
   - `@deprecated` with replacement guidance when applicable
4. Flag and rewrite "name-echo" patterns (for example `/** Gets the value. */ getValue()`)
5. Do not modify runtime code — only doc comments

#### 4c — Rewrite or improve README

1. Read the existing README (if any) to preserve valuable content
2. Apply the README structure from repo instructions or `references/readme-template.md`:
   - Package name and description
   - Features / key exports
   - Installation
   - Usage with code examples
   - API reference (summary of key exports with links or inline docs)
   - Configuration (if applicable)
3. Ensure the README is useful to a developer discovering the package for the first time
4. Optimize for retrieval: use clear headings, keyword-rich descriptions, and concrete examples

### Step 5 — Review council

Activate `agents/reviewer.agent.md` (or run inline) after each package:

1. **Intent extraction** — Does the TSDoc accurately describe *what the code does* and *why*? Flag any comment that merely restates the function/type name.
2. **Code comprehension** — Are complex algorithms, state machines, or side effects explained? Would a new developer understand the code from the docs alone?
3. **User-facing quality** — Is the README useful to someone discovering the package for the first time? Does it have working examples?
4. **Retrieval fitness** — Will the documentation produce good hits in RAG / semantic search? Are key terms present in headings and summaries?

The reviewer produces a pass/fail per criterion. Failures loop back to Step 4 for the specific package.

### Step 6 — Commit

After the review council passes for a package:

1. Stage only documentation files (`.ts`/`.tsx` files for TSDoc changes, `README.md`)
2. Commit using the repo's conventional commit format, defaulting to:
   ```
   docs(<package-name>): improve TSDoc and README documentation
   ```
3. Do not push — leave that to the user or a PR workflow

### Step 7 — Report

After all packages are processed:

1. Write a summary to `.tmp/scribe-report-<context>.md`:
   - Packages processed and status (pass/fail/skipped)
   - Total exports documented
   - Review council pass rates per criterion
   - Any packages flagged for manual review
   - Commits created
2. If a tracking issue was provided, update it with the summary

## Expected output

- TSDoc comments on all public exports in processed packages
- Consistent README for each processed package
- One commit per package with documentation-only changes
- Summary report in `.tmp/`
- Tracking issue update (when issue number provided)

## Safety & constraints

This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.

- Only modify doc comments and README files — never touch runtime code
- Do not push commits; leave push decisions to the user
- Do not auto-merge PRs or bypass review workflows
- Do not invent API behavior — document only what the code actually does
- Do not delete or replace existing valuable documentation without preserving its content
- When a tracking issue is referenced, update it only after explicit confirmation
- Respect `.gitignore` and do not commit temporary files from `.tmp/`
- If the review council fails a package twice, flag it for manual review instead of looping indefinitely
