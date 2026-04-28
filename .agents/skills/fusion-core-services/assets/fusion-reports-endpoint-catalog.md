# Reports API Endpoint Catalog

This catalog covers the verified public report, config, token, markdown-content, group-query, and schema surface. Explicit admin helper routes remain excluded.

## Report query endpoints
- `GET /reports` → `ApiReport[]`
	OData: `Filter(title, ownedBy, publishedBy, isEmbedOnly, globalIdentifier)`, `Search`, `Top`
- `GET /reports/{id}` → `ApiReport`
- `OPTIONS /reports/{id}` → access probe, `204 NoContent`
- `OPTIONS /reports/{id}/contexts/{contextExternalId}/contexttypes/{contextType}/checkaccess` → advanced context-membership access probe, `204 NoContent`
- `GET /reports/{id}/rlsrequirements` → markdown/string response
- `GET /reports/{id}/auditlog` → `ApiAuditLog`
	OData: `Expand(requests)`

## Report config and token endpoints
- `GET /reports/{id}/config` → `ApiConfig`
- `GET /reports/{id}/config/embedinfo` → `ApiEmbedConfig`
- `GET /reports/{id}/token` → `ApiAccessToken`
- `POST /reports/config/validate` → `ValidateConfigRequest` → `ApiConfigValidation`
- `PUT /reports/{id}/config` → `UpdateConfigRequest` → `ApiConfigValidation`
- `PUT /reports/{id}/config/generic` → generic JSON body → `GenericConfig`

## Report markdown content endpoints
- `GET /reports/{id}/description/content` → markdown/string response
- `GET /reports/{id}/accessdescription/content` → markdown/string response
- `GET /reports/{id}/technicaldocument/content` → markdown/string response
- `GET /reports/{id}/securitypermission/content` → markdown/string response
- `PUT /reports/{id}/description/content` → `UpdateMarkdownRequest` → markdown/string response
- `PUT /reports/{id}/accessdescription/content` → `UpdateMarkdownRequest` → markdown/string response
- `PUT /reports/{id}/technicaldocument/content` → `UpdateMarkdownRequest` → markdown/string response
- `PUT /reports/{id}/securitypermission/content` → `UpdateMarkdownRequest` → markdown/string response

## Report lifecycle endpoints
- `POST /reports` → `CreateReportRequest` → `ApiReport`
- `PUT /reports/{id}` → `UpdateReportRequest` → `ApiReport`
- `PUT /reports/{id}/publish` → `true`
- `PUT /reports/{id}/unpublish` → `true`
- `DELETE /reports/{id}` → `200 OK`

## Group and schema endpoints
- `GET /groups/query` → `ApiGroup[]`
	OData: `Search`
- `GET /public/schemas/{type}` → JSON schema document
	Verified schema key: `rls-configuration.json`

## Authorization notes
- Main report routes require the reports API policy and often an additional ownership, admin-role, or embed-authorization check.
- Read access to a report is not identical to CRUD access; `OPTIONS` routes expose the effective capabilities.
- Token issuance performs embed validation and may fail on Power BI or RLS dependency issues.
- `groups/query` allows employees, consultants, elevated users, application users, and callers with `Fusion.Reports.Groups.Read`.
- `/public/**` schema routes are anonymous.

## Typical status codes
- `200 OK`
- `201 Created`
- `204 NoContent` for capability checks or empty markdown content
- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `409 Conflict`
- `424 FailedDependency` for Power BI and related downstream dependency failures
- `500 InternalServerError`

## Explicit exclusions
- `POST /admin/reports/{id}/config/hash`
- `AdminController`-only operational/dataflow endpoints
