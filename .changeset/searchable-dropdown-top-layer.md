---
"@equinor/fusion-wc-searchable-dropdown": minor
---

Add opt-in `topLayer` property (`top-layer` attribute) to `fwc-searchable-dropdown`. When enabled, the result list renders in the browser's top layer via the native Popover API (`popover="manual"`) instead of a shadow-DOM-relative, absolutely positioned box, so it can reliably appear above content that creates its own independent stacking context elsewhere in the app (e.g. a portal header, dialog, or any ancestor with `transform`/`filter`/`contain`/`z-index`). Opening/closing stays driven by the existing controller, and outside-click/Escape handling is unchanged. The result surface is repositioned on window resize and ancestor scroll. Falls back automatically to the previous behavior in browsers without Popover API support. Default behavior for existing consumers is unchanged (`topLayer` defaults to `false`).
