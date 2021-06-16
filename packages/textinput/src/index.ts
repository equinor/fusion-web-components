import { fusionElement } from '@equinor/fusion-wc-core';
import TextInputElement from './element';

export const tag = 'fwc-textinput';

@fusionElement(tag)
export default class _ extends TextInputElement {}
declare global {
  interface HTMLElementTagNameMap {
    [tag]: TextInputElement;
  }
}
