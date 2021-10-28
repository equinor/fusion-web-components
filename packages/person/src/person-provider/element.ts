<<<<<<< HEAD
import { LitElement } from 'lit';
=======
import { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators';
>>>>>>> a2e18aa (fix: upgraded lit-element and lit-html to li 2.0.0)
import { PersonResolver } from '../types';
import { PersonControllerConnectEvent } from '../events';

export type PersonProviderProps = {};

export class PersonProviderElement extends LitElement implements PersonProviderProps {
  protected updateCallbacks: Array<(resolver?: PersonResolver) => void> = [];

  createRenderRoot() {
    return this;
  }

  setResolver(resolver: PersonResolver) {
    this.updateCallbacks.forEach((callback) => {
      callback(resolver);
    });
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener(PersonControllerConnectEvent.eventName, this.handleElementConnect);
  }

  override disconnectedCallback() {
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
  }
}

export default PersonProviderElement;
