import { ReactiveControllerHost } from 'lit';
import { ActionDetail } from '@material/mwc-list/mwc-list-foundation';
import { TextInputElement } from '@equinor/fusion-wc-textinput';
/**
 * Properties/Attributes for web component
 * @label TextInput Label
 * @placeholder TextInput placeholder
 * @variant Set variant to 'page' | 'page-outlined' | 'page-dense' | 'header' | 'header-filled'
 * @meta Icon to show after each fwc-list-item.
 * @graphic Icon to show before each fwc-list-item.
 * @initialText Text to display in dropdown before/without querystring in fwc-textinput
 * @leadingIcon Leading Icon to display in fwc-text-input
 * @dropdownHeight Sets max-height of the dropdown
 */
export interface SearchableDropdownProps {
  autofocus?: boolean;
  label?: string;
  placeholder?: string;
  value?: string;
  variant?: string;
  meta?: string;
  multiple?: boolean;
  graphic?: string;
  initialText?: string;
  leadingIcon?: string;
  dropdownHeight?: string;
  textInputElement?: TextInputElement;
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
  closeHandler?: (e: MouseEvent) => void;
}

/**
 * The element the controller is conected to
 */
export interface SearchableDropdownControllerHost extends SearchableDropdownProps, ReactiveControllerHost {
  renderRoot: HTMLElement | ShadowRoot;
  dispatchEvent(event: Event): boolean;
  nodeName: string;
  trailingIcon: string;
}

export interface ExplicitEventTarget extends Event {
  readonly explicitOriginalTarget: HTMLInputElement;
  readonly detail: ActionDetail;
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
