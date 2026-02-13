import { fusionElement } from '@equinor/fusion-wc-core';

import { ListItemElement } from './element';
import type { ListItemElementProps } from './types';

export * from './events';
export * from './element';
export * from './types';

export const tag = 'fwc-people-picker-list-item';

@fusionElement(tag)

export default class _ extends ListItemElement { }

declare global {
  interface HTMLElementTagNameMap {
    [tag]: ListItemElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<ListItemElementProps & React.HTMLAttributes<ListItemElement>>,
        ListItemElement
      >;
    }
  }
}
