---
'@equinor/fusion-wc-person': patch
---

Fix `fwc-person-table-cell` heading/subheading vertical alignment. Removed the `padding-bottom` on `.person-cell__content` that pushed the text block ~4px above the avatar's center, so the name is now truly vertically centered with the avatar and aligns with sibling text when used inside an EDS `Table.Cell`. Fixes equinor/fusion#837.
