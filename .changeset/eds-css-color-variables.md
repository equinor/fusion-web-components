---
"@equinor/fusion-wc-avatar": major
"@equinor/fusion-wc-badge": major
"@equinor/fusion-wc-button": major
"@equinor/fusion-wc-checkbox": major
"@equinor/fusion-wc-chip": major
"@equinor/fusion-wc-divider": major
"@equinor/fusion-wc-list": major
"@equinor/fusion-wc-markdown": major
"@equinor/fusion-wc-page": major
"@equinor/fusion-wc-people": major
"@equinor/fusion-wc-person": major
"@equinor/fusion-wc-picture": major
"@equinor/fusion-wc-progress-indicator": major
"@equinor/fusion-wc-radio": major
"@equinor/fusion-wc-ripple": patch
"@equinor/fusion-wc-searchable-dropdown": major
"@equinor/fusion-wc-skeleton": major
"@equinor/fusion-wc-switch": major
"@equinor/fusion-wc-textarea": major
"@equinor/fusion-wc-textinput": major
---

Use EDS 2.x CSS colour variables so components follow light and dark colour schemes.

Component colours now use `var(--eds-color-…)` semantic variables from `@equinor/eds-tokens` 2.x instead of static `@equinor/fusion-web-theme` colour values and hard-coded colours. No colour literals remain: default values of `--fwc-*` colour custom properties change accordingly, the focus colour follows the EDS 2.x focus token, and shadows use `--eds-elevation-low` and `--eds-elevation-high`.

- Person type avatar colours, the failed-person avatar and markdown code syntax colours now use EDS semantic colours. `<fwc-person-avatar>` renders the failed-person avatar inline, so it follows colour scheme changes; the `resolveFailedAvatarUrl` image for other consumers resolves the colours from the document when it is generated. The new `isFailedAvatarUrl` helper identifies those images.
- `--fwc-avatar-shadow-color` is removed; override `--fwc-avatar-elevation` instead.
- The ripple `--mdc-ripple-color` documentation now names the `<fwc-theme>` default.

**Breaking:** components no longer include fallback colours. The host page must load `@equinor/eds-tokens/css/variables` (2.x), and should wrap components in `<fwc-theme>` to choose the colour scheme.
