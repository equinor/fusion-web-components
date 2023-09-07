import { AzureIdOrUpnObj, CardData } from './task';

export class RequestResolvePersonCardEvent extends CustomEvent<
  AzureIdOrUpnObj & { result?: CardData | Promise<CardData> }
> {
  static readonly eventName = 'request-resolve-person-card';
  constructor(detail: AzureIdOrUpnObj, options: Omit<CustomEventInit, 'detail'> = { bubbles: true, composed: true }) {
    super(RequestResolvePersonCardEvent.eventName, { detail, ...options });
  }
}

declare global {
  interface ElementEventMap {
    [RequestResolvePersonCardEvent.eventName]: RequestResolvePersonCardEvent;
  }
}
