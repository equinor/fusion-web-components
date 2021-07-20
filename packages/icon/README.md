<!--prettier-ignore-start-->
## `fusion-wc-icon` [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-icon.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-icon)

[Storybook](https://equinor.github.io/fusion-web-components/?path=/docs/general-icon)

### Installation
```sh
npm install @equinor/fusion-wc-icon
```

### Properties/Attributes
| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `icon` | `IconName*` | `''` | Icon to display. Currently only maps to EDS icon names.
| `type` | `IconType**` | `IconType.EDS` | Icon type to display. Currently only supports EDS.

\*  `IconName` is exported by `@equinor/eds-icons`.
```ts
type IconName = keyof typeof icons | string;
```

\**  `IconType` is exported by `fwc-icon`.
```ts
enum IconType {
  EDS = 'eds',
}
```
<!--prettier-ignore-end-->
