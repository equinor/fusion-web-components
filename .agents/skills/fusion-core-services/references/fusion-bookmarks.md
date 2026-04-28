# Bookmarks API Surface

## Service source
- `fusion-core-services/src/Fusion.Services.Bookmarks`

## Endpoint groups (controller-level)
- `BookmarksController`
- `PersonsController`
- `BaseBookmarksController`

## Priority workflow coverage
- bookmark list/query flows
- bookmark create/update/delete flows
- person-scoped bookmark flows
- favourites and payload-centric bookmark workflows

## Model clarity map
- Request models: `Controllers/RequestModel/*`
- Response models: `Controllers/ViewModel/*`

## Capability / OPTIONS defaults
- No public `OPTIONS` capability probes are documented in the verified bookmark surface.
- Frontend consumers should gate edit and delete UI from known ownership or sharing state rather than inferring write access from list/read success alone.
- Treat `403 Forbidden` and `404 Not Found` responses as part of the capability model when deciding whether bookmark mutation actions should remain visible.

## React/TypeScript defaults
- Preferred Fusion Framework stack:
	- `@equinor/fusion-framework-module-http`
	- `@equinor/fusion-framework-module-services` when `BookmarksApiClient` is available
- Suggested client file: `src/api/bookmarksClient.ts`
- Suggested hook file: `src/features/bookmarks/useBookmarks.ts`
- Keep bookmark payload and bookmark metadata DTOs separate.
- Starter shape:

```ts
export interface BookmarkItem {
	id: string;
	name: string;
	appKey: string;
}

export async function listMyBookmarks(baseUrl: string, init?: RequestInit) {
	const response = await fetch(`${baseUrl}/persons/me/bookmarks`, init);
	if (!response.ok) throw new Error(`Bookmarks API failed: ${response.status}`);
	return (await response.json()) as BookmarkItem[];
}
```

## C# HttpClient defaults
- Preferred backend stack:
	- `AddFusionIntegrationCore(environment)`
	- `AddFusionIntegrationHttpClient("bookmarks-client", setup)`
	- `WithFusionServiceEndpoint(FusionServiceEndpointKeys.Bookmarks)`
	- typed wrappers for bookmark list vs write operations
- Suggested client class: `BookmarksApiClient`
- Suggested DTOs: `BookmarkItem`, `CreateBookmarkRequestDto`
- Model V1 and V2 bookmark responses separately if both surfaces are consumed.
- Starter shape:

```csharp
public sealed class BookmarksApiClient(HttpClient httpClient)
{
		public async Task<IReadOnlyList<BookmarkItem>?> GetMyBookmarksAsync(CancellationToken cancellationToken)
				=> await httpClient.GetFromJsonAsync<IReadOnlyList<BookmarkItem>>("persons/me/bookmarks", cancellationToken);
}

public sealed record BookmarkItem(string Id, string Name, string AppKey);
```

## Suggested local models
- `BookmarkItem`
- `BookmarkPayloadDto`
- `CreateBookmarkRequestDto`
- `FavoriteRequestDto`

## Representative model snapshots
- `BookmarkItem`: bookmark `id`, `name`, and `appKey`
- `BookmarkPayloadDto`: app-specific state payload
- `CreateBookmarkRequestDto`: name, appKey, payload, optional context id

## Validation highlights
- `CreateBookmarkRequest.Name` is required
- `CreateBookmarkRequest.AppKey` is required
- `CreateBookmarkRequest.Payload` is required
- `ContextId` is optional but validated against context resolution when present

## Versioning notes
- Includes multiple bookmark representations (`ApiBookmark`, `ApiBookmarkV2`); align client code with target endpoint contract.
