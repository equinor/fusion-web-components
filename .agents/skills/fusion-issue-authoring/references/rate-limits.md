# Rate-limit detail

## Rate-limit fallback behavior

GitHub GraphQL limits (summary from https://docs.github.com/en/graphql/overview/rate-limits-and-query-limits-for-the-graphql-api):

| Limit | Value |
|---|---|
| Primary budget | 5,000 pts/hour per user (1,000 for `GITHUB_TOKEN` in Actions) |
| Mutation secondary cost | 5 pts per GraphQL mutation, 1 pt per read query |
| Secondary throughput | max 2,000 pts/minute; max 80 content-creating requests/minute |
| Concurrency | max 100 concurrent requests (shared REST + GraphQL) |
| Timeout | 10 s per request; timeout deducts extra points |

Behavior when limits are approached or hit:

- Check `x-ratelimit-remaining` and `retry-after` headers; respect the reset window.
- Stop optional label/assignee enrichments and avoid automatic retry loops.
- Pause at least 1 second between consecutive mutation calls.
- Preserve draft state and return a clear retry sequence to the user.
- Prefer MCP calls over ad hoc GraphQL retries when equivalent MCP tools are available.
- Never retry a request that returned a secondary rate-limit error without waiting for the `retry-after` period.

### Per-session budget estimate

A typical multi-issue authoring session with cache-first behavior:

| Activity | Calls (with caching) | Calls (without caching) |
|---|---|---|
| Label set fetch per repo | 1 | N × L (N issues × L labels each) |
| Issue-type lookup per org | 1 | N |
| Duplicate search per issue | N | N |
| Assignee lookup per session | 0–1 | N |
| Issue create/update | N | N |
| Sub-issue link | 0–N | 0–N |
| **Total for 3 issues, 3 labels each** | **~10** | **~25+** |

Stay under ~30 MCP calls per session for a typical 3-issue run. If the running total approaches this threshold, stop optional enrichment (extra label checks, assignee searches, duplicate re-scans) and proceed with the data already cached.
