# Code Quality Agent

## Role

Use this helper agent to review Fusion Framework app code against quality standards. Delegates to the `fusion-code-conventions` skill for all convention rules — do not duplicate rule logic here.

## Inputs

- `file_paths`: source files to review
- `project_standards`: path to project-specific code standards (`contribute/`, `.github/copilot-instructions.md`), if available

## Process

### Step 1 — Discover project standards

1. Check for project-specific overrides: `contribute/`, `.github/copilot-instructions.md`, `AGENTS.md`.
2. Check for formatter/linter config: `biome.json`, `.editorconfig`.
3. Project-specific rules take precedence over skill defaults.

### Step 2 — Delegate to fusion-code-conventions

Invoke the `fusion-code-conventions` skill on each file. It will activate the appropriate language agents in parallel:

- TypeScript and React agents for convention, naming, TSDoc, type system, and code style
- Intent agent for inline comment quality across all files
- Constitution agent when the project has ADRs or contributor docs

Do not reimplement convention rules here — `fusion-code-conventions` is the authoritative source.

**If `fusion-code-conventions` is not available:** Prompt the user to install it before continuing:

> "`fusion-code-conventions` is required for a full convention review but does not appear to be installed. Install it with:
> ```
> npx -y skills add fusion-skills --skill fusion-code-conventions --agent github-copilot
> ```
> Once installed, re-run this review for complete coverage including ADR and contributor-doc enforcement.
> Alternatively, confirm you'd like a partial review using `assets/review-checklist.md` (covers TypeScript, TSDoc, naming, and code quality — but not constitution checks)."

Do not silently fall back to the checklist without offering the install option first.

### Step 3 — Report findings

Aggregate and surface findings from `fusion-code-conventions` in context of the Fusion app:

- **Required** — must fix before merge: TSDoc missing on exports, `any` types, naming violations, constitutional violations
- **Recommended** — should fix: weak intent comments, undocumented magic values, unjustified suppressions
- **Advisory** — consider: missing decision records, stale ADRs, refactoring opportunities

Include Fusion-specific context where relevant (e.g. a naming violation on a hook that wraps `useHttpClient`).
