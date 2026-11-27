---
description: Keep work within the goal, requirements, and non-goals of the issue in scope.
applyTo: "**"
---

# Work stays within its issue

- Before each new piece of work, check it against the in-scope issue's goal, requirements, and non-goals. Without an issue, the user's request sets the bounds.
- Work the issue needs is in scope, including the tests, docs, and changesets the repository requires. Follow-up ideas, unrelated refactors, and pre-existing problems are not, unless the issue covers them.
- Interactive sessions: ask the user before work would step outside those bounds. Describe it in one or two sentences, and ask whether to:
  - create a new issue for it with `fusion-issue-authoring`;
  - re-align the current issue to include it, updating the issue only after explicit user confirmation under host runtime policy;
  - or drop it.
- In interactive sessions, ask once per idea and follow the user's choice.
- Automated runs: stay within authorized task scope under host runtime policy; record follow-ups/findings in the delivery report. Leave out-of-scope work undone; the active host runtime owns approval for scope changes and remote publication.
