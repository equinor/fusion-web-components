# REST request examples

SKILL.md environment, mutation approval and token/diagnostic gates apply before these commands.

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

## Diagnostic example

```bash
fdev rest people '/persons/me?api-version=3.0' --verbose
```
