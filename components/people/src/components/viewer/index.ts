import { fusionElement } from '@equinor/fusion-wc-core';

import { PeopleViewerElement } from './element';
import type { PeopleViewerElementProps } from './types';

export * from './element';
export * from './types';

export const tag = 'fwc-people-viewer';

@fusionElement(tag)

export default class _ extends PeopleViewerElement { }

declare global {
  interface HTMLElementTagNameMap {
    [tag]: PeopleViewerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<PeopleViewerElementProps & React.HTMLAttributes<PeopleViewerElement>>,
        PeopleViewerElement
      >;
    }
  }
}
