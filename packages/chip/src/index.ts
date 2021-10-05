import { fusionElement } from '@equinor/fusion-wc-core';
import { ChipElement } from './element';
export * from './element';
export { IconName } from '@equinor/fusion-wc-icon';

export const tag = 'fwc-chip';

@fusionElement(tag)
export default class _ extends ChipElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: ChipElement;
  }
}
