import { fusionElement } from '@equinor/fusion-wc-core';

import { PickerElement } from './element';
import type { PickerElementProps } from './types';

export * from './element';
export * from './types';

export const tag = 'fwc-people-picker';

@fusionElement(tag)

export default class _ extends PickerElement { }

declare global {
  interface HTMLElementTagNameMap {
    [tag]: PickerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<PickerElementProps & React.HTMLAttributes<PickerElement>>,
        PickerElement
      >;
    }
  }
}
