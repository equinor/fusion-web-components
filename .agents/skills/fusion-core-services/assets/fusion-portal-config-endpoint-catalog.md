# Portal Config API Endpoint Catalog

This catalog covers the verified public configuration surface for portals, templates, categories, tags, bundles, and settings. Authentication, discovery, and operational admin routes are excluded.

## Portal endpoints
- `GET /portals` → `ApiPagedCollection<ApiPortalListItem>`
- `GET /portals/{portalIdentifier}` → `ApiPortal`
- `GET /portals/{portalIdentifier}@{versionIdentifier}` → `ApiPortal`
- `POST /portals` → `CreatePortalRequest` → `ApiPortal`
- `PATCH /portals/{portalIdentifier}` → `PatchPortalRequest` → `ApiPortal`
- `DELETE /portals/{portalIdentifier}` → `204 NoContent`
- `POST /portals/{portalIdentifier}/restore` → `ApiPortal`

## Portal config and template-build endpoints
- `PUT /portals/{portalIdentifier}@{versionIdentifier}/config` → portal config request body → `ApiPortalConfigVersion`
- `GET /portals/{portalIdentifier}@{configIdentifier}/config` → `ApiPortalConfigVersion`
- `GET /portals/{portalIdentifier}/template-builds` → `ApiPortalTemplateVersionListItem[]`

## Portal app composition endpoints
- `POST /portals/{portalIdentifier}/apps` → `AddPortalAppRequest` → `ApiPortal`
- `GET /portals/{portalIdentifier}/apps` → `ApiPortalAppListItem[]`
- `DELETE /portals/{portalIdentifier}/apps/{appKey}` → `204 NoContent`

## Portal tag endpoints
- `GET /portals/{portalIdentifier}/tags` → `ApiPortalTag[]`
- `PUT /portals/{portalIdentifier}/tags/{tagName}` → `CreatePortalTagRequest` → `ApiPortalTag`
- `DELETE /portals/{portalIdentifier}/tags/{tagName}` → `204 NoContent`

## Template endpoints
- `GET /templates` → `ApiPagedCollection<ApiTemplateListItem>`
- `GET /templates/{templateIdentifier}` → `ApiTemplate`
- `POST /templates` → `CreatePortalTemplateRequest` → `ApiTemplate`
- `PATCH /templates/{templateIdentifier}` → `PatchPortalTemplateRequest` → `ApiTemplate`
- `DELETE /templates/{templateIdentifier}` → `204 NoContent`
- `GET /templates/{templateIdentifier}/builds` → `ApiPagedCollection<ApiTemplateVersionListItem>`
- `GET /templates/{templateIdentifier}/builds/{versionIdentifier}` → `ApiTemplateVersion`

## Template tag endpoints
- `GET /templates/{templateIdentifier}/tags` → `ApiTemplateTag[]`
- `PUT /templates/{templateIdentifier}/tags/{tagName}` → `CreatePortalTemplateTagRequest` → `ApiTemplateTag`
- `DELETE /templates/{templateIdentifier}/tags/{tagName}` → `204 NoContent`

## Template bundle endpoints
- `POST /bundles/templates/{templateIdentifier}` → bundle upload/create response
- `GET /bundles/templates/{templateIdentifier}@{versionIdentifier}` → bundle metadata / redirect target
- `GET /bundles/templates/{templateIdentifier}/{versionIdentifier}` → bundle metadata / redirect target
- `GET /bundles/templates/{templateIdentifier}@{versionIdentifier}/{**resource}` → static bundle resource
- `GET /bundles/templates/{templateIdentifier}/{versionIdentifier}/{**resource}` → static bundle resource

## Category endpoints
- `GET /categories` → `ApiPagedCollection<ApiCategory>`
- `GET /categories/{categoryIdentifier}` → `ApiCategory`
- `POST /categories` → `CreateCategoryRequest` → `ApiCategory`
- `PATCH /categories/{categoryIdentifier}` → `PatchCategoryRequest` → `ApiCategory`
- `DELETE /categories/{categoryIdentifier}` → `204 NoContent`

## Settings endpoint
- `GET /settings` → `ApiGlobalSettings`

## Authorization notes
- Read routes are generally available to authenticated callers.
- Writes typically require portal full control, trusted application access, or portal/template admin rights.
- Tag, app-composition, and restore routes are more restricted than plain reads.
- Bundle upload routes are privileged; bundle fetch routes are intended for portal runtime/resource consumption.

## Typical status codes
- `200 OK`
- `201 Created`
- `204 NoContent`
- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `409 Conflict`
- `410 Gone`

## Explicit exclusions
- Authentication/token routes
- Portal shell/browser controllers
- Admin/discovery/cache operations
- HTTP `OPTIONS` capability probes
