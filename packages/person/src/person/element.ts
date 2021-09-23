import { LitElement } from 'lit';
import { property } from 'lit/decorators';
import { PersonResolver, PersonPresence, PersonDetails, PersonPicture } from '../types';
import { PersonElementConnectEvent } from '../events';

export type PersonElementProps = {
  azureId?: string;
};

export class PersonElement extends LitElement implements PersonElementProps {
  @property({ type: String })
  azureId?: string;

  @property({ type: Object })
  personResolver?: PersonResolver;

  protected updateResolver = (resolver?: PersonResolver) => {
    this.personResolver = resolver;
  };

  override connectedCallback() {
    super.connectedCallback();
    this.connectProvider();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this.disconnectProvider) {
      this.disconnectProvider();
    }
  }

  async getDetailsAsync(): Promise<PersonDetails | undefined> {
    if (this.azureId && this.personResolver?.getDetailsAsync) {
      return await this.personResolver?.getDetailsAsync(this.azureId);
    }
    return Promise.resolve(undefined);
  }

  async getPresenceAsync(): Promise<PersonPresence | undefined> {
    if (this.azureId && this.personResolver?.getPresenceAsync) {
      return await this.personResolver?.getPresenceAsync(this.azureId);
    }
    return Promise.resolve(undefined);
  }

  async getPictureAsync(): Promise<PersonPicture | undefined> {
    if (this.azureId && this.personResolver?.getPictureAsync) {
      return await this.personResolver?.getPictureAsync(this.azureId);
    }
    return Promise.resolve(undefined);
  }

  protected connectProvider(): void {
    const event = new PersonElementConnectEvent({
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

    this.dispatchEvent(event);
  }

  protected disconnectProvider?: VoidFunction;
}

export default PersonElement;
