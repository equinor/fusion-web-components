# Fusion Tasks API Surface

## Service source
- `fusion-core-services/src/Fusion.Services.FusionTasks`

## Endpoint groups (controller-level)
- `FusionTaskController`
- `PimsTaskController`
- `ProCoSysTaskController`
- `SubscriptionsController`
- `AdminController`

## Priority workflow coverage
- core Fusion task CRUD via `FusionTaskController`
- PIMS task retrieval/integration via `PimsTaskController`
- ProCoSys task retrieval/integration via `ProCoSysTaskController`
- backend event-subscription registration via `SubscriptionsController`
- operational/admin flows via `AdminController`

## Model clarity map
- Entity models: `Controllers/ViewModels/Entities/*`
- Request models: `Controllers/ViewModels/Request/*`
- Key cross-system models: `ApiFusionTask`, `ApiPimsTask`, `ApiProCoSysTask`, `ApiContextReference`

## Capability / OPTIONS defaults
- No public `OPTIONS` capability probes are documented in the verified Tasks API surface.
- Frontend consumers should only enable task mutation UI when the app already knows the current caller or owning application can write the relevant task resources.
- For source-system-backed views such as PIMS, keep the UI read-oriented by default unless the service contract explicitly documents write capability.

## Subscription defaults
- `PUT /subscriptions/fusiontasks` is a backend integration route, not a frontend task workflow.
- It requires an application token and returns `ApiEventSubscriptionV1` connection details for event delivery.
- Use it for CloudEvent-style task-change processing, cache invalidation, or maintaining a local read model when Fusion task data changes.

## React/TypeScript defaults
- Preferred Fusion Framework stack:
	- `@equinor/fusion-framework-module-http`
	- `@equinor/fusion-framework-module-service-discovery`
- Prefer a named service-discovery client for `fusiontasks` or the resolved service key in the current environment.
- Suggested client file: `src/api/tasksClient.ts`
- Suggested hook file: `src/features/tasks/useTasks.ts`
- Prefer separate local DTOs for Fusion, PIMS, and ProCoSys task shapes.
- Starter shape:

```ts
export interface FusionTaskItem {
	id: string;
	title?: string;
	status?: string;
}

export async function listFusionTasks(baseUrl: string, init?: RequestInit) {
	const response = await fetch(`${baseUrl}/persons/me/tasks`, init);
	if (!response.ok) throw new Error(`Tasks API failed: ${response.status}`);
	return (await response.json()) as FusionTaskItem[];
}
```

## C# HttpClient defaults
- Preferred backend stack:
	- `AddFusionIntegrationCore(environment)`
	- `AddFusionIntegrationHttpClient("fusion-tasks-client", setup)`
	- endpoint-key-based discovery rather than hard-coded base URLs
- Suggested client class: `FusionTasksApiClient`
- Suggested DTOs: `FusionTaskItem`, `PimsTaskItem`, `ProCoSysTaskItem`
- Model source-system differences explicitly instead of sharing one record type.
- Starter shape:

```csharp
public sealed class FusionTasksApiClient(HttpClient httpClient)
{
		public async Task<IReadOnlyList<FusionTaskItem>?> GetTasksAsync(CancellationToken cancellationToken)
				=> await httpClient.GetFromJsonAsync<IReadOnlyList<FusionTaskItem>>("persons/me/tasks", cancellationToken);
}

public sealed record FusionTaskItem(string Id, string? Title, string? Status);

// Example registration
services.AddFusionIntegrationCore("FPRD");
services.AddFusionIntegrationHttpClient("fusion-tasks-client", options =>
{
	options.WithFusionServiceEndpoint(FusionServiceEndpointKeys.FusionTasks);
});
```

## Representative model snapshots
- `FusionTaskItem`: core task id, title, status, and context reference
- `NewFusionTaskRequestDto`: title, assignee, context, and source-system metadata
- `PimsTaskItem`: source-system-specific PIMS task shape
- `ProCoSysTaskItem`: deprecated ProCoSys shape kept separate

## Validation highlights
- `NewFusionTaskRequest.Title` is required, max 250 chars, and must not contain script tags
- `AssignedTo.Person` must be a valid person reference when present
- `Context` must contain either a context id or a valid externalId + type combination
- `EquinorTask` is validated through a custom domain validator when provided

## Suggested local models
- `FusionTaskItem`
- `NewFusionTaskRequestDto`
- `PimsTaskItem`
- `ProCoSysTaskItem`

## Versioning notes
- Source-system specific constraints should be handled explicitly in mapping and validation logic.
