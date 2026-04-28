# Apps Service API Surface

## Service source
- `fusion-core-services/src/Fusion.Services.Apps`

## Endpoint groups (source-grounded)
- Application controllers under `Applications/Controllers/*` expose the main public app surface.
- Widget controllers under `Widgets/Controllers/*` expose a separate widget surface that is only partially captured by this skill's bundled assets.
- This service still benefits from source validation before implementation because authorization and capability probes are controller-driven rather than inferred from the route list alone.

## Priority workflow coverage
- app metadata retrieval
- application synchronization and registry-adjacent flows
- backend event-subscription registration via `SubscriptionsController`
- startup/configuration-driven service interaction patterns

## Model clarity map
- Service configuration and context: `Configuration/*`, `Database/*`, and startup wiring in `Program.cs`/`Startup.cs`.

## Capability / OPTIONS defaults
- Public capability probes exist in source for the main app surface:
	- `OPTIONS /apps`
	- `OPTIONS /apps?template={appKey}`
	- `OPTIONS /apps/{appIdentifier}`
- Additional public capability probes also exist for adjacent app-management surfaces:
	- `OPTIONS /apps/categories`
	- `OPTIONS /context-types`
	- `OPTIONS /apps/{appIdentifier}/governance`
	- `OPTIONS /apps/{appIdentifier}/governance/documents`
	- `OPTIONS /apps/{appIdentifier}/governance/documents/{documentType}`
	- `OPTIONS /apps/{appIdentifier}/governance/confirmation`
	- `OPTIONS /widgets`
	- `OPTIONS /widgets/{widgetIdentifier}`
- `OPTIONS /apps` always returns an `Allow` header containing `OPTIONS,GET`, and adds `POST` when the caller is authorized to create apps. The optional `template` query is used to check template-scoped creator access.
- `OPTIONS /apps/{appIdentifier}` always returns `OPTIONS,GET`, and adds `PATCH,DELETE` when the caller is authorized as app admin, trusted application, or equivalent full-control role.
- Category, context-type, governance, and widget probes follow the same pattern: the route always advertises read-safe verbs and conditionally adds mutation verbs in the `Allow` header when the caller has the required app, governance, or widget privileges.
- Frontend consumers should prefer these `OPTIONS` probes before enabling create, edit, or delete UI, and still handle `403 Forbidden` defensively for race conditions or stale capability state.

## Subscription defaults
- `PUT /subscriptions/apps` is a backend integration route, not a frontend workflow.
- It requires an application token and returns `ApiEventSubscriptionV1` connection details for event delivery rather than app data.
- Treat it as the standard Fusion event-subscription pattern for keeping local projections in sync, invalidating caches, or reacting to app changes through CloudEvent-style messages with service-specific payloads.

## React/TypeScript defaults
- Preferred Fusion Framework stack:
	- `@equinor/fusion-framework-module-http`
	- `@equinor/fusion-framework-module-service-discovery`
- Suggested client file: `src/api/appsClient.ts`
- Suggested hook file: `src/features/apps/useApps.ts`
- Because endpoint details are sparse in this snapshot, keep DTOs narrow and confirm route contracts before shipping.
- Starter shape:

```ts
export interface ApiPagedCollection<T> {
	totalCount: number;
	count: number;
	value: T[];
	'@nextPage'?: string | null;
	'@prevPage'?: string | null;
}

export interface AppSummary {
	appKey: string;
	displayName: string;
	description?: string | null;
}

export async function getApps(baseUrl: string, init?: RequestInit) {
	const response = await fetch(`${baseUrl}/apps`, init);
	if (!response.ok) throw new Error(`Apps API failed: ${response.status}`);
	return (await response.json()) as ApiPagedCollection<AppSummary>;
}
```

## C# HttpClient defaults
- Preferred backend stack:
	- `AddFusionIntegrationCore(environment)`
	- `AddFusionIntegrationHttpClient("apps-client", setup)` when service endpoint details are available
	- otherwise a named client using explicit URI until a stable endpoint key is confirmed
- Suggested client class: `AppsApiClient`
- Suggested DTOs: `AppSummary`, `AppSyncStatusDto`
- Treat route and payload names as provisional until confirmed from concrete controller source.
- Starter shape:

```csharp
public sealed class AppsApiClient(HttpClient httpClient)
{
		public async Task<PagedResponse<AppSummary>?> GetAppsAsync(CancellationToken cancellationToken)
				=> await httpClient.GetFromJsonAsync<PagedResponse<AppSummary>>("apps", cancellationToken);
}

public sealed record PagedResponse<T>(int TotalCount, int Count, IReadOnlyList<T> Value);

public sealed record AppSummary(string AppKey, string DisplayName, string? Description);
```

## Suggested local models
- `AppSummary`
- `AppDetailsDto`
- `AppSyncStatusDto`

## Representative model snapshots
- `AppSummary`: `appKey`, `displayName`, optional `description`
- `AppDetailsDto`: application metadata, owners/admins, tags, classification
- `CreateAppRequestDto`: app name, type, admins, and ownership fields

## Validation highlights
- validation in this service varies by controller surface
- representative create-widget/create-app style flows typically require a `Name` with minimum/maximum length constraints
- admin/account collections are validated and usually require at least one valid account
- treat route-specific validation as required to confirm before shipping because controller coverage is broader than the currently bundled asset

## Versioning notes
- Route and model contracts should still be confirmed directly from current source before generating client code, especially for widget and governance-adjacent flows.
