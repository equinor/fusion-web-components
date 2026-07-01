---
name: fusion-devtools
description: 'Use Fusion DevTools CLI (fdev) for API testing, token acquisition, service discovery, and person lookup during development. USE FOR: calling Fusion REST APIs, getting access tokens as JSON, discovering services and environments, resolving persons, PIM role activation. DO NOT USE FOR: modifying backend service code, deploying services, infrastructure changes, CI/CD pipeline configuration, or Service Bus operations.'
license: MIT
compatibility: >
  Requires fdev installed as a .NET global tool
  (dotnet tool install --global --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" fusion-devtools).
  Requires Azure AD login (fdev login).
  Works best alongside fusion-backend-dev for understanding API contracts before calling them.
metadata:
  version: "0.1.0"
  status: active
  owner: "@equinor/fusion-core"
  tags:
    - fusion
    - devtools
    - cli
    - rest-api
    - token
    - service-discovery
    - debugging
    - testing
---

# Fusion DevTools

## When to use

Use when you need to interact with Fusion platform services from the command line — calling APIs, getting tokens, discovering services, or looking up persons.

Typical triggers:
- "Call the People API"
- "Get a token for the context service"
- "Which services are available in production?"
- "Test this endpoint"
- "Resolve this person's Azure ID"
- "What's the base URL for the org service?"
- "Get me an access token I can pipe to jq"

Implicit triggers:
- Agent needs to verify an API contract or response shape
- Agent needs a bearer token for an HTTP request
- Agent needs to find which service key maps to a URL
- Agent needs to look up a person's identity for test data

## When not to use

- Modifying backend service source code — use the service repo directly
- Deploying or publishing services — use CI/CD pipelines
- Infrastructure provisioning — use Terraform/Bicep
- Service Bus / SignalR debugging — use Azure portal or dedicated tooling
- Managing AI search indexes — separate ops concern

## Prerequisites

Install fdev as a .NET global tool:

```bash
dotnet tool install --global --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" fusion-devtools
```

Update to latest:

```bash
dotnet tool update --global --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" fusion-devtools
```

Authenticate before first use:

```bash
fdev login
```

## Core workflows

### 1 — Call a Fusion REST API

Use `fdev rest` to call any Fusion service. Service discovery resolves the base URL and acquires a token automatically.

```bash
fdev rest <serviceKey> '<path>'
```

The path must be quoted in zsh/bash to prevent `?` glob expansion.

**Examples:**

```bash
# GET from people service (production)
fdev rest people '/persons/me?api-version=3.0'

# POST with JSON body
fdev rest context '/contexts?api-version=1.0' -m post -b '{"query":"test"}'

# POST with body from file
fdev rest people '/persons/search?api-version=3.0' -m post -b @request.json

# Different environment
fdev rest people '/persons/me?api-version=3.0' -e ci

# Save response to file
fdev rest people '/persons/me?api-version=3.0' -o response.json

# Full URL mode (skip discovery)
fdev rest --url https://httpbin.org/get --no-auth

# Custom scope override
fdev rest people '/persons/me?api-version=3.0' --scope api://my-app/.default
```

Key options: `-m` method, `-b` body (`@file` supported), `-e` environment, `--url` full URL mode, `--no-auth` skip auth, `--scope` override scope, `-o` output file, `--header KEY=VALUE`.

### 2 — Get an access token

Use `fdev get-access-token` for structured JSON token output, similar to `az account get-access-token`. Output is pipe-friendly.

```bash
# Token for a specific service (resolves scope via discovery)
fdev get-access-token --service-key people

# Token with explicit scope
fdev get-access-token --scope api://97978493-9777-4d48-b38a-67b0b9cd88d2/.default

# Extract just the token
fdev get-access-token --service-key people | jq -r '.accessToken'
```

Output format:

```json
{
  "accessToken": "eyJ...",
  "expiresOn": "2026-05-15T12:00:00+00:00",
  "expiresOnUnix": 1778846400,
  "scope": "api://app-id/.default",
  "tokenType": "Bearer"
}
```

### 3 — Discover services and environments

```bash
# List all environments
fdev disc envs

# List services in an environment (JSON output)
# Note: disc subcommand uses single-dash flags (-json, -out) — this is by design
fdev disc env list fprd -json

# List services showing key and URI
fdev disc env list fprd -out ku
```

### 4 — Look up a person

```bash
# Resolve by email
fdev persons resolve user@equinor.com

# Search by name
fdev persons search "John"
```

### 5 — Activate PIM role

Elevate Azure access when needed for admin operations:

```bash
fdev pim azure activate
```

**Safety: always confirm with the user before running PIM activation — this grants elevated access.**

### 6 — Get a raw JWT token (clipboard)

For quick clipboard-based token workflows (existing command):

```bash
fdev token          # test environment token
fdev token --prod   # production token
```

## Instructions

### Step 1 — Confirm fdev is available

Before using any fdev command, verify it is installed:

```bash
fdev --version
```

If not installed, show the install command from Prerequisites. If authentication is needed, run `fdev login`.

### Step 2 — Choose the right command

| Need | Command |
|---|---|
| Call a Fusion API and see the response | `fdev rest <service> '<path>'` |
| Get a token for scripting/piping | `fdev get-access-token --service-key <key>` |
| Find available services | `fdev disc env list <env>` |
| Find service base URL and scope | `fdev disc env list <env> -json` then filter by key |
| Look up a person | `fdev persons resolve <email>` |
| Quick clipboard token | `fdev token` |

### Step 3 — Use verbose mode for debugging

Add `--verbose` to any command for diagnostic output including cache hit/miss, full request/response headers, and token details.

```bash
fdev rest people '/persons/me?api-version=3.0' --verbose
```

### Step 4 — Bypass cache when needed

Service discovery results are cached locally (environments: 24h, services: 1h). Use `--no-cache` to force fresh lookups:

```bash
fdev rest people '/persons/me?api-version=3.0' --no-cache
```

## Environments

| Key | Purpose | Notes |
|---|---|---|
| `ci` | Continuous integration / development | Least stable, latest changes |
| `fqa` | Quality assurance | Pre-production validation |
| `fprd` | Production | Default environment |

Default environment is `fprd` for all commands. Override with `-e <env>`.

## Reference guides

See `references/` for detailed command options and workflow recipes:

- `command-reference.md` — compact command cheat sheet with all options
- `agentic-patterns.md` — common agentic workflow recipes

## Safety

- This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.
- Never expose raw access tokens in output shown to users — truncate or redact when displaying
- Always quote paths containing `?` in shell commands to prevent glob expansion
- Use `--no-auth` only for genuinely public endpoints
- Confirm with the user before running `fdev pim azure activate` (elevated access)
- Do not store or log tokens to files unless explicitly requested
