---
'@equinor/fusion-wc-searchable-dropdown': minor
'@equinor/fusion-wc-storybook': patch
---

Adds meta slot to `searchable-dropdown` component

Updates storybook with example:

```js
const searchResultItem = [{
  id: '1337',
  title: 'custom svg',
  subTitle: 'foo bar baz',
  graphic: appIconSvgTemplate,
  graphicType: IconType.SVG,
  meta: '<fwc-chip disabled variant="outlined" value="Custom meta" />',
}];
```
