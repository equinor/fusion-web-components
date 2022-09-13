import { SearchableDropdownResolver } from './types';

export type SearchableDropdownConnectEventDetails = {
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
