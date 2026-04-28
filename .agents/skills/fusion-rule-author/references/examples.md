# Examples of well-written AI coding rules

Concrete examples across different tech stacks, showing good patterns and common anti-patterns for GitHub Copilot, Cursor, and Claude Code.

---

## Example 1 — TypeScript / React monorepo

### Root instructions (`copilot-instructions.md`)

```markdown
# Copilot Instructions

## Language and runtime

- Use TypeScript strict mode for all source files.
- Target ES2022. Do not use legacy patterns (var, arguments object).
- Use Bun as the package manager and test runner.

## Code style

- Use named exports, not default exports.
- Prefer `interface` over `type` for object shapes.
- Use `camelCase` for variables and functions, `PascalCase` for types and components.
- Keep files under 300 lines. Extract when larger.

## React conventions

- Use functional components with hooks exclusively.
- Co-locate component, styles, and tests in the same directory.
- Prefer composition over prop drilling; use context sparingly.

## Testing

- Write tests with Vitest. Place test files next to source as `*.test.ts(x)`.
- Test behavior, not implementation. Avoid mocking internals.
- Every bug fix must include a regression test.

## Error handling

- Use Result types for expected failures. Reserve exceptions for unexpected errors.
- Never swallow errors silently. Log or propagate.
```

### Scoped instruction (`instructions/api-routes.instructions.md`)

```markdown
---
applyTo: "src/api/**"
---

- Use Hono framework patterns for route handlers.
- Validate request bodies with Zod schemas before processing.
- Return consistent error shapes: `{ error: string, code: string, status: number }`.
- Log all 5xx errors with request context. Never log request bodies containing PII.
- Keep route handlers thin — delegate business logic to service modules.
```

### Cursor equivalent (`rules/api-routes.mdc`)

```markdown
---
description: "Conventions for API route handlers using Hono"
globs: "src/api/**"
alwaysApply: false
---

- Use Hono framework patterns for route handlers.
- Validate request bodies with Zod schemas before processing.
- Return consistent error shapes: `{ error: string, code: string, status: number }`.
- Log all 5xx errors with request context. Never log request bodies containing PII.
- Keep route handlers thin — delegate business logic to service modules.
```

### Claude Code equivalent (`.claude/rules/api-routes.md`)

```markdown
---
paths:
  - "src/api/**"
---

# API Route Conventions

- Use Hono framework patterns for route handlers.
- Validate request bodies with Zod schemas before processing.
- Return consistent error shapes: `{ error: string, code: string, status: number }`.
- Log all 5xx errors with request context. Never log request bodies containing PII.
- Keep route handlers thin — delegate business logic to service modules.
```

---

## Example 2 — Python / FastAPI backend

### Root instructions (`copilot-instructions.md`)

```markdown
# Copilot Instructions

## Language

- Use Python 3.12+. Use type hints for all function signatures.
- Use `ruff` for linting and formatting. Do not use `black` or `isort` separately.

## Architecture

- Follow hexagonal architecture: `domain/`, `adapters/`, `ports/`.
- Domain layer must not import from adapters or infrastructure.

## Naming

- Use `snake_case` for functions, variables, and modules.
- Use `PascalCase` for classes.
- Prefix private methods with underscore.

## Testing

- Use `pytest`. Place tests in `tests/` mirroring `src/` structure.
- Use factories (not fixtures) for test data setup.
- Target 80% coverage minimum for new code.

## Dependencies

- Pin all dependencies in `pyproject.toml`.
- Avoid adding new dependencies without team review.
```

### Scoped instruction (`instructions/db-models.instructions.md`)

```markdown
---
applyTo: "src/adapters/db/**"
---

- Use SQLAlchemy 2.0 declarative style with `Mapped[]` type annotations.
- Every model must define `__tablename__` explicitly.
- Use Alembic for migrations. Never modify the database schema directly.
- Add an index for any column used in WHERE clauses or JOINs.
- Include `created_at` and `updated_at` timestamps on all tables.
```

### Cursor equivalent (`rules/db-models.mdc`)

```markdown
---
description: "SQLAlchemy model and migration conventions"
globs: "src/adapters/db/**"
alwaysApply: false
---

- Use SQLAlchemy 2.0 declarative style with `Mapped[]` type annotations.
- Every model must define `__tablename__` explicitly.
- Use Alembic for migrations. Never modify the database schema directly.
- Add an index for any column used in WHERE clauses or JOINs.
- Include `created_at` and `updated_at` timestamps on all tables.
```

### Claude Code equivalent (`.claude/rules/db-models.md`)

```markdown
---
paths:
  - "src/adapters/db/**"
---

# Database Model Conventions

- Use SQLAlchemy 2.0 declarative style with `Mapped[]` type annotations.
- Every model must define `__tablename__` explicitly.
- Use Alembic for migrations. Never modify the database schema directly.
- Add an index for any column used in WHERE clauses or JOINs.
- Include `created_at` and `updated_at` timestamps on all tables.
```

---

## Example 3 — C# / .NET service

### Root instructions (`copilot-instructions.md`)

```markdown
# Copilot Instructions

## Language and framework

- Use C# 12 with .NET 8. Enable nullable reference types.
- Use minimal APIs for new endpoints. Do not use controller-based routing.

## Naming

- Follow Microsoft naming guidelines: PascalCase for public members, camelCase for locals.
- Prefix interfaces with `I` and use PascalCase (for example, `IOrderRepository`).

## Architecture

- Use vertical slice architecture. Each feature gets its own folder.
- Use MediatR for command/query separation.

## Error handling

- Use Result<T> pattern for domain operations.
- Map domain errors to HTTP status codes at the API boundary only.
- Never throw exceptions for expected business rule violations.

## Testing

- Use xUnit with FluentAssertions.
- Use Testcontainers for integration tests with real databases.
- Keep unit tests focused on one behavior per test method.
```

---

## Anti-patterns to avoid

### ❌ Too vague

```markdown
Write good code. Follow best practices. Keep things clean.
```

**Why it fails:** Not actionable. Copilot cannot derive specific conventions from this.

### ❌ Too verbose / explanatory

```markdown
When writing TypeScript code, it is generally considered a best practice to use
the `interface` keyword rather than the `type` keyword when defining object shapes.
This is because interfaces support declaration merging and provide better error
messages in many cases. However, there are situations where type aliases are more
appropriate, such as when defining union types or mapped types...
```

**Why it fails:** Wastes context window on explanation instead of giving a directive. Better version: "Prefer `interface` over `type` for object shapes."

### ❌ Duplicated between root and scoped

Root file says: "Use Zod for validation."
Scoped `api.instructions.md` also says: "Use Zod for validation."

**Why it fails:** Redundant instructions dilute context. Put shared conventions in root only.

### ❌ Overly broad glob

```yaml
# GitHub Copilot
applyTo: "**/*"

# Cursor
globs: "**/*"

# Claude Code
paths:
  - "**/*"
```

**Why it fails:** Matches every file — use root instructions (`copilot-instructions.md`), `alwaysApply: true` (Cursor), or `CLAUDE.md` / rule without `paths` (Claude Code) instead.

### ❌ Includes secrets or environment specifics

```markdown
Use API key `sk-abc123...` for the staging environment.
Connect to database at `postgres://admin:password@prod-db:5432`.
```

**Why it fails:** Secrets must never appear in instruction files. Use environment variables and reference them by name only.
