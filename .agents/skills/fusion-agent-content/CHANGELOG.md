# Changelog

## 0.1.1 - 2026-10-18

### patch

- [#285](https://github.com/equinor/fusion-skills/pull/285) [`8fa30e1`](https://github.com/equinor/fusion-skills/commit/8fa30e119d3959c4691c5e099b15bc6724e7794e) - Provide shared Handlebars partials and agent fill rules; convert the content skeleton while preserving its reader-facing shape and runtime metadata fallbacks.


  resolves equinor/fusion-core-tasks#2432
  resolves equinor/fusion-core-tasks#2434
  resolves equinor/fusion-core-tasks#2435

## 0.1.0 - 2026-10-18

### minor

- [#267](https://github.com/equinor/fusion-skills/pull/267) [`61368e8`](https://github.com/equinor/fusion-skills/commit/61368e87f0c882c267c365278f124a9b0a8a63fd) - Add an experimental skill that shapes agent-written text for people


  - Gives issues, PR descriptions, review replies, comments, verdicts, and reports one shape: a small banner naming the agent, tool, model, and reasoning effort (never guessed), a TL;DR in a quote block, human-first prose under the repository template, folded details, and a folded **References and evidence** block listing the skills, skill references, and sources used.
  - References issues and pull requests as `owner/repo#123` so GitHub shows their title and state, keeping Markdown links for files, docs, and external pages.
  - Includes writing guidance with a before-and-after example, rules for what to fold and what must stay visible, a content skeleton, and a pre-post checklist.
