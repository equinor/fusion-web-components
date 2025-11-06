import { fusionElement } from '@equinor/fusion-wc-core';

import { PersonPickerElement } from './element';
import type { PersonPickerElementProps } from './types';

export type { PersonPickerElementProps };

export const tag = 'fwc-person-picker';

@fusionElement(tag)

export default class _ extends PersonPickerElement { }

declare global {
  interface HTMLElementTagNameMap {
    [tag]: PersonPickerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<PersonPickerElementProps & React.HTMLAttributes<PersonPickerElement>>,
        PersonPickerElement
      >;
    }
  }
}
