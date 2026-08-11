# Skill authoring platform references

## Contents

- Core skill-design principles
- Patterns worth borrowing
- Repository overlay pattern
- Reusable pattern examples
- Source links

## Core skill-design principles

- every skill directory needs a `SKILL.md` entry point
- `name` and `description` are the primary discovery contract
- description should say both what the skill does and when to use it
- `SKILL.md` should stay concise and point to deeper material only when needed
- `references/`, `assets/`, and optional `scripts/` are standard supporting folders
- validate after authoring instead of assuming metadata is correct

Agent Skills spec naming rules:

- `name` must match the parent directory
- avoid leading or trailing hyphens
- avoid consecutive hyphens
- keep file references one level deep from `SKILL.md`

## Patterns worth borrowing

### 1. Discovery lives in the description

Description: primary routing signal, pre-loaded. Good descriptions:

- written in third person
- include concrete task nouns and trigger phrases
- say both what the skill does and when it should trigger
- name anti-triggers to reduce false positives

Keep `USE FOR:` and `DO NOT USE FOR:` inline in the description.

### 2. Keep the main skill lean

Progressive disclosure: `SKILL.md` = activation, workflow, guardrails; heavy material → `references/`.

- keep main body under ~500 lines
- move long examples, checklists, or platform notes into `references/`
- keep every supporting file directly linked from `SKILL.md`
- add a table of contents to long reference files

### 3. Match the degree of freedom to the task

- High freedom: context-dependent analysis or review work
- Medium freedom: preferred patterns with room for adaptation
- Low freedom: fragile or safety-critical command sequences

Risky workflows: use explicit sequence rules and validation loops. Contextual tasks: don't over-specify.

### 4. Build around representative requests before polishing prose

- define at least three representative scenarios
- write minimal guidance needed to pass those scenarios
- validate the final skill against those scenarios
- iterate when the skill triggers poorly or misses key guardrails

No naming convention: use `custom-<base-skill-name>` as safe fallback.

### 5. Prefer deterministic helpers over repeated improvisation

Use `scripts/` when exact validation, transformation, or extraction is needed and regenerating is unreliable. Always document dependencies, side effects, and validation.

### 6. Make runtime assumptions explicit

For portable skills:

- document tool or network requirements in `compatibility` only when necessary
- declare server requirements in `metadata.mcp` only when the runtime actually depends on them
- document client-specific tool naming in skill content instead of assuming all runtimes behave the same way

### 7. Bundle helper roles when the target runtime supports them

Anthropics' `agents/` pattern for specialized second-pass work when runtime supports it.

- core workflow in `SKILL.md` so skill works even if runtime ignores `agents/`
- `agents/` for narrow specialist roles, not cloning the whole skill
- repo-local custom agents complement shipped helpers, don't replace main contract

Small, purposeful helper set. Good agent jobs:

- scope and reuse decisions
- critical review of a draft
- trigger and anti-trigger tuning

Complement `SKILL.md`, don't replace it.

For this repository: helper agents focused on scoping, maintainer review, trigger tuning.

## Repository overlay pattern

Layer portable skill guidance and repo governance; don't mix.

Shipped skill package:

- reusable authoring workflow
- neutral naming defaults (`custom-<base-skill-name>` when no stronger local convention)
- portability-safe examples and helper-agent roles
- validation expectations generic enough to work outside one repo

Repo-local instructions/catalog docs:

- repo-owned prefixes (e.g. `fusion-`)
- placement conventions (`skills/.experimental/`, `skills/.curated/`)
- required ownership, lifecycle, composition metadata
- repo validation commands and release policy
- local examples depending on sibling skills or workspace-only structure

Draft portable skill first, layer local policy as overlay. Portability test: would guidance make sense in another repo?

## Reusable pattern examples

### Orchestrator pattern

One skill coordinates subskills or repeated decision gates.

Patterns worth copying:

- explicit routing into subordinate responsibilities
- shared safety gates owned by the orchestrator
- clear hand-off boundaries between orchestration and specialist work
- draft-first mutation flow when the workflow can make external changes

### Narrow specialist pattern

One job → narrow skill surface.

Patterns worth copying:

- one responsibility per skill
- strong anti-triggers
- status-oriented expected output that makes hand-off obvious

### Self-review pattern

Authoring quality needs deliberate second pass.

Patterns worth copying:

- findings-first review
- explicit validation evidence
- helper agents justified by a real scoping, review, or tuning job

## Source links

- Agent skills overview:
  - https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- Agent skills best practices:
  - https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
- Agent Skills specification:
  - https://agentskills.io/specification
- Gemini CLI creating skills:
  - https://geminicli.com/docs/cli/creating-skills/
- GitHub Copilot create skills:
  - https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-skills