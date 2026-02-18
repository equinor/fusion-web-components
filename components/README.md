<!--prettier-ignore-start-->
# @equinor/fusion-web-components [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-web-components.svg)](https://www.npmjs.com/package/@equinor/fusion-web-components)

A convenient collection package providing unified access to Fusion web components. This package aggregates and re-exports components from individual Fusion web component packages, making it easier to import and use multiple components in your application.

## [Storybook](https://equinor.github.io/fusion-web-components/)

## Installation

```sh
npm install @equinor/fusion-web-components
```

Or using pnpm:

```sh
pnpm install @equinor/fusion-web-components
```

## Usage

### Import from main entry point

Import components from the main entry point:

```ts
import {
  PeoplePickerElement,
  PeopleViewerElement,
  type PersonInfo,
  type PeoplePickerElementProps,
  type PeopleViewerElementProps
} from '@equinor/fusion-web-components';
```

### Import from subpath exports

Import components from specific subpaths:

```ts
import { 
  PeoplePickerElement, 
  PeopleViewerElement,
  type PersonInfo 
} from '@equinor/fusion-web-components/people';
```

## Included Components

### People Components

| Component | Description |
| --------- | ----------- |
| `<fwc-people-picker>` | Select and manage people with search functionality |
| `<fwc-people-viewer>` | Display people in list or table format |

See [@equinor/fusion-wc-people](https://github.com/equinor/fusion-web-components/tree/main/packages/people) for detailed documentation.

## Benefits

- **Simplified imports**: Import multiple components from a single package
- **Consistent versioning**: All components are versioned together
- **TypeScript support**: Full TypeScript definitions included
- **Tree-shakeable**: Only includes what you import
- **Subpath exports**: Import specific component groups for optimized bundling

## Related Packages

This package aggregates components from:

- [@equinor/fusion-wc-people](https://www.npmjs.com/package/@equinor/fusion-wc-people)

For more granular control or to use individual components independently, you can install the individual packages directly.

## Contributing

See the [main repository](https://github.com/equinor/fusion-web-components) for contribution guidelines.

<!--prettier-ignore-end-->
