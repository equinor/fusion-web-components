# Context API Endpoint Catalog

This catalog covers the verified `Fusion.Services.Context` HTTP surface, including the standard context/relation CRUD routes and the shared event-subscription entry point used by application callers.

## Context routes
- `GET /contexts`
	- List contexts.
	- Supports OData `$filter` on `id`, `title`, `externalId`, `type`, and `value.*`.
	- Supports OData `$search`.
	- Optional query parameter: `includeDeleted`.
- `GET /contexts/{id}`
	- Fetch one context by id.
	- Honors the force/no-cache header behavior used across Fusion services.
- `POST /contexts`
	- Create a new context from `NewContextRequest`.
- `PUT /contexts/{id}`
	- Update an existing context from `UpdateContextRequest`.
	- Optional query parameter: `includeDeleted`.
- `DELETE /contexts/{id}`
	- Soft-delete a context and remove its relations in the same transaction.

## Relation routes
- `GET /relations`
	- List relations globally.
	- Supports OData `$filter` on `type` and `source`.
- `GET /contexts/{id}/relations`
	- List relations for a specific context.
	- Supports OData `$filter` on `type`, `externalId`, `id`, `isActive`, `title`, and `value.*`.
- `PUT /contexts/{parentId}/relations/{targetId}`
	- Create or update a relation using `ContextRelationRequest`.
- `DELETE /contexts/{parentId}/relations/{targetId}`
	- Delete the relation in both directions inside one transaction.

## Type and subscription routes
- `GET /contexts/types`
	- List known context types as `ApiContextTypeDetails[]`.
- `PUT /subscriptions/contexts`
	- Renew or create a context-event subscription for application callers.
	- Backend integration only; requires an application token.
	- Returns `ApiEventSubscriptionV1` connection details for CloudEvent-style event delivery rather than context payloads.
	- Uses shared subscription contracts from the `Fusion.Events` package rather than service-local request/view-model files.

## Operational/admin routes
- `GET /admin/contexts/types/{sourceType}/relations/types/{targetType}/missing`
	- Admin diagnostic route for contexts that might be missing relations.
- `GET /admin/cache/context/{identifier}`
	- Cache inspection endpoint.
- `POST /admin/cache/context/{identifier}/reset`
	- Cache reset endpoint.

## Authorization notes
- Read endpoints run behind the standard Fusion auth pipeline even where controller methods do not declare explicit policy attributes.
- Create, update, delete, and relation-mutation routes require development-environment, elevated-user, or application-user authorization.
- `PUT /subscriptions/contexts` only allows application callers.

## Typical status codes
- `200 OK` for successful reads, updates, relation mutations, and subscription renewal.
- `204 NoContent` for successful context deletion.
- `400 BadRequest` for invalid ids, relation payloads, or unsupported subscription types.
- `401 Unauthorized`
- `403 Forbidden` when caller authorization fails.
- `404 NotFound` for missing contexts.
- `409 Conflict` for duplicate contexts or duplicate relations.
- `424 FailedDependency` when relation creation references missing dependency data.

## Notes
- The service-local `assets/models.ts` file covers the context-specific entity and request DTOs. Subscription payloads are shared cross-service contracts, so they are best treated as external package types rather than redefined locally without source ownership.
