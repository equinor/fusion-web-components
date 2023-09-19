import type { AzureIdOrUpnObj, PersonDetails, PersonInfo, PersonSearchResult } from './types';

export type AbortableEventDetail<T = unknown> = T extends object
  ? { [K in keyof T]: T[K] } & { signal?: AbortSignal }
  : { signal?: AbortSignal };

type ResolveEventDetail<T = unknown, R = unknown> = AbortableEventDetail<T> & { result?: R | Promise<R> };

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

declare global {
  interface ElementEventMap {
    [RequestResolvePersonPhotoEvent.eventName]: RequestResolvePersonPhotoEvent;
    [RequestResolvePersonInfoEvent.eventName]: RequestResolvePersonInfoEvent;
    [RequestResolvePersonDetailEvent.eventName]: RequestResolvePersonDetailEvent;
    [RequestResolvePersonSearchEvent.eventName]: RequestResolvePersonSearchEvent;
  }
}
