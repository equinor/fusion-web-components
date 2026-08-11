---
name: fusion-framework-feature-toggling
description: 'Guides developers using Fusion Framework feature flags with MCP-backed framework retrieval first and bundled public-source fallback assets when MCP is unavailable. USE FOR: helping with `enableFeatureFlag`, `enableFeatureFlagging`, `useFeature`, rollout/cleanup guidance, and finding Fusion Framework feature-flag examples. DO NOT USE FOR: generic SaaS flag platforms, backend-only rollout systems, or inventing framework APIs.'
license: MIT
compatibility: Works best with Fusion MCP access via `mcp_fusion_search_framework` or `mcp_fusion_search_docs`. When Fusion MCP is unavailable, this skill falls back to bundled public-source references and offline assets.
metadata:
  version: "0.1.1"
  status: deprecated
  deprecated_at: "2026-03-21"
  successor: fusion-app-react-dev
  owner: "@equinor/fusion-core"
  tags:
    - fusion
    - framework
    - feature-flag
    - feature-toggle
    - mcp
    - guidance
    - deprecated
  mcp:
    suggested:
      - mcp_fusion
---

> **Deprecated** — This skill has been merged into `fusion-app-react-dev`.
> Use `fusion-app-react-dev` and its reference `references/using-feature-flags.md` for all Fusion Framework feature-flag guidance.
> This skill is retained for historical context only and will be removed in a future release.

# Fusion Framework Feature Toggling

## When to use

Use this skill when a developer needs grounded help with feature toggling in Fusion Framework.

Typical triggers:
- "Help me add a feature flag to a Fusion Framework app"
- "How do I use useFeature in Fusion Framework?"
- "Which Fusion Framework feature-flag API should I use here?"
- "Review this Fusion feature toggle setup"
- "How should I roll out and later remove this Fusion feature flag?"

## When not to use

Do not use this skill for:
- generic LaunchDarkly or SaaS flag-platform setup
- backend-only rollout systems outside Fusion Framework
- inventing a new feature-toggle architecture without framework evidence
- non-Fusion React or frontend flagging guidance

## Required inputs

Collect before responding:
- whether the work is app-level or framework-level
- the developer's goal: add, review, debug, roll out, or remove a flag
- the intended feature key or feature description
- whether the flag needs persistence, URL control, or a typed value
- any current code context that should be adapted

If important inputs are missing, ask only the smallest question needed to choose the right framework surface.

## Instructions

1. Confirm the request is really about Fusion Framework feature toggling.
   - If the request is generic flag-platform work, do not force this skill.

2. Use Fusion MCP first when it is available.
   - Query `mcp_fusion_search_framework` with the user's wording plus feature-toggle terms such as `feature flag`, `feature toggling`, `useFeature`, `enableFeatureFlag`, or `enableFeatureFlagging`.
   - If the first result set is weak, do one refinement pass.
   - Use `mcp_fusion_search_docs` only when broader product guidance is needed beyond framework implementation details.

3. If Fusion MCP is unavailable or inconclusive, say so clearly and switch to the bundled fallback.
   - Use [references/public-framework-reference.md](references/public-framework-reference.md) as the fallback source of truth.
   - Use [assets/offline-feature-toggle-checklist.md](assets/offline-feature-toggle-checklist.md) and [assets/offline-prompt-template.md](assets/offline-prompt-template.md) for users who do not have the server.

4. Identify which help shape the user needs.
   - New flag setup: explain the configuration surface and show a minimal example.
   - Component usage: explain `useFeature`, toggle behavior, and value handling.
   - Review or rollout: apply the checklist and point out missing ownership, testing, or cleanup.
   - Removal: identify the flag definition, consumers, and dead branches that should be deleted together.

5. Prefer the currently evidenced Fusion Framework entry points.
   - App-level example: `enableFeatureFlag(appConfigurator, [...])` from `@equinor/fusion-framework-react-app/feature-flag`.
   - Framework-level example: `enableFeatureFlagging(config, builder => ...)` from `@equinor/fusion-framework-module-feature-flag`.
   - Plugin examples: `createLocalStoragePlugin` and `createUrlPlugin`.
   - Hook usage: `useFeature(key)` in the app package, or the provider-based `useFeature(provider, key)` variant in the framework package.

6. Call out public-source ambiguity instead of guessing.
   - Public sources currently show both `readonly` and `readOnly`; tell the user to verify the local type before finalizing code.
   - Public docs mention a future API-service direction for feature flags; do not present that as the current default unless live MCP or local code confirms it.

7. Give practical guidance, not just API names.
   - Prefer stable enum or constant keys over ad hoc string literals.
   - Include `title` and `description` when the flag is surfaced to users or reviewers.
   - Use `value` only when behavior needs configuration in addition to on/off state.
   - Keep flags easy to remove, define an owner, and call out the cleanup trigger.
   - Distinguish local app toggles from framework-wide or plugin-backed toggles.

8. Return a concise, evidence-backed answer.
   - State whether the guidance came from Fusion MCP or the bundled fallback.
   - Include the relevant package names and one concrete snippet or source path.
   - Include rollout, testing, and cleanup guidance.
   - End with any explicit uncertainty or verification step that still remains.

## Representative requests

- "Help me add a feature flag to a Fusion Framework app."
- "How do I use useFeature in Fusion Framework?"
- "Review this Fusion Framework feature toggle setup and tell me what cleanup I am missing."

## Expected output

Return:
- whether the guidance came from Fusion MCP or the bundled fallback
- the relevant Fusion Framework entry points and packages
- one concrete example snippet or source path to adapt
- a short implementation, rollout, and cleanup checklist
- explicit verification notes for any ambiguous API detail

## References

- [references/public-framework-reference.md](references/public-framework-reference.md)

## Assets

- [assets/offline-feature-toggle-checklist.md](assets/offline-feature-toggle-checklist.md)
- [assets/offline-prompt-template.md](assets/offline-prompt-template.md)

## Safety & constraints

Never:
- invent Fusion Framework packages, hooks, or module names
- pretend Fusion MCP results exist when the server is unavailable
- generalize SaaS feature-flag advice as if it were Fusion Framework behavior
- keep flags alive without calling out ownership and cleanup

Always:
- prefer Fusion MCP first, then the bundled public-source fallback
- separate confirmed framework APIs from general rollout guidance
- call out API or version ambiguity when public sources disagree
- keep examples small and easy to adapt