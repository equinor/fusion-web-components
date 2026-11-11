# Token command examples

Never run JSON token commands with raw output visible or redirected to a file. Capture output only in memory; prefer internally authenticated REST. Clipboard commands require a caller-approved workflow compatible with the no-persistence policy; do not execute when caller policy forbids it. Samples below remain unchanged, not current token/lifetime guarantees.

### 2 — Get an access token

Use `fdev get-access-token` for structured JSON token output, similar to `az account get-access-token`. Output is pipe-friendly.

```bash
# Capture a token for a specific service in memory (resolves scope via discovery); nothing is printed
TOKEN="$(fdev get-access-token --service-key people | jq -r '.accessToken')"

# Same with an explicit scope
TOKEN="$(fdev get-access-token --scope api://97978493-9777-4d48-b38a-67b0b9cd88d2/.default | jq -r '.accessToken')"

# Use it without echoing it
curl -sS -H "Authorization: Bearer $TOKEN" "<service-url>/<path>"

# Inspect metadata only — never print accessToken
fdev get-access-token --service-key people | jq '{expiresOn, scope, tokenType}'
```

Output fields (the `accessToken` value is redacted here and must never be displayed):

```json
{
  "accessToken": "<redacted>",
  "expiresOn": "2026-05-15T12:00:00+00:00",
  "expiresOnUnix": 1778846400,
  "scope": "api://app-id/.default",
  "tokenType": "Bearer"
}
```

### 6 — Get a raw JWT token (clipboard)

For quick clipboard-based token workflows (existing command):

```bash
fdev token          # test environment token
fdev token --prod   # production token
```
