import { LitElement } from 'lit';
import { PersonResolver } from '../person-provider';
import { PersonControllerConnectEvent } from '../events';

export class PersonProviderElement extends LitElement {
  protected resolver: PersonResolver | undefined = undefined;
  protected updateCallbacks: Array<(resolver?: PersonResolver) => void> = [];

  createRenderRoot(): LitElement {
    return this;
  }

  setResolver(resolver?: PersonResolver): void {
    this.resolver = resolver;
    this.updateCallbacks.forEach((callback) => {
      callback(resolver);
    });
  }

  removeResolver(): void {
    this.updateCallbacks.forEach((callback) => {
      callback();
    });
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener(PersonControllerConnectEvent.eventName, this.handleElementConnect);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener(PersonControllerConnectEvent.eventName, this.handleElementConnect);
  }

  protected handleElementConnect(event: PersonControllerConnectEvent): void {
    const { disconnectedCallback, updateResolver } = event.detail;

    disconnectedCallback(() => {
      const index = this.updateCallbacks.indexOf(updateResolver);
      if (index > 0) {
        this.updateCallbacks.splice(index, 1);
      }
    });

    this.updateCallbacks.push(updateResolver);

    event.preventDefault();
    event.stopPropagation();

    if (this.resolver) {
      updateResolver(this.resolver);
    }
  }
}

export default PersonProviderElement;
