import { LitElement } from 'lit';
import { PersonResolver } from '../person-provider';
import { PersonControllerConnectEvent } from '../events';
import { RequestResolvePersonAvatarEvent } from '../person-avatar/event';
import { RequestResolvePersonCardEvent } from '../person-card/event';
import { RequestResolvePersonListItemEvent } from '../person-list-item/event';

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
    this.addEventListener(RequestResolvePersonCardEvent.eventName, this.handleResolvePersonCard);
    this.addEventListener(RequestResolvePersonListItemEvent.eventName, this.handleResolvePersonListItem);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener(PersonControllerConnectEvent.eventName, this.handleElementConnect);
    this.removeEventListener(RequestResolvePersonAvatarEvent.eventName, this.handleResolvePersonAvatar);
    this.removeEventListener(RequestResolvePersonCardEvent.eventName, this.handleResolvePersonCard);
    this.removeEventListener(RequestResolvePersonListItemEvent.eventName, this.handleResolvePersonListItem);
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

  protected handleResolvePersonCard(e: RequestResolvePersonCardEvent) {
    if (this.resolver) {
      if (e.detail.azureId) {
        e.detail.result = this.resolver.getCardDetailsByAzureId(e.detail.azureId);
      } else if (e.detail.upn) {
        e.detail.result = this.resolver.getCardDetailsByUpn(e.detail.upn);
      }
      e.stopPropagation();
    }
  }

  protected handleResolvePersonListItem(e: RequestResolvePersonListItemEvent) {
    if (this.resolver) {
      if (e.detail.azureId) {
        e.detail.result = this.resolver.getListItemDetailsByAzureId(e.detail.azureId);
      } else if (e.detail.upn) {
        e.detail.result = this.resolver.getListItemDetailsByUpn(e.detail.upn);
      }
      e.stopPropagation();
    }
  }
}

export default PersonProviderElement;
