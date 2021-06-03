import { CSSResult } from 'lit-element';
import { fusionElement } from '@equinor/fusion-wc-core';

import { CheckboxBase } from '@material/mwc-checkbox/mwc-checkbox-base';
import { style } from '@material/mwc-checkbox/mwc-checkbox-css';

declare global {
  interface HTMLElementTagNameMap {
    'fwc-checkbox': Checkbox;
  }
}

@fusionElement('fwc-checkbox')
export default class Checkbox extends CheckboxBase {
  static styles: CSSResult[] = [style];
}
