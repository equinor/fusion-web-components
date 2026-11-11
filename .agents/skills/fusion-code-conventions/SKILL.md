---
name: fusion-code-conventions
description: 'Applies TypeScript, React, C# and Markdown project conventions, ADRs and contributor docs; flags stale decisions. USE FOR: convention questions, code review, naming, TSDoc and XML docs, intent comments, ADR compliance. DO NOT USE FOR: security scans, performance profiling, runtime debugging, architecture design, net-new code without a review target or unapproved edits.'
license: MIT
metadata:
  version: "0.1.9"
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

Review or explain TypeScript, React, C# and Markdown project conventions:
naming, TSDoc/XML docs, types, structure, errors, async and dead code.
Reviews also check intent regenerability and ADR/contributor compliance,
including stale decisions. Examples: "review this for convention violations",
"are these inline comments good enough?", "is this ADR still current?"

## When not to use

- Security scanning, performance profiling, runtime debugging or architecture design.
- Generating net-new code without a review target.
- Mutating files without explicit user confirmation.

## Precedence and applicability

Org-wide baseline; highest applicable rule wins:
1. Repository policy: `CONTRIBUTING.md`, `contribute/`, ADRs,
   `.github/copilot-instructions.md`, `AGENTS.md` or equivalent.
2. Tooling: `biome.json`, `tsconfig.json`, `.editorconfig`, linter configs.
3. This skill: `references/*.conventions.md` and agent modes.

Explicit repository overrides win, including narrowed or relaxed rules. Do not
flag code conforming to documented repo conventions or configured style.
For undocumented conflicts, use baseline and recommend recording intent in
`CONTRIBUTING.md`, contributor guide or ADR.

## Required inputs

- Target snippet/file path or specific convention question.
- Language/file type; infer from content, ask if missing or ambiguous.
- For constitution checks: ADR/contributor paths; infer `docs/adr/`,
  `CONTRIBUTING.md`, `contribute/` when not supplied.

When developer context is known and clarification needed, read only matching
question bank and relevant section; ask only unanswered questions:
- Framework internals/shared APIs: `assets/framework-core-developer.follow-up.md`
- React apps: `assets/react-app.follow-up.md`
- C# services: `assets/core-service.follow-up.md`

## Safety & constraints

- Apply only corrections user explicitly approves; use workspace tools.
- Don't rewrite entire files unless under 50 lines.
- Don't flag style explicitly selected in `biome.json`, `.editorconfig` or
  equivalent project config.
- Don't invent ADR content or intent; enforce/challenge documented decisions.
  If rationale is unknown, flag missing intent rather than inventing it.

## Instructions

### Step 1 — Classify and route

Read and apply selected agents as Markdown instructions; use supported agent
adapters for parallel checks when available, otherwise apply inline. Load only
languages and review intents in scope.

| Target | Agent instructions | Authoritative rules |
| --- | --- | --- |
| TypeScript (`.ts`, non-component `.tsx`) | `agents/typescript.agent.md` | `references/typescript.conventions.md` |
| React (JSX/hooks/components in `.tsx`, `.jsx`) | `agents/react.agent.md` | `references/react.conventions.md` |
| C# (`.cs`, `.csproj`) | `agents/csharp.agent.md` | `references/csharp.conventions.md` |
| Markdown (`.md`, `.mdx`) | `agents/markdown.agent.md` | `references/markdown.conventions.md` |

Mixed `.tsx`: both TypeScript and React checks in parallel. React `.tsx`
reviews also require TypeScript rules; `.mdx` with substantial JSX/component
logic also requires React checks.

On **every code or document review**, read and apply `agents/intent.agent.md`
for all intent checks. This is mandatory, not optional. On reviews in projects
with ADRs (`docs/adr/`, `adr/`) or contributor docs (`CONTRIBUTING.md`,
`contribute/`, `.github/copilot-instructions.md`), also read and apply
`agents/constitution.agent.md` for compliance and stale-decision checks.
Run applicable cross-cutting checks alongside language checks.

When drafting an intent example or correction, read
`references/intent-examples.md` for worked good/bad examples; reviewing intent
still requires the complete agent rule ledger, not these examples.

### Step 2 — Apply or explain conventions

Before answering, read authoritative rules for selected languages and discover
project overrides as directed by selected agents. Specific questions may use
TOC and relevant rule sections; full reviews require complete applicable rules,
including intent and constitution, never just a sample section.

For questions, explain rule with corrected code/markup example. For reviews,
identify deviations, cite rule and show correction. Combine applicable language,
intent and constitution findings.

### Step 3 — Present findings

Unified report:
- **Required** — naming violations, missing TSDoc on exports, `any` types,
  constitutional violations.
- **Recommended** — weak intent comments, undocumented magic values,
  unjustified suppressions.
- **Advisory** — missing decision records, stale ADRs, implicit exceptions to formalise.

Each finding states rule, affected code and corrected version or recommended action.

### Step 4 — Apply corrections

Offer corrections; edit only explicitly approved ones under safety rules above.

## Expected output

Questions: rule explanation and corrected code/markup example.
Reviews: unified Required / Recommended / Advisory findings covering language,
intent and constitutional compliance; corrections offered before approved edits.
