# `@equinor/fusion-wc-layout`
[![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-wc-layout.svg)](https://www.npmjs.com/package/@equinor/fusion-wc-layout)

## Overview

`fwc-layout` provides a simple page layout container that can render either:

- a single, full-width content area, or
- a two-column layout with an optional sidebar and primary content region.

The component manages the layout structure so consumers only need to provide content for the designated regions.

## Usage

```html
<fwc-layout>
  <div slot="content">
    Main content
  </div>
</fwc-layout>
