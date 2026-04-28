# Notification API Endpoint Catalog

This catalog covers the verified public notification and notification-settings surface for API version `1.0`.

## Notification endpoints
- `GET /notifications/{id}` → `ApiNotificationV1`
	Expand: `fallbackHtml`
- `GET /persons/{personIdentifier}/notifications` → `ApiPagedCollection<ApiNotificationV1>`
	Supports `me` alias for the current user.
	OData: `Filter(created, seen, seenByUser, sourceSystem.identifier, sourceSystem.name, sourceSystem.subSystem)`, `OrderBy(title, created, seen, seenByUser)`, `Top(100)`, `Skip`
- `POST /persons/{personIdentifier}/notifications` → `NewFusionNotificationRequestV1` → `ApiNotificationV1`
- `PATCH /notifications/{id}` → `PatchFusionNotificationRequestV1` → `ApiNotificationV1`
- `DELETE /notifications/{id}` → `204 NoContent`

## Notification settings endpoints
- `GET /persons/{personIdentifier}/notifications/settings` → `ApiNotificationSettings`
	Supports `me` alias for the current user.
- `PUT /persons/{personIdentifier}/notifications/settings` → `NotificationSettingsRequest` → `ApiNotificationSettings`
	Supports `me` alias for the current user.

## Authorization notes
- Notification reads allow elevated users, application users, the creating application, the notification target, and selected allowlisted app identities on person-scoped list routes.
- Notification creation additionally allows callers with the `Fusion.Notifications.Write` scope.
- Settings routes allow elevated users, application users, and the current user on their own settings.
- `me` aliases depend on resolving the authenticated user identity.

## Typical status codes
- `200 OK`
- `201 Created`
- `204 NoContent`
- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`

## Explicit exclusions
- Internal email delivery and SignalR dispatch infrastructure behind create operations
- Non-controller internal models and persistence details
