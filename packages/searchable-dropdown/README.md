<!--prettier-ignore-start-->
# `fusion-wc-searchable-dropdown` [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-searchable-dropdown.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-searchable-dropdown)

[Storybook](https://equinor.github.io/fusion-web-components/?path=/docs/data-searchabledropdown--default-story) for component

## Usage

```html
<fwc-searchable-dropdown-provider>
  <fwc-searchable-dropdown></fwc-searchable-dropdown>
</fwc-searchable-dropdown-provider>
```

## Notes

SearchableDropdown renders a searchable dynamic proved by the resolver.

Note, fwc-searchable-dropdown internally uses: [fwc-textinput](https://equinor.github.io/fusion-web-components/?path=/docs/input-textinput) and [fwc-list](https://equinor.github.io/fusion-web-components/?path=/docs/data-list).

### Rendering the result list above arbitrary stacking contexts

By default, the result list is an absolutely positioned box anchored inside the
component's shadow root, stacked with `z-index: 99`. This works for most cases,
but a plain `z-index` can never guarantee precedence over an independently
created stacking context elsewhere in the page (e.g. a portal app header, a
dialog, or any ancestor using `transform`/`filter`/`contain`).

Set the `top-layer` attribute (`topLayer` property) to opt in to rendering the
result list in the browser's [top layer](https://developer.mozilla.org/docs/Glossary/Top_layer)
via the native [Popover API](https://developer.mozilla.org/docs/Web/API/Popover_API)
(`popover="manual"`). The top layer always paints above the regular document,
regardless of ancestor stacking contexts, so this avoids a z-index arms race
entirely.

```html
<fwc-searchable-dropdown-provider>
  <fwc-searchable-dropdown top-layer></fwc-searchable-dropdown>
</fwc-searchable-dropdown-provider>
```

- Opening/closing remains fully driven by the existing controller; the
  browser's own light-dismiss behavior is disabled (`popover="manual"`), so
  outside-click and Escape handling is unchanged.
- The result surface stays anchored to the input on window resize and on
  scroll of any ancestor scroll container.
- Falls back automatically to the default behavior in browsers without
  Popover API support (Chrome/Edge 114+, Firefox 125+, Safari 17+ - see
  [caniuse](https://caniuse.com/mdn-api_htmlelement_showpopover)).
- Default behavior is unchanged for existing consumers (`topLayer` defaults to
  `false`).
