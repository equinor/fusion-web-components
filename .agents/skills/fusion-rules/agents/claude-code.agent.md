# Claude Code Rules Agent

Set up Claude Code project instructions and rules for a repository.

## When to use

- "set up CLAUDE.md"
- "add Claude Code rules"
- "configure Claude Code for this repo"
- "create .claude/rules"
- "set up Claude instructions"

## When not to use

- GitHub Copilot instructions — use `copilot.agent.md`
- Cursor rules — use `cursor.agent.md`
- Authoring skills (`SKILL.md`) — use `fusion-skill-authoring`

## Context

This agent focuses exclusively on **Claude Code** instruction files:

- `CLAUDE.md` or `.claude/CLAUDE.md` — project instructions (loaded every session, target under 200 lines)
- `.claude/rules/*.md` — modular rule files, optionally path-scoped with `paths` frontmatter
- `@path/to/file` imports in CLAUDE.md to pull in additional context

### Activation modes

| Mode | Setup | When it activates |
|------|-------|-------------------|
| Unconditional | No `paths` frontmatter | Every session |
| Path-scoped | `paths` frontmatter with globs | When Claude reads matching files |

### CLAUDE.md locations

| Location | Scope |
|----------|-------|
| `./CLAUDE.md` or `./.claude/CLAUDE.md` | Project (shared via VCS) |
| `~/.claude/CLAUDE.md` | User (all projects) |
| Managed policy path | Organization (cannot be excluded) |
| `subdir/CLAUDE.md` | Subdirectory (on-demand) |

## Workflow

Follow `.system/fusion-rule-author` Steps 1–7, scoped to Claude Code:

1. **Skip** editor selection — target is Claude Code only
2. **Scan** repo docs and configs per Step 2 (README, CONTRIBUTING, ADRs, configs, CI workflows)
3. **Assess** `CLAUDE.md`, `.claude/CLAUDE.md`, and `.claude/rules/**/*.md`
4. **Interview** — present scan findings, fill gaps per Step 3
5. **Classify** into two buckets: always-on (`CLAUDE.md` / unconditional rules) and path-scoped rules
6. **Draft** using `.system/fusion-rule-author/assets/claude-rule-template.md`
7. **Validate** `paths` frontmatter uses correct glob patterns; `@path` imports point to existing files
8. **Quality gate** — `CLAUDE.md` under ~200 lines, one topic per rule file

## Key references

- `.system/fusion-rule-author/assets/creation-follow-up.md` — per-rule follow-up questions (purpose, exceptions, boundaries, voice)
- `.system/fusion-rule-author/assets/frontmatter-scenarios.md` — "Apply to all files", "Import external files", "Subdirectory rules" scenarios
- `.system/fusion-rule-author/references/examples.md` — Claude Code equivalent examples
- `.system/fusion-rule-author/assets/quality-checklist.md` — "Claude Code" section

## Safety & constraints

- Never embed secrets in instruction files
- Show drafts before writing
- Validate glob patterns and `@path` imports against actual repo paths
- Do not invent conventions — only document what the developer confirms
