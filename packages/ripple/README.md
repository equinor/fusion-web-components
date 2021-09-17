<!--prettier-ignore-start-->
## `fusion-wc-ripple` [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-ripple.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-ripple)

[Storybook](https://equinor.github.io/fusion-web-components/?path=/docs/data-ripple)

## Installation
```sh
npm install @equinor/fusion-wc-ripple
```

## Ripple `<fwc-ripple>`

### Properties/Attributes

Name | Type | Default | Description
---- | ---- | ------- | -----------
`primary` | `boolean` | `false` | When true, sets the ripple color to `--mdc-theme-primary`. Will be overridden by `--mdc-ripple-color` if set.
`accent` | `boolean` | `false` | When true, sets the ripple color to `--mdc-theme-secondary`. Will be overridden by `--mdc-ripple-color` if set.
`unbounded` | `boolean` | `false` | When true, the ripple will flow outside the component in a circle.
`activated` | `boolean` | `false` | Set true when the container of the ripple should be in an [`activated`](https://material.io/design/interaction/states.html#activated) state.
`selected` | `boolean` | `false` | Set true when the container of the ripple should be in a [`selected`](https://material.io/design/interaction/states.html#selected) state.
`disabled` | `boolean` | `false` | Set true to disable the ripple when the container of the ripple is disabled.

### Methods

| Name | Description
| ---- | -----------
| `startPress(event?: Event) => void` | Begin the `press` state of the ripple. Optional `Event` will be used to determine the beginning coordinates of the ripple animation when `unbounded` is false.
| `endPress() => void` | End the `press` state of the ripple.
| `startFocus() => void` | Begin the `focus` state of the ripple.
| `endFocus() => void` | End the `focus` state of the ripple.
| `startHover() => void` | Begin the `hover` state of the ripple.
| `endHover() => void` | End the `hover` state of the ripple.
<!--prettier-ignore-end-->
