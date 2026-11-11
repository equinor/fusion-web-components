# Changelog

## 0.1.0 - 2026-11-08

### minor

- [#414](https://github.com/equinor/fusion-skills/pull/414) [`71cb0e8`](https://github.com/equinor/fusion-skills/commit/71cb0e8360ea675694a392ae3e9fd2d1c899571f) - Add a team progress/retro report type


  - New `progress` template: narrative standing, a feature-state chart, "Closed as done" items, a short needs-attention list with owners and options, retro prose and checkbox follow-ups. The metrics table and method notes are folded.
  - New `references/progress-reports.md`: precedence over agent-content, names before numbers, voice, recorded dates only, charts, length per period and a worked example.
  - Project status reports are no longer excluded from this skill.

  resolves equinor/fusion-core-tasks#2813

## 0.0.4 - 2026-11-01

### patch

- [#378](https://github.com/equinor/fusion-skills/pull/378) [`ca584cf`](https://github.com/equinor/fusion-skills/commit/ca584cff41be1622d5b98dd93371a6d3bdde3189) - Compress shared template fill guidance while preserving provenance, privacy and output rules.


  refs equinor/fusion-core-tasks#2678

- [#379](https://github.com/equinor/fusion-skills/pull/379) [`4182f37`](https://github.com/equinor/fusion-skills/commit/4182f3767407b11dbaa127c3c9b2820af15dd434) - Load core evidence rules on every report; read template context and visual guidance only when needed. Keep authoring, disclosure and visible-limitations boundaries explicit.


  resolves equinor/fusion-core-tasks#2677

## 0.0.3 - 2026-11-01

### patch

- [#363](https://github.com/equinor/fusion-skills/pull/363) [`f34c0d9`](https://github.com/equinor/fusion-skills/commit/f34c0d9dc7de15e59ec643407914e98ad8288245) - Shorten the description while keeping all nine assessment types, supplied-evidence scope and authoring-only exclusions. Route discussions of existing reports to fusion-general-greenkeeping instead of assessment authoring.


  resolves equinor/fusion-core-tasks#2668

## 0.0.2 - 2026-10-27

### patch

- [#336](https://github.com/equinor/fusion-skills/pull/336) [`bf60e9e`](https://github.com/equinor/fusion-skills/commit/bf60e9e76a812735b3ff0cde8140eb5604a506f7) - Sync shared provenance fill rules: resolve authoring-turn metadata before fallback,

  without bypassing authoring-only access restrictions. Preserve honest fallback,
  model-change and delegate attribution, and privacy limits.

  fixes equinor/fusion-skills#335

## 0.0.1 - 2026-10-24

### patch

- [#330](https://github.com/equinor/fusion-skills/pull/330) [`214ee2e`](https://github.com/equinor/fusion-skills/commit/214ee2e28b9b999985b7ad23d2d7a6268d83e162) - Add shared assessment report authoring with an evidence contract, nine domain

  templates and representative evaluations. Preserve caller-owned output boundaries
  and keep investigation and publishing outside authoring authority. Use optional
  evidence-grounded Mermaid visuals with textual explanations when useful to readers.

  refs equinor/fusion-core-tasks#2561
  resolves equinor/fusion-core-tasks#2562
  resolves equinor/fusion-core-tasks#2563
  resolves equinor/fusion-core-tasks#2564
  resolves equinor/fusion-core-tasks#2565
  resolves equinor/fusion-core-tasks#2566
  resolves equinor/fusion-core-tasks#2567
  resolves equinor/fusion-core-tasks#2568
  resolves equinor/fusion-core-tasks#2569
  resolves equinor/fusion-core-tasks#2570
  resolves equinor/fusion-core-tasks#2571
