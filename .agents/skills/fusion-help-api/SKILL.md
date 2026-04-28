---
name: fusion-help-api
description: 'Guides developers and admins through direct interaction with the Fusion Help REST API — reading articles, FAQs, release notes, searching content, and managing help documentation programmatically. USE FOR: fetch help articles from API, integrate help content in app, search help content, manage help documentation via API, automate help content, build help tooling. DO NOT USE FOR: using the fhelp CLI tool (use fusion-help-docs skill), modifying Fusion.Services.Help backend code, or non-help-API tasks.'
license: MIT
compatibility: Requires authenticated HTTP client with Fusion bearer token. Works with any language or framework that can make REST calls.
metadata:
  version: "0.0.2"
  status: active
  owner: "@equinor/fusion-core"
  tags:
    - help-api
    - fusion-help
    - articles
    - release-notes
    - faq
    - search
    - integration
---

# Fusion Help API

Use this skill when a developer or admin needs to interact directly with the Fusion Help REST API — whether to read help content in their own app, build custom tooling, or automate content management.

## When to use

- App developer wants to display help articles, FAQs, or release notes inside their Fusion app
- Developer building a custom CLI or automation script to manage help content
- Admin wants to programmatically create, update, or delete help documentation
- Developer needs to search or suggest help content from their application
- Someone wants to understand the Help API endpoints, authentication, or data models
- Building an integration that reads help content for another system

## When not to use

- Using the `fhelp` CLI tool to sync markdown docs (use the `fusion-help-docs` skill instead)
- Modifying the Fusion.Services.Help backend service code
- General REST API questions unrelated to Help

## Required inputs

| Input | Required | Description |
|-------|----------|-------------|
| **Use case** | Yes | Reading content, managing content, or searching |
| **App key** | For scoped queries | The Fusion app key to read/manage help for |
| **Target environment** | Yes | `ci`, `fqa`, `tr`, or `fprd` |
| **Auth context** | Yes | User token (interactive) or service principal (automation) |

## Instructions

### 1. Discover the Help API base URL

The Help API is registered in the Fusion service discovery. Resolve the URL dynamically or use the known patterns:

| Environment | Base URL |
|-------------|----------|
| `ci` | `https://help.ci.api.fusion-dev.net` |
| `fqa` | `https://help.fqa.api.fusion-dev.net` |
| `fprd` | `https://help.api.fusion.equinor.com` |

**Dynamic discovery** (recommended for production tooling):

```
GET https://discovery.fusion.equinor.com/service-registry/environments/{env}/services
```

Look for the service with `key: "help"` in the response. Use the `uri` field as the base URL.

### 2. Authentication

All endpoints require a valid Azure AD bearer token. Token audiences and code samples for frontend, backend, and CLI are in [references/authentication.md](references/authentication.md).

Quick reference — token audiences:

| Environment | Resource ID (audience) |
|-------------|----------------------|
| `ci`, `fqa`, `tr` | `5a842df8-3238-415d-b168-9f16a6a6031b/.default` |
| `fprd` | `97978493-9777-4d48-b38a-67b0b9cd88d2/.default` |

### 3. Authorization levels

| Action | Who can do it |
|--------|---------------|
| **Read** articles, FAQs, release notes, search | Any authenticated Fusion user |
| **Create / Update / Delete** articles, FAQs, release notes | App admin, trusted app, or `Fusion.Help.FullControl` |
| **Upload assets** (images) | App admin, trusted app, or `Fusion.Help.FullControl` |
| **View changelog** (global) | `Fusion.Help.FullControl` only |
| **View changelog** (per app) | App admin or `Fusion.Help.FullControl` |

### 4. Call the API

Endpoints are versioned — include `?api-version=1.0` in requests. Resources: **Articles**, **FAQs**, **Release Notes**, **Assets**, **Search/Suggest**, **Changelog**.

For full CRUD details, request/response bodies, OData filters, and validation rules see [references/api-endpoints.md](references/api-endpoints.md).

For a compact endpoint matrix and OData cheat sheet see [references/api-quick-reference.md](references/api-quick-reference.md).

For detailed response model schemas see [references/response-models.md](references/response-models.md).

### 5. Integration patterns

Ready-to-use code samples for common scenarios (React component, release notes banner, FAQ search, C# backend automation, Python scripting) are in [references/integration-patterns.md](references/integration-patterns.md).

## Expected output

When this skill completes, the user should have:

- Working code to authenticate and call the Help API
- Correct endpoint URLs and query parameters for their use case
- Understanding of the response models and OData query options
- For admin use cases: correct request bodies for create/update/delete operations
- For integration patterns: sample code in the relevant language/framework

## Safety & constraints

- Read-only endpoints are safe for any authenticated user — no admin permissions needed
- Write operations require app admin, trusted application, or `Fusion.Help.FullControl`
- Deleted articles/FAQs/release notes are **soft-deleted** — their slugs cannot be reused
- The `sourceSystem` field tracks which tool created a record — mixing source systems for the same slug will cause the `fhelp` CLI to refuse updates (unless `--no-validation` is used)
- Always test against `ci` environment before targeting `fprd` (production)
- Do not hardcode bearer tokens — always use `DefaultAzureCredential` or equivalent token providers
- Image uploads must be PNG format; the API processes them into WebP for serving
