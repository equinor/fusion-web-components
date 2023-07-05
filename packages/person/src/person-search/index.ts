import { fusionElement } from '@equinor/fusion-wc-core';
import PersonSearchElement from './element';
import { SearchableDropdownProps as PersonSearchProps } from '@equinor/fusion-wc-searchable-dropdown';
export * from './element';

export const tag = 'fwc-person-search';

@fusionElement(tag)
export default class _ extends PersonSearchElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: PersonSearchElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<PersonSearchProps & React.HTMLAttributes<PersonSearchElement>>,
        PersonSearchElement
      >;
    }
  }
}
