# Frontmatter scenarios

Decision tree for choosing the right frontmatter. Each scenario includes what to ask when context is missing.

---

## 1. Does this convention apply everywhere or only to certain files?

**Ask when:** The scan found a convention but it's unclear whether it's universal or path-specific.

> "Does this apply to all code in the repo, or only to specific directories/file types?"

**If everywhere** → always-on (Scenario 2)
**If specific paths** → path-scoped (Scenario 3)
**If unclear** → "Can you give an example of a file where this matters and one where it doesn't?"

---

## 2. Always-on rules

The convention applies to all files — code style, naming, error handling, commit format.

**GitHub Copilot** — root instructions (no frontmatter):

```
.github/copilot-instructions.md
```

**Cursor** — `alwaysApply: true`:

```yaml
---
alwaysApply: true
---
```

**Claude Code** — `CLAUDE.md` or rule without `paths`:

```
CLAUDE.md
.claude/rules/code-style.md  # no paths = unconditional
```

---

## 3. Path-scoped rules

The convention applies only to specific directories or file types.

**Ask when:** The developer says "this is only for the API" but hasn't named the exact directory.

> "Which directory or file pattern should trigger this rule? (e.g., `src/api/**`, `**/*.test.ts`)"

**Ask when:** Multiple directories might match.

> "Should this cover just `src/api/` or also `src/middleware/` and `src/validators/`?"

**GitHub Copilot** — `applyTo`:

```yaml
---
applyTo: "src/api/**"
---
```

**Cursor** — `globs`:

```yaml
---
globs: "src/api/**"
alwaysApply: false
---
```

**Claude Code** — `paths`:

```yaml
---
paths:
  - "src/api/**"
---
```

### Multiple patterns

When one rule covers several file types or directories:

```yaml
# Copilot
applyTo: "**/*.{ts,tsx}"

# Cursor
globs:
  - "**/*.ts"
  - "**/*.tsx"

# Claude Code
paths:
  - "**/*.{ts,tsx}"
  - "lib/**/*.ts"
```

---

## 4. Who should use this rule — coding agent, code review, or both?

**Ask when (Copilot only):** The convention might not apply to code review (e.g., "generate tests" makes sense for coding but not review).

> "Should this instruction apply to both Copilot coding and code review, or just one?"

**If both** → omit `excludeAgent`
**If coding only:**

```yaml
---
applyTo: "**/*.ts"
excludeAgent: "code-review"
---
```

**If review only:**

```yaml
---
applyTo: "**/*.ts"
excludeAgent: "coding-agent"
---
```

No equivalent in Cursor or Claude Code.

---

## 5. Should an AI agent use this rule automatically, or only when relevant?

**Ask when (Cursor only):** The rule is topical (architecture, deployment) rather than file-specific.

> "Should this rule always be active, or should the agent include it only when the topic comes up?"

**If always** → `alwaysApply: true` (Scenario 2)
**If topic-dependent:**

```yaml
---
description: "Conventions for database migrations and schema changes"
alwaysApply: false
---
```

**If rarely needed / reference-only:**

> "Is this something developers would explicitly ask for, or should it auto-activate?"

**If explicit only** → manual (no `alwaysApply`, no `globs`, no `description` — @-mention to activate)

---

## 6. Does the repo already have docs that cover this?

**Ask when (Claude Code only):** The scan found `CONTRIBUTING.md`, ADRs, or other docs that overlap with what the developer wants in rules.

> "I found existing docs that cover this. Should we import them into CLAUDE.md instead of duplicating the content?"

**If yes** → use `@path` imports:

```markdown
See @CONTRIBUTING.md for code style and PR conventions.
See @docs/architecture.md for system design decisions.
```

No equivalent in Copilot or Cursor — content must be written directly.

---

## 7. Does a subfolder have its own conventions?

**Ask when:** The repo is a monorepo or has directories with distinct tech stacks / patterns.

> "Does `packages/ui/` follow different conventions than the rest of the repo?"

**If yes:**

```yaml
# Copilot — scoped instruction
applyTo: "packages/ui/**"

# Cursor — subdirectory in .cursor/rules/
.cursor/rules/ui/components.mdc

# Claude Code — subdirectory CLAUDE.md
packages/ui/CLAUDE.md
```

---

## 8. Is root instructions getting too long?

**Ask when:** The drafted root file exceeds ~80 lines (Copilot), ~500 lines (Cursor), or ~200 lines (Claude Code CLAUDE.md).

> "The root instructions are at [X] lines. Can we move any of these conventions into scoped rules for specific directories?"

Look for conventions that only matter for certain file types and split them out.

---

## Quick reference

| Field | Editor | Purpose |
|-------|--------|---------|
| `applyTo` | Copilot | Glob — when matching files are open |
| `excludeAgent` | Copilot | Skip coding agent or code review |
| `globs` | Cursor | Glob — when matching files are in context |
| `alwaysApply` | Cursor | `true` = every session |
| `description` | Cursor | Agent reads this to decide relevance |
| `paths` | Claude Code | Glob — when matching files are read |
| `@path` | Claude Code | Import file content into CLAUDE.md |

## Glob cheat sheet

| Pattern | Matches |
|---------|---------|
| `src/**/*.ts` | All `.ts` files under `src/` recursively |
| `**/*.test.ts` | All test files anywhere |
| `src/api/**` | Everything under `src/api/` |
| `*.md` | Markdown files in root only |
| `**/*.md` | All markdown files everywhere |
| `**/*.{ts,tsx}` | TypeScript and TSX files |
| `src/{components,hooks}/**` | Multiple directories |

### Common mistakes

| Mistake | Fix |
|---------|-----|
| `**/*` as a glob scope | Use always-on (root file / `alwaysApply` / no `paths`) |
| `*.ts` (no `**`) | Use `**/*.ts` to match nested files |
| `src/api` (no trailing `/**`) | Use `src/api/**` for directory contents |
