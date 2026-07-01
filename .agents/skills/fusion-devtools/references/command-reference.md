# Command reference

Compact reference for all fdev commands relevant to agentic workflows.

## Authentication

```bash
fdev login                    # Interactive Azure AD login (browser)
fdev login --client-secret    # Service principal login
```

## REST API calls

```bash
fdev rest <serviceKey> '<path>' [options]
fdev rest --url <fullUrl> [options]
```

| Option | Short | Description |
|---|---|---|
| `--method` | `-m` | HTTP method (GET, POST, PUT, PATCH, DELETE). Default: GET |
| `--body` | `-b` | Request body. Prefix with `@` for file: `-b @body.json` |
| `--header` | | Add header: `--header Content-Type=application/xml` |
| `--env` | `-e` | Environment: ci, fqa, fprd (default: fprd) |
| `--scope` | | Override OAuth scope |
| `--url` | | Full URL mode (skip service discovery) |
| `--no-auth` | | Skip token acquisition |
| `--token` | | Use a specific bearer token |
| `--output-file` | `-o` | Save response body to file |
| `--verbose` | | Show request/response headers and cache diagnostics |
| `--no-cache` | | Bypass service discovery cache |

## Token acquisition

```bash
fdev get-access-token [options]
```

| Option | Description |
|---|---|
| `--service-key` | Resolve scope from service discovery (e.g. `people`, `context`, `org`) |
| `--scope` | Explicit OAuth scope |
| `--env` | Environment for service key resolution (default: fprd) |

Output: JSON with `accessToken`, `expiresOn`, `expiresOnUnix`, `scope`, `tokenType`.

```bash
fdev token [--prod]           # Quick token to clipboard (test env default)
```

## Service discovery

```bash
fdev disc envs                         # List environments
fdev disc env list <env>               # List services in environment
fdev disc env list <env> -json         # JSON output
fdev disc env list <env> -out ku       # Show key + URI columns
```

## Person resolution

```bash
fdev persons resolve <email>           # Resolve by email or UPN
fdev persons search "<name>"           # Search by name
```

## PIM access elevation

```bash
fdev pim azure activate               # Activate eligible Azure PIM role
```

**Safety: always confirm with user before running PIM activation.**

## Common service keys (examples — verify with discovery)

These are typical service keys. Keys may change as services are added, renamed, or retired. Always verify with `fdev disc env list <env> -json | jq '.[].key'`.

| Key | Service | Typical path prefix |
|---|---|---|
| `people` | People / Persons API | `/persons/` |
| `context` | Context API | `/contexts/` |
| `org` | Org / Positions API | `/projects/` or `/positions/` |
| `notifications` | Notifications API | `/persons/{id}/notifications/` |
| `reports` | Reports API | `/reports/` |
| `tasks` | Tasks API | `/tasks/` |
| `apps` | Apps / Bundles API | `/apps/` or `/bundles/` |
| `bookmarks` | Bookmarks API | `/persons/{id}/bookmarks/` |
| `roles` | Roles API | `/roles/` |

Use `fdev disc env list fprd -json | jq '.[].key'` to get the full list of service keys for an environment.

## Environment mapping

| fdev env key | Azure environment | Portal URL |
|---|---|---|
| `ci` | Test / Development | `https://fusion.ci.fusion-dev.net` |
| `fqa` | QA / Pre-production | `https://fusion.fqa.fusion-dev.net` |
| `fprd` | Production | `https://fusion.equinor.com` |

## Global options

| Option | Description |
|---|---|
| `--verbose` | Verbose output (cache diagnostics, request details) |
| `--no-cache` | Bypass SQLite cache for service discovery |
