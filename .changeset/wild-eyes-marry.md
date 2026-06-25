---
"@equinor/fusion-wc-people": patch
---

Fix `resolveids` on people picker so resolved people are added to the existing selection instead of replacing it. This makes `resolveids` trigger the expected change events, with `selection-changed` reflecting the merged set of people.
