import { fusionElement } from '@equinor/fusion-wc-core';

import { SearchElement, ClearInputEvent } from './element';
import type { SearchElementProps } from './types';

export type { SearchElementProps, ClearInputEvent };

export const tag = 'fwc-people-picker-search';

@fusionElement(tag)

export default class _ extends SearchElement { }

declare global {
  interface HTMLElementTagNameMap {
    [tag]: SearchElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<SearchElementProps & React.HTMLAttributes<SearchElement>>,
        SearchElement
      >;
    }
  }
}
