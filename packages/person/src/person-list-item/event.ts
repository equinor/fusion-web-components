import { AzureIdOrUpnObj } from './task';
import { ListItemData } from './types';

export class RequestResolvePersonListItemEvent extends CustomEvent<
  AzureIdOrUpnObj & { result?: ListItemData | Promise<ListItemData> }
> {
  static readonly eventName = 'request-resolve-person-list-item';
  constructor(detail: AzureIdOrUpnObj, options: Omit<CustomEventInit, 'detail'> = { bubbles: true, composed: true }) {
    super(RequestResolvePersonListItemEvent.eventName, { detail, ...options });
  }
}

declare global {
  interface ElementEventMap {
    [RequestResolvePersonListItemEvent.eventName]: RequestResolvePersonListItemEvent;
  }
}
