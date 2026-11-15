---
"@equinor/fusion-wc-theme": major
---

Remove the forced light mode from `<fwc-theme>`.

**Breaking:** `<fwc-theme>` no longer sets `data-color-scheme="light"` on itself, so EDS colour variables inside it follow the document colour scheme (`data-color-scheme` on `<html>`, or the system preference).
