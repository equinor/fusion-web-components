import { ReactiveController } from 'lit';
import { Task } from '@lit-labs/task';
import { PersonHost, PersonResolver } from './types';
import { PersonPresence, PersonDetails } from '../types';
import { PersonControllerConnectEvent } from '../events';

export class PersonController implements ReactiveController {
  constructor(private host: PersonHost) {
    this.host = host;
    this.host.addController(this);
  }

  protected updateResolver = (resolver?: PersonResolver): void => {
    this.host.presence = this._peresenceTask(resolver);
    this.host.details = this._detailsTask(resolver);
    this.host.requestUpdate();
  };

  hostConnected(): void {
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

  hostDisconnected(): void {
    if (this.disconnectProvider) {
      this.disconnectProvider();
    }
  }

  protected disconnectProvider?: VoidFunction;

  protected get azureId(): string {
    return this.host.azureId;
  }

  private _peresenceTask(resolver?: PersonResolver): Task<[string], PersonPresence> {
    return new Task<[string], PersonPresence>(
      this.host,
      ([azureId]: [string]) => {
        if (!resolver?.getPresence) {
          throw new Error('PersonResolver is undefined');
        }
        return Promise.resolve(resolver.getPresence(azureId));
      },
      () => [this.azureId]
    );
  }

  private _detailsTask(resolver?: PersonResolver): Task<[string], PersonDetails> {
    return new Task<[string], PersonDetails>(
      this.host,
      ([azureId]: [string]) => {
        if (!resolver?.getDetails) {
          throw new Error('PersonResolver is undefined');
        }
        return Promise.resolve(resolver.getDetails(azureId));
      },
      () => [this.azureId]
    );
  }
}
