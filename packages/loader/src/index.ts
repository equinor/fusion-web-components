import { fusionElement } from '@equinor/fusion-wc-core';
import { LoaderElement, LoaderElementProps } from './element';

export * from './element';

export const tag = 'fwc-loader';

@fusionElement(tag)
export default class _ extends LoaderElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: LoaderElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<LoaderElementProps & React.HTMLAttributes<LoaderElement>>,
        LoaderElement
      >;
    }
  }
}
