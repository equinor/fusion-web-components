# Skill authoring platform references

## Contents

- Core skill-design principles
- Patterns worth borrowing
- Repository overlay pattern
- Reusable pattern examples
- Source links

## Core skill-design principles

Across the current skill ecosystem, the baseline is stable:

- every skill directory needs a `SKILL.md` entry point,
- `name` and `description` are the primary discovery contract,
- the description should say both what the skill does and when to use it,
- `SKILL.md` should stay concise and point to deeper material only when needed,
- `references/`, `assets/`, and optional `scripts/` are the standard supporting folders,
- validation should happen after authoring instead of assuming the metadata is correct.

The Agent Skills specification adds a few naming details worth enforcing even when local tooling is looser:

- `name` should match the parent directory,
- avoid leading or trailing hyphens,
- avoid consecutive hyphens,
- keep file references one level deep from `SKILL.md`.

## Patterns worth borrowing

### 1. Discovery lives in the description

The description is the most important routing signal because it is pre-loaded before the rest of the skill. Good descriptions:

- are written in third person,
- include concrete task nouns and trigger phrases,
- say both what the skill does and when it should trigger,
- make false positives less likely by naming anti-triggers.

A practical pattern is to keep `USE FOR:` and `DO NOT USE FOR:` inline in the description.

### 2. Keep the main skill lean

Use progressive disclosure: keep `SKILL.md` focused on activation, workflow, and guardrails, then move heavy material to direct references.

Practical application:

- keep the main body under roughly 500 lines,
- move long examples, checklists, or platform notes into `references/`,
- keep every supporting file directly linked from `SKILL.md`,
- add a table of contents to long reference files.

### 3. Match the degree of freedom to the task

Not every skill needs the same level of specificity.

- High freedom: context-dependent analysis or review work
- Medium freedom: preferred patterns with room for adaptation
- Low freedom: fragile or safety-critical command sequences

When a workflow is risky, use explicit sequence rules and validation loops. When the task is contextual, avoid over-specifying the obvious.

### 4. Build around representative requests before polishing prose

The practical version is simple:

- define at least three representative scenarios,
- write the minimal guidance needed to pass those scenarios,
- validate the final skill against those scenarios,
- iterate when the skill still triggers poorly or misses key guardrails.

This keeps authoring grounded in real behavior instead of imagined completeness.

When a catalog has no stronger naming convention, a neutral fallback like `custom-<base-skill-name>` is safer than assuming repository-owned prefixes.

### 5. Prefer deterministic helpers over repeated improvisation

If the workflow needs exact validation, transformation, or extraction, a script can be better than asking the agent to regenerate logic every time. Only add `scripts/` when it materially improves reliability, and always make dependencies, side effects, and validation explicit.

### 6. Make runtime assumptions explicit

Runtime differences matter. For portable skills, the practical pattern is:

- document tool or network requirements in `compatibility` only when necessary,
- declare server requirements in `metadata.mcp` only when the runtime actually depends on them,
- document client-specific tool naming or execution expectations in the skill content instead of assuming every runtime behaves the same way.

### 7. Bundle helper roles when the target runtime supports them

Anthropic's `skill-creator` uses a small `agents/` layer for specialized second-pass work. That pattern is worth keeping in Fusion-flavored skill authoring when the target runtime supports skill-local agents or subagents.

- keep the core workflow in `SKILL.md` and direct references so the skill still works even if the runtime ignores `agents/`,
- use `agents/` for narrow specialist roles rather than cloning the whole skill into multiple files,
- let repository-local custom agents complement the shipped helper agents instead of replacing the main skill contract.

Keep the helper set small and purposeful. Good jobs for bundled agents are:

- scope and reuse decisions,
- critical review of a draft,
- trigger and anti-trigger tuning.

They should complement `SKILL.md`, not replace it.

For this repository, a good Fusion-flavored adaptation is to keep helper agents focused on scoping, maintainer review, and trigger tuning rather than shipping a broad generic agent suite.

## Repository overlay pattern

Portable skill guidance and repository governance should be layered, not mixed.

Keep in the shipped skill package:

- the reusable authoring workflow,
- neutral naming defaults such as `custom-<base-skill-name>` when no stronger local convention exists,
- portability-safe examples and helper-agent roles that ship with the skill when the runtime supports them,
- validation expectations stated generically enough to work outside one repository.

Keep in repo-local instructions or catalog docs:

- repository-owned prefixes such as `fusion-`,
- placement conventions such as `skills/.experimental/` or `skills/.curated/`,
- required ownership, lifecycle, and composition metadata,
- repository validation commands and release policy,
- local examples that depend on sibling skills or workspace-only structure.

If you are authoring inside a governed repository, draft the portable skill first, then layer in the local policy as an overlay. A simple portability test is useful: if someone copied only the skill directory into another repository, would the guidance still make sense?

## Reusable pattern examples

### Orchestrator pattern

Use this when one skill coordinates a narrow set of subskills or repeated decision gates.

Patterns worth copying:

- explicit routing into subordinate responsibilities,
- shared safety gates owned by the orchestrator,
- clear hand-off boundaries between orchestration and specialist work,
- draft-first mutation flow when the workflow can make external changes.

### Narrow specialist pattern

Use this when one job deserves its own narrow skill surface.

Patterns worth copying:

- one responsibility per skill,
- strong anti-triggers,
- status-oriented expected output that makes hand-off obvious.

### Self-review pattern

Use this when authoring quality depends on a deliberate second pass.

Patterns worth copying:

- findings-first review,
- explicit validation evidence,
- helper agents justified by a real scoping, review, or tuning job.

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