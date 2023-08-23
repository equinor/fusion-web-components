import { AvatarData, AzureIdOrUpnObj } from './task';

export class RequestResolvePersonAvatarEvent extends CustomEvent<
  AzureIdOrUpnObj & { result?: AvatarData | Promise<AvatarData> }
> {
  static readonly eventName = 'request-resolve-person-image';
  constructor(detail: AzureIdOrUpnObj, options: Omit<CustomEventInit, 'detail'> = { bubbles: true }) {
    super(RequestResolvePersonAvatarEvent.eventName, { detail, ...options });
  }
}

declare global {
  interface ElementEventMap {
    [RequestResolvePersonAvatarEvent.eventName]: RequestResolvePersonAvatarEvent;
  }
}
