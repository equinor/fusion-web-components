# Security

## High Risk Rating — False Positive

`fusion-devtools` receives a High Risk rating from static analysis (e.g. Snyk) due to token-handling patterns in the reference documentation. This document explains what the skill does and does not do.

### What triggers the rating

Two code examples in `references/agentic-patterns.md` match credential-in-shell-variable heuristics:

**Pattern 2 — Get a token for external tools:**
```bash
TOKEN=$(fdev get-access-token --service-key people | jq -r '.accessToken')
curl -H "Authorization: Bearer $TOKEN" "$BASE_URL/persons/me?api-version=3.0"
```

**Pattern 7 — Chain discovery with token for scripting:**
```bash
TOKEN=$(fdev get-access-token --service-key org | jq -r '.accessToken')
curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/projects?api-version=3.0" | jq '.value | length'
```

Static analyzers flag `TOKEN=$(...)` combined with `Authorization: Bearer $TOKEN` as potential credential exposure. The skill documentation already cautions:
> "Prefer `fdev rest` with `--url` when possible — it handles tokens internally without exposing them. Use the variable approach only when another tool must make the HTTP call."

### What the skill does NOT do

- Does not store or log tokens outside the local shell session
- Does not hardcode credentials or secrets anywhere in the skill files
- Does not execute code — it is documentation only (no scripts)
- Does not make network requests itself; it describes CLI usage patterns

### Why the token pattern is safe

The token is a short-lived Azure AD bearer token obtained interactively via `fdev login` (browser-based Azure AD flow) or service principal login. It exists only as a local shell variable for the duration of the command and is never written to disk. The skill also includes a safety reminder:
> "Redact tokens: when showing output to users, truncate or mask `accessToken` values."

### Reporting a vulnerability

Do not create a public GitHub issue. Follow the Equinor Responsible Disclosure Policy at https://www.equinor.com/about-us/csirt.
