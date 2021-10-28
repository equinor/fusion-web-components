import { fusionElement } from '@equinor/fusion-wc-core';
import { DividerElement } from './element';
import { DividerElementProps } from './types';

export * from './element';
export * from './types';

export const tag = 'fwc-divider';

@fusionElement(tag)
export default class _ extends DividerElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: DividerElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<DividerElementProps & React.HTMLAttributes<DividerElement>>,
        DividerElement
      >;
    }
  }
}
