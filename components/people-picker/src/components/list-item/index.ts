import { fusionElement } from '@equinor/fusion-wc-core';

import { ListItemElement } from './element';
import type { ListItemElementProps } from './types';

export { NavigateListItemEvent } from './events';
export type { ListItemElementProps };

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
