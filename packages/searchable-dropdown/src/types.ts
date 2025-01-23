import { ReactiveControllerHost } from 'lit';
import { TextInputElement } from '@equinor/fusion-wc-textinput';
import { ListElement } from '@equinor/fusion-wc-list';
import { IconElement, IconType } from '@equinor/fusion-wc-icon';
/**
 * Properties/Attributes for web component
 * @autofocus Sets focus on textinput when mounted
 * @disabled Disable TextInput
 * @dropdownHeight Sets max-height of the dropdown
 * @graphic Icon to show before each fwc-list-item.
 * @initialText Text to display in dropdown before/without querystring in fwc-textinput
 * @label TextInput Label
 * @leadingIcon Leading Icon to display in fwc-text-input
 * @meta Icon to show after each fwc-list-item.
 * @multiple Allow for multiple selections
 * @placeholder TextInput placeholder
 * @selectedId Preselected item id
 * @textInputElement the html node of input
 * @value The preselected value. shoudl be combined with value
 * @variant Set variant to 'page' | 'page-outlined' | 'page-dense' | 'header' | 'header-filled'
 */
export interface SearchableDropdownProps {
  autofocus?: boolean;
  selectTextOnFocus?: boolean;
  disabled?: boolean;
  dropdownHeight?: string;
  graphic?: string;
  initialText?: string;
  label?: string;
  leadingIcon?: string;
  meta?: string;
  multiple?: boolean;
  placeholder?: string;
  selectedId?: string;
  textInputElement?: TextInputElement;
  listElement?: ListElement;
  value?: string;
  variant?: string;
}

/**
 * Array of SearchableDropdownResultItem's
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
  children?: SearchableDropdownResult;
  graphic?: string;
  graphicType?: IconType | 'inline-svg' | 'inline-html';
  id: string;
  isDisabled?: boolean;
  isError?: boolean;
  isSelected?: boolean;
  meta?: string;
  metaType?: IconType | 'inline-svg' | 'inline-html';
  subTitle?: string;
  title?: string;
  type?: 'section' | 'divider' | null;
}

/**
 * The resolver methods
 */
export interface SearchableDropdownResolver {
  closeHandler?: (e: MouseEvent | KeyboardEvent) => void;
  initialResult?: SearchableDropdownResult;
  searchQuery: (queryString: string) => Promise<SearchableDropdownResult> | SearchableDropdownResult;
}

/**
 * The element the controller is conected to
 */
export interface SearchableDropdownControllerHost extends SearchableDropdownProps, ReactiveControllerHost, EventTarget {
  dispatchEvent(event: Event): boolean;
  nodeName: string;
  renderRoot: HTMLElement | DocumentFragment;
  trailingIcon: string;
  trailingIconElement?: IconElement;
  selectedItems: Set<SearchableDropdownResultItem['id']>;
  noContentText: string;
  id: string;
}

export interface ExplicitEventTarget extends Event {
  readonly detail: {
    index: number;
  };
  readonly explicitOriginalTarget: HTMLInputElement;
}

type SearchableDropdownSelectEventDetail = {
  selected: SearchableDropdownResult;
};

export class SearchableDropdownSelectEvent extends CustomEvent<SearchableDropdownSelectEventDetail> {
  static readonly eventName = 'select';
  constructor(args: CustomEventInit<SearchableDropdownSelectEventDetail>) {
    super(SearchableDropdownSelectEvent.eventName, args);
  }
}

type SearchableDropdownConnectEventDetails = {
  disconnectedCallback: (callback: VoidFunction) => void;
  updateResolver: (resolver?: SearchableDropdownResolver) => void;
};

export class SearchableDropdownConnectEvent extends CustomEvent<SearchableDropdownConnectEventDetails> {
  static readonly eventName = 'fwc-searchabledropdown-controller-connect';
  constructor(args: CustomEventInit<SearchableDropdownConnectEventDetails>) {
    super(SearchableDropdownConnectEvent.eventName, args);
  }
}

declare global {
  interface ElementEventMap {
    [SearchableDropdownConnectEvent.eventName]: SearchableDropdownConnectEvent;
  }
}
