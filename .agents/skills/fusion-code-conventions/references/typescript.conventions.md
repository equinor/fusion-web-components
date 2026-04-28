# TypeScript Code Conventions

Conventions for TypeScript across all contexts — Fusion Framework apps, libraries, scripts, and skill tooling.

> **Applicability:** These are org-wide baseline defaults. Repository-level policy (`CONTRIBUTING.md`, ADRs, contributor guides) and tooling configuration (`biome.json`, `tsconfig.json`) take precedence when they explicitly override a rule below. See the skill's **Precedence and applicability** section for the full resolution order.

---

## TSDoc — mandatory for all exports

Every exported function, component, hook, class, and type MUST have TSDoc.

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

**No `I` prefix on interfaces.** `Item`, not `IItem`.

For React-specific naming (components, hooks, event handlers), see `references/react.conventions.md`.

---

## Type system

### Strict mode

TypeScript strict mode is always on. This means:
- `noImplicitAny` — never leave types inferred as `any`.
- `strictNullChecks` — handle `null` and `undefined` explicitly.
- `strictFunctionTypes` — contravariance checks on function parameters.
- `noUncheckedIndexedAccess` — array/object index access returns `T | undefined`.

### No `any`

`any` defeats type safety. It is almost never acceptable.

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

Prefer `unknown` for untyped external inputs. Use `z.infer<typeof Schema>` (Zod) or hand-written type guards to narrow.

### Type assertions (`as`)

Avoid `as` when proper typing is possible. Every `as` is a lie to the compiler.

```typescript
// ❌ Unsafe cast
const item = response.data as Item;

// ✅ Validated typing
function isItem(value: unknown): value is Item {
  return typeof value === 'object' && value !== null && 'id' in value;
}
const item = isItem(response.data) ? response.data : null;
```

When `as` is unavoidable (e.g. DOM APIs, library gaps), add a comment explaining why.

### Non-null assertions (`!`)

Avoid `!` unless the non-null guarantee is obvious from surrounding code. Always add a comment justifying it.

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

- Constrain generics specifically — avoid `T extends any` or `T extends object`.
- Use descriptive names when `T` is ambiguous: `TItem`, `TKey`, `TResponse`.
- Constrain with interfaces when the generic must have a known shape.

```typescript
// ❌ Unconstrained
function getId<T>(item: T): unknown { ... }

// ✅ Constrained
function getId<T extends { id: string }>(item: T): string {
  return item.id;
}
```

### Utility types

Prefer TypeScript utility types over manual type duplication.

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

Always declare explicit return types on exported functions and class methods. On non-exported internal helpers, inferred types are acceptable when the return type is trivially obvious.

```typescript
// ✅ Explicit return on export
export function formatLabel(value: string): string { ... }

// ✅ Inferred acceptable for trivial internal
const double = (n: number) => n * 2;
```

---

## Code style

### Variable declarations

- `const` by default.
- `let` only when reassignment is unavoidable.
- Never `var`.

### Immutable patterns

Prefer `map`, `filter`, `reduce`, `flatMap` over mutable loops that push to arrays.

```typescript
// ❌ Mutable accumulator
const result: string[] = [];
for (const item of items) {
  if (item.active) result.push(item.name);
}

// ✅ Immutable
const result = items.filter((item) => item.active).map((item) => item.name);
```

For complex transforms where the immutable form is unreadable, a `for…of` loop with `const` intermediate bindings is acceptable.

### Single responsibility

Each function, component, and module has one reason to change.

- Functions longer than ~40 lines are candidates for extraction.
- Files longer than ~300 lines are candidates for splitting.
- A module should export one primary concept; helpers and types should support that concept only.

### File organisation

Top-down order within a module:

1. Imports (external → internal → relative, sorted alphabetically within each group)
2. Constants
3. Types and interfaces
4. Helper functions (unexported)
5. Primary export(s)
6. Default export (if any)

### Import style

- Named imports over default imports where possible — they survive refactors better.
- Group imports: external packages → path-aliased internal → relative.
- Do not import unused symbols (lint enforced).
- Avoid barrel re-exports (`index.ts`) that pull in more than necessary — they hurt tree-shaking.

### Readability over cleverness

Write "stupid code" — simple, linear, predictable flows. Prefer early returns and guard clauses over deeply nested conditions.

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

- Always use `async/await` over raw `.then()` chains.
- Never `await` inside a loop when independent — use `Promise.all`.
- Always handle rejection: either `try/catch` or `.catch()`.
- Mark a function `async` only when it contains `await`; otherwise return a plain value or `Promise.resolve()`.

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

- Use specific error subtypes with structured context, not bare `new Error('something failed')`.
- Async errors must be caught and rethrown with additional context to preserve the call chain.
- Define error class hierarchies for distinct failure scenarios (network, validation, permission).
- Log errors at the boundary where recovery is decided, not at every rethrow.

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

Dead code must be removed, not commented out.

- Unused imports — remove (lint enforced).
- Commented-out code blocks — remove; use Git history for recovery.
- Unreachable branches — remove.
- Unused variables/parameters — remove or prefix with `_` when required by a callback signature.

```typescript
// ❌ Commented-out dead code
// const oldValue = computeOld(item);
const value = computeNew(item);

// ✅ Remove it; history is in Git
const value = computeNew(item);
```

