import { ReactiveControllerHost } from 'lit';

/**
 * Properties/Attributes for web component
 * @label TextInput Label
 * @placeholder TextInput placeholder
 * @variant Set variant to filled|outlined on fwc-textinput and fwc-list elements
 * @meta Icon to show after each fwc-list-item.
 * @graphic Icon to show before each fwc-list-item.
 * @selected Display selected item's title
 * @initialText Text to display in dropdown before/without querystring in fwc-textinput
 * @leadingIcon Leading Icon to display in fwc-text-input
 */
export type SearchableDropdownProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  variant?: string;
  meta?: string;
  multiple?: boolean;
  graphic?: string;
  selected?: string;
  initialText?: string;
  leadingIcon?: string;
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
  initialResult?: SearchableDropdownResult;
}

/**
 * The element the controller is conected to
 */
export interface SearchableDropdownControllerHost extends ReactiveControllerHost {
  renderRoot: HTMLElement | ShadowRoot;
  dispatchEvent(event: Event): boolean;
  nodeName: string;
  multiple: boolean;
  selected: string;
  trailingIcon: string;
  initialText: string;
}
