import { ReactiveController, ReactiveControllerHost } from 'lit';
import { Task } from '@lit-labs/task';
import { PersonResolver, PersonPresence, PersonDetails } from '../types';
import { PersonControllerConnectEvent } from '../events';

export interface PersonHost extends ReactiveControllerHost {
  azureId: string;
  dispatchEvent(event: Event): boolean;
  presence?: Task<[string], PersonPresence>;
  details?: Task<[string], PersonDetails>;
}

export class PersonController implements ReactiveController {
  constructor(private host: PersonHost) {
    this.host = host;
    this.host.addController(this);
  }

  protected updateResolver = (resolver?: PersonResolver) => {
    this.host.presence = this._peresenceTask(resolver);
    this.host.details = this._detailsTask(resolver);
    this.host.requestUpdate();
  };

  hostConnected() {
    const event = new PersonControllerConnectEvent({
      detail: {
        disconnectedCallback: (callback) => {
          this.disconnectProvider = callback;
        },
        updateResolver: this.updateResolver,
      },
      bubbles: true,
      composed: true,
      cancelable: false,
    });

    this.host.dispatchEvent(event);
  }

  hostDisconnected() {
    if (this.disconnectProvider) {
      this.disconnectProvider();
    }
  }

  protected disconnectProvider?: VoidFunction;

  protected get azureId() {
    return this.host.azureId;
  }

  private _peresenceTask(resolver?: PersonResolver): Task<[string], PersonPresence> {
    return new Task<[string], PersonPresence>(
      this.host,
      ([azureId]) => {
        if (!resolver?.getPresenceAsync) {
          throw new Error('PersonResolver is undefined');
        }
        return resolver.getPresenceAsync(azureId);
      },
      () => [this.azureId]
    );
  }

  private _detailsTask(resolver?: PersonResolver): Task<[string], PersonDetails> {
    return new Task<[string], PersonDetails>(
      this.host,
      ([azureId]) => {
        if (!resolver?.getDetailsAsync) {
          throw new Error('PersonResolver is undefined');
        }
        return resolver.getDetailsAsync(azureId);
      },
      () => [this.azureId]
    );
  }
}
