<!--prettier-ignore-start-->
## `fusion-wc-avatar` [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-avatar.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-avatar)

[Storybook](https://equinor.github.io/fusion-web-components/?path=/docs/data-avatar)

## Installation
```sh
npm install @equinor/fusion-wc-avatar
```

## Avatar `<fwc-avatar>`
### Example Usage

#### Default
```ts
return (
  <fwc-avatar />
);
```

### Properties/Attributes

Name                    | Type                            | Default           | Description
---------------------   | --------------                  | -----------       | -----------------
`size`                  | `AvatarSize*`                   | `medium`          | Size of the avatar.
`color`                 | `AvatarColor**`                 | `secondary`       | Color of the avatar.
`value`                 | `string`                        | ``                | Text value to be rendered within the avatar.
`src`                   | `string`                        | ``                | Image src to render in avatar circle.
`clickable`             | `boolean`                       | `false`           | Set to true to activate visual ripple effects to indicate that the avatar is clickable.
`disabled`              | `boolean`                       | `false`           | Set to true to display the avatar as disabled.

\*  `AvatarSize` is exported by `fwc-avatar`.
```ts
type AvatarSize = 'small' | 'medium' | 'large';
```

\*\*  `AvatarColor` is exported by `fwc-avatar`.
```ts
type AvatarColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'disabled';
```
<!--prettier-ignore-end-->
