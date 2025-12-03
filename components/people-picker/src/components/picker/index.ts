import { fusionElement } from '@equinor/fusion-wc-core';

import { PeoplePickerElement } from './element';
import type { PeoplePickerElementProps } from './types';

export type { PeoplePickerElementProps };

export const tag = 'fwc-people-picker';

@fusionElement(tag)

export default class _ extends PeoplePickerElement { }

declare global {
  interface HTMLElementTagNameMap {
    [tag]: PeoplePickerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<PeoplePickerElementProps & React.HTMLAttributes<PeoplePickerElement>>,
        PeoplePickerElement
      >;
    }
  }
}
