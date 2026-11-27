# Publish and repair handoff

Read only within host-authorized publication/repair scope. Interactive: explicit publication confirmation unless already explicitly authorized. Automated: separately authorized task scope; mode or silence grants no authority. Preserve assumption/DA/coverage gates; host owns tools and credentials.

9. Hand off authorized publication
   - Interactive: Require explicit confirmation in the same turn unless this publication was already explicitly authorized. Automated: verify separately authorized host publication scope before writes.
   - Stop if unresolved assumptions remain.
   - Route publication through `fusion-issue-authoring` using host adapter or inline instructions.
   - Pass required context to `fusion-issue-authoring`: `owner`, `repo`, parent story reference, ordered task drafts, labels/assignee intent, and dependency ordering.
   - Pass no milestone: tasks don't get one, even when the story or Feature has one (see the milestone gate in `fusion-issue-authoring`).
   - Use available host-approved tools; MCP is optional, GraphQL fallback needs host authority.
   - The orchestrator's session-cache rules apply to all delegated calls: labels, assignee candidates, and issue types are fetched once per session and reused across all task issues in the batch.
   - Link tasks to the story as sub-issues and let that list be the record. Don't add a checklist of the tasks to the story body or post a parent comment listing them.
   - Budget awareness: a task-planning publish of N tasks costs ~N issue-write mutations + optional sub-issue link mutations. If N > 5, warn the user about rate-limit risk and offer to publish in batches.
   - Do not call MCP write tools directly from this skill in publish mode.
   - Hard fail publish mode if delegated execution returns unresolved item-level failures.

10. Repair mode for already-created tasks
   - If tasks were created but are missing `Issue Type` or parent linkage, delegate repair to `fusion-issue-authoring` within host-authorized scope, inline when no adapter exists.
   - Provide per-issue repair intent (`set type=Task`, add missing parent links, preserve order) and require verification results from the delegated run.
   - Repair mode must be idempotent: skip already-correct issues and fix only missing metadata.
   - Run post-flight verification after repairs and return actionable failures.
