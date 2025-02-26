---
'@equinor/fusion-wc-textinput': patch
---

Resolved an issue where the `TextInputElement.firstUpdated` method did not call `super`, preventing the MDC foundation from initializing properly.
