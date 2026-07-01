# `@equinor/fusion-wc-layout`

[![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-layout.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-layout)

## Overview

`fwc-layout` is a structural web component for composing application content into a full-height layout with an optional sidebar.

Use it when an application view needs a stable outer layout where primary content can fill the available space, with sidebar content added only when the view needs secondary navigation, filters, or supporting context.

## Installation

```bash
npm install @equinor/fusion-wc-layout
```

## Import

```ts
import '@equinor/fusion-wc-layout';
```

## Usage

```html
<fwc-layout>
  <section slot="content">
    Main content
  </section>
</fwc-layout>
```

## Properties

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `sidebar` | `sidebar` | `boolean` | `false` | Enables the sidebar column and renders the `sidebar` slot. |

## Slots

| Slot | Description |
| --- | --- |
| `content` | Primary application content. Slotted content is stretched to the full layout height. |
| `sidebar` | Optional secondary content. Rendered only when the `sidebar` property or attribute is enabled. |

## Examples

### Content Only

```html
<fwc-layout>
  <section slot="content">
    <h1>Project overview</h1>
    <p>Use the content slot for the main view.</p>
  </section>
</fwc-layout>
```

### With Sidebar

```html
<fwc-layout sidebar>
  <nav slot="sidebar" style="width: 240px;">
    <a href="/projects">Projects</a>
    <a href="/tasks">Tasks</a>
  </nav>

  <section slot="content">
    <h1>Active projects</h1>
    <p>The content area fills the remaining horizontal space.</p>
  </section>
</fwc-layout>
```

### With `fwc-page`

```html
<fwc-layout sidebar>
  <nav slot="sidebar">Sidebar content</nav>

  <fwc-page slot="content">
    <div slot="header">Header content</div>
    <div slot="main">Main content</div>
    <div slot="footer">Footer content</div>
  </fwc-page>
</fwc-layout>
```

### React

```tsx
import '@equinor/fusion-wc-layout';

export const ProjectLayout = () => (
  <fwc-layout sidebar>
    <nav slot="sidebar">Sidebar content</nav>
    <section slot="content">Main content</section>
  </fwc-layout>
);
```

## Layout Behavior

The component renders a single-column grid by default. When `sidebar` is enabled, the layout switches to two columns where the sidebar uses its intrinsic width and the content area fills the remaining space.
