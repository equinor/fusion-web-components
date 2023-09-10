import { LitElement } from 'lit';
import { PersonResolver } from '.';
import {
  RequestResolvePersonDetailEvent,
  RequestResolvePersonInfoEvent,
  RequestResolvePersonPhotoEvent,
  RequestResolvePersonSearchEvent,
} from '../../events';

// TODO add styling to display: contents
export class PersonProviderElement extends LitElement {
  protected resolver: PersonResolver | undefined = undefined;

  createRenderRoot(): LitElement {
    return this;
  }

  setResolver(resolver?: PersonResolver): void {
    this.resolver = resolver;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener(RequestResolvePersonDetailEvent.eventName, this.handleResolvePersonDetail);
    this.addEventListener(RequestResolvePersonInfoEvent.eventName, this.handleResolvePersonInfo);
    this.addEventListener(RequestResolvePersonSearchEvent.eventName, this.handleResolvePersonSearch);
    this.addEventListener(RequestResolvePersonPhotoEvent.eventName, this.handleResolvePersonPhoto);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener(RequestResolvePersonDetailEvent.eventName, this.handleResolvePersonDetail);
    this.removeEventListener(RequestResolvePersonInfoEvent.eventName, this.handleResolvePersonInfo);
    this.removeEventListener(RequestResolvePersonSearchEvent.eventName, this.handleResolvePersonSearch);
    this.removeEventListener(RequestResolvePersonPhotoEvent.eventName, this.handleResolvePersonPhoto);
  }

  protected handleResolvePersonDetail(e: RequestResolvePersonDetailEvent) {
    if (this.resolver) {
      e.detail.result = this.resolver.getDetails(e.detail);
      e.stopPropagation();
    }
  }

  protected handleResolvePersonInfo(e: RequestResolvePersonInfoEvent) {
    if (this.resolver) {
      e.detail.result = this.resolver.getInfo(e.detail);
      e.stopPropagation();
    }
  }

  protected handleResolvePersonSearch(e: RequestResolvePersonSearchEvent) {
    if (this.resolver) {
      e.detail.result = this.resolver.search(e.detail);
      e.stopPropagation();
    }
  }
  protected handleResolvePersonPhoto(e: RequestResolvePersonPhotoEvent) {
    if (this.resolver) {
      e.detail.result = this.resolver.getPhoto(e.detail);
      e.stopPropagation();
    }
  }
}

export default PersonProviderElement;
