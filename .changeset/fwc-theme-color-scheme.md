---
"@equinor/fusion-wc-theme": major
---

Add a `color-scheme` attribute to `<fwc-theme>` and remove the forced light mode.

- Without a `color-scheme` attribute, `<fwc-theme>` inherits the scheme from `data-color-scheme` on `<html>` or an ancestor, or from `prefers-color-scheme`. It writes no attribute and attaches no listener.
- `color-scheme="light" | "dark" | "system"` overrides the scheme for children and writes the resolved value to the host `data-color-scheme` attribute. `system` follows `prefers-color-scheme` and updates live. Removing the attribute restores inheritance.
- EDS semantic colour aliases are re-declared on the host so a dark scheme works inside a light page and vice versa.
- Theme variables (`--fwc-theme-*`, `--mdc-theme-*`) now use EDS 2.x CSS custom properties, and the host sets `color: var(--eds-color-text-neutral-strong)`.

**Breaking:** `<fwc-theme>` no longer forces light mode; by default it inherits the document colour scheme, which follows the system preference unless `<html>` sets `data-color-scheme`. The host page must load `@equinor/eds-tokens/css/variables` (2.x). Set `color-scheme="light"` to keep the previous behaviour.
