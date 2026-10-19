# Evidence sources

Use each source for the claims it can establish. Semantic or indexed results point to evidence; they are never the final authority, because indexes lag GitHub and branches.

## Hierarchy by claim

| Claim | Authoritative source | How to read it |
| --- | --- | --- |
| What the PR changes | Local branch and diff | `git merge-base`, `git diff <base>...HEAD --stat`, `git log <base>..HEAD --oneline`, then focused `git diff` on key files |
| Validation results | Commands observed in this session, or CI checks on the PR | Session output; `gh pr checks <number>` for an existing PR |
| Decisions, boundaries, domain language | Repository docs on the base branch | ADRs (`docs/adr/`, `docs/decisions/`), specs, `CODEMAP.md`, README, contributor and help docs — use what the repository actually has |
| Scope, state, hierarchy, delivery history | Live GitHub issues and PRs | `gh`, GitHub MCP, or Fusion PM MCP (below) |
| Candidate relationships across sources | Optional semantic index the repository provides | Discovery only; verify every hit at its source |

Do not describe behavior that only exists in planning documents, issue bodies, or unmerged branches as implemented by this PR.

## Live GitHub tooling

Use whichever is available; all reads are non-mutating.

- **gh CLI**
  - Issue: `gh issue view <n> -R <owner/repo> --json title,state,body,labels,url`
  - PR: `gh pr view <n> -R <owner/repo> --json title,state,body,baseRefName,headRefName,closingIssuesReferences,url`
  - Search: `gh search issues "<terms>" -R <owner/repo>` and `gh search prs "<terms>" -R <owner/repo>`
  - Hierarchy: `gh issue view` shows parent and sub-issues in recent gh versions; otherwise use an MCP tool below
- **GitHub MCP server** (`github`): issue and PR read tools such as `issue_read`, `pull_request_read`, `search_issues`, and `search_pull_requests`. Client tool ids vary; match by server and tool name.
- **Fusion PM MCP** (`fusion-pm-mcp`): cached GitHub project-management reads that avoid rate limits — for example `issue_get`, `issue_parent_get`, `issue_children`, `issue_comments`, `pull_request_get`, and `artifact_search`. The tool surface has changed between deployments (older docs list `api_*` names such as `api_get_issue`), so check `tools/list` and use the names it returns. Cached results can be a few minutes stale; re-read with `gh` before relying on a state that just changed. Setup lives in the `fusion-pm-mcp` skill.

Cache what you read once per session and reuse it. Stop optional enrichment when rate-limited and continue with local evidence.

## Optional semantic search

Some repositories or teams provide a semantic index over issues, PRs, and docs (for example a doc2vec MCP server or Fusion MCP documentation search). When the repository's instructions name one, use it to discover related work:

1. Search with the feature language, behavior, role names, and known issue numbers from the diff.
2. Search shared architecture or platform sources when the change touches cross-repository ownership, authorization, or data contracts.
3. Refine once with terminology and identifiers from the first results.
4. Fetch the full chunk or document when an excerpt is not enough.

If the repository declares the index as required evidence and it is unavailable, report the missing prerequisite instead of silently substituting guesses or general web search.

## Relationship map

For each verified item, record its role before writing:

| Role | Meaning | Typical wording |
| --- | --- | --- |
| Owning work | Feature or story this PR advances | "Part of …", "Supports …" |
| Enabled work | Child or follow-up work this PR unblocks | "Enables …" |
| Baseline | Earlier PR or decision this builds on | "Builds on …", "Follows …" |
| Adopted external work | Framework, platform, or upstream change consumed here | "Adopts …" |

Distinguish issues from PRs; indexes and search results often mix them. Drop items whose relationship you cannot explain in one sentence.
