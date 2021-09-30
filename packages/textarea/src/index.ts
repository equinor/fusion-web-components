import { fusionElement } from '@equinor/fusion-wc-core';
import { TextAreaElement } from './element';

export const tag = 'fwc-textarea';
@fusionElement(tag)
export default class _ extends TextAreaElement {}

export * from './element';
export * from './element.css';

declare global {
  interface HTMLElementTagNameMap {
    [tag]: TextAreaElement;
  }
}
