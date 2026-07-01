# `@equinor/fusion-wc-page`

[![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-page.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-page)

## Overview

`fwc-page` is a structural web component for composing application pages with a predictable header, main content, and footer layout.

Use it when a page needs a stable full-height layout where the main content can scroll independently while the header and footer remain in their dedicated regions. The component owns the page grid so consumers only need to provide content for the named slots.

## Installation

```bash
npm install @equinor/fusion-wc-page
```

## Import

```ts
import '@equinor/fusion-wc-page';
```

## Usage

```html
<fwc-page>
	<header slot="header">
		<h1>Project overview</h1>
	</header>

	<section slot="main">
		<p>Main page content</p>
	</section>

	<footer slot="footer">
		<span>Last updated today</span>
	</footer>
</fwc-page>
```

## Slots

| Slot | Description |
| --- | --- |
| `header` | Optional page header content, such as a title, navigation, or actions. |
| `main` | Primary page content. This region fills the available space and scrolls vertically when content overflows. |
| `footer` | Optional page footer content, such as status information or secondary actions. |

## Examples

### Page With Actions

```html
<fwc-page>
	<div slot="header" style="display: flex; align-items: center; justify-content: space-between; padding: 1rem;">
		<h1>Portfolio</h1>
		<button type="button">Create</button>
	</div>

	<section slot="main" style="padding: 1rem;">
		<h2>Active projects</h2>
		<p>Use the main slot for the page workflow and supporting content.</p>
	</section>

	<div slot="footer" style="padding: 1rem;">
		Showing 24 projects
	</div>
</fwc-page>
```

### With `fwc-layout`

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
import '@equinor/fusion-wc-page';

export const ProjectPage = () => (
	<fwc-page>
		<div slot="header">Project details</div>
		<div slot="main">Main content</div>
		<div slot="footer">Status content</div>
	</fwc-page>
);
```

## Layout Behavior

The component renders a single-column grid with three rows: `header`, `main`, and `footer`. The `main` region takes the remaining height and enables vertical scrolling for overflowing content.
