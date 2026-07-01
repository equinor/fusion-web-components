---
name: fusion-discover-skills
description: 'DEPRECATED: Use fusion-skills instead. This skill has been superseded by fusion-skills, which provides discover, sync, and author modes in a single orchestrator.'
license: MIT
compatibility: Deprecated. See fusion-skills.
metadata:
   version: "0.1.5"
   status: deprecated
   deprecated_at: "2026-03-21"
   successor: fusion-skills
   owner: "@equinor/fusion-core"
   tags:
      - fusion
      - skills
      - discovery
      - mcp
      - github
      - install
      - deprecated
   mcp:
      suggested:
         - mcp_fusion
         - mcp_fusion_search_skills
         - github
---

# Discover Fusion Skills (Deprecated)

> **Deprecated:** This skill has been superseded by `fusion-skills`.
> Use the `discover` mode of `fusion-skills` instead. All functionality from this skill is available there.
> Install: `npx -y skills add equinor/fusion-skills fusion-skills`

## When to use

Use this skill when a user needs to discover which Fusion skill fits a task or wants MCP-backed guidance for installing, updating, or removing a skill.

Typical triggers:
- "find a skill for this"
- "what Fusion skill should I use?"
- "is there a skill for GitHub issue authoring?"
- "how do I install the right Fusion skill?"
- "how do I update or remove installed Fusion skills?"
- "what skills are available for this workflow?"

## When not to use

Do not use this skill for:
- creating or editing skills in a repository
- doing the underlying task directly instead of helping with discovery
- guessing skill matches when discovery data is unavailable
- automatically installing, updating, or removing skills without the user's request

## Required inputs

Collect before responding:
- the user's goal or query in their own words
- the intended action: `query`, `install`, `update`, or `remove`
- the kind of skill the user is looking for: domain, workflow, or desired outcome
- the active agent/client name when install guidance is needed and not already obvious
- any constraints that materially change the recommendation, such as target runtime or repository context

If key inputs are missing, ask only the smallest question needed to resolve the intent.
Use `references/follow-up-questions.md` for clarifying vague requests about which skill or workflow the user wants.

## Instructions

If subagents are available, use the bundled advisor agents for specific discovery scenarios:
- `agents/fusion-mcp-advisor.md` when Fusion MCP is available — this is the primary discovery path
- `agents/github-mcp-advisor.md` when Fusion MCP is unavailable but GitHub MCP search is available
- `agents/github-raw-search-advisor.md` as a final fallback using read-only CLI and GraphQL inspection

If the runtime does not support bundled agents, follow the same workflow inline as described below.

Main workflow:

1. Detect the user's intent.
   - Treat broad "what skill fits this?" requests as `query`.
   - Treat "install/add", "update/check updates", and "remove/uninstall" requests as explicit lifecycle intent.
   - If the request mixes discovery and lifecycle steps, prioritize discovery first, then include the lifecycle guidance that follows from the selected skill.
2. Ask follow-up questions when the target skill is still unclear.
   - If the request is vague, ask a minimal clarifying question about the task, domain, or workflow they want help with.
   - Prefer questions that narrow the search space quickly: what they are trying to do, whether they want to discover, install, update, or remove a skill, and whether they already know a likely area such as GitHub workflow, MCP setup, or skill authoring.
   - Use `references/follow-up-questions.md` as the default question bank.
3. Ask for missing agent context only when needed.
   - If the user wants install guidance and the active agent is not clear, ask which agent/client the command should target.
   - Do not ask for agent details for plain discovery requests.
4. Query Fusion MCP first when available.
   - For source-backed discovery of what skills exist and what they do, call `mcp_fusion_search_skills` with the user's wording. This uses semantic search over the local skills index.
   - If `mcp_fusion_search_skills` results are weak or ambiguous, follow up with `mcp_fusion_skills` — it can reason about intent, resolve ambiguous names, and provide richer advisory context.
   - For lifecycle operations (install, update, remove), call `mcp_fusion_skills` with explicit `intent` set.
   - Use auto intent detection on `mcp_fusion_skills` by default when the intent is ambiguous.
   - Pass `agent` for install intent when known so the advisory command is directly usable.
   - Start with a small ranked set, usually top 3 to top 5 results.
5. Fall back to GitHub-backed discovery when Fusion MCP is unavailable or too weak.
   - Prefer GitHub MCP repository or search tools when they are available in the current client.
   - Otherwise use read-only shell-based inspection against trusted sources only, such as `npx skills add --list <source>`, local `skills/**/SKILL.md` searches, `gh search code`, or `gh api graphql` against the catalog repository.
   - Use GraphQL only when structured repository data is needed and the higher-level MCP or search tools do not expose it cleanly.
   - GraphQL read queries cost at least 1 point; keep `first`/`last` small (≤ 30) and avoid nested connections to minimize point cost. Do not retry on rate-limit errors; surface the failure and suggest retrying later.
   - Budget awareness: a typical skill-discovery session should need at most 2–3 GitHub API calls (one search + one or two content reads). If the first search returns weak results, do one refinement pass and stop — do not loop.
   - Treat GitHub-derived lifecycle guidance as fallback guidance unless Fusion MCP returned an explicit advisory command.
   - Never use remote-script execution patterns or shell pipelines that execute fetched content.
6. Do one refinement pass when the first result set is weak.
   - Rephrase the query with clearer domain keywords from the user's request.
   - Stop after one refinement pass; do not keep searching indefinitely.
7. Return actionable results.
   - For each recommended skill, include:
     - skill name
     - one-sentence purpose
     - why it matches the user's task
     - the next best action
   - When MCP returns lifecycle guidance, relay the advisory command or instruction exactly, including any placeholder that still needs user input.
   - When fallback discovery is used instead, label the source clearly as GitHub MCP, shell listing, code search, or GraphQL-derived guidance.
   - When a skill is selected, include enough usage guidance that the user can proceed without another discovery round.
8. Handle low-confidence or no-match outcomes explicitly.
   - Say that no strong match was found or that the recommendation is uncertain.
   - If there are near matches, present them as tentative.
   - Suggest the next best action: broaden the query, continue without a skill, or capture the gap for future skill authoring.
9. Keep the response scoped to discovery.
   - Do not install, update, or remove anything unless the user explicitly asks you to execute that step.
   - If Fusion MCP is unavailable, say so clearly and identify which GitHub-backed fallback path was used instead of inventing catalog results.

## Examples

- User: "Find a Fusion skill for GitHub issue authoring."
  - Result: return `fusion-issue-authoring`, explain that it routes to issue-type-specific skills, and include the install guidance or next step returned by MCP.
- User: "How do I update my installed Fusion skills?"
  - Result: call `mcp_fusion_skills` with `intent: update` and return the advisory update command or instructions from MCP.
- User: "Is there a skill for this obscure workflow?"
   - Result: if Fusion MCP is unavailable or yields weak matches, use GitHub-backed fallback discovery, say whether the match is tentative, and suggest the next best action.

## Expected output

Return:
- detected intent (`query`, `install`, `update`, or `remove`)
- source used for the recommendation (`mcp_fusion_skills`, GitHub MCP, shell listing, code search, or GraphQL fallback)
- ranked skill suggestions when available
- concise description of each recommended skill
- next-step guidance for the chosen result
- advisory install/update/remove command when MCP provides one
- clear uncertainty language and a fallback next action when no strong match exists

## Agents

Helper agents for specific discovery scenarios (when subagents are available):

- [agents/fusion-mcp-advisor.md](agents/fusion-mcp-advisor.md) — use when Fusion MCP is available
- [agents/github-mcp-advisor.md](agents/github-mcp-advisor.md) — use when Fusion MCP is unavailable but GitHub MCP is available
- [agents/github-raw-search-advisor.md](agents/github-raw-search-advisor.md) — use as final fallback with read-only CLI/GraphQL

## References

- [references/follow-up-questions.md](references/follow-up-questions.md) — clarifying questions for vague requests

## Safety & constraints

Never:
- invent skill names, availability, or install/update/remove commands
- present low-confidence matches as certain
- use remote-script execution patterns or unsafe shell pipelines during fallback discovery
- mutate the user's environment unless they explicitly ask you to execute the next step

Always:
- prefer Fusion MCP first, then GitHub MCP, then read-only shell or GraphQL fallback
- keep suggestions concise and task-focused
- preserve any advisory command text exactly when MCP returns it
- label GitHub-derived fallback guidance clearly when MCP was not the source
- state uncertainty plainly when the evidence is weak
