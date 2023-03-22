<!--prettier-ignore-start-->
## `fusion-wc-markdown` [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-markdown.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-markdown)

[Storybook](https://equinor.github.io/fusion-web-components/?path=/docs//input-markdown-editor--basic)

### Installation
```sh
npm install @equinor/fusion-wc-markdown
```

### Markdown Editor

#### Example

```html
<fusion-wc-markdown-editor props>
  **some** markdown *text*
</fusion-wc-markdown-editor>
```

#### Usage
```js 
const markdown = "# my heading here";
<fwc-markdown-editor value={markdown} onInput={(e)=>{console.log(e.target._value)}} change={console.log} />
```

#### Properties/Attributes
| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `menuItems` | `Array<MdMenuItemType>*` | `['strong', 'em', 'bullet_list', 'ordered_list']` | List of visible menu buttons
| `minHeight` | `string` | `''` | Markdown Editor minimum height
| `value` | `string` | `''` | Markdown editors value
| `menuSize` | `MenuSizes**` | `'medium'` | Size of the menu buttons

\*  `Array<MdMenuItemType>` is list of showing visible menu buttons available as `MdMenuItemType`.
```ts
type MdMenuItemType =
  | 'strong'
  | 'em'
  | 'link'
  | 'ordered_list'
  | 'bullet_list'
  | 'paragraph'
  | 'blockquote'
  | 'h1'
  | 'h2'
  | 'h3';
```

\*  `MenuSizes` type imported from markdown component.
```ts
type MenuSizes = 'small' | 'medium' | 'large';
```

<!--prettier-ignore-end-->
