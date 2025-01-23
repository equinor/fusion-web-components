---
'@equinor/fusion-wc-searchable-dropdown': patch
'@equinor/fusion-wc-storybook': patch
---

### @equinor/fusion-wc-searchable-dropdown

- Fix: support for setting selectedId in initalItems.
- Fix: better handling of multiple selections.
- Removed need for mutating result with isSelected, we now keep track of that in selectedItems set.
- Removed controllers _listItems array since we added getter method for flattening the elements to be able to select by index, and more easily loop over all list items.
- Renamed methods to align naming scheme with functionality.

### @equinor/fusion-wc-storybook

Fix: can use selectedId in stories and eslint
