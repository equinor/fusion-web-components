import { ReactiveControllerHost } from 'lit';

/**
 * Properties/Attributes for web component
 * @label TextInput Label
 * @placeholder TextInput placeholder
 * @placeholder TextInput placeholder
 */
export type SearchableDropdownProps = {
  label?: string;
  placeholder?: string;
  variant?: string;
  meta?: string;
  graphic?: string;
  selected?: string;
  initialText?: string;
};

/**
 * Array of SearchableDropdownResultItem
 */
export type SearchableDropdownResult = Array<SearchableDropdownResultItem>;

/**
 * Interface for a single list item object returned from resolver
 * @id the id to identify this item
 * @title The items title
 * @subtitle The second line below title
 * @isSelected The element shows as selected
 * @isDisabled The element is not selectable
 * @isError The element is Un-selectable and red
 * @meta The fwc-icon class to show after item text
 * @graphic The fwc-icon class to show after item text
 * @type Type of list item
 * @children The children if type is section
 */
export interface SearchableDropdownResultItem {
  id: string;
  title?: string;
  subTitle?: string;
  isDisabled?: boolean;
  isSelected?: boolean;
  isError?: boolean;
  meta?: string;
  graphic?: string;
  type?: 'section' | 'divider' | null;
  children?: SearchableDropdownResult;
}

/**
 * The resolver methods
 */
export interface SearchableDropdownResolver {
  searchQuery: (queryString: string) => Promise<SearchableDropdownResult> | SearchableDropdownResult;
}

/**
 * The element the controller is conected to
 */
export interface SearchableDropdownControllerHost extends ReactiveControllerHost {
  renderRoot: any;
  dispatchEvent(event: Event): boolean;
  nodeName: string;
  selected: string;
  trailingIcon: string;
  initialText: string;
}
