---
'@equinor/fusion-wc-searchable-dropdown': patch
---

Add `part` attribute to list and list items.

This will allow styling the list item outside the `shadowRoot`.

```css
fwc-searchable-dropdown::part(list) {
  background-color: red;
}

fwc-searchable-dropdown::part(list-item) {
  --fwc-list-item-vertical-padding: 4px;
}
```
