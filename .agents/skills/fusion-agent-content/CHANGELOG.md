# Changelog

## 0.2.1 - 2026-11-08

### patch

- [#414](https://github.com/equinor/fusion-skills/pull/414) [`71cb0e8`](https://github.com/equinor/fusion-skills/commit/71cb0e8360ea675694a392ae3e9fd2d1c899571f) - Name items instead of numbering them in agent-written content


  - Give each issue or PR its title on first mention; no lists of bare numbers.
  - Write ratios in words, explain board jargon once, state each fact once and write status without colour codes.
  - Write actions that readers own as task-list checkboxes with issue-ready titles. Add guidance for periodic reports.

  resolves equinor/fusion-core-tasks#2813

- [#413](https://github.com/equinor/fusion-skills/pull/413) [`ed61305`](https://github.com/equinor/fusion-skills/commit/ed61305aefd44f1d61c315ce0720250e37580432) - Hold agent-written posts to high signal to noise: the TL;DR names one ask for

  one group, and every visible line serves it or is a required-visible item
  (decisions, risks, breaking changes, validation, issue closure) for that ask.
  Each other ask gets its own fold, titled with the ask and its group, holding its
  full material and its own required-visible items; nothing dropped, follow-up
  drafts returned to the caller. Aggregate tables list items in the visible ask
  only. No "start here" maps or disclaimers about what the post is not. The
  content skeleton header carries the same rule.

  refs https://github.com/equinor/fusion-core-tasks/discussions/2462

## 0.2.0 - 2026-11-01

### minor

- [#383](https://github.com/equinor/fusion-skills/pull/383) [`9dd268f`](https://github.com/equinor/fusion-skills/commit/9dd268f19bf27e76c2b0371448ba47218a001c0d) - Shape content about many similar items and keep process narration out of view


  - Name the aggregate case: three or more similar items get a visible table, prose only for items that need a decision, and one shared caveat line. Tables that are the content no longer fold under Details.
  - Add a rule against process narration in the visible part, with a before-and-after example: write about the repository and the reader's decision, and turn environment gaps into one actionable line.
  - Add both rules to the pre-post checklist.

  resolves equinor/fusion-skills#380
  refs equinor/fusion-poc-greenkeeper#48

### patch

- [#378](https://github.com/equinor/fusion-skills/pull/378) [`ca584cf`](https://github.com/equinor/fusion-skills/commit/ca584cff41be1622d5b98dd93371a6d3bdde3189) - Compress shared template fill guidance while preserving provenance, privacy and output rules.


  resolves equinor/fusion-core-tasks#2678

- [#387](https://github.com/equinor/fusion-skills/pull/387) [`9b01ad2`](https://github.com/equinor/fusion-skills/commit/9b01ad236790db3caa7c2269e0af5d2bd1da65dc) - Load prose and folding guides only when needed; preserve required framing, provenance and pre-post checks.


  resolves equinor/fusion-core-tasks#2684

## 0.1.3 - 2026-11-01

### patch

- [#363](https://github.com/equinor/fusion-skills/pull/363) [`f34c0d9`](https://github.com/equinor/fusion-skills/commit/f34c0d9dc7de15e59ec643407914e98ad8288245) - Shorten the description while keeping human-readable GitHub text, provenance, TL;DR, audience handoff and publication exclusions.


  resolves equinor/fusion-core-tasks#2668

## 0.1.2 - 2026-10-27

### patch

- [#336](https://github.com/equinor/fusion-skills/pull/336) [`bf60e9e`](https://github.com/equinor/fusion-skills/commit/bf60e9e76a812735b3ff0cde8140eb5604a506f7) - Resolve authoring-turn runtime model and effort before provenance fallback.

  Bound lookups, preserve independent fields and attribute model changes and delegates
  without exporting private session data.

  fixes equinor/fusion-skills#335

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
