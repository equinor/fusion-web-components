import { fusionElement } from '@equinor/fusion-wc-core';
import CheckboxElement from './element';
export * from './element';

export const tag = 'fwc-checkbox';

@fusionElement(tag)
export default class _ extends CheckboxElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: CheckboxElement;
  }
}
