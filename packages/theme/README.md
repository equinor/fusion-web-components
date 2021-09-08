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
