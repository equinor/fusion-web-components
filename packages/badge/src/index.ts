import { fusionElement } from '@equinor/fusion-wc-core';
import { BadgeElement } from './element';
export * from './element';
export { IconName } from '@equinor/fusion-wc-icon';

export const tag = 'fwc-badge';

@fusionElement(tag)
export default class _ extends BadgeElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: BadgeElement;
  }
}
