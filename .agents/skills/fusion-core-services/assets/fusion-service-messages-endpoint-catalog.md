# Service Messages API Endpoint Catalog

This catalog covers the verified public service-message surface for collection, item, active-message, and app-scoped routes. Admin-only routes remain excluded.

## Collection endpoints
- `GET /service-messages` → `ApiServiceMessage[]`
	OData: `Filter(relevantPortals)`, `OrderBy(visibility.appliesFrom, visibility.appliesTo, created)`
- `POST /service-messages` → `CreateServiceMessageRequest` → `ApiServiceMessage`
- `OPTIONS /service-messages` → access probe, `204 NoContent`

## Item endpoints
- `GET /service-messages/{messageId}` → `ApiServiceMessage`
- `PATCH /service-messages/{messageId}` → `UpdateServiceMessageRequest` → `ApiServiceMessage`
- `DELETE /service-messages/{messageId}` → `204 NoContent`
- `OPTIONS /service-messages/{messageId}` → access probe, `204 NoContent`

## Active-message endpoints
- `GET /service-messages/active` → `ApiActiveServiceMessage[]`
- `POST /service-messages/active/publish` → `200 OK`

## App-scoped endpoints
- `GET /apps/{appKey}/service-messages` → `ApiServiceMessage[]`
- `POST /apps/{appKey}/service-messages` → `CreateServiceMessageForAppRequest` → `ApiServiceMessage`
- `PATCH /apps/{appKey}/service-messages/{messageId}` → `UpdateServiceMessageForAppRequest` → `ApiServiceMessage`

## Authorization notes
- Collection and item routes allow trusted applications, callers with `ServiceMessagesScopes.Manage`, and in some cases app admins/owners for the affected apps.
- Collection reads can run in limited mode for app admins/owners and are filtered down to messages for apps the caller actually administers.
- App-scoped routes require either manage scope or admin/owner access for the specific app.
- Publish-active routes are more restrictive than reads and require manage scope or trusted application access.

## Typical status codes
- `200 OK`
- `204 NoContent`
- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `424 FailedDependency` when dependent app/profile resolution fails

## Explicit exclusions
- `AdminController` routes
