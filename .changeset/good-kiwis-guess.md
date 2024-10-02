---
"@equinor/fusion-wc-person": patch
---

### Changes in `PersonSelectController`

- Updated the `attrSelectPerson` method to clear `selectedIds` when `personData` or `selectedPerson` is null.
- Updated the `clearInput` method to reset `azureId` and `upn` properties.
- Refactored the `clear` method to use `#firePersonSelectEvent` instead of directly dispatching the event.
- Removed unnecessary comments and cleaned up the code.

### Changes in `PersonSelectElement`

- Added a new CSS class `.selected-persons` to hide the text input when a person is selected.
- Updated the `selectedPersonsTemplate` method to be conditionally rendered based on the `selectedIds` size and `isOpen` state.
- Adjusted the `classMap` to include the `selected-persons` class based on the `selectedIds` size and `isOpen`
