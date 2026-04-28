# Contract Personnel API Surface

## Service source
- `fusion-core-services/src/Fusion.Services.ContractPersonnel`

## Endpoint groups (controller/domain-level)
- `Personnel/*`
- `Persons/*` (including V2)
- `Contracts/*` (including V2)
- `Roles/*`
- `Recertifications/*`
- `Requests/*`
- `ChangeLog/*`
- `AffiliateSponsors/*`
- `ValidCompanies/*` and `ValidDomains/*`

## Priority workflow coverage
- personnel and person lookup/update flows
- contract and project master flows, including V2 controllers
- role assignment flows within contract personnel scope
- request and recertification workflows
- changelog-related integrations

## Model clarity map
- Domain API models: `Controllers/**/ApiModels/*`
- Request models: `Controllers/**/Requests/*`
- Request/reference helpers: `Controllers/ApiModels/RequestReferences/*`

## Capability / OPTIONS defaults
- This service exposes public `OPTIONS` capability probes on many contract-scoped routes, including contracts, personnel, requests, role assignments, change log, and affiliate sponsors.
- Frontend consumers should call the matching `OPTIONS` route before enabling create, approve, reject, edit, or delete UI for contract-scoped workflows.
- Use the probe result as the source of truth for action availability because read access and write access differ significantly across responsibility roles.

## React/TypeScript defaults
- Preferred Fusion Framework stack:
	- `@equinor/fusion-framework-module-http`
	- `@equinor/fusion-framework-module-service-discovery`
- Suggested client file: `src/api/contractPersonnelClient.ts`
- Suggested hook file: `src/features/contractPersonnel/usePersonnel.ts`
- Keep personnel, contract, and role DTOs separated by domain.
- Starter shape:

```ts
export interface PagedResponse<T> {
	totalCount: number;
	count: number;
	value: T[];
	'@nextPage'?: string | null;
	'@prevPage'?: string | null;
}

export interface PersonnelPersonSummary {
	name?: string | null;
	mail?: string | null;
}

export interface PersonnelItem {
	id: string;
	person: PersonnelPersonSummary;
}

export async function listPersonnel(baseUrl: string, projectId: string, contractId: string, init?: RequestInit) {
	const response = await fetch(`${baseUrl}/projects/${projectId}/contracts/${contractId}/personnel`, init);
	if (!response.ok) throw new Error(`Contract Personnel API failed: ${response.status}`);
	return (await response.json()) as PagedResponse<PersonnelItem>;
}
```

## C# HttpClient defaults
- Preferred backend stack:
	- `AddFusionIntegrationCore(environment)`
	- `AddFusionIntegrationHttpClient("contract-personnel-client", setup)`
	- service resolution through a Fusion endpoint key when available
- Suggested client class: `ContractPersonnelApiClient`
- Suggested DTOs: `PersonnelItem`, `ContractItem`, `RoleAssignmentDto`
- Keep V2 controller DTOs distinct from V1 DTOs.
- Starter shape:

```csharp
public sealed class ContractPersonnelApiClient(HttpClient httpClient)
{
		public async Task<PagedResponse<PersonnelItem>?> GetPersonnelAsync(string projectId, string contractId, CancellationToken cancellationToken)
				=> await httpClient.GetFromJsonAsync<PagedResponse<PersonnelItem>>($"projects/{projectId}/contracts/{contractId}/personnel", cancellationToken);
}

public sealed record PagedResponse<T>(int TotalCount, int Count, IReadOnlyList<T> Value);

public sealed record PersonnelPersonSummary(string? Name, string? Mail);

public sealed record PersonnelItem(string Id, PersonnelPersonSummary Person);
```

## Suggested local models
- `PersonnelItem`
- `ContractItem`
- `AssignRoleRequestDto`
- `RecertificationItem`

## Representative model snapshots
- `PersonnelItem`: personnel `id` plus nested person identity/contact summary
- `ContractItem`: contract id, title/reference, project binding
- `CreatePersonnelRequestDto`: person reference, start/end dates, and assignment metadata
- `RoleAssignmentDto`: personnel/contract role assignment payload

## Validation highlights
- `CreatePersonnelRequestRequest.Person` is required
- `CreatePersonnelRequestRequest.StartDate` is required
- `CreatePersonnelRequestRequest.EndDate` is required and must be after `StartDate`

## Versioning notes
- V2 variants exist for selected controller surfaces; preserve versioned contracts in client code.
