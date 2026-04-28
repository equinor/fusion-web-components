# Apps API Endpoint Catalog

This catalog covers the verified public application surface in Fusion Apps. It includes application, build, tag, category, governance, and person-scoped routes. Internal support routes and widget-specific routes are still excluded here.

## Application endpoints
- `GET /apps` → `ApiPagedCollection<ApiAppListItem>`
	OData: `Expand(category, admins, owners, keywords, build, classification)`, `Filter(type, appKey, displayName)`, `Search`, `Top`, `Skip`
- `OPTIONS /apps` → `204 NoContent` with `Allow: OPTIONS,GET[,POST]`
- `OPTIONS /apps?template={appKey}` → `204 NoContent` with template-scoped create capability in `Allow`
- `GET /apps/{appIdentifier}` → `ApiApp`
- `GET /apps/{appIdentifier}@{versionIdentifier}` → `ApiApp`
- `HEAD /apps/{appIdentifier}` → existence probe only
- `OPTIONS /apps/{appIdentifier}` → `204 NoContent` with `Allow: OPTIONS,GET[,PATCH,DELETE]`
- `POST /apps` → `CreateAppRequest` → `ApiApp`
- `PATCH /apps/{appIdentifier}` → `PatchAppRequest` → `ApiApp`
- `DELETE /apps/{appIdentifier}` → `204 NoContent`
- `GET /apps/{appIdentifier}/tagged-persons` → `ApiPagedCollection<ApiTaggedPerson>`
- `GET /apps/{appIdentifier}/changelog` → `ApiPagedCollection<ApiChangelog>`
	OData: `Filter(activityId, actorUpn, actorAzureUniqueId, commandName)`, `Top`, `Skip`
- `POST /apps/{appIdentifier}/restore` → `ApiApp`

## Build and config endpoints
- `GET /apps/{appIdentifier}/builds` → `ApiPagedCollection<ApiAppVersion>`
- `GET /apps/{appIdentifier}/builds/{versionIdentifier}` → `ApiAppVersion`
- `DELETE /apps/{appIdentifier}/builds/{versionIdentifier}` → `204 NoContent`
- `PUT /apps/{appIdentifier}/builds/{versionIdentifier}/config` → `CreateAppBuildConfigRequest` → `ApiAppVersionConfig`
- `GET /apps/{appIdentifier}/builds/{versionIdentifier}/config` → `ApiAppVersionConfig`
- `GET /apps/{appIdentifier}/builds/{versionIdentifier}/changelog` → `ApiPagedCollection<ApiChangelog>`
	OData: `Filter(activityId, actorUpn, actorAzureUniqueId, commandName)`, `Top`, `Skip`

## Tag endpoints
- `GET /apps/{appIdentifier}/tags` → `ApiPagedCollection<ApiAppTag>`
- `GET /apps/{appIdentifier}/tags/{tagName}/history` → `ApiPagedCollection<ApiAppTagHistory>`
- `PUT /apps/{appIdentifier}/tags/{tagName}` → `CreateAppTagRequest` → `ApiAppTag`
- `DELETE /apps/{appIdentifier}/tags/{tagName}` → `204 NoContent`

## Category endpoints
- `GET /apps/categories` → `ApiPagedCollection<ApiAppCategory>`
- `OPTIONS /apps/categories` → `204 NoContent` with `Allow: OPTIONS,GET[,POST]`
- `GET /apps/categories/{appCategoryIdentifier}` → `ApiAppCategory`
- `POST /apps/categories` → `CreateAppCategoryRequest` → `ApiAppCategory`
- `PATCH /apps/categories/{appCategoryIdentifier}` → `PatchCategoryRequest` → `ApiAppCategory`
- `GET /apps/categories/{appCategoryIdentifier}/changelog` → `ApiPagedCollection<ApiChangelog>`
	OData: `Filter(activityId, actorUpn, actorAzureUniqueId, commandName)`, `Top`, `Skip`

## Context-type capability probe
- `OPTIONS /context-types` → `204 NoContent` with `Allow: OPTIONS,GET[,POST]`

## Governance endpoints
- `GET /governance-apps` (v`1.0-preview`) → `ApiPagedCollection<ApiGovernanceAppListItem>`
	OData: `Filter(appKey)`, `Expand(documents.content)`, `Search`, `Top`, `Skip`
- `GET /apps/{appIdentifier}/governance` → `ApiGovernanceApp`
- `OPTIONS /apps/{appIdentifier}/governance` → `204 NoContent` with `Allow: OPTIONS,GET[,PATCH]`
- `PATCH /apps/{appIdentifier}/governance` → `PatchGovernanceAppRequest` → `ApiGovernanceApp`
- `POST /apps/{appIdentifier}/governance/documents` → `AppGovernanceDocumentRequest` → `ApiGovernanceDocument`
- `GET /apps/{appIdentifier}/governance/documents` → `ApiGovernanceDocument[]`
- `OPTIONS /apps/{appIdentifier}/governance/documents` → `204 NoContent` with `Allow: OPTIONS,GET[,POST]`
- `GET /apps/{appIdentifier}/governance/documents/{documentType}` → `ApiGovernanceDocument`
- `OPTIONS /apps/{appIdentifier}/governance/documents/{documentType}` → `204 NoContent` with `Allow: OPTIONS,GET[,PATCH,DELETE]`
- `PATCH /apps/{appIdentifier}/governance/documents/{documentType}` → `PatchGovernanceDocumentRequest` → `ApiGovernanceDocument`
- `DELETE /apps/{appIdentifier}/governance/documents/{documentType}` → `204 NoContent`
- `OPTIONS /apps/{appIdentifier}/governance/confirmation` → `204 NoContent` with `Allow: OPTIONS[,PUT]`
- `PUT /apps/{appIdentifier}/governance/confirmation` → `ConfirmGovernanceRequest` → `ApiGovernanceConfirmation`
- `DELETE /apps/{appIdentifier}/governance/properties/{propertyName}` → `204 NoContent`

## Person-scoped endpoints
- `GET /persons/me/apps` and `GET /persons/{accountIdentifier}/apps` → `ApiPagedCollection<ApiPersonAppListItem>`
- `GET /persons/me/apps/{appIdentifier}` and `GET /persons/{accountIdentifier}/apps/{appIdentifier}` → `ApiPersonApp`
- `PUT /persons/me/apps/{appIdentifier}/tag` and `PUT /persons/{accountIdentifier}/apps/{appIdentifier}/tag` → `CreatePersonAppTagRequest` → `ApiPersonApp`
- `DELETE /persons/me/apps/{appIdentifier}/tag` and `DELETE /persons/{accountIdentifier}/apps/{appIdentifier}/tag` → `204 NoContent`
- `GET /persons/me/pinned-apps` and `GET /persons/{accountIdentifier}/pinned-apps` → `ApiPagedCollection<ApiPinnedApp>`
- `POST /persons/me/pinned-apps` and `POST /persons/{accountIdentifier}/pinned-apps` → `CreatePinnedAppRequest` → `ApiPinnedApp`
- `GET /persons/me/pinned-apps/{appIdentifier}` and `GET /persons/{accountIdentifier}/pinned-apps/{appIdentifier}` → `ApiPinnedApp`
- `DELETE /persons/me/pinned-apps/{appIdentifier}` and `DELETE /persons/{accountIdentifier}/pinned-apps/{appIdentifier}` → `204 NoContent`

## Subscription endpoint
- `PUT /subscriptions/apps` → backend subscription registration/update returning `ApiEventSubscriptionV1`
	Application-token only. Use for change-event delivery, local-cache invalidation, or projection syncing rather than UI workflows.

## Authorization notes
- Read routes generally require authenticated callers.
- Write routes are protected by app-scoped authorization such as app admin, business owner, trusted application, or global full-control roles.
- Governance write routes are more restrictive than app reads and often allow app business owners or governance-specific global roles.
- Person-scoped pinned-app routes additionally allow the current user on their own resources.

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
- Widget controllers and widget bundle routes
- Internal support surfaces outside the application domain

## Capability probe notes
- `OPTIONS /apps` checks app-create capability and can be scoped with `?template={appKey}` for template app creation.
- `OPTIONS /apps/{appIdentifier}` checks item-level mutation capability and only advertises `PATCH` and `DELETE` when the caller has sufficient rights.
- `OPTIONS /apps/categories`, `OPTIONS /context-types`, and the governance `OPTIONS` routes expose the same `Allow`-header capability pattern for adjacent administration flows.
- Source also exposes `OPTIONS /widgets` and `OPTIONS /widgets/{widgetIdentifier}` for widget create/update/delete capability, but widget routes remain outside this catalog's current scope.
