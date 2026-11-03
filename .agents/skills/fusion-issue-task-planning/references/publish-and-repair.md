# Publish and repair handoff

Read only when publishing approved task drafts or repairing existing tasks.

9. Publish only after explicit confirmation
   - Require explicit confirmation in the same turn.
   - Stop if unresolved assumptions remain.
   - Delegate publish execution to `fusion-issue-authoring` and prefer sub-agent invocation for task issue creation/update/linking.
   - Pass required context to `fusion-issue-authoring`: `owner`, `repo`, parent story reference, ordered task drafts, labels/assignee intent, and dependency ordering.
   - Pass no milestone: tasks don't get one, even when the story or Feature has one (see the milestone gate in `fusion-issue-authoring`).
   - Require `fusion-issue-authoring` to keep MCP-first behavior and apply GraphQL fallback only when MCP write coverage is unavailable.
   - The orchestrator's session-cache rules apply to all delegated calls: labels, assignee candidates, and issue types are fetched once per session and reused across all task issues in the batch.
   - Link tasks to the story as sub-issues and let that list be the record. Don't add a checklist of the tasks to the story body or post a parent comment listing them.
   - Budget awareness: a task-planning publish of N tasks costs ~N issue-write mutations + optional sub-issue link mutations. If N > 5, warn the user about rate-limit risk and offer to publish in batches.
   - Do not call MCP write tools directly from this skill in publish mode.
   - Hard fail publish mode if delegated execution returns unresolved item-level failures.

10. Repair mode for already-created tasks
   - If tasks were created but are missing `Issue Type` or parent linkage, delegate repair to `fusion-issue-authoring` and prefer sub-agent invocation.
   - Provide per-issue repair intent (`set type=Task`, add missing parent links, preserve order) and require verification results from the delegated run.
   - Repair mode must be idempotent: skip already-correct issues and fix only missing metadata.
   - Run post-flight verification after repairs and return actionable failures.
