# TSDoc Checklist

Built-in defaults for TSDoc quality when the target repository does not provide its own documentation standards. Repository-level standards (for example `fusion-code-conventions`) take precedence when available.

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

The summary line is the most important part of any TSDoc comment. It must:

1. **Explain purpose** — why does this export exist? What problem does it solve?
2. **Be specific** — "Formats a time range for display in booking calendars" is better than "Formats time"
3. **Avoid name-echo** — never restate the function/type name as the summary
4. **Lead with the outcome** — what does the caller get or what effect does it have?

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

- Document error paths that callers should handle
- Include the error type when known
- Skip for impossible or framework-internal errors

```typescript
/** @throws {RangeError} When endDate is before startDate. */
/** @throws {AuthenticationError} When the session token has expired. */
```

## `@example` rules

- Required for all user-facing and non-trivial APIs
- Use realistic variable names and scenarios
- Show the import if the usage context is not obvious
- Keep examples minimal but complete — a reader should be able to copy-paste and run

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
