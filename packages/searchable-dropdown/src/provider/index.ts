import { fusionElement } from '@equinor/fusion-wc-core';
import SearchableDropdownProviderElement from './element';

export * from './element';
export * from './controller';

const tag = 'fwc-searchable-dropdown-provider';

@fusionElement(tag)
export default class _ extends SearchableDropdownProviderElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: SearchableDropdownProviderElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<React.HTMLAttributes<SearchableDropdownProviderElement>>,
        SearchableDropdownProviderElement
      >;
    }
  }
}
