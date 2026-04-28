---
'@equinor/fusion-web-components': patch
'@equinor/fusion-wc-avatar': patch
'@equinor/fusion-wc-badge': patch
'@equinor/fusion-wc-button': patch
'@equinor/fusion-wc-checkbox': patch
'@equinor/fusion-wc-chip': patch
'@equinor/fusion-wc-core': patch
'@equinor/fusion-wc-date': patch
'@equinor/fusion-wc-divider': patch
'@equinor/fusion-wc-formfield': patch
'@equinor/fusion-wc-icon': patch
'@equinor/fusion-wc-intersection': patch
'@equinor/fusion-wc-list': patch
'@equinor/fusion-wc-markdown': patch
'@equinor/fusion-wc-menu': patch
'@equinor/fusion-wc-people': patch
'@equinor/fusion-wc-person': patch
'@equinor/fusion-wc-picture': patch
'@equinor/fusion-wc-popover': patch
'@equinor/fusion-wc-progress-indicator': patch
'@equinor/fusion-wc-radio': patch
'@equinor/fusion-wc-ripple': patch
'@equinor/fusion-wc-searchable-dropdown': patch
'@equinor/fusion-wc-select': patch
'@equinor/fusion-wc-skeleton': patch
'@equinor/fusion-wc-switch': patch
'@equinor/fusion-wc-textarea': patch
'@equinor/fusion-wc-textinput': patch
'@equinor/fusion-wc-theme': patch
---

Remove source maps from build output. Source maps were included in packages but referenced source files that were excluded from npm, making them broken and adding unnecessary size.
