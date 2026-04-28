# Contract Personnel API Endpoint Catalog

This catalog covers the verified public contract-personnel surface for projects, contracts, personnel, delegates, requests, role assignments, change log, recertifications, affiliate sponsors, and valid-company/domain lookups. Subscription, cache, migration, and other operational controllers remain excluded.

## Project and contract endpoints
- `GET /projects` → `ApiProjectReference[]`
- `GET /projects/{projectIdentifier}/contracts` (v`2.0`) → `ApiPagedCollection<ApiContractV2>`
	OData: `Expand(personnel, delegates)`
- `POST /projects/{projectIdentifier}/contracts` (v`2.0`) → `AllocateContractRequest` → `ApiContractV2`
- `OPTIONS /projects/{projectIdentifier}/contracts` → access probe, `204 NoContent`
- `GET /projects/{projectIdentifier}/contracts/{contractIdentifier}` (v`2.0`) → `ApiContractV2`
	OData: `Expand(personnel, delegates)`
- `PATCH /projects/{projectIdentifier}/contracts/{contractIdentifier}` (v`2.0`) → `PatchContractRequest` → `ApiContractV2`
- `OPTIONS /projects/{projectIdentifier}/contracts/{contractIdentifier}` → access probe, `204 NoContent`
- `GET /contracts` (v`2.0`) → `ApiPagedCollection<ApiContractV2>`
	OData: `Filter(endDate)`, `Expand(personnel, delegates)`

## Personnel endpoints
- `GET /projects/{projectIdentifier}/contracts/{contractIdentifier}/personnel` (v`1.0`) → `ApiPagedCollection<ApiPersonnel>`
	OData: `Filter(person.mail, person.name, person.azureUniquePersonId, person.accountStatus)`, `Expand(roleAssignments)`
- `GET /projects/{projectIdentifier}/contracts/{contractIdentifier}/personnel` (v`1.1-preview`) → `ApiPagedCollection<ApiPersonnel>`
	Adds deleted-account enrichment and duplicate-account hints.
- `GET /projects/{projectIdentifier}/contracts/{contractIdentifier}/personnel/{personnelId}` → `ApiPersonnel`
- `DELETE /projects/{projectIdentifier}/contracts/{contractIdentifier}/personnel/{personnelId}` → `204 NoContent`
- `PATCH /projects/{projectIdentifier}/contracts/{contractIdentifier}/personnel/{personnelId}/person` → `PatchPersonRequest` → `ApiPersonnel`
- `OPTIONS /projects/{projectIdentifier}/contracts/{contractIdentifier}/personnel` → access probe, `204 NoContent`
- `OPTIONS /projects/{projectIdentifier}/contracts/{contractIdentifier}/personnel/{personnelId}` → access probe, `204 NoContent`
- `OPTIONS /projects/{projectIdentifier}/contracts/{contractIdentifier}/personnel/{personnelId}/person` → access probe, `204 NoContent`

## Delegate endpoints
- `GET /projects/{projectIdentifier}/contracts/{contractIdentifier}/delegates` → `ApiPagedCollection<ApiDelegate>`
	OData: `Filter(classification, validTo)`
- `GET /projects/{projectIdentifier}/contracts/{contractIdentifier}/delegates/{delegateId}` → `ApiDelegate`
- `POST /projects/{projectIdentifier}/contracts/{contractIdentifier}/delegates` → `CreateDelegateRequest` → `ApiDelegate`
- `PATCH /projects/{projectIdentifier}/contracts/{contractIdentifier}/delegates/{delegateId}` → `PatchDelegateRequest` → `ApiDelegate`
- `DELETE /projects/{projectIdentifier}/contracts/{contractIdentifier}/delegates/{delegateId}` → `204 NoContent`
- `OPTIONS /projects/{projectIdentifier}/contracts/{contractIdentifier}/delegates` → access probe, `204 NoContent`
- `OPTIONS /projects/{projectIdentifier}/contracts/{contractIdentifier}/delegates/{delegateId}` → access probe, `204 NoContent`

## Personnel request endpoints
- `GET /projects/{projectIdentifier}/contracts/{contractIdentifier}/requests` → `ApiPagedCollection<ApiPersonnelRequest>`
	OData: `Expand(originalPersonnel)`, `Filter(state, category, originalPersonnelId, updated, created, person.mail, person.name, person.azureUniquePersonId)`
- `GET /projects/{projectIdentifier}/contracts/{contractIdentifier}/requests/{requestId}` → `ApiPersonnelRequest`
- `POST /projects/{projectIdentifier}/contracts/{contractIdentifier}/requests` → `CreatePersonnelRequestRequest` → `ApiPersonnelRequest`
- `DELETE /projects/{projectIdentifier}/contracts/{contractIdentifier}/requests/{requestId}` → `204 NoContent`
- `POST /projects/{projectIdentifier}/contracts/{contractIdentifier}/requests/{requestId}/approve` → `ApiPersonnelRequest`
- `POST /projects/{projectIdentifier}/contracts/{contractIdentifier}/requests/{requestId}/reject` → `RejectPersonnelRequestRequest` → `ApiPersonnelRequest`
- `OPTIONS /projects/{projectIdentifier}/contracts/{contractIdentifier}/requests` → access probe, `204 NoContent`
- `OPTIONS /projects/{projectIdentifier}/contracts/{contractIdentifier}/requests/{requestId}` → access probe, `204 NoContent`
- `OPTIONS /projects/{projectIdentifier}/contracts/{contractIdentifier}/requests/{requestId}/approve` → access probe, `204 NoContent`
- `OPTIONS /projects/{projectIdentifier}/contracts/{contractIdentifier}/requests/{requestId}/reject` → access probe, `204 NoContent`

## Role endpoints
- `GET /roles` → `ApiRole[]`
- `GET /projects/{projectIdentifier}/contracts/{contractIdentifier}/role-assignments` → `ApiPersonRoleAssignment[]`
- `GET /projects/{projectIdentifier}/contracts/{contractIdentifier}/personnel/{personnelId}/role-assignments` → `ApiRoleAssignment[]`
- `POST /projects/{projectIdentifier}/contracts/{contractIdentifier}/personnel/{personnelId}/role-assignments` → `AssignRoleRequest` → `ApiPersonRoleAssignment`
- `DELETE /projects/{projectIdentifier}/contracts/{contractIdentifier}/personnel/{personnelId}/role-assignments/{roleAssignmentId}` → `204 NoContent`
- `OPTIONS /roles` → access probe, `204 NoContent`
- `OPTIONS /projects/{projectIdentifier}/contracts/{contractIdentifier}/role-assignments` → access probe, `204 NoContent`
- `OPTIONS /projects/{projectIdentifier}/contracts/{contractIdentifier}/personnel/{personnelId}/role-assignments` → access probe, `204 NoContent`

## Change log endpoints
- `GET /change-log` → `ApiPagedCollection<ApiChangeLog>`
	OData: `Filter(projectMaster.id, contract.id, performedBy.azureUniqueId, performedBy.name, performedBy.mail, performed, action, source)`, `Search`, `Top(100)`, `Skip`
- `GET /projects/{projectIdentifier}/contracts/{contractIdentifier}/change-log` → `ApiPagedCollection<ApiChangeLog>`
	OData: `Filter(performedBy.azureUniqueId, performedBy.name, performedBy.mail, performed, action)`, `Search`, `Top(100)`, `Skip`
- `OPTIONS /change-log` → access probe, `204 NoContent`
- `OPTIONS /projects/{projectIdentifier}/contracts/{contractIdentifier}/change-log` → access probe, `204 NoContent`

## Recertification endpoints
- `GET /recertifications` → `ApiPagedCollection<ApiRecertification>`
	OData: `Filter(contractId, projectMasterId)`, `Top(1000)`, `Skip`
- `GET /recertification-errors` → `ApiPagedCollection<ApiRecertificationError>`
	OData: `Filter(contractId, projectMasterId)`, `Top(1000)`, `Skip`

## Affiliate sponsor endpoints
- `GET /projects/{projectIdentifier}/contracts/{contractIdentifier}/affiliate-sponsors` → `ApiPagedCollection<ApiAffiliateSponsor>`
- `GET /affiliate-sponsors` → `ApiPagedCollection<ApiAffiliateSponsor>`
	OData: `Filter(contractId)`
- `POST /affiliate-sponsors` → `CreateAffiliateSponsorsRequest` → `ApiAffiliateSponsor[]`
- `DELETE /affiliate/{affiliateAzureUniqueId}/sponsor/{sponsorAzureUniqueId}` → `204 NoContent`
- `OPTIONS /affiliate-sponsors` → access probe, `204 NoContent`

## Valid company and domain endpoints
- `GET /projects/{projectIdentifier}/contracts/{contractIdentifier}/valid-companies` → `ApiValidCompany[]`
- `GET /projects/{projectIdentifier}/contracts/{contractIdentifier}/valid-companies/{companyId}` → `ApiValidCompany`
- `POST /projects/{projectIdentifier}/contracts/{contractIdentifier}/valid-companies` → `CreateValidCompanyRequest` → `ApiValidCompany`
- `DELETE /projects/{projectIdentifier}/contracts/{contractIdentifier}/valid-companies/{companyId}` → `204 NoContent`
- `OPTIONS /projects/{projectIdentifier}/contracts/{contractIdentifier}/valid-companies` → access probe, `204 NoContent`
- `OPTIONS /projects/{projectIdentifier}/contracts/{contractIdentifier}/valid-companies/{companyId}` → access probe, `204 NoContent`
- `GET /projects/{projectIdentifier}/contracts/{contractIdentifier}/valid-domains` → `ApiValidDomain[]`
- `GET /projects/{projectIdentifier}/contracts/{contractIdentifier}/valid-domains/{domainId}` → `ApiValidDomain`
- `POST /projects/{projectIdentifier}/contracts/{contractIdentifier}/valid-domains` → `CreateValidDomainRequest` → `ApiValidDomain`
- `DELETE /projects/{projectIdentifier}/contracts/{contractIdentifier}/valid-domains/{domainId}` → `204 NoContent`
- `OPTIONS /projects/{projectIdentifier}/contracts/{contractIdentifier}/valid-domains` → access probe, `204 NoContent`
- `OPTIONS /projects/{projectIdentifier}/contracts/{contractIdentifier}/valid-domains/{domainId}` → access probe, `204 NoContent`

## Authorization notes
- Most routes enforce a combination of full-control, trusted-application, employee, contract-personnel, contract-responsibility, delegate-responsibility, or contract-management rules.
- Read vs write access differs significantly on contract-scoped resources, and many routes expose an `OPTIONS` probe to reveal the effective allow set.
- Delegate and request approval/rejection routes are more restricted than ordinary reads.

## Typical status codes
- `200 OK`
- `201 Created`
- `204 NoContent`
- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `409 Conflict`
- `424 FailedDependency` for upstream integration failures

## Explicit exclusions
- `SubscriptionController`
- `CacheController`
- migration, deleted-account, and other operational/admin-only flows not needed for normal integration work
- Source also exposes public `OPTIONS` probes for excluded route families such as contract migrations and project-masters; they remain out of this skill's normal integration catalog until the full route families are documented.
