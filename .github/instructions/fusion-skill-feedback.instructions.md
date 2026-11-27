---
description: Offer to raise an issue when a Fusion skill is wrong, outdated, or missing.
applyTo: "**"
---

# Offer to improve Fusion skills

- Notice when a Fusion skill from `equinor/fusion-skills` is wrong, outdated, or missing a step, or contradicts the repository or its sources. Also notice when a recurring task has no skill.
- Interactive sessions: ask the user at a natural pause, not mid-task, whether to raise an issue to improve Fusion skills. Describe the gap in one or two sentences, with evidence. Ask once per finding.
- Automated runs: stay within authorized task scope under host runtime policy; record follow-ups/findings in the delivery report. Do not start a separate issue workflow unless authorized.
- When issue drafting is authorized:
  - a failure or wrong output goes to `fusion-skills` → `agents/warden.agent.md` in report mode, as a bug for `equinor/fusion-skills`;
  - missing guidance or a new skill idea goes to `fusion-issue-authoring`, routed as `equinor/fusion-skills` contributor guidance says.
- Draft first; the active host runtime owns publication approval. Interactive sessions require explicit user confirmation; automated runs use only host-granted publishing authority.
- Never patch installed skill copies under `.agents/skills/`; improvements belong in `equinor/fusion-skills`.
