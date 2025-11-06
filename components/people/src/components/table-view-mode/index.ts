import { fusionElement } from '@equinor/fusion-wc-core';

import { TableViewModeElement } from './element';

export * from './element';

export const tag = 'fwc-people-table-view-mode';

@fusionElement(tag)

export default class _ extends TableViewModeElement { }

declare global {
  interface HTMLElementTagNameMap {
    [tag]: TableViewModeElement;
  }
}
