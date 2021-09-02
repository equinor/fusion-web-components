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

Name                    | Type                            | Default          | Description
---------------------   | --------------                  | -----------      | -----------------
`size`                  | `AvatarSize*`                   | `medium`         | Size of the avatar.
`color`                 | `AvatarColor**`                 | `primary`        | Color of the avatar background.
`initial`               | `string`                        | ``               | Initial letter to render in the avatar circle.
`image`                 | `string`                        | ``               | Image src to render in avatar circle.
`badge`                 | `boolean`                       | `false`          | Set to true to render badge.

\*  `BadgeSize` is exported by `fwc-badge`.
```ts
type BadgeSize = 'small' | 'medium' | 'large';
```

\*\*  `BadgePosition` is exported by `fwc-badge`.
```ts
type BadgePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
```

\*\*\*  `BadgeColor` is exported by `fwc-badge`.
```ts
type BadgeColor = 'primary' | 'secondary';
```

\*\*\*\*  `IconName` is exported by `fwc-icon` and is based on EDS icon tokens.
```ts
type IconName = 'calendar' | 'settings'...;
```
<!--prettier-ignore-end-->
