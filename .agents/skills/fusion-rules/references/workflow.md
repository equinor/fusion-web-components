# Rule authoring workflow

Canonical workflow for authoring AI coding assistant rules for **GitHub Copilot**, **Cursor**, and **Claude Code**. Editor agents in `agents/` follow Steps 1–7 below, scoped to their editor. Paths are relative to the `fusion-rules` skill root.

## Contents

- [Scope](#scope)
- [Required inputs](#required-inputs)
- [Instructions](#instructions)
  - [Step 1 — Assess current state](#step-1--assess-current-state)
  - [Step 2 — Scan repository](#step-2--scan-repository)
  - [Step 3 — Interview (fill gaps)](#step-3--interview-fill-gaps)
  - [Step 4 — Classify guidance](#step-4--classify-guidance)
  - [Step 5 — Draft rule files](#step-5--draft-rule-files)
  - [Step 6 — Review and refine](#step-6--review-and-refine)
  - [Step 7 — Write files](#step-7--write-files)
- [Expected output](#expected-output)
- [Instructions vs skills vs rules — when to use which](#instructions-vs-skills-vs-rules--when-to-use-which)
- [Safety and constraints](#safety-and-constraints)
- [References](#references)

## Scope

This workflow uses:

- **Workflow** (Steps 1–7 below) — the guided authoring process
- **Templates** (`assets/`) — starter files for each editor format
- **References** (`references/`) — tech-stack examples

Editor agents (`agents/*.agent.md`) apply this workflow to one editor each; `SKILL.md` routes to them.

## Required inputs

### Mandatory

- [ ] Repository context (working directory or repo URL)

### Gathered during interview

- [ ] Tech stack (languages, frameworks, build tools)
- [ ] Code conventions (naming, formatting, patterns)
- [ ] Testing expectations (framework, coverage, style)
- [ ] Documentation preferences (comments, TSDoc/JSDoc, README standards)
- [ ] Commit and PR conventions
- [ ] Error handling patterns
- [ ] Security or compliance constraints
- [ ] File/path-specific conventions that need scoped rules

## Instructions

### Step 1 — Assess current state

Check the repository for existing rule files:

```
.github/copilot-instructions.md
.github/instructions/*.instructions.md
.cursor/rules/*.md
.cursor/rules/*.mdc
.cursor/rules/**/*.md
.cursor/rules/**/*.mdc
CLAUDE.md
.claude/CLAUDE.md
.claude/rules/*.md
.claude/rules/**/*.md
```

Report what exists, what is missing, and whether updates or new files are needed.

### Step 2 — Scan repository

Before interviewing, scan for existing documentation and configuration that encodes conventions. Extract actionable directives from:

**Documentation files:**
- `README.md` — project overview, setup, tech stack
- `CONTRIBUTING.md` — code style, PR workflow, commit conventions
- `AGENTS.md`, `CLAUDE.md` — existing AI instructions
- `docs/adr/**`, `adr/**`, `docs/decisions/**` — Architecture Decision Records
- `docs/**/*.md` — developer guides, onboarding docs, style guides
- `SECURITY.md` — security policies
- `CODE_OF_CONDUCT.md` — collaboration guidelines (rarely rule-relevant)

**Configuration files:**
- `package.json` / `pyproject.toml` / `*.csproj` — tech stack, scripts, dependencies
- `tsconfig.json` / `jsconfig.json` — language settings, strictness
- `biome.json` / `.eslintrc*` / `.prettierrc*` / `ruff.toml` / `.editorconfig` — formatting and linting
- `.github/workflows/*.yml` — CI checks, required validations, test commands
- `Dockerfile` / `docker-compose.yml` — runtime environment
- `Makefile` / `Justfile` / `Taskfile.yml` — build and task commands

**Code patterns (sample, don't exhaustively read):**
- Entry points (`src/index.*`, `src/main.*`, `app.*`) — architecture patterns
- Test files — testing framework, naming conventions, file placement
- Directory structure — architectural boundaries, feature organization

**For each source, extract:**
1. Concrete conventions that can become imperative directives
2. Build/test/lint commands the AI should know
3. Architecture boundaries or patterns to follow
4. Explicit "do this / don't do that" rules

**Skip:**
- Implementation details that change frequently
- Content that restates language/framework defaults
- Aspirational rules not enforced by CI or team practice

Present summary of discovered conventions to the developer, organized by area, before proceeding to the interview.

### Step 3 — Interview (fill gaps)

Use scan results to skip areas already well-documented. Ask focused questions only for gaps. Cover these areas one at a time:

1. **Tech stack** — languages, frameworks, runtime, package manager
2. **Code style** — naming conventions, formatting rules, import ordering
3. **Architecture** — project structure, key patterns (MVC, hexagonal, etc.)
4. **Testing** — framework, conventions, coverage expectations
5. **Documentation** — inline comments style, doc generation, README standards
6. **Git workflow** — branch naming, commit message format, PR expectations
7. **Security** — sensitive data handling, auth patterns, compliance rules
8. **Path-specific concerns** — directories or file types needing specialized guidance

For each area, present what the scan found and ask: "Is this accurate? Anything to add or correct?" Don't re-ask for information already captured.

For each convention needing deeper context, use follow-up questions in `assets/creation-follow-up.md` — purpose, exceptions, boundaries, voice.

### Step 4 — Classify guidance

Separate the gathered conventions into buckets:

**GitHub Copilot:**

| Bucket | Target file | When it activates |
|--------|-------------|-------------------|
| **Always-on** conventions | `.github/copilot-instructions.md` | Every Copilot interaction |
| **Scoped** conventions | `.github/instructions/<name>.instructions.md` | Only when matching files are open/referenced |

**Cursor:**

| Bucket | Target file | When it activates |
|--------|-------------|-------------------|
| **Always-on** conventions | `.cursor/rules/<name>.mdc` with `alwaysApply: true` | Every Cursor Agent session |
| **Auto-attached** conventions | `.cursor/rules/<name>.mdc` with `globs` | When matching files are in context |
| **Agent-selected** conventions | `.cursor/rules/<name>.mdc` with `description` only | When the Agent decides it is relevant |
| **Manual** conventions | `.cursor/rules/<name>.mdc` (no `alwaysApply`, no `globs`) | Only when @-mentioned in chat |

**Claude Code:**

| Bucket | Target file | When it activates |
|--------|-------------|-------------------|
| **Always-on** conventions | `CLAUDE.md` or `.claude/CLAUDE.md` | Every Claude Code session |
| **Scoped** conventions | `.claude/rules/<name>.md` with `paths` frontmatter | When Claude reads matching files |
| **Unconditional rule** | `.claude/rules/<name>.md` (no `paths`) | Every session (like always-on) |

**Decision rule:** If a convention applies to all files in the repo, it belongs in root / always-on instructions. If it applies only to specific paths or file types, create a scoped rule.

When targeting multiple editors, generate parallel files with equivalent content — do not duplicate guidance within a single editor's files.

### Step 5 — Draft rule files

Read `.md.hbs` slot headers in `assets/`; fill named slots with Markdown, drop template comments, select applicable fenced output. Save output in editor's native format, not `.hbs`; no renderer required. Preserve YAML quoting in frontmatter.

**GitHub Copilot:**
- Root instructions: use `assets/copilot-instructions-template.md.hbs`
- Scoped instructions: use `assets/scoped-rule-template.md.hbs` with correct `applyTo` glob

**Cursor:**
- Use `assets/cursor-rule-template.md.hbs` and set frontmatter accordingly

**Claude Code:**
- Project instructions: use `assets/claude-rule-template.md.hbs`
- Scoped rules: place in `.claude/rules/` with `paths` frontmatter

**Quality rules (enforced during drafting):**

- Keep instructions concise — actionable directives, not explanations
- Use imperative voice ("Use camelCase for variables", not "Variables should use camelCase")
- Avoid duplicating guidance between root and scoped files
- Validate `applyTo` / `globs` / `paths` glob patterns match intended files
- Never use brace expansion (`{a,b}`) in Copilot `applyTo`; Copilot splits on commas and silently skips the rule. Use `**/*.ts, **/*.tsx`
- Warn if total root instructions exceed ~80 lines (risk of context dilution)
- Warn if scoped instruction file exceeds ~50 lines (GitHub Copilot), ~500 lines (Cursor), ~200 lines (Claude Code CLAUDE.md)
- See `references/examples.md` for concrete good/bad examples
- See `assets/quality-checklist.md` for full checklist

### Step 6 — Review and refine

Present drafted files to the developer. For each file:

1. Show full content
2. Highlight quality warnings (length, broad globs, duplication)
3. Ask for approval or edits

### Step 7 — Write files

After approval, write rule files to the repository. Create `.github/instructions/`, `.cursor/rules/`, and/or `.claude/rules/` directories as needed.

Confirm final file list and paths before writing.

## Expected output

- `.github/copilot-instructions.md` — root instructions file (created or updated)
- `.github/instructions/*.instructions.md` — zero or more scoped instruction files
- `.cursor/rules/*.mdc` — zero or more Cursor rule files (when Cursor is targeted)
- `CLAUDE.md` or `.claude/CLAUDE.md` — project instructions (when Claude Code is targeted)
- `.claude/rules/*.md` — zero or more Claude Code scoped rule files
- Summary of what was created/updated and why

## Instructions vs skills vs rules — when to use which

| Need | GitHub Copilot | Cursor | Claude Code |
|------|---------------|--------|-------------|
| Always-on coding conventions | `copilot-instructions.md` | `.cursor/rules/*.mdc` with `alwaysApply: true` | `CLAUDE.md` |
| File/path-specific guidance | `.github/instructions/*.instructions.md` | `.cursor/rules/*.mdc` with `globs` | `.claude/rules/*.md` with `paths` |
| Task-specific multi-step workflows | A skill (`SKILL.md`) | `.cursor/rules/*.mdc` (manual or agent-selected) | Skills / subagents |
| Agent routing and orchestration | Agent definitions (`.agent.md`) | `.cursor/rules/*.mdc` with `description` | Subagent configs |
| Simple project-wide instructions | `copilot-instructions.md` | `AGENTS.md` | `CLAUDE.md` |

Instructions and rules shape **how** the AI writes code. Skills define **what** it can do as structured tasks.

## Safety and constraints

Never:

- Embed secrets, tokens, or credentials in rule files
- Generate rules that contradict repository security policies
- Overwrite existing files without showing the diff and getting approval
- Invent conventions — only document what the developer confirms

Always:

- Show drafts before writing any files
- Validate glob patterns against actual repository paths
- Warn on overly broad globs (e.g., `**/*` captures everything)
- Keep instructions concise and actionable
- Preserve existing content when updating (append or merge, never replace silently)

## References

- `references/examples.md` — concrete examples for different tech stacks
- `assets/creation-follow-up.md` — per-rule follow-up questions (purpose, exceptions, boundaries, voice)
- `assets/frontmatter-scenarios.md` — scenario-based frontmatter guide for GitHub Copilot, Cursor, and Claude Code
- `assets/copilot-instructions-template.md.hbs` — starter template for root instructions
- `assets/scoped-rule-template.md.hbs` — starter template for scoped rules
- `assets/cursor-rule-template.md.hbs` — starter template for Cursor rules
- `assets/claude-rule-template.md.hbs` — starter template for Claude Code rules
- `assets/quality-checklist.md` — quality review checklist
