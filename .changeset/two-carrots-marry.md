---
"@equinor/fusion-wc-person": patch
---

### Changes in `PersonSelectController`

- Renamed the `attrSelectPerson` method to `attrSelectedPerson`.
- Updated the `attrSelectedPerson` method to clear `selectedIds` when `select` is null or an empty string and `selectedIds` size is greater than zero.
- Added logic to clear previous selections when the `selectedPerson` property changes.

### Changes in `PersonSelectElement`

- Updated the `updated` method to call `attrSelectedPerson` instead of `attrSelectPerson`.