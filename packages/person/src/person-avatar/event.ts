import { AzureIdOrUpnObj } from './task';
import { AvatarData } from './types';

export class RequestResolvePersonAvatarEvent extends CustomEvent<
  AzureIdOrUpnObj & { result?: AvatarData | Promise<AvatarData> }
> {
  static readonly eventName = 'request-resolve-person-image';
  constructor(detail: AzureIdOrUpnObj, options: Omit<CustomEventInit, 'detail'> = { bubbles: true, composed: true }) {
    super(RequestResolvePersonAvatarEvent.eventName, { detail, ...options });
  }
}

declare global {
  interface ElementEventMap {
    [RequestResolvePersonAvatarEvent.eventName]: RequestResolvePersonAvatarEvent;
  }
}
