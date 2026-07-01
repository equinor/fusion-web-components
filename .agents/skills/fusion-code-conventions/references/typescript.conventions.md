# TypeScript Code Conventions

TypeScript conventions: Fusion Framework apps, libraries, scripts, skill tooling.

> **Applicability:** Org-wide baseline. Repo policy (`CONTRIBUTING.md`, ADRs) and tooling (`biome.json`, `tsconfig.json`) take precedence on explicit override. See skill **Precedence and applicability** for resolution order.

---

## TSDoc — mandatory for all exports

All exported functions, components, hooks, classes, types — TSDoc required.

### Required tags

| Tag | Required when |
|---|---|
| Summary (first line) | Always — explain intent and *why*, not *what* |
| `@param` | Every parameter |
| `@returns` | Every non-void function |
| `@template` | Every generic type parameter |
| `@throws` | Meaningful error paths |
| `@example` | User-facing and non-trivial public APIs |
| `@deprecated` | When superseded — include the replacement |

### Good example

```typescript
/**
 * Formats a time range into a human-readable string.
 *
 * Combines start and end times, showing only the time portion
 * for same-day ranges to reduce visual noise.
 *
 * @param startTime - ISO 8601 start timestamp.
 * @param endTime - ISO 8601 end timestamp.
 * @returns A formatted time range string such as `"09:00 – 10:30"`.
 * @throws {RangeError} When `endTime` is before `startTime`.
 *
 * @example
 * ```ts
 * formatTimeRange('2026-03-17T09:00:00Z', '2026-03-17T10:30:00Z');
 * // => "09:00 – 10:30"
 * ```
 */
export const formatTimeRange = (startTime: string, endTime: string): string => {
  // ...
};
```

### Anti-patterns

```typescript
// ❌ Restates the function name
/** formatTimeRange formats a time range. */

// ❌ Restates the type
/** @param startTime - string */

// ❌ Empty summary
/** @param startTime - ISO 8601 start timestamp. */
```

---

## Naming conventions

| Kind | Convention | Example |
|---|---|---|
| Default file | kebab-case | `item-service.ts`, `load-state.ts` |
| Class file | PascalCase | `ItemService.ts` |
| Interface file | `<class-file>.interface.ts` | `ItemService.interface.ts` |
| Class | PascalCase | `ItemService` |
| Interface | PascalCase, no `I` prefix | `Item`, `ApiResponse` |
| Type alias | PascalCase | `ItemStatus` |
| Enum | PascalCase | `LoadState` |
| Enum member | PascalCase | `LoadState.Idle` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_ITEMS_PER_PAGE` |
| Variables | camelCase | `filteredItems` |
| Functions | camelCase | `formatTimeSlot` |
| Generic type parameter | Single uppercase letter or descriptive PascalCase | `T`, `TItem`, `TResponse` |

**No `I` prefix on interfaces.** `Item`, not `IItem`. React naming: see `references/react.conventions.md`.

---

## Type system

### Strict mode

Strict mode is always on:
- `noImplicitAny` — never leave types inferred as `any`
- `strictNullChecks` — handle `null` and `undefined` explicitly
- `strictFunctionTypes` — contravariance checks on function parameters
- `noUncheckedIndexedAccess` — array/object index access returns `T | undefined`

### No `any`

Never `any` — defeats type safety.

```typescript
// ❌ Any
const process = (data: any) => data.value;

// ✅ Unknown + narrowing
const process = (data: unknown): string => {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return String((data as { value: unknown }).value);
  }
  throw new TypeError('Unexpected data shape');
};
```

Use `unknown` for untyped external inputs. Narrow with `z.infer<typeof Schema>` (Zod) or type guards.

### Type assertions (`as`)

Avoid `as` — lies to compiler.

```typescript
// ❌ Unsafe cast
const item = response.data as Item;

// ✅ Validated typing
function isItem(value: unknown): value is Item {
  return typeof value === 'object' && value !== null && 'id' in value;
}
const item = isItem(response.data) ? response.data : null;
```

When `as` unavoidable (e.g. DOM APIs, library gaps), comment why.

### Non-null assertions (`!`)

Avoid `!`; justify with comment when unavoidable.

```typescript
// ❌ Silent assumption
const el = document.getElementById('root')!;

// ✅ Explicit guard
const el = document.getElementById('root');
if (!el) throw new Error('Root element not found in DOM');
```

### Discriminated unions

Prefer discriminated unions over type assertions for runtime narrowing.

```typescript
type LoadState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Item[] }
  | { status: 'error'; error: Error };

function render(state: LoadState) {
  switch (state.status) {
    case 'success':
      return state.data; // narrowed — no assertion needed
    case 'error':
      return state.error;
    // ...
  }
}
```

### Generics

- Constrain specifically — avoid `T extends any` or `T extends object`
- Descriptive names when `T` ambiguous: `TItem`, `TKey`, `TResponse`
- Constrain with interfaces when generic needs known shape

```typescript
// ❌ Unconstrained
function getId<T>(item: T): unknown { ... }

// ✅ Constrained
function getId<T extends { id: string }>(item: T): string {
  return item.id;
}
```

### Utility types

Prefer utility types over manual duplication.

| Need | Use |
|---|---|
| All fields optional | `Partial<T>` |
| All fields required | `Required<T>` |
| Read-only fields | `Readonly<T>` |
| Subset of fields | `Pick<T, 'a' \| 'b'>` |
| Exclude fields | `Omit<T, 'internal'>` |
| Function return type | `ReturnType<typeof fn>` |
| Awaited promise type | `Awaited<Promise<T>>` |
| Union of object values | `T[keyof T]` |

### Explicit return types

Explicit return types on all exported functions and methods. Unexported helpers: inferred OK when trivially obvious.

```typescript
// ✅ Explicit return on export
export function formatLabel(value: string): string { ... }

// ✅ Inferred acceptable for trivial internal
const double = (n: number) => n * 2;
```

---

## Code style

### Variable declarations

- `const` by default
- `let` only when reassignment is unavoidable
- Never `var`

### Immutable patterns

Prefer `map`/`filter`/`reduce`/`flatMap` over mutable push loops.

```typescript
// ❌ Mutable accumulator
const result: string[] = [];
for (const item of items) {
  if (item.active) result.push(item.name);
}

// ✅ Immutable
const result = items.filter((item) => item.active).map((item) => item.name);
```

Complex transforms: `for…of` with `const` bindings is fine when immutable form is unreadable.

### Single responsibility

One reason to change per function, component, module.

- Functions >~40 lines: extract
- Files >~300 lines: split
- Module exports one primary concept; helpers/types support it only

### File organisation

Top-down within module:

1. Imports (external → internal → relative, alphabetical within each group)
2. Constants
3. Types and interfaces
4. Helper functions (unexported)
5. Primary export(s)
6. Default export (if any)

### Import style

- Named imports — survive refactors
- Group: external → path-aliased internal → relative
- No unused symbols (lint enforced)
- No barrel re-exports (`index.ts`) — hurts tree-shaking

### Readability over cleverness

Simple, linear, predictable code. Early returns and guard clauses over nested conditions.

```typescript
// ❌ Nested pyramid
function process(item: Item | null) {
  if (item) {
    if (item.active) {
      if (item.value > 0) {
        return item.value * 2;
      }
    }
  }
  return 0;
}

// ✅ Guard clauses
function process(item: Item | null): number {
  if (!item) return 0;
  if (!item.active) return 0;
  if (item.value <= 0) return 0;
  return item.value * 2;
}
```

---

## Inline comments

Add intent comments (*why*, not *what*) for:

- Iterator transforms where the business reason is non-obvious
- Decision gates (`if`/`switch`) with non-obvious conditions
- RxJS operator chains and subscriptions
- Complex heuristics, thresholds, or workarounds
- Any `as`, `!`, or `// biome-ignore` that needs justification

```typescript
// Exclude inactive items — the grid must never show retired entries (PLAT-1234)
const activeItems = items.filter((item) => item.status !== 'inactive');
```

```typescript
// ❌ Restates the syntax — adds no value
// Filter items
const active = items.filter((item) => item.status !== 'inactive');
```

---

## Async / await

- `async/await` over raw `.then()` chains
- No `await` in loops when independent — use `Promise.all`
- Always handle rejection: `try/catch` or `.catch()`
- `async` only when function contains `await`; otherwise return plain value

```typescript
// ❌ Sequential awaits for independent calls
const a = await fetchA();
const b = await fetchB();

// ✅ Parallel
const [a, b] = await Promise.all([fetchA(), fetchB()]);
```

```typescript
// ❌ Async without await
async function getLabel(): Promise<string> {
  return 'hello'; // unnecessary async
}

// ✅
function getLabel(): string {
  return 'hello';
}
```

---

## Error handling

- Specific error subtypes with structured context, not bare `new Error()`.
- Catch async errors, rethrow with context.
- Error class hierarchies for distinct failures (network, validation, permission).
- Log at boundary where recovery decided, not at every rethrow.

```typescript
class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly endpoint: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchItem(id: string): Promise<Item> {
  try {
    const response = await client.get(`/items/${id}`);
    if (!response.ok) {
      throw new ApiError(`Failed to fetch item`, response.status, `/items/${id}`);
    }
    return response.json() as Promise<Item>;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(`Unexpected error fetching item ${id}`, 500, `/items/${id}`);
  }
}
```

---

## Dead code policy

Remove dead code; don't comment it out.

- Unused imports: remove (lint enforced)
- Commented-out blocks: remove; use Git history
- Unreachable branches: remove
- Unused variables/params: remove or prefix `_` when required by callback signature

```typescript
// ❌ Commented-out dead code
// const oldValue = computeOld(item);
const value = computeNew(item);

// ✅ Remove it; history is in Git
const value = computeNew(item);
```

