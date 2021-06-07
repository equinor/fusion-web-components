import { CSSResult } from 'lit-element';
import { fusionElement } from '@equinor/fusion-wc-core';
import { RadioBase } from '@material/mwc-radio/mwc-radio-base';
import { style as mdcStyle } from '@material/mwc-radio/mwc-radio-css';
import { fusionMDCStyle } from '@equinor/fusion-wc-theme';
import { style } from './style';

declare global {
  interface HTMLElementTagNameMap {
    'fwc-radio': Checkbox;
  }
}

@fusionElement('fwc-radio')
export default class Checkbox extends RadioBase {
  static styles: CSSResult[] = [mdcStyle, fusionMDCStyle, style];
}
