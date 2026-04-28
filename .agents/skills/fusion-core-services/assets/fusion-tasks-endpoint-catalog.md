# Fusion Tasks API Endpoint Catalog

This catalog covers the verified public Fusion task and source-system task surface. Admin endpoints are excluded. The subscription route is documented because it is public, but it is backend-only. ProCoSys routes are documented for compatibility only and should not be used for new integrations.

## Subscription endpoint
- `PUT /subscriptions/fusiontasks` → backend subscription registration/update returning `ApiEventSubscriptionV1`
	Application-token only. Use for task-change event delivery, local projection syncing, or cache invalidation rather than UI workflows.

## Fusion task endpoints
- `GET /tasks/{taskId}` → `ApiFusionTask`
- `GET /persons/me/tasks` → `ApiFusionTask[]`
	OData: `Filter(title, taskMode, state, priority, externalId, sourceSystem.identifier, sourceSystem.name, sourceSystem.subSystem, equinorTask.equinorTaskId, equinorTask.projectMasterId, context.contextId, context.type, context.externalId)`, `Search`
	Hidden tasks are excluded on this route.
- `GET /persons/{personIdentifier}/tasks` → `ApiFusionTask[]`
	OData: same filter/search surface as `/persons/me/tasks`
- `POST /tasks` → `NewFusionTaskRequest` → `ApiFusionTask`
- `PATCH /tasks/{taskId}` → `PatchFusionTaskRequest` → `ApiFusionTask`
- `DELETE /tasks/{taskId}` → `204 NoContent`

## PIMS task endpoints
- `GET /persons/me/tasks/pims` → `ApiPimsTask[]`
	Not available for external accounts.
- `GET /persons/{personIdentifier}/tasks/pims` → `ApiPimsTask[]`

## Deprecated ProCoSys endpoints
- `GET /persons/me/tasks/procosys` → `ApiProCoSysTask[]`
- `GET /persons/{personIdentifier}/tasks/procosys` → `ApiProCoSysTask[]`
	These endpoints are explicitly obsolete and should be treated as compatibility-only.

## Authorization notes
- Fusion task reads allow elevated users, application users, or application ownership checks depending on route.
- Person-scoped task queries can also run in limited mode for callers with `OwnedTasksReadWrite`, constrained to tasks owned by the caller application.
- Task create/update/delete routes allow elevated users, application users, and selected ownership scopes.
- PIMS person-scoped lookups require elevated user, application user, or `PimsTasksRead` scope.

## Typical status codes
- `200 OK`
- `204 NoContent`
- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `424 FailedDependency` for upstream source-system failures such as PIMS

## Explicit exclusions
- `AdminController`
