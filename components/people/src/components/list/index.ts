import { fusionElement } from '@equinor/fusion-wc-core';

import { ListElement } from './element';
import type { ListElementProps } from './types';

export * from './element';
export * from './types';

export const tag = 'fwc-people-picker-list';

@fusionElement(tag)

export default class _ extends ListElement { }

declare global {
  interface HTMLElementTagNameMap {
    [tag]: ListElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<ListElementProps & React.HTMLAttributes<ListElement>>,
        ListElement
      >;
    }
  }
}
