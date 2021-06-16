# Fusion Theme for Web-Components

```sh
npm install @equinor/fusion-wc-theme
```

## Usage

### Vanilla JS/HTML

```
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My Example App</title>
  </head>
  <body>
    <!-- Add the Fusion Theme variables to the DOM. -->
    <fwc-theme></fwc-theme>

    <!-- The rest of your app code... -->

    <!-- The Fusion Web Components use standard JavaScript modules. -->
    <script type="module">
      import '@equinor/fusion-wc-theme';
    </script>
  </body>
</html>
```

### React

```
import Theme from '@equinor/fusion-wc-theme';
Theme;

export const App => {
  return (
    <>
    <!-- Add theme variables to DOM. -->
      <fwc-theme></fwc-theme>
      <!-- The rest of your react app code. -->
      <MyComponent>
      </MyComponent>
    <>
  );
}
```
