---
name: fusion-code-conventions
description: 'Applies and explains code conventions across TypeScript, React, C#, and Markdown. Enforces naming rules, file naming patterns, TSDoc and XML doc standards, inline comment intent (the *why*, not the *what*), code structure, error handling, async patterns, and dead code policy. Also enforces ADR and contributor doc decisions, and flags decisions that appear stale or misaligned with current tooling. USE FOR: convention questions, code review against project standards, applying naming rules, auditing intent comments, checking TSDoc completeness, enforcing recorded ADR decisions, and flagging stale architectural decisions. DO NOT USE FOR: security vulnerability scanning, performance profiling, runtime debugging, or generating net-new code without a review target.'
license: MIT
metadata:
  version: "0.1.3"
  status: experimental
  owner: "@equinor/fusion-core"
  tags:
    - code-conventions
    - code-review
    - best-practices
    - typescript
    - react
    - csharp
    - markdown
    - intent
    - adr
    - constitution
    - naming
    - tsdoc
    - inline-comments
  role: orchestrator
compatibility: Works best in runtimes that support skill-local agents (6 agent modes). In single-agent runtimes, all convention checks run inline. Requires file-system access for project discovery (tsconfig.json, biome.json, .editorconfig, ADR directories). The constitution agent requires git CLI access for commit history checks.
---

# Code Conventions

## When to use

Use when code needs review, writing, or explanation against project conventions. Applies at two layers:

- **Language conventions** — naming, file naming, type system, TSDoc/XML doc standards, code structure, error handling, async patterns, dead code policy. Each language has a dedicated agent and authoritative reference doc.
- **Cross-cutting conventions** — applied on every review: intent capture (every non-obvious decision must be documented well enough that code could be regenerated from comments alone) and constitution enforcement (ADRs and contributor docs are law; deviations require a new decision record; stale decisions flagged).

Typical triggers:
- "what are the naming conventions for this project?"
- "how should I write TSDoc for this function?"
- "does this file follow our code style?"
- "review this for convention violations"
- "what comment style should I use here?"
- "is this idiomatic TypeScript / React / C# / Markdown?"
- "apply code conventions to this file"
- "are these inline comments good enough?"
- "does this violate any ADR?"
- "is this ADR still current?"
- "we have a CONTRIBUTING.md — check if this change follows it"

## When not to use

- Security vulnerability scanning (use a dedicated security review skill)
- Performance profiling or benchmarking
- High-level architecture or system design decisions
- Generating net-new code without a review target
- Mutating files without explicit user confirmation

## Precedence and applicability

This skill provides **org-wide baseline conventions**. When installed in a repository with its own conventions, precedence (highest wins):

1. **Repository-level policy** — `CONTRIBUTING.md`, contributor guides (`contribute/`), ADRs, `.github/copilot-instructions.md`, `AGENTS.md`, or equivalent
2. **Tooling configuration** — `biome.json`, `tsconfig.json`, `.editorconfig`, linter configs
3. **This skill** — all rules in `references/*.conventions.md` and agent modes

When a repository explicitly narrows, relaxes, or contradicts a rule from this skill, the repository policy wins. Don't flag code that conforms to repo's documented conventions, even if it deviates from the skill baseline.

If conflict is undocumented (no ADR, no contributor note, no config), treat the skill rule as default and recommend the team record their intent.

> **For maintainers:** record convention overrides in `CONTRIBUTING.md`, a contributor guide, or an ADR so both humans and agents discover them consistently.

## Agent modes

| Agent | Activated for |
|---|---|
| `agents/typescript.agent.md` | TypeScript naming, TSDoc, type system, code style, error handling |
| `agents/react.agent.md` | React component structure, hooks rules, accessibility, keys |
| `agents/csharp.agent.md` | C# naming, CQRS patterns, async/await, null safety, testing |
| `agents/markdown.agent.md` | Markdown structure, frontmatter, links, callouts, GitHub-specific syntax |
| `agents/intent.agent.md` | Intent capture — applied in parallel on every code review |
| `agents/constitution.agent.md` | ADR and contributor doc enforcement — applied in parallel when project has decision records |

Convention references (authoritative rules per language):
- `references/typescript.conventions.md`
- `references/react.conventions.md`
- `references/csharp.conventions.md`
- `references/markdown.conventions.md`

## Required inputs

If required inputs are missing or ambiguous, ask before proceeding.

- Target code (inline snippet or file path) or a specific convention question
- Language or file type (inferred from content if not provided)
- For constitution checks: path to ADR directory and/or contributor docs (inferred from common locations — `docs/adr/`, `CONTRIBUTING.md`, `contribute/` — if not provided)

When the developer's context or persona is known, consult the matching follow-up file in `assets/` for targeted clarifying questions. Ask only unanswered questions.

- `assets/framework-core-developer.follow-up.md` — Fusion Framework internals, shared libraries, framework APIs
- `assets/react-app.follow-up.md` — Fusion React app development
- `assets/core-service.follow-up.md` — Fusion Core backend services (C# / .NET)

## Instructions

### Step 1 — Classify and route

Detect the primary language, then activate the matching language agent:
- TypeScript (`.ts`, non-component `.tsx`) → `agents/typescript.agent.md`
- React (`.tsx` with JSX or hooks, component files) → `agents/react.agent.md`
- Mixed `.tsx` (TypeScript type concerns + React component concerns) → both agents in parallel
- C# (`.cs`, `.csproj`) → `agents/csharp.agent.md`
- Markdown (`.md`, `.mdx`) → `agents/markdown.agent.md`

Always activate in parallel on any code review:
- `agents/intent.agent.md` — every review, regardless of language
- `agents/constitution.agent.md` — when project has ADRs (`docs/adr/`, `adr/`) or contributor docs (`CONTRIBUTING.md`, `contribute/`, `.github/copilot-instructions.md`)

If language cannot be determined, ask before proceeding.

### Step 2 — Apply or explain conventions

Each language agent reads its authoritative reference file first, then:
- For convention questions: answers with rule explanation and corrected code example
- For code review: identifies deviations, states the rule, shows corrected version
- Does not flag patterns the project has explicitly configured in `biome.json` or `.editorconfig`

The intent and constitution agents run in parallel and contribute findings to the combined report.

### Step 3 — Present findings

Organise all findings from all agents into a unified report:
- **Required** — must fix: naming violations, missing TSDoc on exports, `any` types, constitutional violations
- **Recommended** — should fix: weak intent comments, undocumented magic values, unjustified suppressions
- **Advisory** — consider: missing decision records, stale ADRs, implicit exceptions to formalise

For each finding: state the rule, affected code, and corrected version or recommended action.

### Step 4 — Apply corrections

Apply only corrections the user explicitly approves. Edit files using workspace tools. Don't rewrite entire files unless under 50 lines.

## Expected output

- For convention questions: a rule explanation with a corrected code or markup example
- For code review: a unified findings report (Required / Recommended / Advisory) covering language conventions, intent quality, and constitutional compliance
- Offered corrections with the user's explicit approval before any file is mutated

## Safety & constraints

- Never mutate files without explicit user confirmation.
- Don't flag style choices the project has opted into via `biome.json` or `.editorconfig`.
- Don't invent ADR content — only enforce and challenge what is actually documented.


