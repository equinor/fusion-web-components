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
`presence`              | `PersonPresence**`              | `PresenceUnknown` | The presence of the person, indicated by badge color.
`position`              | `PersonPosition***`             | ``                | The position of the person, indicated by border color.
`initial`               | `string`                        | ``                | Initial letter to render in the avatar circle.
`src`                   | `string`                        | ``                | Image src to render in avatar circle.
`badge`                 | `boolean`                       | `true`            | Set to true to render presence status badge.
`badgeIcon`             | `IconName****`                  | ``                | Icon to render in presence status badge.
`clickable`             | `boolean`                       | `false`           | Set to true to activate visual hover effects to indicate that the avatar is clickable.

\*  `AvatarSize` is exported by `fwc-avatar`.
```ts
type AvatarSize = 'small' | 'medium' | 'large';
```

\*\*  `PersonPresence` is exported by `fwc-avatar`.
```ts
type PersonPresence = 
  | 'Available'
  | 'AvailableIdle'
  | 'Away'
  | 'BeRightBack'
  | 'Busy'
  | 'BusyIdle'
  | 'DoNotDisturb'
  | 'Offline'
  | 'PresenceUnknown';
```

\*\*\*  `PersonPosition` is exported by `fwc-avatar`.
```ts
type PersonPosition = 'Employee' | 'External hire' | 'X-External' | 'Joint venture/Affiliate';
```

\*\*\*\*  `IconName` is exported by `fwc-icon` and is based on EDS icon tokens.
```ts
type IconName = 'calendar' | 'settings'...;
```
<!--prettier-ignore-end-->
