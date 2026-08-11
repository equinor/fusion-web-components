# TSDoc Checklist

Default TSDoc quality rules when no repository-level standards exist. Repository standards (e.g. `fusion-code-conventions`) take precedence.

## Required tags by export kind

| Export kind | Summary | `@param` | `@returns` | `@template` | `@throws` | `@example` | `@deprecated` |
|---|---|---|---|---|---|---|---|
| Function | Required | All params | Non-void | All generics | Meaningful errors | User-facing APIs | When superseded |
| Hook | Required | All params | Always (describe tuple/object shape) | All generics | Meaningful errors | Always | When superseded |
| Class | Required | Constructor params | N/A | All generics | Constructor errors | Complex classes | When superseded |
| Interface / Type | Required | N/A | N/A | All generics | N/A | Complex shapes | When superseded |
| Enum | Required | N/A | N/A | N/A | N/A | Non-obvious values | When superseded |
| Constant | Required | N/A | N/A | N/A | N/A | Non-obvious usage | When superseded |

## Summary line rules

Most important part of TSDoc comment:

1. **Purpose** — why does this exist? What problem does it solve?
2. **Be specific** — "Formats a time range for booking calendars" > "Formats time"
3. **No name-echo** — never restate the export name
4. **Lead with outcome** — what does caller get or what effect occurs?

### Examples

```typescript
// ❌ Name-echo
/** Creates a user. */
export function createUser(...)

// ✅ Purpose-driven
/** Provisions a new user account with default permissions and sends the welcome email. */
export function createUser(...)

// ❌ Vague
/** A hook for subscriptions. */
export function useSubscription(...)

// ✅ Specific
/** Subscribes to real-time updates for a specific resource and re-renders when data changes. */
export function useSubscription(...)
```

## `@param` rules

- Describe what the parameter **controls or represents** in domain terms
- Do not restate the TypeScript type
- Include valid ranges, defaults, or constraints when relevant
- Use `@param name -` syntax (JSDoc-style dash separator)

```typescript
// ❌ Type-echo
/** @param id - string */

// ✅ Domain description
/** @param id - Unique identifier of the booking to cancel. Must be a valid UUID. */
```

## `@returns` rules

- Describe what the caller **receives** and any invariants
- For promises, describe the resolved value
- For hooks, describe the full return shape (tuple members or object properties)

```typescript
// ❌ Vague
/** @returns The result. */

// ✅ Specific
/** @returns The cancelled booking with updated status, or null if the booking was already cancelled. */
```

## `@template` rules

- Explain what the generic **represents in domain terms**, not just "the type parameter"

```typescript
// ❌ Generic
/** @template T - The type. */

// ✅ Domain-grounded
/** @template TResponse - Shape of the API response payload after deserialization. */
```

## `@throws` rules

- Document error paths callers should handle
- Include the error type when known
- Skip for impossible or framework-internal errors

```typescript
/** @throws {RangeError} When endDate is before startDate. */
/** @throws {AuthenticationError} When the session token has expired. */
```

## `@example` rules

- Required for all user-facing and non-trivial APIs
- Use realistic variable names and scenarios
- Show the import if usage context is not obvious
- Minimal but complete — copy-paste and run

```typescript
/**
 * @example
 * ```ts
 * import { formatTimeRange } from '@equinor/fusion-dates';
 *
 * const display = formatTimeRange('2026-03-17T09:00:00Z', '2026-03-17T10:30:00Z');
 * // => "09:00 – 10:30"
 * ```
 */
```

## Anti-patterns to flag

| Pattern | Problem | Fix |
|---|---|---|
| `/** Gets the value. */ getValue()` | Name-echo | Explain what value and why it is needed |
| `@param id - string` | Type-echo | Describe domain meaning |
| `/** Utility function. */` | Vacuous | Explain what utility and for whom |
| Empty summary with only tags | Missing context | Add a purpose-driven summary line |
| `@returns void` on a void function | Noise | Remove — void is self-evident |
| `@example` with `foo`/`bar` variables | Not realistic | Use domain-appropriate names |
