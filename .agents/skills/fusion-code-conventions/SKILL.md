---
name: fusion-code-conventions
description: 'Applies and explains code conventions across TypeScript, React, C#, and Markdown. Enforces naming rules, file naming patterns, TSDoc and XML doc standards, inline comment intent (the *why*, not the *what*), code structure, error handling, async patterns, and dead code policy. Also enforces ADR and contributor doc decisions, and flags decisions that appear stale or misaligned with current tooling. USE FOR: convention questions, code review against project standards, applying naming rules, auditing intent comments, checking TSDoc completeness, enforcing recorded ADR decisions, and flagging stale architectural decisions. DO NOT USE FOR: security vulnerability scanning, performance profiling, runtime debugging, or generating net-new code without a review target.'
license: MIT
metadata:
  version: "0.1.2"
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

Use this skill whenever code needs to be reviewed, written, or explained against project conventions. It applies at two layers:

- **Language conventions** — naming, file naming patterns, type system, TSDoc and XML doc standards, code structure, error handling, async patterns, and dead code policy. Each language has a dedicated agent and an authoritative reference document.
- **Cross-cutting conventions** — applied on every code review regardless of language: intent capture (every non-obvious decision must be documented well enough that the code could be regenerated from comments alone) and constitution enforcement (ADRs and contributor docs are law; deviations require a new decision record; stale decisions are flagged for revision).

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

Do not use this skill for:
- Security vulnerability scanning (use a dedicated security review skill)
- Performance profiling or benchmarking
- High-level architecture or system design decisions
- Generating net-new code without a review target
- Mutating files without explicit user confirmation

## Precedence and applicability

This skill provides **org-wide baseline conventions**. When it is installed in a repository that also documents its own conventions, the following precedence applies (highest wins):

1. **Repository-level policy** — docs such as `CONTRIBUTING.md`, contributor guides (for example under `contribute/`), ADRs (wherever they are stored, for example `docs/adr/`), `.github/copilot-instructions.md`, `AGENTS.md`, or equivalent repo-specific files
2. **Tooling configuration** — files such as `biome.json`, `tsconfig.json`, `.editorconfig`, and linter configs wherever they are defined
3. **This skill** — all rules in `references/*.conventions.md` and agent modes

When a repository explicitly narrows, relaxes, or contradicts a rule from this skill, the repository policy wins. Agents must not flag code that conforms to the repo's documented conventions, even if it deviates from the skill baseline.

If the conflict is not documented anywhere (no ADR, no contributor note, no config), treat the skill rule as the default and recommend the team record their intent — either adopt the baseline or add an explicit override.

> **For maintainers:** record convention overrides in `CONTRIBUTING.md`, a contributor guide, or an ADR so that both humans and agents discover them consistently.

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

When the developer's context or persona is known, consult the matching follow-up file in `assets/` for targeted clarifying questions before reviewing. Ask only the relevant unanswered questions.

- `assets/framework-core-developer.follow-up.md` — Fusion Framework internals, shared libraries, framework APIs
- `assets/react-app.follow-up.md` — Fusion React app development
- `assets/core-service.follow-up.md` — Fusion Core backend services (C# / .NET)

## Instructions

### Step 1 — Classify and route

Detect the primary language of the target code or question, then activate the matching language agent:
- TypeScript (`.ts`, non-component `.tsx`) → `agents/typescript.agent.md`
- React (`.tsx` with JSX or hooks, component files) → `agents/react.agent.md`
- Mixed `.tsx` (TypeScript type concerns + React component concerns) → both agents in parallel
- C# (`.cs`, `.csproj`) → `agents/csharp.agent.md`
- Markdown (`.md`, `.mdx`) → `agents/markdown.agent.md`

Always activate in parallel on any code review:
- `agents/intent.agent.md` — every review, regardless of language
- `agents/constitution.agent.md` — when the project has ADRs (`docs/adr/`, `adr/`) or contributor docs (`CONTRIBUTING.md`, `contribute/`, `.github/copilot-instructions.md`)

If the language cannot be determined from context, ask before proceeding.

### Step 2 — Apply or explain conventions

Each language agent reads its authoritative reference file first, then:
- For convention questions: answers directly with a rule explanation and a corrected code example
- For code review: identifies deviations, states the rule, shows the corrected version
- Does not flag patterns the project has explicitly configured in `biome.json` or `.editorconfig`

The intent and constitution agents run in parallel and contribute their findings to the combined report.

### Step 3 — Present findings

Organise all findings from all agents into a unified report:
- **Required** — must fix: naming violations, missing TSDoc on exports, `any` types, constitutional violations
- **Recommended** — should fix: weak intent comments, undocumented magic values, unjustified suppressions
- **Advisory** — consider: missing decision records, stale ADRs, implicit exceptions that should be formalised

For each finding: state the rule, the affected code, and the corrected version or recommended action.

### Step 4 — Apply corrections

Apply only corrections the user explicitly approves. Edit files using workspace tools. Do not rewrite entire files unless the file is under 50 lines.

## Expected output

- For convention questions: a rule explanation with a corrected code or markup example
- For code review: a unified findings report (Required / Recommended / Advisory) covering language conventions, intent quality, and constitutional compliance
- Offered corrections with the user's explicit approval before any file is mutated

## Safety & constraints

- Never mutate files without explicit user confirmation.
- Do not flag style choices the project has explicitly opted into via `biome.json` or `.editorconfig`.
- Do not invent ADR content — only enforce and challenge what is actually documented.


