import { PersonResolver } from './types';

export type PersonElementConnectEventDetails = {
  disconnectedCallback: (callback: VoidFunction) => void;
  updateResolver: (resolver?: PersonResolver) => void;
};

export class PersonElementConnectEvent extends CustomEvent<PersonElementConnectEventDetails> {
  static readonly eventName = 'fwc-person-element-connect';
  constructor(args: CustomEventInit<PersonElementConnectEventDetails>) {
    super(PersonElementConnectEvent.eventName, args);
  }
}

declare global {
  interface ElementEventMap {
    [PersonElementConnectEvent.eventName]: PersonElementConnectEvent;
  }
}
