import { fusionElement } from '@equinor/fusion-wc-core';
import SearchableSelectElement from './element';
export * from './element';

export const tag = 'fwc-searchable-select';

@fusionElement(tag)
export default class _ extends SearchableSelectElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: SearchableSelectElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<React.HTMLAttributes<SearchableSelectElement>>,
        SearchableSelectElement
      >;
    }
  }
}
