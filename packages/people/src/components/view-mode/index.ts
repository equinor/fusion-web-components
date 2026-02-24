import { fusionElement } from '@equinor/fusion-wc-core';

import { ViewModeElement } from './element';

export * from './element';

export const tag = 'fwc-people-view-mode';

@fusionElement(tag)

export default class _ extends ViewModeElement { }

declare global {
  interface HTMLElementTagNameMap {
    [tag]: ViewModeElement;
  }
}
