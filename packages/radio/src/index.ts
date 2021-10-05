import { fusionElement } from '@equinor/fusion-wc-core';
import { RadioElement } from './element';
export * from './element';

export const tag = 'fwc-radio';

@fusionElement(tag)
export default class _ extends RadioElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: RadioElement;
  }
}
