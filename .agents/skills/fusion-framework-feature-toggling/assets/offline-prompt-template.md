# Offline Prompt Template

Use this template when Fusion MCP is unavailable and you want grounded Copilot help with a Fusion Framework feature flag.

```md
I need help with feature toggling in Fusion Framework.

Goal:
- add / review / remove a feature flag for: <feature description>

Current layer:
- app-level (`@equinor/fusion-framework-react-app/feature-flag`)
- framework-level (`@equinor/fusion-framework-module-feature-flag`)
- not sure yet

Current code or target file:
```ts
<paste the relevant config, hook usage, or component code>
```

Questions to answer:
- Should this use `enableFeatureFlag` or `enableFeatureFlagging`?
- Where should the feature key live?
- Do I need local storage or URL plugin support?
- How should I consume this through `useFeature`?
- What rollout, ownership, and cleanup steps should I plan?

Constraints:
- <package/version constraints>
- <testing constraints>
- <rollout or cleanup deadline>

Please ground the answer in Fusion Framework feature-flag APIs and call out any ambiguity that I should verify locally.
```