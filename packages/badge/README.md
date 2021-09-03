<!--prettier-ignore-start-->
## `fusion-wc-badge` [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-badge.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-badge)

[Storybook](https://equinor.github.io/fusion-web-components/?path=/docs/data-badge)

## Installation
```sh
npm install @equinor/fusion-wc-badge
```

## Badge `<fwc-badge>`
### Example Usage

#### Default
```ts
return (
  <fwc-badge>10</fwc-badge>
);
```

#### Sizes
```ts
return (
  <fwc-badge icon="settings" size="small" />
  <fwc-badge icon="settings" size="medium" />
  <fwc-badge icon="settings" size="large" />
);
```

#### Positions
```ts
return (
  <fwc-badge position="top-left" />
  <fwc-badge position="top-right" />
  <fwc-badge position="bottom-left" />
  <fwc-badge position="bottom-right" />
);
```


#### Icon
```ts
return (
  <fwc-badge icon="settings" />
);
```

#### Circular parent (Use if the parent component is circular instead of rectangular for correct positioning)
```ts
return (
  <fwc-badge circular />
);
```

### Properties/Attributes

Name                    | Type                            | Default          | Description
---------------------   | --------------                  | -----------      | -----------------
`size`                  | `BadgeSize*`                    | `medium`         | Size of the badge.
`position`              | `BadgePosition**`               | `top-right`      | Absolute corner position for the badge.
`color`                 | `BadgeColor***`                 | `secondary`      | Color of the badge.
`value`                 | `string`                        | ``               | Text value to be rendered within the badge.
`icon`                  | `IconName****`                  | ``               | Icon to be rendered within the badge.
`circular`              | `boolean`                       | `false`          | Set to true if badge is placed within a circular wrapper for correct position.
`tooltip`               | `string`                        | ``               | Tooltip text to show on hover.

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
type BadgeColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'disabled';
```

\*\*\*\*  `IconName` is exported by `fwc-icon` and is based on EDS icon tokens.
```ts
type IconName = 'calendar' | 'settings'...;
```
<!--prettier-ignore-end-->
