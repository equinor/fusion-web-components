# MCP JSON-RPC payload snippets

Use these snippets when users need direct MCP requests to verify or explore the hosted Fusion MCP server (`https://mcp.api.fusion.equinor.com/mcp`).

> **Note:** In VS Code, tool invocations are handled automatically. Raw JSON-RPC is useful for direct debugging or scripted smoke tests.
>
> **Auth:** The hosted server requires an OAuth bearer token. Raw requests without a valid token will receive `401 Unauthorized`. Use an authenticated HTTP client (for example VS Code REST Client with an Entra token, or `curl` with `Authorization: Bearer <token>`) — or invoke tools through VS Code where auth is handled automatically.

---

## Tool inventory

| Tool | Purpose |
|---|---|
| [`search`](#toolscall--search) | Generic search against any configured index |
| [`search_framework`](#toolscall--search_framework) | Search Fusion Framework source, TSDoc, cookbooks, and Storybook docs |
| [`search_docs`](#toolscall--search_docs) | Search Fusion platform docs, ADRs, blog posts, and incident reports |
| [`search_backend_code`](#toolscall--search_backend_code) | Search .NET/C# source from Fusion backend services |
| [`search_eds`](#toolscall--search_eds) | Search EDS (Equinor Design System) component docs and usage examples |
| [`search_indexes`](#toolscall--search_indexes) | Discover configured indexes and get routing guidance |

---

## `initialize`

Initialize an MCP session and receive server capabilities.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "initialize",
	"params": {
		"protocolVersion": "2024-11-05",
		"clientInfo": {
			"name": "fusion-mcp-snippets",
			"version": "0.0.0-dev"
		}
	}
}
```

Expected response shape:

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"protocolVersion": "2024-11-05",
		"capabilities": { "tools": {} },
		"instructions": "..."
	}
}
```

---

## `tools/list`

List all available MCP tools.

```json
{
	"jsonrpc": "2.0",
	"id": 2,
	"method": "tools/list",
	"params": {}
}
```

Expected response shape:

```json
{
	"jsonrpc": "2.0",
	"id": 2,
	"result": {
		"tools": [
			{ "name": "search" },
			{ "name": "search_framework" },
			{ "name": "search_docs" },
			{ "name": "search_backend_code" },
			{ "name": "search_eds" },
			{ "name": "search_indexes" }
		]
	}
}
```

---

## `tools/call` → `search`

**Generic search against any configured index.**

Use when you know exactly which index to target and want full control over parameters. For most cases prefer the index-specific tools (`search_framework`, `search_docs`, etc.) which apply the correct index and promoted field filters automatically.

Required: `index`, `query`

| Parameter | Type | Default | Description |
|---|---|---|---|
| `index` | string | — | Index alias: `fusion-framework`, `fusion-docs`, `eds`, `backend-code` |
| `query` | string | — | Search text |
| `top` | integer | 5 | Max results returned |
| `filter` | string | — | OData filter expression |
| `useEmbeddings` | boolean | true | Enable vector search |
| `useMmr` | boolean | false | Apply MMR reranking for diversity |
| `mmrLambda` | number | 0.5 | MMR relevance-diversity balance (0–1) |
| `fetchK` | integer | max(top, nearestNeighbors) | Candidate fetch size before reranking |
| `nearestNeighbors` | integer | top | Vector nearest-neighbor count |
| `vectorField` | string | — | Vector field override |

```json
{
	"jsonrpc": "2.0",
	"id": 3,
	"method": "tools/call",
	"params": {
		"name": "search",
		"arguments": {
			"index": "fusion-framework",
			"query": "service discovery",
			"top": 5
		}
	}
}
```

Expected response shape:

```json
{
	"jsonrpc": "2.0",
	"id": 3,
	"result": {
		"content": [{ "type": "text", "text": "..." }],
		"structuredContent": {
			"index": "fusion-framework",
			"query": "service discovery",
			"top": 5,
			"result": [
				{
					"pageContent": "...",
					"metadata": { "type": "tsdoc", "pkg_name": "..." }
				}
			]
		}
	}
}
```

---

## `tools/call` → `search_framework`

**Search the Fusion Framework index.**

Covers TypeScript source (TSDoc), markdown docs, Storybook stories, and cookbooks from the `equinor/fusion-framework` repository. Supports promoted field filters for precise scoping.

Required: `query`

| Parameter | Type | Description |
|---|---|---|
| `query` | string | Search text |
| `type` | string | Document type: `markdown`, `tsdoc`, `storybook`, `cookbook` |
| `pkg_name` | string | Package name filter, e.g. `@equinor/fusion-framework-react` |
| `ts_kind` | string | TypeScript declaration kind: `ArrowFunction`, `InterfaceDeclaration`, `TypeAliasDeclaration`, etc. |
| `tags` | string[] | Tags filter (AND semantics): `package`, `react`, `module`, `cookbook`, `cli`, `app`, `utils`, `changelog` |
| `source_dir` | string | Top-level source directory: `packages`, `cookbooks` |
| `top` | integer | Max results (default 5) |
| `filter` | string | Additional raw OData filter |
| `useMmr` | boolean | MMR reranking for diversity |

```json
{
	"jsonrpc": "2.0",
	"id": 4,
	"method": "tools/call",
	"params": {
		"name": "search_framework",
		"arguments": {
			"query": "how to register a service",
			"pkg_name": "@equinor/fusion-framework-react",
			"type": "tsdoc",
			"top": 5
		}
	}
}
```

---

## `tools/call` → `search_docs`

**Search Fusion platform documentation.**

Covers platform guidance, architecture decision records (ADRs), blog posts, and incident reports from the Fusion documentation site.

Required: `query`

| Parameter | Type | Description |
|---|---|---|
| `query` | string | Search text |
| `type` | string | Document type filter, e.g. `markdown` |
| `tags` | string[] | Tags filter (AND semantics): `docs`, `blog`, `adr`, `decision`, `incident` |
| `top` | integer | Max results (default 5) |
| `filter` | string | Additional raw OData filter |
| `useMmr` | boolean | MMR reranking for diversity |

```json
{
	"jsonrpc": "2.0",
	"id": 5,
	"method": "tools/call",
	"params": {
		"name": "search_docs",
		"arguments": {
			"query": "authentication flow for Fusion apps",
			"tags": ["docs"],
			"top": 5
		}
	}
}
```

---

## `tools/call` → `search_backend_code`

**Search .NET/C# source from Fusion backend services.**

Covers backend service code indexed from Fusion repositories. Supports filtering by repository, service/project, declaration kind (class, interface, method, etc.), and namespace.

Required: `query`

| Parameter | Type | Description |
|---|---|---|
| `query` | string | Search text: class names, method signatures, namespaces, patterns |
| `repository` | string | Repository filter, e.g. `fusion-core-services` |
| `service` | string | Service/project filter within a repository |
| `declarationKind` | string | Declaration kind: `class`, `interface`, `method`, `enum`, `record` |
| `namespace` | string | Namespace prefix filter (prefix match) |
| `top` | integer | Max results (default 5) |
| `useMmr` | boolean | MMR reranking for diversity |

```json
{
	"jsonrpc": "2.0",
	"id": 6,
	"method": "tools/call",
	"params": {
		"name": "search_backend_code",
		"arguments": {
			"query": "IPersonService",
			"declarationKind": "interface",
			"top": 5
		}
	}
}
```

---

## `tools/call` → `search_eds`

**Search the Equinor Design System (EDS) index.**

Covers EDS component documentation, props, usage examples, and accessibility guidance.

Required: `query`

| Parameter | Type | Description |
|---|---|---|
| `query` | string | Search text |
| `top` | integer | Max results (default 5) |
| `useMmr` | boolean | MMR reranking for diversity |

```json
{
	"jsonrpc": "2.0",
	"id": 7,
	"method": "tools/call",
	"params": {
		"name": "search_eds",
		"arguments": {
			"query": "Button component accessibility",
			"top": 5
		}
	}
}
```

---

## `tools/call` → `search_indexes`

**Discover configured indexes and get routing guidance.**

Returns metadata for all configured indexes, including descriptions and optional markdown guide content. Use this to understand which index to target for a given query.

No required parameters.

| Parameter | Type | Description |
|---|---|---|
| `index` | string | Optional — filter to one index by name |
| `includeMarkdown` | boolean | Include markdown guide content (default true) |

```json
{
	"jsonrpc": "2.0",
	"id": 8,
	"method": "tools/call",
	"params": {
		"name": "search_indexes",
		"arguments": {
			"includeMarkdown": false
		}
	}
}
```

Expected response shape:

```json
{
	"jsonrpc": "2.0",
	"id": 8,
	"result": {
		"content": [{ "type": "text", "text": "..." }],
		"structuredContent": {
			"total": 4,
			"indexes": [
				{
					"name": "fusion-framework",
					"description": "...",
					"guideCount": 1
				},
				{
					"name": "fusion-docs",
					"description": "...",
					"guideCount": 1
				},
				{
					"name": "eds",
					"description": "...",
					"guideCount": 1
				},
				{
					"name": "backend-code",
					"description": "...",
					"guideCount": 1
				}
			]
		}
	}
}
```

