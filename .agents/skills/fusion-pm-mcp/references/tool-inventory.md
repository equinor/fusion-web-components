# Fusion PM MCP tool inventory

Tools, grouped by area (verify against `tools/list`; the live server is the source of truth over any doc, including this one):

- issues: `issue_get`, `issue_parent_get`, `issue_children`, `issue_comments`, `issue_create`, `issue_update`, `issue_close`, `issue_set_parent`, `issue_add_blocker`, `issue_remove_blocker`, `repository_labels`
- milestones: `milestones`, `milestone_get`, `milestone_work_hierarchy_get`
- pull requests: `pull_request_get`, `pull_request_comments`, `pull_request_reviews`, `pull_request_review_get`, `pull_request_review_comments`, `pull_request_review_thread_resolve`, `pull_request_close`
- discussions and comments: `discussions`, `discussion_get`, `discussion_search`, `discussion_create`, `discussion_update`, `discussion_comment_create`, `timeline_comment_get`, `timeline_comment_create`
- artifacts, snapshots, and reports: `artifact_get`, `artifact_get_evidence`, `artifact_get_schema`, `artifact_search`, `artifact_upsert`, `snapshot_get`, `reports`, `report_by_operation`
