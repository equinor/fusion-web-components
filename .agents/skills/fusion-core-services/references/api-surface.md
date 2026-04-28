# Fusion Core Services API Surface

This skill consolidates the experimental Fusion Core service API guidance into a single installable package.

## How to use this catalog

1. Start with the workflow you need to solve.
2. Identify the owning service or services.
3. Open the matching service reference file.
4. Pull the paired endpoint catalog and model asset only for the services that matter.

## Service overview

- Apps: app registry, app governance, pinned apps, widgets, and app-scoped subscriptions.
  Files: [reference](fusion-apps.md), [endpoint catalog](../assets/fusion-apps-endpoint-catalog.md), [models](../assets/fusion-apps-models.ts)
- Bookmarks: bookmarks, favourites, and state-payload persistence.
  Files: [reference](fusion-bookmarks.md), [endpoint catalog](../assets/fusion-bookmarks-endpoint-catalog.md), [models](../assets/fusion-bookmarks-models.ts)
- Context: contexts, relations, context types, and backend event subscriptions.
  Files: [reference](fusion-context.md), [endpoint catalog](../assets/fusion-context-endpoint-catalog.md), [models](../assets/fusion-context-models.ts)
- Contract Personnel: contracts, personnel, delegates, requests, role assignments, and recertification-adjacent flows.
  Files: [reference](fusion-contract-personnel.md), [endpoint catalog](../assets/fusion-contract-personnel-endpoint-catalog.md), [models](../assets/fusion-contract-personnel-models.ts)
- Mail: send mail, templates, status, whitelist, and log-management workflows.
  Files: [reference](fusion-mail.md), [endpoint catalog](../assets/fusion-mail-endpoint-catalog.md), [models](../assets/fusion-mail-models.ts)
- Notification: notifications and notification settings.
  Files: [reference](fusion-notification.md), [endpoint catalog](../assets/fusion-notification-endpoint-catalog.md), [models](../assets/fusion-notification-models.ts)
- People: person profiles, search, people picker, presence, linked accounts, and backend subscriptions.
  Files: [reference](fusion-people.md), [endpoint catalog](../assets/fusion-people-endpoint-catalog.md), [models](../assets/fusion-people-models.ts)
- Portal Config: portals, templates, categories, tags, and settings.
  Files: [reference](fusion-portal-config.md), [endpoint catalog](../assets/fusion-portal-config-endpoint-catalog.md), [models](../assets/fusion-portal-config-models.ts)
- Reports: reports, embed config, report configuration validation, and report permission checks.
  Files: [reference](fusion-reports.md), [endpoint catalog](../assets/fusion-reports-endpoint-catalog.md), [models](../assets/fusion-reports-models.ts)
- RolesV2: roles, claimable roles, access roles, accounts, systems, and role subscriptions.
  Files: [reference](fusion-roles-v2.md), [endpoint catalog](../assets/fusion-roles-v2-endpoint-catalog.md), [models](../assets/fusion-roles-v2-models.ts)
- Service Messages: collection/item service-message lifecycle and app-scoped service messages.
  Files: [reference](fusion-service-messages.md), [endpoint catalog](../assets/fusion-service-messages-endpoint-catalog.md), [models](../assets/fusion-service-messages-models.ts)
- Tasks: Fusion tasks plus PIMS and ProCoSys task integrations, including backend subscriptions.
  Files: [reference](fusion-tasks.md), [endpoint catalog](../assets/fusion-tasks-endpoint-catalog.md), [models](../assets/fusion-tasks-models.ts)

## Cross-service patterns

- Context plus People: resolve context or relations first, then use People for profile or presence enrichment.
- Apps plus Service Messages: use Apps for app identity/ownership context, then Service Messages for app-scoped notices.
- RolesV2 plus Notification: determine assignment or activation flows in RolesV2, then use Notification for user-facing follow-up.
- Reports plus Context: use report capability checks and context membership together when report access is scoped by context.
- Tasks plus Context or People: use Tasks for task state, then Context or People for related entity and assignee enrichment.

## Capability guidance

- Some services expose public `OPTIONS` or access-probe routes. Those are documented in the service reference and endpoint catalog when verified from source.
- When no stable probe exists, the service reference explains the conservative fallback behavior that clients should use.

## Subscription guidance

- `/subscriptions/...` routes in this skill are backend integration surfaces that require application tokens.
- They return `ApiEventSubscriptionV1` connection details for CloudEvent-style change delivery rather than normal business entities.
- Use them for cache invalidation, projection syncing, and event-driven integrations.