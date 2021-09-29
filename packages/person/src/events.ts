import { PersonResolver } from './types';

export type PersonControllerConnectEventDetails = {
  disconnectedCallback: (callback: VoidFunction) => void;
  updateResolver: (resolver?: PersonResolver) => void;
};

export class PersonControllerConnectEvent extends CustomEvent<PersonControllerConnectEventDetails> {
  static readonly eventName = 'fwc-person-controller-connect';
  constructor(args: CustomEventInit<PersonControllerConnectEventDetails>) {
    super(PersonControllerConnectEvent.eventName, args);
  }
}

declare global {
  interface ElementEventMap {
    [PersonControllerConnectEvent.eventName]: PersonControllerConnectEvent;
  }
}
