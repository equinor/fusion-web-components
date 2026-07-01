# Agentic workflow patterns

Common recipes for coding agents using fdev in automated workflows.

## Pattern 1 — Verify API response shape

When an agent needs to confirm the actual response structure from a Fusion API:

```bash
# Fetch a real response and inspect its structure
fdev rest people '/persons/me?api-version=3.0' | jq 'keys'

# Get full response with headers for debugging
fdev rest people '/persons/me?api-version=3.0' --verbose
```

Use case: before generating client code or types, verify the actual API contract matches expectations.

## Pattern 2 — Get a token for external tools

When an agent needs a bearer token to pass to curl, httpie, or another HTTP client:

> Prefer `fdev rest` with `--url` when possible — it handles tokens internally without exposing them. Use the variable approach only when another tool must make the HTTP call.

```bash
# Extract token for use in other commands (short-lived, local shell variable only)
TOKEN=$(fdev get-access-token --service-key people | jq -r '.accessToken')
BASE_URL=$(fdev disc env list fprd -json | jq -r '.[] | select(.key=="people") | .uri')

# Use with curl
curl -H "Authorization: Bearer $TOKEN" "$BASE_URL/persons/me?api-version=3.0"
```

Use case: agent needs to call an endpoint not yet in service discovery, or needs fine-grained control over the HTTP request.

## Pattern 3 — Discover service base URL

When an agent needs to construct URLs for documentation or configuration:

```bash
# Find the base URL for a service
fdev disc env list fprd -json | jq '.[] | select(.key=="people") | .uri'

# List all service keys
fdev disc env list fprd -json | jq '.[].key'
```

Use case: generating app.config.ts service client registrations, updating documentation with correct endpoints.

## Pattern 4 — Resolve person identity

When an agent needs a person's Azure Object ID for test data or API calls:

```bash
# Resolve email to person details
fdev persons resolve user@equinor.com

# Search by name when email is unknown
fdev persons search "John Smith"
```

Use case: setting up test fixtures, looking up managers/owners, populating request bodies that require person identifiers.

## Pattern 5 — Test across environments

When validating that an API behaves consistently across environments:

```bash
# Compare responses across environments
fdev rest people '/persons/me?api-version=3.0' -e ci
fdev rest people '/persons/me?api-version=3.0' -e fqa
fdev rest people '/persons/me?api-version=3.0' -e fprd
```

Use case: debugging environment-specific issues, verifying deployments.

## Pattern 6 — POST with request body from file

When an agent generates a request payload and needs to send it:

```bash
# Write payload to temp file, send, then clean up
TMPFILE=$(mktemp /tmp/fdev-body.XXXXXX.json)
cat > "$TMPFILE" << 'EOF'
{
  "searchString": "test",
  "top": 5
}
EOF

fdev rest people '/persons/search?api-version=3.0' -m post -b @"$TMPFILE"
rm -f "$TMPFILE"
```

Use case: complex request bodies that are easier to construct as files than inline JSON.

## Pattern 7 — Chain discovery with token for scripting

Full scripted flow: discover service, get token, make authenticated calls:

```bash
# Get service info as JSON
SERVICE_INFO=$(fdev disc env list fprd -json | jq '.[] | select(.key=="org")')
BASE_URL=$(echo "$SERVICE_INFO" | jq -r '.uri')

# Get token for that service
TOKEN=$(fdev get-access-token --service-key org | jq -r '.accessToken')

# Make multiple calls with the same token
curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/projects?api-version=3.0" | jq '.value | length'
```

Use case: batch operations, scripted validation, integration testing.

## Safety reminders

- **Redact tokens**: when showing output to users, truncate or mask `accessToken` values
- **Quote paths**: always single-quote paths containing `?` or `&` to prevent shell expansion
- **Confirm PIM**: ask user before running `fdev pim azure activate`
- **Prefer --service-key**: over hardcoded scopes — service keys adapt to environment changes
- **Use --verbose**: for debugging, not in final agent output — it contains sensitive headers
