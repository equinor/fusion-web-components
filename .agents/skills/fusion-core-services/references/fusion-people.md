# People API Surface

## Service source
- `fusion-core-services/src/Fusion.Services.People`

## Endpoint groups (controller-level)
- `PersonController.*` (legacy + v3 variants)
- `PeoplePickerController`
- `SearchController`
- `PresenceController`
- `SubscriptionsController`
- `ImagesController`
- `AnalyticsController`
- `AdminController`
- `CacheController`
- `ExperimentalController`

## Priority workflow coverage
- person profile lookup and read flows via `PersonController.*`
- people search and picker flows via `SearchController` and `PeoplePickerController`
- presence retrieval via `PresenceController`
- backend event-subscription registration via `SubscriptionsController`
- image/profile-adjacent flows via `ImagesController`
- explicitly exclude role-management workflows that should move to RolesV2

## Model clarity map
- Request models: `Controllers/Models/Requests/*`
- Response/view models: `Controllers/Models/ViewModels/*`
- Versioned person DTOs: `ApiPersonV1`, `ApiPersonV2`, `ApiPersonV3`, `ApiPersonV4`
- Related public package: `src/ApiModels/Fusion.Services.People.ApiModels`

## Capability / OPTIONS defaults
- No public consumer-facing `OPTIONS` capability probes are documented in the verified People API surface.
- Source does expose `OPTIONS /persons/migrations` for elevated profile-migration operations, but that route belongs to an operational migration controller and should not be treated as normal UI capability guidance.
- Frontend consumers should enable mutation flows such as linked-account or extended-profile updates only when the user context or app policy already makes that authorization expectation explicit.
- For cache reset and other elevated operations, avoid capability guesses and rely on route-specific authorization failures as the fallback behavior.

## Subscription defaults
- `PUT /subscriptions/persons` is a backend integration route, not a frontend profile workflow.
- It requires an application token and returns `ApiEventSubscriptionV1` connection details for event delivery.
- Use it for CloudEvent-style person-change processing, cache invalidation, or syncing a local copy when People data changes.

## React/TypeScript defaults
- Preferred Fusion Framework stack:
	- `@equinor/fusion-framework-module-http`
	- `@equinor/fusion-framework-module-service-discovery`
	- `@equinor/fusion-framework-react-module-http`
	- `@equinor/fusion-framework-module-services` when `PeopleApiClient` is available
- Prefer `useHttpClient('people')` or a service-discovery-created client over ad hoc `fetch` setup.
- Suggested client file: `src/api/peopleClient.ts`
- Suggested hook file: `src/features/people/usePeople.ts`
- Prefer local DTOs derived from `ApiPersonV3`, `ApiPeoplePickerPerson`, and `ApiPersonSearchResponseV1`.
- Starter shape:

```ts
export interface PersonSummary {
	azureUniqueId?: string | null;
	name: string;
	mail?: string | null;
}

export async function getPerson(baseUrl: string, personId: string, init?: RequestInit) {
	const response = await fetch(`${baseUrl}/persons/${personId}`, init);
	if (!response.ok) throw new Error(`People API failed: ${response.status}`);
	return (await response.json()) as PersonSummary;
}
```

## C# HttpClient defaults
- Preferred backend stack:
	- `Fusion.Integration`
	- `AddFusionIntegrationCore(environment)`
	- `AddFusionIntegrationHttpClient(name, setup)`
	- `WithFusionServiceEndpoint(FusionServiceEndpointKeys.People)`
- Suggested client class: `PeopleApiClient`
- Suggested DTOs: `PersonSummary`, `PeopleSearchResponse`
- Prefer `System.Text.Json` and keep version-specific DTOs separate.
- Starter shape:

```csharp
public sealed class PeopleApiClient(HttpClient httpClient)
{
		public async Task<PersonSummary?> GetPersonAsync(string personId, CancellationToken cancellationToken)
				=> await httpClient.GetFromJsonAsync<PersonSummary>($"persons/{personId}", cancellationToken);
}

public sealed record PersonSummary(string? AzureUniqueId, string Name, string? Mail);

// Registration with fusion-integration-lib should bootstrap discovery first
services.AddFusionIntegrationCore("FPRD");
services.AddFusionIntegrationHttpClient("people-client", options =>
{
	options.WithFusionServiceEndpoint(FusionServiceEndpointKeys.People);
});
```

## Representative model snapshots
- `PersonSummary`: `azureUniqueId`, `name`, optional `mail`
- `PeopleSearchRequest`: identifiers/text query plus page/filter settings
- `PeopleSearchResponse`: result collection plus search metadata/count information
- `PersonProfile`: version-specific person profile payload (`ApiPersonV3`/`ApiPersonV4`)

## Validation highlights
- `AccountLinkRequest.Identifier` is required and limited to 100 characters
- `ResolveProfilesRequest.Identifiers` must be non-empty and is capped at 100 items
- role-related People requests exist, but role-management workflows should move to RolesV2

## Suggested local models
- `PersonSummary`
- `PersonProfile`
- `PeopleSearchRequest`
- `PeopleSearchResponse`

## Versioning notes
- People API contains legacy and v3/v4 model surfaces; version-specific handling is required.

## Explicit exclusions
- Roles v1 guidance and role endpoint patterns that are superseded by RolesV2.
