# Changelog

## 0.1.5 - 2026-03-21

### patch

- [#113](https://github.com/equinor/fusion-skills/pull/113) [`d777366`](https://github.com/equinor/fusion-skills/commit/d777366fe6e1b710876a8e1abd2f311e3f4440c4) - Deprecate `fusion-discover-skills` in favour of `fusion-skills`


  All discovery, install, update, and remove functionality has been absorbed into the `discover` mode of `fusion-skills`. The skill is moved to `.deprecated/` with `metadata.status: deprecated` and `metadata.successor: fusion-skills`.

  Install the replacement: `npx -y skills add equinor/fusion-skills fusion-skills`

## 0.1.4 - 2026-03-21

### patch

- [#107](https://github.com/equinor/fusion-skills/pull/107) [`d75d8c6`](https://github.com/equinor/fusion-skills/commit/d75d8c60f15888fbe71340b53b2698f3361ac4c8) - Advertise `mcp_fusion_search_skills` for semantic discovery alongside advisory `mcp_fusion_skills`.


  - add `mcp_fusion_search_skills` to `mcp.suggested`
  - update compatibility line to distinguish source-backed search (`mcp_fusion_search_skills`) from advisory/lifecycle operations (`mcp_fusion_skills`)
  - update step 4 in instructions to route discovery to `mcp_fusion_search_skills` and lifecycle to `mcp_fusion_skills`

  Resolves equinor/fusion-core-tasks#834

## 0.1.3 - 2026-03-17

### patch

- [#85](https://github.com/equinor/fusion-skills/pull/85) [`c8ba3df`](https://github.com/equinor/fusion-skills/commit/c8ba3df924c5a712c835cdb9f4de44bac03b7ad4) - Make all GitHub-API-consuming skills more conservative with token usage.


  - `fusion-issue-authoring`: concrete session-cache flow for labels and assignee candidates; per-session budget table
  - `fusion-issue-solving`: expanded low-token strategy with session-cache references and budget awareness
  - `fusion-github-review-resolution`: token budget guidance for thread-heavy reviews; cache PR metadata once
  - `fusion-issue-task-planning`: session-cache delegation rules and batch-size warning for large task plans
  - `fusion-dependency-review`: explicit data-reuse rules across parallel advisor fan-out
  - `fusion-discover-skills`: tighter GraphQL budget and call-count cap for discovery sessions

  resolves equinor/fusion-core-tasks#797

## 0.1.2 - 2026-03-11

### patch

- [#76](https://github.com/equinor/fusion-skills/pull/76) [`3efc478`](https://github.com/equinor/fusion-skills/commit/3efc47886871a14b18eb9f68abd562a10c6cf277) - Tighten GraphQL fallback guidance in discover-skills to minimize point cost and avoid retries on rate-limit errors.


  - Require small `first`/`last` values and shallow connections for catalog queries
  - Do not retry on rate-limit errors; surface the failure and suggest retrying later

  resolves equinor/fusion-core-tasks#535

## 0.1.1 - 2026-03-10

### patch

- [#64](https://github.com/equinor/fusion-skills/pull/64) [`01ce2c7`](https://github.com/equinor/fusion-skills/commit/01ce2c748ddf31518deb8f8b75122cbe1fcc9586) - Fix missing trailing newlines in SKILL.md and follow-up-questions.md


  Resolves equinor/fusion-core-tasks#521

## 0.1.0 - 2026-03-10

### minor

- [#62](https://github.com/equinor/fusion-skills/pull/62) [`1f7d4f9`](https://github.com/equinor/fusion-skills/commit/1f7d4f99e32dcd0c15cb964888a0cdbb9fc58541) - Add an experimental MCP-backed skills discovery skill that routes user requests through the Fusion skills index and returns actionable next-step guidance.


  - Detect query, install, update, and remove intent before calling the skills MCP tool
  - Preserve advisory lifecycle commands exactly when MCP returns them
  - Allow GitHub MCP, shell listing, and GraphQL-backed discovery fallback when Fusion MCP is unavailable
  - Add a follow-up question bank for vague requests so discovery can narrow to the right skill before searching
  - Place the first iteration in the experimental skill lane
  - Require explicit low-confidence handling instead of guessed matches

  resolves equinor/fusion-core-tasks#412
