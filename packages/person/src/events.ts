import type { AzureIdOrUpnObj, PersonDetails, PersonInfo, PersonSearchResult, PersonSuggestResults, PersonResolveResults } from './types';

export type AbortableEventDetail<T = unknown> = T extends object
  ? { [K in keyof T]: T[K] } & { signal?: AbortSignal }
  : { signal?: AbortSignal };

export type ResolveEventDetail<T = unknown, R = unknown> = AbortableEventDetail<T> & { result?: R | Promise<R> };

abstract class RequestResolveEvent<T, R> extends CustomEvent<ResolveEventDetail<T, R>> {
  constructor(
    name: string,
    detail: ResolveEventDetail<T, R>,
    options: Omit<CustomEventInit, 'detail'> = { bubbles: true, composed: true },
  ) {
    super(name, { detail, ...options });
  }
}

export class RequestResolvePersonPhotoEvent extends RequestResolveEvent<AzureIdOrUpnObj, string> {
  static readonly eventName = 'request-resolve-person-photo';
  constructor(detail: AbortableEventDetail<AzureIdOrUpnObj>, options?: CustomEventInit) {
    super(RequestResolvePersonPhotoEvent.eventName, detail, options);
  }
}

export class RequestResolvePersonInfoEvent extends RequestResolveEvent<AzureIdOrUpnObj, PersonInfo> {
  static readonly eventName = 'request-resolve-person-info';
  constructor(detail: AbortableEventDetail<AzureIdOrUpnObj>, options?: CustomEventInit) {
    super(RequestResolvePersonInfoEvent.eventName, detail, options);
  }
}
export class RequestResolvePersonDetailEvent extends RequestResolveEvent<AzureIdOrUpnObj, PersonDetails> {
  static readonly eventName = 'request-resolve-person-detail';
  constructor(detail: AbortableEventDetail<AzureIdOrUpnObj>, options?: CustomEventInit) {
    super(RequestResolvePersonDetailEvent.eventName, detail, options);
  }
}

type RequestResolvePersonSearchEventArgs = {
  search: string;
};
export class RequestResolvePersonSearchEvent extends RequestResolveEvent<
  RequestResolvePersonSearchEventArgs,
  PersonSearchResult
> {
  static readonly eventName = 'request-resolve-person-search';
  constructor(detail: AbortableEventDetail<RequestResolvePersonSearchEventArgs>, options?: CustomEventInit) {
    super(RequestResolvePersonSearchEvent.eventName, detail, options);
  }
}

type RequestResolvePersonSuggestEventArgs = {
  search: string;
  systemAccounts: boolean;
};
export class RequestResolvePersonSuggestEvent extends RequestResolveEvent<
  RequestResolvePersonSuggestEventArgs,
  PersonSuggestResults
> {
  static readonly eventName = 'request-resolve-person-suggest';
  constructor(detail: AbortableEventDetail<RequestResolvePersonSuggestEventArgs>, options?: CustomEventInit) {
    super(RequestResolvePersonSuggestEvent.eventName, detail, options);
  }
}

type RequestResolvePersonResolveEventArgs = {
  resolveIds: string[];
};
export class RequestResolvePersonResolveEvent extends RequestResolveEvent<
  RequestResolvePersonResolveEventArgs,
  PersonResolveResults
> {
  static readonly eventName = 'request-resolve-person-resolve';
  constructor(detail: AbortableEventDetail<RequestResolvePersonResolveEventArgs>, options?: CustomEventInit) {
    super(RequestResolvePersonResolveEvent.eventName, detail, options);
  }
}

declare global {
  interface ElementEventMap {
    [RequestResolvePersonPhotoEvent.eventName]: RequestResolvePersonPhotoEvent;
    [RequestResolvePersonInfoEvent.eventName]: RequestResolvePersonInfoEvent;
    [RequestResolvePersonDetailEvent.eventName]: RequestResolvePersonDetailEvent;
    [RequestResolvePersonSearchEvent.eventName]: RequestResolvePersonSearchEvent;
    [RequestResolvePersonSuggestEvent.eventName]: RequestResolvePersonSuggestEvent;
    [RequestResolvePersonResolveEvent.eventName]: RequestResolvePersonResolveEvent;
  }
}
