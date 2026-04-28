# EDS Query Patterns

Use these repeatable query patterns when researching EDS through MCP.

## Start with the pattern that fits

| Need | Query shape |
| --- | --- |
| Component props and API | `<ComponentName> props API interface` |
| Usage or composition example | `<ComponentName> usage example how to` |
| Accessibility guidance | `<ComponentName> accessibility ARIA keyboard` |
| Design token | `<purpose> token color spacing typography` |

## Proven examples

- Props: `Button variant disabled onClick props`
- Example: `NativeSelect usage form label controlled`
- Accessibility: `Dialog accessibility focus trap keyboard`
- Token: `interactive primary color token eds`

## One refinement pass only

If the first pass is weak or ambiguous:

1. Add the component name explicitly.
2. Narrow to a specific prop, token, or accessibility concern.
3. Switch from props lookup to usage or accessibility pattern.
4. Stop after the second pass and report uncertainty if the evidence is still weak.

## Evidence checklist

Before using a result in the final answer, capture:

- the source path
- the component or token name
- the minimal excerpt that supports the claim
- whether it is a prop definition, usage example, accessibility note, or design token

Prefer a second source only when it adds missing context, not just volume.
