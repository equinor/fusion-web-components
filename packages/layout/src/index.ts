import { fusionElement } from '@equinor/fusion-wc-core';
import { LayoutElement } from './element';
import type { LayoutElementProps } from './types';

export * from './element';
export * from './types';

export const tag = 'fwc-layout';

@fusionElement(tag)
export default class _ extends LayoutElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: LayoutElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<LayoutElementProps & React.HTMLAttributes<LayoutElement>>,
        LayoutElement
      >;
    }
  }
}
