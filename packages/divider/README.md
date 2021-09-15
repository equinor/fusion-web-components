<!--prettier-ignore-start-->

## `fusion-wc-divider` [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-divider.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-divider)

[Storybook](https://equinor.github.io/fusion-web-components/?path=/docs/data-divider)

## Installation

```sh
npm install @equinor/fusion-wc-divider
```

## Divider `<fwc-divider>`

### Properties/Attributes

| Name          | Type                     | Default      | Description                                               |
| ------------- | ------------------------ | ------------ | --------------------------------------------------------- |
| `color`       | `DividerColor*`          | `medium`     | Color of the divider.                                     |
| `spacing`     | `DividerSpacing**`       | `medium`     | Spacing between the divider and the surrounding elements. |
| `variant`     | `DividerVariant***`      | `full`       | Variant of the divider.                                   |
| `orientation` | `DividerOrientation****` | `horizontal` | Orientation of the divider.                               |

\* `DividerColor` is exported by `fwc-divider`.

```ts
type DividerColor = 'medium' | 'light' | 'lighter';
```

\*\* `DividerSpacing` is exported by `fwc-divider`.

```ts
type DividerSpacing = 'small' | 'medium' | 'large';
```

\*\*\* `DividerVariant` is exported by `fwc-divider`.

```ts
type DividerVariant = 'full' | 'middle' | 'list';
```

\*\*\*\* `DividerOrientation` is exported by `fwc-divider`.

```ts
type DividerOrientation = 'horizontal' | 'vertical';
```
<!--prettier-ignore-end-->
