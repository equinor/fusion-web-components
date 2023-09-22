---
'@equinor/fusion-wc-searchable-dropdown': major
'@equinor/fusion-wc-progress-indicator': major
'@equinor/fusion-wc-intersection': major
'@equinor/fusion-wc-formfield': major
'@equinor/fusion-wc-textinput': major
'@equinor/fusion-wc-dependencies': major
'@equinor/fusion-wc-checkbox': major
'@equinor/fusion-wc-markdown': major
'@equinor/fusion-wc-skeleton': major
'@equinor/fusion-wc-textarea': major
'@equinor/fusion-wc-divider': major
'@equinor/fusion-wc-picture': major
'@equinor/fusion-wc-popover': major
'@equinor/fusion-wc-avatar': major
'@equinor/fusion-wc-button': major
'@equinor/fusion-wc-person': major
'@equinor/fusion-wc-ripple': major
'@equinor/fusion-wc-select': major
'@equinor/fusion-wc-switch': major
'@equinor/fusion-wc-badge': major
'@equinor/fusion-wc-radio': major
'@equinor/fusion-wc-theme': major
'@equinor/fusion-wc-chip': major
'@equinor/fusion-wc-core': major
'@equinor/fusion-wc-date': major
'@equinor/fusion-wc-icon': major
'@equinor/fusion-wc-list': major
'@equinor/fusion-wc-menu': major
'@equinor/fusion-wc-builder': major
'@equinor/fusion-wc-storybook': major
---

initial update to pnpm

- update all packages to use workspace for local packages
- fix all missing references
- cleanup root scripts
- update lerna config

> moved to major since so many packages had missing deps (resolved threw peer deps)
>
> this might alter render and cause 'correct' behavior, but current relays on 'wrong' 

