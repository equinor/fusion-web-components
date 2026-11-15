# @equinor/fusion-wc-theme

[![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-theme.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-theme)

## Install

```sh
npm install @equinor/fusion-wc-theme
```

Fusion Web Components are base of [Material Web Components](https://github.com/material-components/material-web),
but uses the [EDS (Equinor Design System)](https://eds.equinor.com/) for styling / theming.
This component is necessary to override the css attributes used in [MD (material design)](https://material.io/design)

## Usage

### Vanilla JS/HTML

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My Example App</title>
  </head>
  <body>
    <!-- Add the Fusion Theme variables to the DOM. -->
    <fwc-theme>
      <!-- The rest of your app code... -->
      <div id="my-app"></div>
    </fwc-theme>
    <!-- The Fusion Web Components use standard JavaScript modules. -->
    <script type="module">
      import '@equinor/fusion-wc-theme';
    </script>
  </body>
</html>
```

### React

```tsx
import Theme from '@equinor/fusion-wc-theme';
Theme;

export const App => {
  return (
      <fwc-theme>
        <!-- The rest of your react app code. -->
        <MyComponent />
      </fwc-theme>
  );
}
```

## Color scheme

Fusion Web Components colour their UI with [EDS](https://eds.equinor.com/) CSS custom properties
(`var(--eds-color-…)`) from `@equinor/eds-tokens` 2.x. Components do not ship fallback values,
so the host page must load the EDS variables stylesheet once:

```ts
import '@equinor/eds-tokens/css/variables';
```

```html
<link rel="stylesheet" href="https://unpkg.com/@equinor/eds-tokens@2/build/css/variables.min.css" />
```

### Choosing the scheme

By default `<fwc-theme>` inherits the colour scheme. Set the `color-scheme` attribute
(or the `colorScheme` property) only to override it for the subtree:

| `color-scheme`    | Behaviour                                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| not set (default) | Inherits from `data-color-scheme` on `<html>` or an ancestor, otherwise from the OS or browser `prefers-color-scheme`. |
| `system`          | Follows `prefers-color-scheme` and updates live, ignoring ancestors.                                                   |
| `light`           | Always light.                                                                                                          |
| `dark`            | Always dark.                                                                                                           |

Unknown values behave like not set.

```html
<!-- Recommended for host apps: set the scheme once on the document. -->
<html data-color-scheme="dark">
  <body>
    <fwc-theme>
      <!-- Inherits dark. -->
    </fwc-theme>
  </body>
</html>
```

```html
<fwc-theme color-scheme="dark">
  <!-- Always dark, whatever the page uses. -->
</fwc-theme>
```

With `light`, `dark` or `system`, `<fwc-theme>` writes the resolved `light` or `dark` value to its own
`data-color-scheme` attribute, the hook the
[EDS colour scheme guidance](https://eds.equinor.com/docs/foundation/colour/getting_started/#colour-scheme-detection)
uses, and `resolvedColorScheme` returns it. Without the attribute it writes nothing, attaches no
`matchMedia` listener and `resolvedColorScheme` is `undefined`. Removing the attribute removes the
`data-color-scheme` value it wrote and stops listening, so the subtree inherits again.

EDS defines semantic colour aliases (such as `--eds-color-bg-accent-fill-emphasis-default`) only for
the document root and light subtrees. `<fwc-theme>` re-declares them on its host so they resolve
against the scheme that applies there, which makes a dark ancestor or `color-scheme="dark"` work
inside a light page and vice versa. The aliases are generated from `@equinor/eds-tokens`; after
upgrading it, run `pnpm --filter @equinor/fusion-wc-theme generate:color-scheme`.

> [!IMPORTANT]
> Content rendered outside `<fwc-theme>`, such as popovers or dialogs attached to `document.body`,
> and the page background follow the document instead. Host apps should set
> `data-color-scheme="light"` or `"dark"` on `<html>` for an explicit choice, or leave it unset to follow the system.
> A `data-color-scheme` attribute on an element outside `<fwc-theme>` only switches EDS primitives,
> not the semantic aliases, so prefer setting it on `<html>`.
