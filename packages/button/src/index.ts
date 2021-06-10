import { fusionElement } from '@equinor/fusion-wc-core';
import ButtonElement from './element';

export const tag = 'fwc-button';

@fusionElement(tag)
export default class _ extends ButtonElement {}
declare global {
  interface HTMLElementTagNameMap {
    [tag]: ButtonElement;
  }
}
