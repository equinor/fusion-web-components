import { LitElement } from 'lit';
import { PersonResolver } from '../person-provider';
import { PersonControllerConnectEvent } from '../events';
import { RequestResolvePersonAvatarEvent } from '../person-avatar/event';
import { RequestResolvePersonSearchEvent } from '../person-search/event';

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
    this.addEventListener(RequestResolvePersonAvatarEvent.eventName, this.handleResolvePersonAvatar);
    this.addEventListener(RequestResolvePersonSearchEvent.eventName, this.handleResolvePersonSearch);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener(PersonControllerConnectEvent.eventName, this.handleElementConnect);
    this.removeEventListener(RequestResolvePersonAvatarEvent.eventName, this.handleResolvePersonAvatar);
    this.removeEventListener(RequestResolvePersonSearchEvent.eventName, this.handleResolvePersonSearch);
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

  protected handleResolvePersonAvatar(e: RequestResolvePersonAvatarEvent) {
    if (this.resolver) {
      if (e.detail.azureId) {
        e.detail.result = this.resolver.getImageByAzureId(e.detail.azureId);
      } else if (e.detail.upn) {
        e.detail.result = this.resolver.getImageByUpn(e.detail.upn);
      }
      e.stopPropagation();
    }
  }

  protected handleResolvePersonSearch(e: RequestResolvePersonSearchEvent) {
    if (this.resolver) {
      e.detail.result = this.resolver.getQuery(e.detail.query);
      e.stopPropagation();
    }
  }
}

export default PersonProviderElement;
