import { fusionElement } from '@equinor/fusion-wc-core';
import { DividerElement, DividerElementProps } from './element';
export * from './element';

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
