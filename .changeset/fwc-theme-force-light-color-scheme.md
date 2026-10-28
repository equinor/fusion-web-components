---
"@equinor/fusion-wc-theme": patch
---

Force light color scheme in `fwc-theme` until Fusion supports dark mode.

Always set `data-color-scheme="light"` on the element when connected, so EDS variables never resolve to dark values from the OS/browser `prefers-color-scheme: dark` preference.

Ref: equinor/fusion-core-tasks#2120
