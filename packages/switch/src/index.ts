import { CSSResult } from 'lit-element';
import { fusionElement } from '@equinor/fusion-wc-core';
import { SwitchBase } from '@material/mwc-switch/mwc-switch-base';
import { style as mdcStyle } from '@material/mwc-switch/mwc-switch-css';
import { fusionMDCStyle } from '@equinor/fusion-wc-theme';
import { style } from './style';

declare global {
  interface HTMLElementTagNameMap {
    'fwc-switch': Checkbox;
  }
}

@fusionElement('fwc-switch')
export default class Checkbox extends SwitchBase {
  static styles: CSSResult[] = [mdcStyle, fusionMDCStyle, style];
}
