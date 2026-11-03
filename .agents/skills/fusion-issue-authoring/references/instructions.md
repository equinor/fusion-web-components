# Task and relationship checks

## Task mode

- Small, single-purpose tasks preferred
- Broad requests: suggest checklist first
- Bulk creation: include dependency order and blockers
- Issue type `Task` for all task decomposition

## Relationships

- Sub-issues for decomposition under parent objective
- Sub-issue ordering = prerequisites
- Stop and fix contradictory links before mutation
- Sub-issues are the only list of children; no checklist or list of children in the parent body or a parent comment

Quick check:
1. Start now? If no → later in sub-issue order, note blocker
2. Part of parent objective? If yes → add as sub-issue
3. Contradiction? If yes → correct before mutation
