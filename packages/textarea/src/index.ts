import { fusionElement } from '@equinor/fusion-wc-core';
import TextAreaElement from './element';

export const tag = 'fwc-textarea';

@fusionElement(tag)
export default class _ extends TextAreaElement {}
declare global {
  interface HTMLElementTagNameMap {
    [tag]: TextAreaElement;
  }
}
