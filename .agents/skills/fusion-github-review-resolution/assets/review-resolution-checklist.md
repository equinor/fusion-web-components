# Review Resolution Checklist

Use this checklist while processing unresolved review comments on a pull request.

## Quick workflow

- [ ] Gather unresolved threads and map context
- [ ] Capture targeted unresolved-thread baseline
- [ ] Research and understand each comment
- [ ] Classify each comment (valid, partial, incorrect/outdated, uncertain)
- [ ] Apply focused fixes per comment
- [ ] Run validation checks
- [ ] Push all commits once
- [ ] Reply and resolve each thread
- [ ] Verify no unresolved threads remain
- [ ] Request re-review (optional)

## Context

| Field | Value |
|-------|-------|
| Repository | |
| Pull request # | |
| Review ID (optional) | |
| Linked issue (optional) | |
| Base branch | |
| Working branch/worktree | |

## Validation commands

**Targeted checks** (run early, per-fix):
```
(paste commands here)
```

**Required full checks** (run before push):
```
(paste commands here)
```

## Comment tracking

> **Note:** Add more rows as needed. Each row = one review thread to resolve.

| Thread ID | File | Line(s) | Summary of feedback | Research notes | Disposition | Fix summary / rationale | Commit hash | Reply posted | Resolved |
|-----------|------|---------|---------------------|----------------|-------------|-------------------------|-------------|--------------|----------|
|           |      |         |                     |                |             |                         |             | ☐            | ☐        |
|           |      |         |                     |                |             |                         |             | ☐            | ☐        |
|           |      |         |                     |                |             |                         |             | ☐            | ☐        |

## Pre-mutation checks

- [ ] Baseline unresolved thread count captured
- [ ] Each targeted thread checked for existing agent replies
- [ ] Any uncertain comments escalated to the user before reply/resolve
- [ ] Reply text drafted once per thread before mutation, in the shape under [Reply templates](#reply-templates)
- [ ] Any failed/uncertain mutation attempts re-checked before retrying

## Reply templates

Use [Fixed](replies/fixed.md.hbs) or [Declined](replies/declined.md.hbs).
Read the `.hbs` slot header, `assets/partials/agent-content/README.md`, and
every named partial before filling; no renderer ships with the skill.
Fill the banner from runtime metadata; never guess the model or effort.
Keep visible prose to three sentences or fewer; omit the optional Evidence
block when empty. Shared References and evidence stays last.

## Pre-push checklist

- [ ] Every tracked comment has a corresponding fix
- [ ] All fixes run and pass targeted checks
- [ ] Required full repository checks complete and pass
- [ ] Each fix has a commit with clear message
- [ ] Branch ready to push (no uncommitted changes)

## Post-push / reply + resolve checklist

- [ ] Every comment has a reply with commit reference(s)
- [ ] Declined comments have evidence-based rationale replies
- [ ] Every reply is followed immediately by thread resolution
- [ ] No duplicate agent replies were posted during this run
- [ ] No unresolved threads remain (verify with GraphQL query)
- [ ] Any outdated threads addressed or documented

## Final summary

**Processed:** ___ comments / ___ threads

**Commits created:** 

**Any remaining blockers:**
