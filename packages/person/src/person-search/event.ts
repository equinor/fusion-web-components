// import { SearchableDropdownResult } from '@equinor/fusion-wc-searchable-dropdown';

import { PersonQueryDetails } from '../types';

type SearchQueryTerm = { query: string };

type SearchEventDetails = { result?: PersonQueryDetails | Promise<PersonQueryDetails> };

export class RequestResolvePersonSearchEvent extends CustomEvent<SearchQueryTerm & SearchEventDetails> {
  static readonly eventName = 'request-resolve-person-search';
  constructor(detail: SearchQueryTerm) {
    super(RequestResolvePersonSearchEvent.eventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }
}

declare global {
  interface ElementEventMap {
    [RequestResolvePersonSearchEvent.eventName]: RequestResolvePersonSearchEvent;
  }
}
