# Fusion Theme for Web-Components

## Usage

```
import { CSSResult } from 'lit-element';
import { fusionElement } from '@equinor/fusion-wc-core';
import { ComponentBase } from '@material/mwc-component/mwc-component-base';
import { style as mdcStyle } from '@material/mwc-component/mwc-component-css';
import { fusionMDCStyle } from '@equinor/fusion-wc-theme';
import { style } from './style';

declare global {
  interface HTMLElementTagNameMap {
    'fwc-component': MyComponent;
  }
}

@fusionElement('fwc-component')
export default class MyComponent extends ComponentBase {
  static styles: CSSResult[] = [mdcStyle, fusionMDCStyle, style];
}
```
