# Follow-up Questions

One question per agent, used only when intent is genuinely ambiguous. Ask nothing else until the answer resolves the route. Do not double-question the user — if the `fusion` main gate already asked a question, skip the top-level question here.

## Top-level routing (agent unclear)

Only if the user was NOT already routed from `fusion` with a partially resolved intent:

> "Are you looking to find a skill, install or update one, create your own, or report a problem with one?"

## `discovery.agent.md`

No question needed. Proceed directly.

## `greenkeeper.agent.md` (mode unclear)

> "Do you want to install or remove a specific skill, check for updates, or set up automated workflows?"

## `author.agent.md` (target unclear)

> "Do you want to create a new skill or improve an existing one?"

## `warden.agent.md` (mode unclear)

> "Do you want me to inspect a skill for quality issues, or report a failure with one?"
