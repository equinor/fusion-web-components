# Notification API Surface

## Service source
- `fusion-core-services/src/Fusion.Services.Notification`

## Endpoint groups (controller-level)
- `NotificationController`
- `NotificationSettingsController`

## Priority workflow coverage
- notification create/update flows
- notification settings query/update flows
- source-system and recipient-scoped notification scenarios

## Model clarity map
- Request models: `Controllers/ViewModels/Request/*`
- Response/entity models: `Controllers/ViewModels/Entities/*`

## Capability / OPTIONS defaults
- No public `OPTIONS` capability probes are documented in the verified Notification API surface.
- Frontend consumers should only enable notification-settings mutation or notification-write UI when the caller context is already known to be self-service, application-user, or elevated-user compatible.
- Treat `403 Forbidden` responses as the fallback signal for hiding or downgrading write actions when a dedicated capability probe is unavailable.

## React/TypeScript defaults
- Preferred Fusion Framework stack:
	- `@equinor/fusion-framework-module-http`
	- `@equinor/fusion-framework-module-service-discovery`
- Suggested client file: `src/api/notificationClient.ts`
- Suggested hook file: `src/features/notifications/useNotifications.ts`
- Keep notification write models separate from notification settings models.
- Starter shape:

```ts
export interface ApiPagedCollection<T> {
	totalCount: number;
	count: number;
	value: T[];
	'@nextPage'?: string | null;
	'@prevPage'?: string | null;
}

export interface NotificationSourceSystem {
	name?: string | null;
	subSystem?: string | null;
	identifier?: string | null;
}

export interface NotificationItem {
	id: string;
	title?: string;
	sourceSystem?: NotificationSourceSystem | null;
}

export async function listNotifications(baseUrl: string, personIdentifier: string, init?: RequestInit) {
	const response = await fetch(`${baseUrl}/persons/${personIdentifier}/notifications`, init);
	if (!response.ok) throw new Error(`Notification API failed: ${response.status}`);
	return (await response.json()) as ApiPagedCollection<NotificationItem>;
}
```

## C# HttpClient defaults
- Preferred backend stack:
	- `AddFusionIntegrationCore(environment)`
	- `AddFusionIntegrationHttpClient("notification-client", setup)`
	- `WithFusionServiceEndpoint(FusionServiceEndpointKeys.Notification)`
	- typed wrapper separating content operations from settings operations
- Suggested client class: `NotificationApiClient`
- Suggested DTOs: `NotificationItem`, `NotificationSettingsDto`
- Keep notification settings and notification content DTOs in separate namespaces/files.
- Starter shape:

```csharp
public sealed class NotificationApiClient(HttpClient httpClient)
{
		public async Task<NotificationItem?> CreateNotificationAsync<T>(string personIdentifier, T request, CancellationToken cancellationToken)
	{
			using HttpResponseMessage response = await httpClient.PostAsJsonAsync($"persons/{personIdentifier}/notifications", request, cancellationToken);
			response.EnsureSuccessStatusCode();
			return await response.Content.ReadFromJsonAsync<NotificationItem>(cancellationToken: cancellationToken);
		}
}

	public sealed record NotificationSourceSystem(string? Name, string? SubSystem, string? Identifier);

	public sealed record NotificationItem(string Id, string? Title, NotificationSourceSystem? SourceSystem);
```

## Suggested local models
- `NotificationItem`
- `CreateNotificationRequestDto`
- `NotificationSettingsDto`
- `PatchNotificationRequestDto`

## Representative model snapshots
- `NotificationItem`: `id`, `title`, nested `sourceSystem`, `created`, `seen`
- `CreateNotificationRequestDto`: title, description/card, app context, recipient info
- `NotificationSettingsDto`: user notification preference set

## Validation highlights
- `NewFusionNotificationRequestV1.Title` is required
- either `Description` or `Card` must be provided
- `Card` is validated against Adaptive Card syntax when present
- `AppKey` is optional but validated against the app resolver when supplied

## Versioning notes
- Notification payloads and settings payloads should be treated as separate contracts.
