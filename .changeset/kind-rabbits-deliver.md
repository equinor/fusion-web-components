---
"@equinor/fusion-wc-person": patch
---

Fix avatar component property API: support `resolveId` (singular) instead of `resolveIds` (plural)

Added new `resolveId` property to PersonAvatarElement and related components (card, list-item, table-cell) for improved developer experience. The resolved ID is internally mapped to `resolveIds` array to trigger the task.

Also improved handling of the `dataSource` property to prevent errors when `azureId` is not provided.
