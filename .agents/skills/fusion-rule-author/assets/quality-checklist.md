# Quality checklist for AI coding rules

Review every rule file against this checklist before finalizing.

## Root instructions (`copilot-instructions.md`)

- [ ] **Conciseness** — Under ~80 lines. Every line is an actionable directive.
- [ ] **Imperative voice** — Uses "Use X", "Do Y", not "You should consider X".
- [ ] **No explanations** — Directives only, not rationale. Copilot needs rules, not reasons.
- [ ] **No secrets** — No API keys, passwords, connection strings, or environment-specific values.
- [ ] **No duplication** — Nothing repeated in scoped instruction files.
- [ ] **Covers key areas** — Language, style, architecture, testing, error handling as applicable.
- [ ] **Accurate** — Every convention matches what the team actually follows.

## Scoped instructions (`.github/instructions/*.instructions.md`)

- [ ] **Valid frontmatter** — Has `applyTo` field. Optionally `excludeAgent` to scope to a specific agent.
- [ ] **Correct glob** — Pattern matches intended files (verified against actual repo paths).
- [ ] **Not too broad** — Glob is not `**/*` or equivalent (use root instructions instead).
- [ ] **Conciseness** — Under ~50 lines per file. Split if larger.
- [ ] **No overlap** — Does not repeat guidance from root instructions.
- [ ] **Kebab-case filename** — Named `<domain>.instructions.md`.
- [ ] **Scoped content** — Every directive is specific to the matched files.

## Cursor rules (`.cursor/rules/*.mdc`)

- [ ] **Valid frontmatter** — Uses correct combination of `description`, `globs`, and `alwaysApply` for the intended activation mode.
- [ ] **Correct globs** — Pattern matches intended files (verified against actual repo paths).
- [ ] **Not too broad** — Glob-scoped rules do not use `**/*` (use `alwaysApply: true` instead).
- [ ] **Conciseness** — Under ~500 lines per file. Split if larger.
- [ ] **No overlap** — Does not repeat guidance from always-apply rules.
- [ ] **Kebab-case filename** — Named `<domain>.mdc`.
- [ ] **Scoped content** — Every directive is specific to the matched files.
- [ ] **Description quality** — Agent-selected rules have a clear, specific description for relevance matching.

## Claude Code (`CLAUDE.md` and `.claude/rules/*.md`)

- [ ] **Conciseness** — `CLAUDE.md` under ~200 lines. Longer files reduce adherence.
- [ ] **Imperative voice** — Specific, verifiable directives.
- [ ] **No secrets** — No API keys, passwords, connection strings, or environment-specific values.
- [ ] **No duplication** — Nothing repeated between `CLAUDE.md` and `.claude/rules/` files.
- [ ] **Valid frontmatter** — Scoped rules have `paths` with correct glob patterns. Rules without `paths` are intentionally unconditional.
- [ ] **Correct paths** — Glob patterns match intended files (verified against actual repo paths).
- [ ] **Kebab-case filename** — Named `<domain>.md`.
- [ ] **One topic per file** — Each rule file covers a single domain.
- [ ] **Import hygiene** — `@path` imports in CLAUDE.md point to files that exist.

## Common pitfalls

- [ ] **Vague directives** — "Write clean code" → Replace with specific rules.
- [ ] **Wall of text** — Paragraph-style prose → Convert to bullet-point directives.
- [ ] **Aspirational rules** — Rules the team doesn't actually follow → Remove or mark as goals.
- [ ] **Overly narrow glob** — `src/components/Button.tsx` → Broaden to `src/components/**/*.tsx`.
- [ ] **Missing context** — References internal terms without definition → Add brief clarification.
