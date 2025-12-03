import { ReactiveController, ReactiveControllerHost } from "lit";

class BaseEvent extends CustomEvent<{ azureId: string }> {
  constructor(eventName: string, azureId: string) {
    const args = {
      detail: { azureId },
      bubbles: true,
      composed: true,
    }
    super(eventName, args);
  }
}

export class RemovePersonEvent extends BaseEvent {
  static readonly eventName = 'removeperson';
  constructor(azureId: string) {
    super(RemovePersonEvent.eventName, azureId);
  }
}

export class AddPersonEvent extends BaseEvent {
  static readonly eventName = 'addperson';
  constructor(azureId: string) {
    super(AddPersonEvent.eventName, azureId);
  }
}

export class SelectController implements ReactiveController {
  #host: ReactiveControllerHost & EventTarget;

  constructor(host: ReactiveControllerHost & EventTarget) {
    this.#host = host;
    this.#host.addController(this);
  }

  // needed to be a ReactiveController
  hostConnected(): void { }
  hostDisconnected(): void { }

  triggerRemoveEvent(azureId: string): void {
    this.#host.dispatchEvent(new RemovePersonEvent(azureId));
  }

  triggerAddEvent(azureId: string): void {
    this.#host.dispatchEvent(new AddPersonEvent(azureId));
  }
}
