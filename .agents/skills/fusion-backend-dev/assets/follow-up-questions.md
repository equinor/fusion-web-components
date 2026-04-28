# Follow-Up Questions

Use these when the user's request is ambiguous or missing key context.

## Integration Scenario

**When**: User asks about using a backend service but doesn't specify the context

```
"I need to call the People API"
→ Are you building a:
  - Frontend app that displays person data?
  - Backend service that needs person information?
  - External integration consuming Fusion APIs?
  - Batch/scheduled job syncing data?
```

**When**: User asks for patterns but doesn't specify scope

```
"Show me error handling patterns"
→ Are you:
  - Building a new backend service and want to see how Fusion does it?
  - Calling another service and want to handle failures?
  - Building an external integration?
  - Something else?
```

## Scope Clarification

**When**: User mentions an operation without detail

```
"How do I create a context?"
→ Are you:
  - A backend developer adding a new endpoint?
  - A frontend developer calling a create API?
  - An architect designing the workflow?
```

**When**: User asks about data without context

```
"How is Person data structured?"
→ Do you need:
  - The API contract (what fields the API returns)?
  - The database schema (internal storage)?
  - How data flows between systems?
  - Authorization/access rules?
```

## Technical Constraints

**When**: User asks for implementation without constraints

```
"How should I cache this data?"
→ Consider:
  - How often does data change? (Invalidation frequency)
  - Is consistency critical? (Real-time vs eventual)
  - What's your storage? (In-memory, Redis, database)
  - Scale? (Few calls/day vs thousands/minute)
```

**When**: User asks about integration without specifying direction

```
"Integrate with external system"
→ Direction matters:
  - Does Fusion call the external system?
  - Does external system call Fusion?
  - Both (bidirectional)?
```

## Example Scenarios

Pick the scenario that matches:

- **Frontend app consuming Fusion APIs**: Use `api-contracts.md`, `authorization-patterns.md`, `validation-patterns.md`
- **Backend service calling another Fusion service**: Use `integration-patterns.md`, `async-patterns.md`
- **External system integration**: Use `integration-patterns.md`, `async-patterns.md`, `api-contracts.md`
- **Learning handler patterns**: Use `cqrs-reference.md`
- **Understanding real-time updates**: Use `async-patterns.md`
- **Debugging authorization**: Use `authorization-patterns.md`
- **Error recovery**: Use `validation-patterns.md`
