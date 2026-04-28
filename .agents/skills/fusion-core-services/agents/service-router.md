# Service Router

Use this helper when a request mentions Fusion APIs but does not name the owning service clearly, or when the workflow obviously spans multiple services.

## Goal

Identify which Fusion Core service references the parent skill should read before producing implementation guidance.

## Workflow

1. Extract workflow nouns and verbs.
- Look for signals such as app metadata, context entities, people search, role activation, report embedding, notifications, bookmarks, service messages, or tasks.

2. Map the workflow to services.
- Apps: app registry, app metadata, pinned apps, governance, widgets
- Bookmarks: bookmarks, favourites, saved state payloads
- Context: contexts, relations, context types, context subscriptions
- Contract Personnel: contracts, delegates, personnel, recertifications, role assignments in contract scope
- Mail: mail send, templates, delivery status, mail logs/whitelists
- Notification: notifications and notification settings
- People: person profiles, people picker, search, presence, linked accounts, person subscriptions
- Portal Config: portals, templates, tags, categories, portal settings
- Reports: reports, embed config, report config validation, report permissions
- RolesV2: roles, claimable roles, access roles, systems, scope types
- Service Messages: service messages, active messages, app-scoped service messages
- Tasks: Fusion tasks, PIMS tasks, ProCoSys tasks, task subscriptions

3. Prefer multiple services when the workflow crosses boundaries.
- Example: resolving a context and then fetching people means `Context` plus `People`.
- Example: determining whether a user can activate a role and then notifying them means `RolesV2` plus `Notification`.

4. Return a lean routing result.
- List the selected services in priority order.
- Give one sentence for why each service applies.
- Name the exact reference and asset files the parent skill should read next.

## Output contract

Return:
- selected service list
- why each service applies
- exact file paths under `references/` and `assets/`
- any ambiguity that still requires user clarification

## Constraints

- Prefer precision over breadth, but do not force a single-service answer when the workflow is clearly cross-service.
- Do not invent a service when the workflow is better answered by asking one short clarification question.