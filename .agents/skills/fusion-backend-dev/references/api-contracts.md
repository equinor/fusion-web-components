# API Contracts & Versioning

## Fusion Service API Structure

All Fusion backend services follow a consistent REST API pattern:

### Base Pattern

Routes use absolute paths without a version prefix. API version is supplied via query string or header — not as a URL segment.

```
GET    /resources                        # List resources
GET    /resources/{id}                   # Get single resource
POST   /resources                        # Create resource
PATCH  /resources/{id}                   # Partial update
DELETE /resources/{id}                   # Delete resource
```

Version negotiation: `?api-version=3.0` (query string) or `api-version: 3.0` (request header).

### Versioning Strategy

Fusion services use `Asp.Versioning` with a custom `HeaderOrQueryVersionReader`. Version is negotiated via:

- **Query string**: `?api-version=3.0` (preferred)
- **Request header**: `api-version: 3.0`

`AssumeDefaultVersionWhenUnspecified` is enabled, so unversioned requests receive the default version.

Version levels:
- **Major version**: Incompatible changes (breaking changes to response shape, required fields, semantics)
- **Minor version**: Non-breaking enhancements (new optional fields, new endpoints)

### Error Response Format

Fusion services return errors as RFC 7807 `ProblemDetails` with Fusion-specific extensions:

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "error": {
    "code": "ModelValidationError",
    "message": "Model contained 1 error"
  },
  "errors": {
    "email": ["Email format is invalid"]
  },
  "traceId": "...",
  "timestamp": "2026-04-17T10:30:00Z"
}
```

> See [validation-patterns.md](./validation-patterns.md) for the full error format reference, including domain errors, authorization errors, and retry guidance.

### Authorization Header

All requests (except health checks) require:

```
Authorization: Bearer {access_token}
```

The access token is a JWT obtained from Azure AD. Scope required depends on the endpoint.

---

## Common API Contracts

### People Service

**Endpoint**: `GET /persons/{personId}?api-version=3.0`

Route attribute: `[HttpGet("/persons/{personId}")]` with `[MapToApiVersion("3.0")]`. Also supports `GET /persons/me`.

**Response** (illustrative — verify exact shape in the service's Swagger/OpenAPI spec):
```json
{
  "azureUniqueId": "bbe7b3e5-b1da-4a3f-a0b8-7f7f8f8f8f8f",
  "name": "John Doe",
  "mail": "john.doe@equinor.com",
  "accountType": "Employee",
  "department": "Engineering",
  "fullDepartment": "TDI PRD ENG TSE"
}
```

Supports OData expansion: `?$expand=roles,positions,contracts,manager` (v3) and additionally `companies` (v4).

**Required scope**:
- Delegated (user token): `api://{resource-app-id}/user_impersonation`
- App-only (client credentials): `api://{resource-app-id}/.default`

Verify the actual resource App ID URI for the People service in your environment.

**Authentication**: Azure AD access token

---

### LineOrg Service

**Endpoint**: `GET /org-units/{orgUnitId}`

The Org service handles projects, positions, and contracts (`/projects/{id}/positions/...`). The org-unit hierarchy (departments, management chain) is served by the **LineOrg** service.

**Response** (illustrative — verify exact shape in the service's Swagger/OpenAPI spec):
```json
{
  "sapId": "51234",
  "name": "Engineering",
  "fullDepartment": "TDI PRD ENG TSE",
  "shortName": "TSE",
  "level": 5,
  "children": []
}
```

Supports OData expansion: `?$expand=children,management`.

**Required scope**:
- Delegated: `api://{resource-app-id}/user_impersonation`
- App-only: `api://{resource-app-id}/.default`

Verify the actual resource App ID URI for the LineOrg service in your environment.

---

### Context Service

**Endpoint**: `GET /contexts/{id}?api-version=1.0`

Route attribute: `[HttpGet("/contexts/{id}")]` with `[ApiVersion("1.0")]`. Also supports `GET /contexts` with OData filter/search and `GET /contexts/{id}/relations`.

**Response** (illustrative — verify exact shape in the service's Swagger/OpenAPI spec):
```json
{
  "id": "ctx-uuid",
  "title": "Project Alpha",
  "type": { "id": "ProjectMaster", "isCustom": false },
  "externalId": "external-ref",
  "isActive": true
}
```

**Required scope**:
- Delegated: `api://{resource-app-id}/user_impersonation`
- App-only: `api://{resource-app-id}/.default`

Verify the actual resource App ID URI for the Context service in your environment.

---

## Integration Points

### REST API Consumption

Most common for:
- Frontend applications reading data
- External integrations (webhooks, periodic sync)
- Service-to-service calls via typed HTTP clients

### Event Subscription

Available for:
- Real-time updates (Person promoted, Context created)
- Async integration with other systems
- Workflow triggers

See `async-patterns.md` for event details.

---

## Rate Limiting

Fusion services may apply rate limiting, but quotas, headers, and retry behavior can vary by service and environment.

Common patterns include:
- **Exceeded**: `429 Too Many Requests`, sometimes with a `Retry-After` header
- **Headers**: Some services or gateways may expose headers such as `X-RateLimit-Remaining`
- **Quotas**: Request limits are service-specific; verify exact limits in the target API/OpenAPI documentation

---

## Pagination

Endpoints supporting large result sets use OData-style offset pagination with `$top` and `$skip`. The standard paged response envelope is:

```json
{
  "totalCount": 245,
  "count": 50,
  "@nextPage": "/resources?$top=50&$skip=50&api-version=1.0",
  "@prevPage": null,
  "value": [ /* items */ ]
}
```

| Field | Description |
| --- | --- |
| `totalCount` | Total matching items (ignoring paging) |
| `count` | Items in this page |
| `@nextPage` | Relative URL for next page (`null` when on last page) |
| `@prevPage` | Relative URL for previous page (omitted on first page) |
| `value` | Array of result items |

**Common query parameters**:
- `$top=50` — page size (max varies by endpoint, e.g. 100 for notifications)
- `$skip=0` — offset into result set
- `$filter=field eq 'value'` — OData filter (allowed fields declared per endpoint)
- `$search=term` — full-text search (where supported)
- `$orderby=field asc` — sort order (where supported)

> **Note:** Not all endpoints support pagination. Some return the full collection directly as an array. Check the target endpoint's OpenAPI/Swagger spec for the actual response shape and supported query parameters.

---

## When Contracts Change

### Breaking Changes
- New required field
- Removed field
- Changed field type or semantics
- New mandatory query parameter

**Action**: New major version (e.g., `api-version=4.0`); keep the old version available according to the target service's documented compatibility or deprecation policy

### Non-Breaking Changes
- New optional field
- New optional query parameter
- New operation/endpoint

**Action**: Increment minor version in header; no URL change required
