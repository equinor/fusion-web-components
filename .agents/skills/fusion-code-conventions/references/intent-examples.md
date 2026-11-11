# Intent Examples

## Contents

- [Exported interfaces and public APIs](#exported-interfaces-and-public-apis)
- [Decision gates](#decision-gates)
- [Iterator transforms and pipelines](#iterator-transforms-and-pipelines)
- [Architecture and pattern choices](#architecture-and-pattern-choices)
- [Magic values](#magic-values)
- [Workarounds and escape hatches](#workarounds-and-escape-hatches)
- [Async sequencing decisions](#async-sequencing-decisions)
- [Error handling intent](#error-handling-intent)
- [What counts as a dead comment](#what-counts-as-a-dead-comment)


Worked examples for drafting intent comments; review rules remain in agent instructions.

## Exported interfaces and public APIs

```typescript
// ❌ Undocumented shape — caller has no idea why `reason` is optional
export interface CancellationResult {
  cancelled: boolean;
  reason?: string;
}

// ✅ Intent captured — caller understands the invariant
/**
 * Result of a cancellation attempt.
 *
 * `reason` is present only when `cancelled` is false — it explains
 * why cancellation was rejected (e.g. the item is already processing).
 * When `cancelled` is true, `reason` is always undefined.
 */
export interface CancellationResult {
  cancelled: boolean;
  reason?: string;
}
```

## Decision gates

```typescript
// ❌ Condition reads clearly but the reason is opaque
if (item.lockedBy !== null && item.lockedBy !== currentUser) {
  return false;
}

// ✅ Business rule captured
// Items locked by another user must not be edited — concurrent edits corrupt
// the workflow state. The current user's own lock is always safe to proceed.
if (item.lockedBy !== null && item.lockedBy !== currentUser) {
  return false;
}
```

## Iterator transforms and pipelines

```typescript
// ❌ What is filtered is clear; why is not
const billable = entries.filter((e) => e.type !== 'overhead' && e.approved);

// ✅ Financial rule captured
// Only approved, non-overhead entries are billable — overhead is absorbed
// at department level and must never appear on client invoices
const billable = entries.filter((e) => e.type !== 'overhead' && e.approved);
```

## Architecture and pattern choices

```typescript
// ❌ Pattern is used with no explanation
const state: LoadState = { status: 'idle' };

// ✅ Explains why this pattern was chosen
// Discriminated union over a class hierarchy — this state machine is consumed
// by React render functions which need exhaustive switch narrowing without
// instanceof guards. Adding a new state forces all consumers to handle it.
type LoadState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Item[] }
  | { status: 'error'; error: Error };
```

## Magic values

```typescript
// ❌ Unexplained literal
setTimeout(flush, 250);

// ✅ Origin and rationale captured
// 250 ms debounce matches the minimum human perception gap for keypress feedback
// (below 100 ms feels instant; above 300 ms feels laggy — Nielsen 1993)
const DEBOUNCE_MS = 250;
setTimeout(flush, DEBOUNCE_MS);
```

## Workarounds and escape hatches

```typescript
// ❌ Silent suppression
// biome-ignore lint/suspicious/noExplicitAny
const raw = response as any;

// ✅ Justified
// The vendor SDK types `response` as `any`; a typed wrapper is tracked in #892.
// Safe here because we validate the shape immediately below via `isApiResponse`.
// biome-ignore lint/suspicious/noExplicitAny: vendor SDK gap, see #892
const raw = response as any;
```

## Async sequencing decisions

```typescript
// ❌ Sequential awaits — is this intentional or a performance bug?
const user = await fetchUser(id);
const permissions = await fetchPermissions(id);

// ✅ Intent captured
// Sequential by design — permissions fetch depends on user.tenantId
// which is only known after fetchUser resolves
const user = await fetchUser(id);
const permissions = await fetchPermissions(user.tenantId);
```

## Error handling intent

```typescript
// ❌ Swallowed silently
try { ... } catch { return null; }

// ✅ Reasoning captured
// 404 is expected when the feature flag is not yet provisioned for this tenant;
// return null so the caller renders the default (disabled) state
try { ... } catch (err) {
  if (err instanceof ApiError && err.statusCode === 404) return null;
  throw err;
}
```

## What counts as a dead comment

```typescript
// ❌ Dead — says the same thing as the code
// Filter items
const active = items.filter(...);

// ❌ Dead — restates the name
// UserService class
class UserService { ... }
```
