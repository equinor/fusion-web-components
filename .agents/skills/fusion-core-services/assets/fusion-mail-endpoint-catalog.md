# Mail API Endpoint Catalog

This catalog covers the verified Mail service surface in `Fusion.Services.Mail`, including public send/template routes and the management endpoints the skill explicitly supports for whitelist, status, delivery, and audit workflows.

## Core mail routes
- `POST /mails`
	- Create and queue a new mail from raw subject/body content.
	- Caller must resolve to an application user or have scope `Fusion.Email.Send`.
	- Optional sender overrides can be supplied through `x-fusion-sender-app-id` and `x-fusion-sender-object-id` headers.
- `GET /mails/{mailId}`
	- Fetch a mail owned by the calling application.
	- Returns `202 Accepted` with `Location` and `Retry-After` headers while the mail is still queued.
- `POST /templates/{templateName}/mails`
	- Create and queue a new mail from a named template.
	- Returns `404 NotFound` when the template does not exist and `424 FailedDependency` when template expansion or delivery fails.
- `GET /templates`
	- List predefined mail templates.
	- Supports `$expand=templateData` through OData expand.

## App-scoped status and delivery routes
- `GET /apps/{senderAppId}/mails/{mailId}`
	- Hidden from API explorer, but implemented as an explicit sender-app lookup route.
- `PATCH /apps/{appId}/mails/{mailId}`
	- Hidden from API explorer.
	- Updates overall mail status using `UpdateMailStatusRequest`.
- `PATCH /apps/{appId}/mails/{mailId}/recipients/{email}`
	- Hidden from API explorer.
	- Updates delivery status for a specific recipient using `UpdateMailDeliveryRequest`.

## Management send routes
- `POST /management/send-mail` (API v1)
	- Sends a fully specified mail payload using `SendMailRequest`.
	- Hidden from API explorer.
- `POST /management/send-mail` (API v2)
	- Sends a previously created mail by `mailId` using `SendMailRequestV2`.
	- Hidden from API explorer.
- `POST /management/send-mail` (API v3)
	- Sends a previously created mail and returns per-recipient results as `ApiMailV3[]`.
	- Uses `SendMailRequestV3`.

## Whitelist and audit routes
- `POST /management/whitelist`
	- Register an email recipient for non-production delivery using `WhitelistRequest`.
- `GET /management/whitelist`
	- List all whitelist entries.
- `GET /management/persons/me/whitelist`
	- List whitelist entries created by the current caller.
- `GET /management/undelivered-mails`
	- List undelivered mails as `ApiPagedCollection<ApiUndeliveredMail>`.
	- Supports OData `$filter`, `$top`, and `$skip`.
- `GET /management/undelivered-mails/{id}`
	- Fetch one undelivered mail by identifier.
- `GET /management/logs`
	- List mail log entries as `ApiPagedCollection<ApiLog>`.
	- Supports OData `$filter`, `$search`, `$top`, and `$skip`.
- `GET /management/apps/{appId}/logs`
	- App-scoped log listing with the same OData support as the global logs endpoint.

## Authorization notes
- `POST /mails`, `POST /templates/{templateName}/mails`, and `GET /mails/{mailId}` require application-user context; send routes additionally allow scope `Fusion.Email.Send`.
- Management send and whitelist/list routes use elevated-user, trusted-application, scope-based, or sender-app authorization depending on the action.
- Undelivered-mail and log endpoints can narrow results automatically when the caller lacks broad read privileges but can still prove sender/app ownership.

## Typical status codes
- `200 OK` for successful reads, status updates, whitelist reads, and management send v3.
- `201 Created` for create/send routes that create or dispatch mails.
- `202 Accepted` when a mail is still queued.
- `400 BadRequest` for invalid request payloads, missing sender identifiers, or invalid status changes.
- `401 Unauthorized`
- `403 Forbidden`
- `404 NotFound` for missing mails, templates, or undelivered-message identifiers.
- `424 FailedDependency` for SMTP, queue, template, or downstream transport failures.

## Notes
- Hidden `ApiExplorer` routes are still included here because they are part of the implemented HTTP surface and are relevant for integration and status-management workflows.
