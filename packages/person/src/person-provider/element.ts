import { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators';
import { PersonResolver } from '../types';
import { PersonElementConnectEvent } from '../events';

export type PersonProviderProps = {
  resolver?: PersonResolver;
};

export class PersonProviderElement extends LitElement implements PersonProviderProps {
  @property({ type: Object })
  resolver?: PersonResolver;

  protected updateCallbacks: Array<(resolver?: PersonResolver) => void> = [];

  createRenderRoot() {
    return this;
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('resolver')) {
      this.updateCallbacks.forEach((callback) => {
        callback(this.resolver);
      });
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener(PersonElementConnectEvent.eventName, this.handleElementConnect);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener(PersonElementConnectEvent.eventName, this.handleElementConnect);
  }

  protected handleElementConnect(event: PersonElementConnectEvent): void {
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
