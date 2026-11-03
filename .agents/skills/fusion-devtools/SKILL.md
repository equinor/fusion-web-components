---
name: fusion-devtools
description: 'Uses Fusion DevTools CLI (fdev) for API testing. USE FOR: Fusion REST calls, JSON access tokens, service/environment discovery, person lookup and PIM role activation. DO NOT USE FOR: backend code (use fusion-developer-service), deployments, infrastructure, CI/CD setup, Service Bus operations, unconfirmed PIM activation or exposing tokens or secrets.'
license: MIT
compatibility: >
  Requires fdev installed as a .NET global tool
  (dotnet tool install --global --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" fusion-devtools).
  Requires Azure AD login (fdev login).
  Works best alongside fusion-core-services for understanding API contracts before calling them.
metadata:
  version: "0.1.4"
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

Interact with Fusion services through CLI: call APIs, get tokens, discover services/environments, resolve persons or activate PIM.

Typical triggers:
- "Call the People API"
- "Get a token for the context service"
- "Which services are available in production?"
- "Test this endpoint"
- "Resolve this person's Azure ID"
- "What's the base URL for the org service?"
- "Get me an access token I can pipe to jq"

Implicit triggers: verify API contract/response shape, acquire bearer token for HTTP request, map service key to URL, or resolve identity for test data.

## When not to use

- Backend source changes — use service repo directly
- Deployment/publishing or CI/CD setup — use pipelines
- Database provisioning/migrations — use `fusion-infra-cli`; Roles V2 bindings/config — use `fusion-roles-cli`
- Non-database infrastructure — use Terraform/Bicep
- Service Bus / SignalR debugging — use Azure portal/dedicated tools
- AI search index management

## Required inputs

Operation, target environment, service key or URL, quoted path/method/body, person identity or token scope as applicable. Default environment is `fprd` for all commands; select explicitly and override with `-e <env>` (`ci`, `fqa`, `fprd`). Clipboard token commands have separate test/production behavior.

## Safety

- This skill is mutation-capable. Repository-local workflow instructions take precedence over inline guidance when they conflict.
- Default to read-only. Confirm remote writes before POST/PUT/PATCH/DELETE or other mutations; confirm with user before `fdev pim azure activate` because it grants elevated access.
- Never print, expose, log or persist raw tokens/secrets. JSON token output stays in memory; never show raw acquisition output or pipe extracted tokens to visible output. Report only redacted/truncated metadata.
- Prefer `fdev rest` (including `--url` when suitable) for internal token handling; acquire tokens for another client only when necessary. Prefer `--service-key` over hardcoded scopes.
- Verbose diagnostics include full request/response headers and token details. Avoid credential-bearing tool output; sanitize before sharing, never display raw verbose output.
- Always quote paths containing `?` or `&` in zsh/bash to prevent shell expansion. Use `--no-auth` only for genuinely public endpoints.
- On failed/uncertain writes, reconcile current state before retry; do not assume nothing changed.
- Follow caller filesystem/secret rules rather than conflicting example mechanics. Do not run token/clipboard examples that would print or persist tokens.

## Instructions

### Step 1 — Confirm fdev is available

```bash
fdev --version
```

When missing/outdated, read `references/setup.md` and show exact install/update command. Authenticate with `fdev login` before first use or when needed.

### Step 2 — Choose the right command

| Need | Command |
|---|---|
| Call a Fusion API and see the response | `fdev rest <service> '<path>'` |
| Get a token for scripting/piping | `fdev get-access-token --service-key <key>` |
| Find available services | `fdev disc env list <env>` |
| Find service base URL and scope | `fdev disc env list <env> -json` then filter by key |
| Look up a person | `fdev persons resolve <email>` |
| Quick clipboard token | `fdev token` |

For PIM, use `fdev pim azure activate` only after explicit confirmation.
REST discovery resolves base URL and acquires token automatically:

```bash
fdev rest <serviceKey> '<path>'
```

- When forming REST requests beyond basic GET, read `references/rest-examples.md` for methods, file bodies, environment/output/full-URL/scope examples and diagnostic command.
- When acquiring JSON or clipboard tokens, read `references/token-examples.md` for exact commands/output fields, subject to memory-only handling above.
- When discovering services, resolving persons, activating PIM or choosing unfamiliar flags, read `references/command-reference.md` for options, examples, verified service keys and environment mapping. Discovery uses deliberate single-dash `-json` / `-out` flags.
- When composing API verification, external-client token, discovery, identity, cross-environment or file-body workflows, read `references/agentic-patterns.md` for recipes; apply Safety before executing examples.

### Step 3 — Use verbose mode for debugging

Use `--verbose` only with safe, sanitized diagnostic handling above.

### Step 4 — Bypass cache when needed

Discovery cache: environments 24h, services 1h. Use `--no-cache` for fresh lookups:

```bash
fdev rest people '/persons/me?api-version=3.0' --no-cache
```

## Reference guides

Bundled `references/` (`command-reference.md`, `agentic-patterns.md`) load only under conditions above.

## Expected output

Sanitized API response/shape, service keys/base URLs/environment, resolved person identifiers or redacted token metadata; approved PIM/write outcome when applicable. Report command, selected environment, failures, approval blockers and unknown state. Never return raw tokens or imply unrun commands succeeded.
