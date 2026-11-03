## Human-first output

Issue bodies are read by people first. When `fusion-agent-content` is installed, shape the body with it. Otherwise follow this outline, which the fallback templates already carry:
- First line: `<sub>🤖 Drafted by <agent> (<tool>) · <model> · <effort> reasoning</sub>`; without custom agent, write `Drafted with GitHub Copilot`. Before fallback, resolve authoring-turn model/effort through supplied runtime metadata then bounded supported lookup per [shared fill rules](../assets/partials/agent-content/README.md#resolve-drafter-metadata). Keep verified fields independently; unresolved model says `model not reported`, unresolved effort omitted. Never guess.
- A quoted TL;DR (`> **TL;DR:** ...`) of one to three sentences with the outcome and the ask. Skip it when the first template section already is the summary, such as a task's `Objective`.
- The template headings, in order, in plain prose. Keep acceptance criteria, decisions, risks, and blocking dependencies visible.
- A folded `Details` block for supporting material, then a folded `References and evidence` block last, listing the skills, references, and evidence used.
- With a repository template, keep its headings and add the banner, TL;DR, and folded blocks around them.
