# Context API Surface

## Service source
- `fusion-core-services/src/Fusion.Services.Context`

## Endpoint groups (controller-level)
- `ContextController`
- `SubscriptionsController`
- `CacheController`

## Priority workflow coverage
- context lookup and traversal via `ContextController`
- relation management and path-query flows via `ContextController`
- backend event-subscription registration via `SubscriptionsController`
- cache/refresh-adjacent operational flows via `CacheController`

## Model clarity map
- Entity view models: `Controllers/ViewModels/Entities/*`
- Request models: `Controllers/ViewModels/Request/*`
- Common relation/request payloads: `ContextRelationRequest`, `NewContextRelationRequest`, `UpdateContextRequest`

## Capability / OPTIONS defaults
- No public `OPTIONS` capability probes are documented in the verified Context API surface.
- Frontend consumers should avoid exposing mutation UI by default unless the consuming application already knows the caller has elevated or application-user access.
- For context create, update, and relation-mutation flows, treat `403 Forbidden` as the fallback capability signal when no dedicated probe route is available.

## Subscription defaults
- `PUT /subscriptions/contexts` is a backend integration route, not a frontend workflow.
- It requires an application token and returns `ApiEventSubscriptionV1` connection details rather than context entities.
- Use it for CloudEvent-style change delivery, local cache invalidation, or projection updates when context data changes.

## React/TypeScript defaults
- Preferred Fusion Framework stack:
	- `@equinor/fusion-framework-module-http`
	- `@equinor/fusion-framework-module-service-discovery`
	- `@equinor/fusion-framework-module-services` with `ContextApiClient`
- Prefer `serviceDiscovery.createClient('context')` or a configured `useHttpClient('context')` client.
- Suggested client file: `src/api/contextClient.ts`
- Suggested hook file: `src/features/context/useContextEntity.ts`
- Prefer local DTOs derived from `ApiContextEntity`, `ApiRelatedContextEntity`, and relation request models.
- Starter shape:

```ts
export interface ContextEntity {
	id: string;
	externalId?: string;
	type?: string;
}

export async function getContextEntity(baseUrl: string, contextId: string, init?: RequestInit) {
	const response = await fetch(`${baseUrl}/contexts/${contextId}`, init);
	if (!response.ok) throw new Error(`Context API failed: ${response.status}`);
	return (await response.json()) as ContextEntity;
}
```

## C# HttpClient defaults
- Preferred backend stack:
	- `AddFusionIntegrationCore(environment)`
	- `AddFusionIntegrationHttpClient("context-client", setup)`
	- `WithFusionServiceEndpoint(FusionServiceEndpointKeys.Context)`
	- `DefaultFusionEndpointResolver` when configuration overrides are needed
- Suggested client class: `ContextApiClient`
- Suggested DTOs: `ContextEntityDto`, `ContextRelationDto`
- Keep request DTOs for create/update separate from read DTOs.
- Starter shape:

```csharp
public sealed class ContextApiClient(HttpClient httpClient)
{
		public async Task<ContextEntityDto?> GetContextAsync(string contextId, CancellationToken cancellationToken)
				=> await httpClient.GetFromJsonAsync<ContextEntityDto>($"contexts/{contextId}", cancellationToken);
}

public sealed record ContextEntityDto(string Id, string? ExternalId, string? Type);

// Example registration
services.AddFusionIntegrationCore("FPRD");
services.AddFusionIntegrationHttpClient("context-client", options =>
{
	options.WithFusionServiceEndpoint(FusionServiceEndpointKeys.Context);
});
```

## Representative model snapshots
- `ContextEntityDto`: `id`, optional `externalId`, optional `type`
- `RelatedContextEntityDto`: relation-linked entity reference
- `CreateContextRequestDto`: title, externalId, context type, and additional metadata
- `UpdateContextRelationDto`: source/target relation payload

## Validation highlights
- `NewContextRequest.Type.Id` is required and must map to a valid context type
- `NewContextRequest.Title` is required, max 200 chars, and must not contain script tags
- `NewContextRequest.ExternalId` is required and limited to 100 chars

## Suggested local models
- `ContextEntityDto`
- `RelatedContextEntityDto`
- `CreateContextRequestDto`
- `UpdateContextRelationDto`

## Versioning notes
- Context API commonly relies on relation and path query semantics; payload correctness is critical.
