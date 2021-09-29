import { ReactiveController, ReactiveControllerHost } from 'lit';
import { Task } from '@lit-labs/task';
import { PersonResolver, PersonPresence, PersonDetails } from '../types';
import { PersonControllerConnectEvent } from '../events';

export interface PersonHost extends ReactiveControllerHost {
  azureId: string;
  dispatchEvent(event: Event): boolean;
}

export class PersonController implements ReactiveController {
  private resolver?: PersonResolver;

  constructor(private host: PersonHost) {
    host.addController(this);
    this.host = host;
  }

  protected updateResolver = (resolver?: PersonResolver) => {
    this.resolver = resolver;
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

  get azureId() {
    return this.host.azureId;
  }

  get presence(): Task<[string], PersonPresence> {
    return new Task<[string], PersonPresence>(
      this.host,
      async ([azureId]) => {
        if (!this.resolver?.getPresenceAsync) {
          throw new Error('PersonResolver is undefined');
        }
        return await this.resolver.getPresenceAsync(azureId);
      },
      () => [this.azureId]
    );
  }

  get details(): Task<[string], PersonDetails> {
    return new Task<[string], PersonDetails>(
      this.host,
      async ([azureId]) => {
        // if (!this.resolver?.getDetailsAsync) {
        //   console.log('HAJASA');
        //   throw new Error('PersonResolver is undefined');
        // }
        //return await this.resolver.getDetailsAsync(azureId);
        return {
          azureUniqueId: azureId,
        };
      },
      () => [this.azureId]
    );
  }

  protected disconnectProvider?: VoidFunction;
}
