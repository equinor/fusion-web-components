---
name: fusion-core-services
description: 'Guides integrations across Fusion Core service APIs from a single installable skill. USE FOR: service discovery across apps, people, context, roles, notifications, reports, tasks, and other Fusion Core APIs; cross-service integration planning; choosing the right endpoint/model guidance for a workflow. DO NOT USE FOR: modifying Fusion backend source code, non-Fusion APIs, or generic cloud architecture work without a Fusion service integration target.'
license: MIT
metadata:
  version: "0.0.1"
  status: experimental
  owner: "@equinor/fusion-core"
  tags:
    - fusion
    - api
    - core-services
    - multi-service
    - experimental
---

# Fusion Core Services

## When to use

Use this skill when the task involves one or more Fusion Core service APIs and the agent needs to identify the right service guidance without requiring separate skill installs.

Typical triggers:
- implement a Fusion API client
- wire a Fusion backend service integration
- figure out which Fusion Core service owns a workflow
- solve a cross-service task such as context plus people, roles plus notifications, or apps plus service messages

## When not to use

Do not use this skill for:
- modifying code inside `fusion-core-services`
- non-Fusion APIs or generic Microsoft Graph / Power BI work with no Fusion service layer involved
- standalone product workflows already covered by another dedicated skill outside Fusion Core services

## Required inputs

- target workflow or user goal
- target consumer shape (`react`, `typescript client`, `csharp httpclient`, `backend service`, or other)
- known service hints, if any
- versioning or authorization expectations when relevant

## Instructions

1. Scope the request first.
- Identify whether the workflow touches one service or multiple services.
- If the service is ambiguous, use `agents/service-router.md` to map the workflow to likely services before producing implementation guidance.

2. Read only the relevant service references.
- Start with [Combined API surface](references/api-surface.md).
- Then open the matching per-service reference file.
- Pull in the endpoint catalog and model asset for only the services that materially affect the answer.

3. Preserve source-grounded guidance.
- Prefer controller-backed endpoint and model notes already captured in the bundled references.
- Call out any route or model area that still requires direct source confirmation before shipping.

4. Handle capabilities explicitly.
- If a service exposes `OPTIONS` or other access-probe routes, use them to drive capability-aware UI or mutation logic.
- If a service does not expose stable probes, document conservative client behavior and treat `403 Forbidden` as the fallback capability signal.

5. Treat subscriptions as backend-only unless the reference says otherwise.
- The `/subscriptions/...` routes in this skill are for application-token event registration and CloudEvent-style change handling, not normal frontend CRUD flows.

6. Return consumer-ready guidance.
- For frontend consumers, return TypeScript-friendly DTOs and a minimal client/hook pattern.
- For .NET consumers, return a typed `HttpClient` plan plus DTO record suggestions.
- For cross-service tasks, explain the service sequence and data handoff between services.

## Service catalog

- Apps: [reference](references/fusion-apps.md), [endpoint catalog](assets/fusion-apps-endpoint-catalog.md), [models](assets/fusion-apps-models.ts)
- Bookmarks: [reference](references/fusion-bookmarks.md), [endpoint catalog](assets/fusion-bookmarks-endpoint-catalog.md), [models](assets/fusion-bookmarks-models.ts)
- Context: [reference](references/fusion-context.md), [endpoint catalog](assets/fusion-context-endpoint-catalog.md), [models](assets/fusion-context-models.ts)
- Contract Personnel: [reference](references/fusion-contract-personnel.md), [endpoint catalog](assets/fusion-contract-personnel-endpoint-catalog.md), [models](assets/fusion-contract-personnel-models.ts)
- Mail: [reference](references/fusion-mail.md), [endpoint catalog](assets/fusion-mail-endpoint-catalog.md), [models](assets/fusion-mail-models.ts)
- Notification: [reference](references/fusion-notification.md), [endpoint catalog](assets/fusion-notification-endpoint-catalog.md), [models](assets/fusion-notification-models.ts)
- People: [reference](references/fusion-people.md), [endpoint catalog](assets/fusion-people-endpoint-catalog.md), [models](assets/fusion-people-models.ts)
- Portal Config: [reference](references/fusion-portal-config.md), [endpoint catalog](assets/fusion-portal-config-endpoint-catalog.md), [models](assets/fusion-portal-config-models.ts)
- Reports: [reference](references/fusion-reports.md), [endpoint catalog](assets/fusion-reports-endpoint-catalog.md), [models](assets/fusion-reports-models.ts)
- RolesV2: [reference](references/fusion-roles-v2.md), [endpoint catalog](assets/fusion-roles-v2-endpoint-catalog.md), [models](assets/fusion-roles-v2-models.ts)
- Service Messages: [reference](references/fusion-service-messages.md), [endpoint catalog](assets/fusion-service-messages-endpoint-catalog.md), [models](assets/fusion-service-messages-models.ts)
- Tasks: [reference](references/fusion-tasks.md), [endpoint catalog](assets/fusion-tasks-endpoint-catalog.md), [models](assets/fusion-tasks-models.ts)

## Expected output

Return headings in this order:
1. Scope check
2. Service selection
3. Endpoint mapping
4. Model mapping
5. Consumer implementation plan
6. Integration code sketch
7. Validation and test notes
8. Risks and assumptions

## Safety & constraints

Never:
- invent service ownership, routes, or DTO fields
- answer from generic SaaS/API assumptions when the bundled Fusion references are specific
- treat backend subscription routes as normal frontend interaction flows

Always:
- keep cross-service reasoning explicit when more than one service is involved
- call out capability-probe behavior when the service exposes `OPTIONS`
- prefer the narrowest set of service references needed for the user’s workflow