# Bookmarks API Endpoint Catalog

This catalog covers the verified public bookmark and favourite surface. It includes the versioned bookmark read/list endpoints and the current-user favourite flows.

## Bookmark endpoints
- `POST /bookmarks` (v`1.0`) → `CreateBookmarkRequest` → `ApiBookmark`
- `GET /bookmarks/{id}` (v`1.0`) → `ApiBookmark`
- `GET /bookmarks/{id}` (v`2.0`) → `ApiBookmarkV2`
- `GET /bookmarks/{id}/apply` (v`1.0`) → `ApiBookmarkPayload`
- `PATCH /bookmarks/{id}` (v`1.0`) → `PatchBookmarkRequest` → `ApiBookmark`
- `DELETE /bookmarks/{id}` (v`1.0`) → `204 NoContent`

## Current-user bookmark list endpoints
- `GET /persons/me/bookmarks` (v`1.0`) → `ApiBookmark[]`
	OData: `Filter(appKey, contextId, sourceSystem.identifier, sourceSystem.name, sourceSystem.subSystem)`
- `GET /persons/me/bookmarks` (v`2.0`) → `ApiBookmarkV2[]`
	OData: `Filter(appKey, contextId, sourceSystem.identifier, sourceSystem.name, sourceSystem.subSystem, isFavourite)`

## Favourite endpoints
- `POST /persons/me/bookmarks/favourites` (v`1.0`) → `AddFavouriteRequest` → `200 OK`
- `DELETE /persons/me/bookmarks/favourites/{bookmarkId}` (v`1.0`) → `204 NoContent`
- `HEAD /persons/me/bookmarks/favourites/{bookmarkId}` (v`1.0`) → `200 OK` when favourite exists, otherwise `404 NotFound`

## Authorization notes
- Bookmark reads require bookmark creator access or shared-bookmark visibility.
- Bookmark writes require bookmark creator access.
- Favourite creation additionally requires the underlying bookmark to be shared.
- Current-user list and favourite routes rely on the authenticated user identity.

## Typical status codes
- `200 OK`
- `201 Created`
- `204 NoContent`
- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `409 Conflict` when a favourite already exists

## Explicit exclusions
- Internal event publishing behavior triggered by bookmark apply events
- Non-public operational or support surfaces outside `BookmarksController` and `PersonsController`
