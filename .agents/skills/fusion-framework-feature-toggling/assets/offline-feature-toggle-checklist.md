# Offline Feature-Toggle Checklist

Use this checklist when Fusion MCP is unavailable and you still need grounded guidance for a Fusion Framework feature flag.

## Scope choice

- [ ] Confirm the request is really about Fusion Framework feature toggling.
- [ ] Decide whether the work is app-level or framework-level.
- [ ] Choose the likely entry point:
  - app-level: `enableFeatureFlag`
  - framework-level: `enableFeatureFlagging`

## Flag definition

- [ ] Define a stable key, preferably in an enum or shared constant.
- [ ] Add a human-readable `title`.
- [ ] Add a `description` when the flag will be surfaced in UI or review discussions.
- [ ] Decide whether the flag needs a typed `value` in addition to enabled or disabled.
- [ ] Verify whether the local code expects `readonly` or `readOnly` before committing the flag shape.

## Toggle source and behavior

- [ ] Decide whether the flag is local to the app or should participate in framework-level providers.
- [ ] If toggle state should persist locally, inspect `createLocalStoragePlugin`.
- [ ] If query-string toggling is useful, inspect `createUrlPlugin`.
- [ ] If the flag should not be user-togglable, verify the local read-only property name.

## Component usage

- [ ] Read the flag through `useFeature` instead of duplicating toggle state.
- [ ] Handle the disabled path explicitly.
- [ ] Handle missing feature data safely with null checks.
- [ ] If the flag exposes a `value`, test both enabled and disabled rendering paths.

## Rollout and cleanup

- [ ] Record an owner for the flag.
- [ ] State what event or milestone should remove the flag.
- [ ] Test the application with the flag both on and off.
- [ ] Remove the flag definition, consumers, and dead branches together when the rollout ends.

## Fallback evidence path

If you need a public-source refresher while still offline, start with:
- `references/public-framework-reference.md`