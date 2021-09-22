<!--prettier-ignore-start-->
## `fusion-wc-person` [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-person.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-person)

[Storybook](https://equinor.github.io/fusion-web-components/?path=/docs/data-person)

## Installation
```sh
npm install @equinor/fusion-wc-person
```

## Person Avatar `<fwc-person-avatar>`

### Properties/Attributes

Name                    | Type                            | Default           | Description
---------------------   | --------------                  | -----------       | -----------------
`name`                  | `string`                        |                   | Name of the person. Overrides resolved name if `resolveDetails` is set to `true`.
`accountType`           | `AccountType*`                  |                   | Account type of the person. Overrides resolved account type if `resolveDetails` is set to `true`.
`availability`          | `Availability**`                |                   | Availability of the person. Overrides resolved availability if `resolvePresence` is set to `true`.
`pictureSrc`            | `string`                        |                   | Source of the persons avatar picture. Overrides resolved picture if `resolvePicture` is set to `true`.
`size`                  | `AvatarSize***`                 | `medium`          | Size of the avatar.
`clickable`             | `boolean`                       | `false`           | Set to true to activate visual ripple effects to indicate that the avatar is clickable.
`disabled`              | `boolean`                       | `false`           | Set to true to display the avatar as disabled.
`reolveDetails`         | `boolean`                       | `true`            | Set to true to resolve the persons details. Set to false if you plan to resolve the person details outside of the component.
`reolvePresence`        | `boolean`                       | `true`            | Set to true to resolve the persons presence. Set to false if you plan to resolve the person presence outside of the component or if you do not plan to show the availability badge.
`reolvePicture`         | `boolean`                       | `true`            | Set to true to resolve the persons picture. Set to false if you plan to resolve the person picture outside of the component or if you do not plan to show the persons picture.

\*  `AccountType` is exported by `fwc-person`.
```ts
enum AccountType {
  Employee = 'Employee',
  ExternalHire = 'External hire',
  XExternal = 'X-External',
  JointVentureAffiliate = 'Joint venture/Affiliate',
}
```

\*\*  `Availability` is exported by `fwc-person`.
```ts
enum Availability {
  Available = 'Available',
  AvailableIdle = 'AvailableIdle',
  Away = 'Away',
  BeRightBack = 'BeRightBack',
  Busy = 'Busy',
  BusyIdle = 'BusyIdle',
  DoNotDisturb = 'DoNotDisturb',
  Offline = 'Offline',
}
```

\*\*\*  `AvatarSize` is exported by `fwc-avatar`.
```ts
type AvatarSize = 'x-small' | 'small' | 'medium' | 'large';
```
<!--prettier-ignore-end-->
