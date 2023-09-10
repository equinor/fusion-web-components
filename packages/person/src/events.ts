import type { AzureIdOrUpnObj, PersonDetails, PersonInfo, PersonSearchResult } from './types';

export class RequestResolvePersonPhotoEvent extends CustomEvent<
  AzureIdOrUpnObj & { result?: string | Promise<string> }
> {
  static readonly eventName = 'request-resolve-person-photo';
  constructor(detail: AzureIdOrUpnObj, options: Omit<CustomEventInit, 'detail'> = { bubbles: true, composed: true }) {
    super(RequestResolvePersonPhotoEvent.eventName, { detail, ...options });
  }
}

export class RequestResolvePersonInfoEvent extends CustomEvent<
  AzureIdOrUpnObj & { result?: PersonInfo | Promise<PersonInfo> }
> {
  static readonly eventName = 'request-resolve-person-info';
  constructor(detail: AzureIdOrUpnObj, options: Omit<CustomEventInit, 'detail'> = { bubbles: true, composed: true }) {
    super(RequestResolvePersonInfoEvent.eventName, { detail, ...options });
  }
}
export class RequestResolvePersonDetailEvent extends CustomEvent<
  AzureIdOrUpnObj & { result?: PersonDetails | Promise<PersonDetails> }
> {
  static readonly eventName = 'request-resolve-person-detail';
  constructor(detail: AzureIdOrUpnObj, options: Omit<CustomEventInit, 'detail'> = { bubbles: true, composed: true }) {
    super(RequestResolvePersonDetailEvent.eventName, { detail, ...options });
  }
}

export class RequestResolvePersonSearchEvent extends CustomEvent<
  { search: string } & { result?: PersonSearchResult | Promise<PersonSearchResult> }
> {
  static readonly eventName = 'request-resolve-person-search';
  constructor(
    detail: { search: string },
    options: Omit<CustomEventInit, 'detail'> = { bubbles: true, composed: true },
  ) {
    super(RequestResolvePersonSearchEvent.eventName, { detail, ...options });
  }
}

declare global {
  interface ElementEventMap {
    [RequestResolvePersonPhotoEvent.eventName]: RequestResolvePersonPhotoEvent;
    [RequestResolvePersonInfoEvent.eventName]: RequestResolvePersonInfoEvent;
    [RequestResolvePersonDetailEvent.eventName]: RequestResolvePersonDetailEvent;
    [RequestResolvePersonSearchEvent.eventName]: RequestResolvePersonSearchEvent;
  }
}
