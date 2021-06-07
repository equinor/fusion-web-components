import { CSSResult } from 'lit-element';
import { fusionElement } from '@equinor/fusion-wc-core';
import { CheckboxBase } from '@material/mwc-checkbox/mwc-checkbox-base';
import { style as mdcStyle } from '@material/mwc-checkbox/mwc-checkbox-css';
import { fusionTheme } from '@equinor/fusion-wc-theme';
import { style } from './style';

declare global {
  interface HTMLElementTagNameMap {
    'fwc-checkbox': Checkbox;
  }
}

@fusionElement('fwc-checkbox')
export default class Checkbox extends CheckboxBase {
  static styles: CSSResult[] = [mdcStyle, fusionTheme, style];
}
