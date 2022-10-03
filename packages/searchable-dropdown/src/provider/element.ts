import { LitElement } from 'lit';
import { SearchableDropdownResolver } from '../types';
import { SearchableDropdownConnectEvent } from '../events';

/**
 * Provider element for the searchabledropdown component
 */
export class SearchableDropdownProviderElement extends LitElement {
  protected updateCallbacks: Array<(resolver?: SearchableDropdownResolver) => void> = [];

  protected createRenderRoot(): LitElement {
    return this;
  }

  public setResolver(resolver: SearchableDropdownResolver): void {
    this.updateCallbacks.forEach((callback) => {
      callback(resolver);
    });
  }

  public removeResolver(): void {
    this.updateCallbacks.forEach((callback) => {
      callback();
    });
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener(SearchableDropdownConnectEvent.eventName, this.handleElementConnect);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener(SearchableDropdownConnectEvent.eventName, this.handleElementConnect);
  }

  protected handleElementConnect(event: SearchableDropdownConnectEvent): void {
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

export default SearchableDropdownProviderElement;
