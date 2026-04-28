# Rule creation follow-up questions

Questions to ask per rule when the scan and initial interview leave gaps. Ask only what's missing — skip anything already answered.

---

## Purpose and scope

> "What problem does this rule solve? What would go wrong without it?"

Ensures the rule has a reason to exist. If the developer can't explain the problem, the rule may not be needed.

> "Is this a hard requirement or a preference?"

Hard requirements become imperative directives ("Use X"). Preferences become softer guidance ("Prefer X over Y when Z").

---

## Specificity

> "Can you give a concrete example of code that follows this rule and code that violates it?"

Turns vague conventions into testable directives. If the developer can't give an example, the rule is too abstract.

> "Does this apply to new code only, or should existing code be refactored to match?"

Determines whether the rule is forward-looking or retroactive. Forward-only: "For new files, use X." Retroactive: "Use X."

---

## Exceptions

> "Are there cases where this rule should NOT apply?"

Common exception patterns:
- Generated code / vendor files
- Test code vs production code
- Legacy modules being phased out
- Third-party API boundaries (must match external conventions)
- Performance-critical paths with different patterns

> "If there are exceptions, how should the AI recognize them?"

Options: file path (`tests/`, `generated/`), filename pattern (`*.generated.ts`), comment marker (`// legacy`), or directory convention.

---

## Boundaries

> "Does this rule interact with or depend on other rules?"

Catches conflicts early. Example: "Use named exports" + "Re-export everything from index.ts" — the AI needs to know both.

> "Should this rule override the linter/formatter, or defer to it?"

If a tool already enforces it (ESLint, Biome, Ruff), the rule may be redundant. Best to reference the tool instead of duplicating.

---

## Granularity

> "Does this apply everywhere, or only to specific directories/file types?"

Determines always-on vs scoped. See `assets/frontmatter-scenarios.md` for frontmatter options.

> "Should this be one rule or split into several?"

Split when: different parts apply to different paths, or the rule covers unrelated concerns.
Keep together when: the parts are meaningless in isolation.

---

## Voice and format

> "How strict should the directive be?"

| Level | Phrasing | Use when |
|-------|----------|----------|
| Required | "Always use X." / "Never do Y." | CI enforces it or team agrees it's non-negotiable |
| Preferred | "Prefer X over Y." | Convention, but exceptions exist |
| Conditional | "When doing Z, use X." | Only applies in specific contexts |

> "Anything the AI should explicitly avoid doing, even if it seems reasonable?"

Captures anti-patterns the developer has seen the AI produce. Example: "Do not add `any` type assertions even if it fixes a type error."

---

## Validation

> "How would you verify the AI followed this rule?"

If it's testable (linter, type check, test suite), mention the command. If it's a judgment call (architecture, naming), note that.

> "Is there an existing doc or ADR that backs this up?"

Claude Code can import it with `@path`. Copilot and Cursor need the content inlined.

---

## Usage guide

Use these questions during **Step 3 (Interview)** for each convention discovered in the scan. Don't ask all questions for every rule — pick the ones where context is missing:

| Signal | Questions to ask |
|--------|-----------------|
| Scan found a convention but no rationale | Purpose and scope |
| Convention seems broad / vague | Specificity |
| Convention might conflict with test or legacy code | Exceptions |
| Multiple related conventions found | Boundaries, Granularity |
| Developer gave a preference without strength | Voice and format |
| No obvious way to verify | Validation |
