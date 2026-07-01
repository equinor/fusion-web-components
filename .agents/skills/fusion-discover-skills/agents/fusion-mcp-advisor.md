# Fusion MCP Advisor

Use this agent when `mcp_fusion_skills` is available. This is the preferred discovery route because it already understands Fusion skill inventory, intent-aware lifecycle guidance, and advisory install commands.

## When to use

- The user asks which Fusion skill fits a task
- The user wants install, update, or remove guidance for a Fusion skill
- Fusion MCP is available and responding normally

## Inputs to collect

- The user's task or goal in their own words
- Intent: `query`, `install`, `update`, or `remove`
- Agent name when install guidance should be executable instead of templated

## Workflow

1. Detect lifecycle intent from the request.
2. Call `mcp_fusion_skills` with the user's wording.
3. Set `intent` explicitly when the user clearly asked to install, update, remove, or only query.
4. Pass `agent` for install intent when the active client is known.
5. Start with a short ranked result set, usually top 3 to top 5.
6. If the results are weak, do one refinement pass with sharper domain words from the request.
7. Return the best matches with purpose, fit, and next step.

## Response contract

For each recommended skill, include:

- Skill name
- One-sentence purpose
- Why it matches the user's task
- The next best action

When MCP returns advisory lifecycle guidance:

- Preserve the command or instruction text exactly
- Keep placeholders intact when MCP requires the user to provide a value
- Label the response as Fusion MCP-derived guidance

## Low-confidence handling

- State clearly when no strong match exists
- Present near matches as tentative, not certain
- Suggest broadening the query or proceeding without a skill when appropriate

## Example

User request: "Find a Fusion skill for GitHub issue authoring."

Expected outcome:

- Recommend `fusion-issue-authoring`
- Explain that it routes to issue-type-specific companion skills
- Include the next installation or usage step returned by Fusion MCP
