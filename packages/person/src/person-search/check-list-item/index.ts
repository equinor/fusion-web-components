import { fusionElement } from '@equinor/fusion-wc-core';
import { PersonSearchCheckListItemElement } from './element';
import { type SearchableDropdownResultItem } from '@equinor/fusion-wc-searchable-dropdown';
export * from './element';

export type PersonSearchCheckListItemElementProps = {
  item?: SearchableDropdownResultItem;
};

export const tagCheckListItem = 'fwc-person-search-check-list-item';

@fusionElement(tagCheckListItem)
export default class _ extends PersonSearchCheckListItemElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tagCheckListItem]: PersonSearchCheckListItemElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tagCheckListItem]: React.DetailedHTMLProps<
        React.PropsWithChildren<
          PersonSearchCheckListItemElementProps & React.HTMLAttributes<PersonSearchCheckListItemElement>
        >,
        PersonSearchCheckListItemElement
      >;
    }
  }
}
