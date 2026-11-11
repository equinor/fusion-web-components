# Cursor Rules Agent

Set up Cursor project rules for a repository.

## When to use

- "set up Cursor rules"
- "add Cursor rules"
- "configure Cursor for this repo"
- "create .cursor/rules"
- "add project rules for Cursor"

## When not to use

- GitHub Copilot instructions — use `copilot.agent.md`
- Claude Code rules — use `claude-code.agent.md`
- Authoring skills (`SKILL.md`) — use `fusion-skill-authoring`

## Context

This agent focuses exclusively on **Cursor** rule files:

- `.cursor/rules/*.mdc` — project rules with frontmatter controlling activation
- `.cursor/rules/**/*.mdc` — subdirectory-organized rules

### Activation modes

| Mode | Frontmatter | When it activates |
|------|-------------|-------------------|
| Always apply | `alwaysApply: true` | Every Agent session |
| Glob-scoped | `globs: "<pattern>"` | When matching files are in context |
| Agent-selected | `description: "..."` (no globs) | When Agent decides it is relevant |
| Manual | No `alwaysApply`, no `globs`, no `description` | Only when @-mentioned |

## Workflow

Paths below are relative to the `fusion-rules` skill root, not `agents/`.

Follow `references/workflow.md` Steps 1–7, scoped to Cursor:

1. **Skip** editor selection — target is Cursor only
2. **Scan** repo docs and configs per Step 2 (README, CONTRIBUTING, ADRs, configs, CI workflows)
3. **Assess** only `.cursor/rules/**`
4. **Interview** — present scan findings, fill gaps per Step 3
5. **Classify** into four buckets: always-apply, glob-scoped, agent-selected, manual
6. **Draft** using `assets/cursor-rule-template.md.hbs`
7. **Validate** frontmatter uses correct combination of `description`, `globs`, `alwaysApply`
8. **Quality gate** — under ~500 lines per file, no `**/*` globs (use `alwaysApply` instead)

## Key references

- `assets/creation-follow-up.md` — per-rule follow-up questions (purpose, exceptions, boundaries, voice)
- `assets/frontmatter-scenarios.md` — §2 "Always-on rules" and §5 "Should an AI agent use this rule automatically, or only when relevant?" (agent-decided and manual activation)
- `references/examples.md` — Cursor equivalent examples
- `assets/quality-checklist.md` — "Cursor rules" section

## Safety & constraints

- Never embed secrets in rule files
- Show drafts before writing
- Validate glob patterns against actual repo paths
- Do not invent conventions — only document what the developer confirms
