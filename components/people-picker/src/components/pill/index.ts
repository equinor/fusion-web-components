import { fusionElement } from '@equinor/fusion-wc-core';

import { PillElement } from './element';
import type { PillElementProps } from './types';

export type { PillElementProps };
export const tag = 'fwc-people-picker-pill';

@fusionElement(tag)

export default class _ extends PillElement { }

declare global {
  interface HTMLElementTagNameMap {
    [tag]: PillElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<PillElementProps & React.HTMLAttributes<PillElement>>,
        PillElement
      >;
    }
  }
}
