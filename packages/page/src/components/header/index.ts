import { fusionElement } from '@equinor/fusion-wc-core';
import { HeaderElement } from './element';

export * from './element';

export const tag = 'fwc-page-header';

@fusionElement(tag)
export default class _ extends HeaderElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: HeaderElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<{} & React.HTMLAttributes<HeaderElement>>,
        HeaderElement
      >;
    }
  }
}
