import { fusionElement } from '@equinor/fusion-wc-core';
import LinkButtonElement, { LinkButtonElementProps } from './element';
export * from './element';

export const tag = 'fwc-link-button';

@fusionElement(tag)
export default class _ extends LinkButtonElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: LinkButtonElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<LinkButtonElementProps & React.HTMLAttributes<LinkButtonElement>>,
        LinkButtonElement
      >;
    }
  }
}
