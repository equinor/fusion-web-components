import { fusionElement } from '@equinor/fusion-wc-core';
import { PageElement } from './element';

export * from './element';

export const tag = 'fwc-page';

/**
 * Entry point for the fwc-page component.
 * Registers the custom element and provides framework typings.
 */
@fusionElement(tag)
export default class _ extends PageElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: PageElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<{} & React.HTMLAttributes<PageElement>>,
        PageElement
      >;
    }
  }
}
