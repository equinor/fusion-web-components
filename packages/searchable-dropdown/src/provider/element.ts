import { LitElement, css } from 'lit';
import { SearchableDropdownResolver } from '../types';
import { SearchableDropdownConnectEvent } from '../events';

/**
 * Provider element for the searchabledropdown component
 */
export class SearchableDropdownProviderElement extends LitElement {
  static styles = css`
    :host {
      width: 100%;
    }
    fwc-searchable-dropdown-provider {
      width: 100%;
    }
  `;

  protected resolverCallbacks: Array<(resolver?: SearchableDropdownResolver) => void> = [];

  protected createRenderRoot(): LitElement {
    return this;
  }

  /* Called in the useSearchableDropdownProviderRef */
  public connectResolver(resolver: SearchableDropdownResolver): void {
    this.resolverCallbacks.forEach((callback) => {
      callback(resolver);
    });
  }

  public removeResolver(): void {
    this.resolverCallbacks.forEach((callback) => {
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
      this.resolverCallbacks.filter((callback) => callback !== updateResolver);
    });
    this.resolverCallbacks.push(updateResolver);
    event.preventDefault();
    event.stopPropagation();
  }
}

export default SearchableDropdownProviderElement;
