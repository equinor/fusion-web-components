import { fusionElement } from '@equinor/fusion-wc-core';
import { SearchableDropdownElement } from './element';
import { SearchableDropdownProps } from '../types';
export * from './element';

export { sddStyles } from './element.css';

export const tag = 'fwc-searchable-dropdown';

@fusionElement(tag)
export default class _ extends SearchableDropdownElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: SearchableDropdownElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<
        React.PropsWithChildren<SearchableDropdownProps & React.HTMLAttributes<SearchableDropdownElement>>,
        SearchableDropdownElement
      >;
    }
  }
}
