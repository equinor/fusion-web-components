import { fusionElement } from '@equinor/fusion-wc-core';

import { PillContainerElement } from './element';
import type { PillContainerElementProps } from './types';

export type { PillContainerElementProps };

export const tag = 'fwc-person-picker-pill-container';

@fusionElement(tag)

export default class _ extends PillContainerElement { }

declare global {
  interface HTMLElementTagNameMap {
    [tag]: PillContainerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<PillContainerElementProps & React.HTMLAttributes<PillContainerElement>>,
        PillContainerElement
      >;
    }
  }
}
