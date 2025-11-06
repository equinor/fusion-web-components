// TODO - CLEAN UP!
import { html, LitElement } from 'lit';
import type { CSSResult, TemplateResult } from 'lit';

import { property, queryAsync, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import type { PeopleAvatarElementProps } from './types';
import style from './element.css';

import { type PersonInfo, PersonCardElement } from '@equinor/fusion-wc-person';
import { BadgeElement } from '@equinor/fusion-wc-badge';
import { IconElement } from '@equinor/fusion-wc-icon';
import { SkeletonElement } from '@equinor/fusion-wc-skeleton';

// persist elements
BadgeElement;
IconElement;
PersonCardElement;
SkeletonElement;

export type PersonAvatarShowCardOnType = 'click' | 'hover' | 'none';

/**
 * Element for displaying a people avatar.
 * 
 * @tag fwc-people-avatar
 * @property {PersonInfo} dataSource - The data source for the avatar.
 * @property {disabled} disabled - Sets the avatar to be rendered as disabled.
 */
export class PeopleAvatarElement extends LitElement implements PeopleAvatarElementProps {
  static styles: CSSResult[] = [style];

  @property({
    type: Object,
    converter: (value: string | null) => {
      try {
        return JSON.parse(value ?? '{}');
      } catch {
        return {};
      }
    }
  })
  dataSource: PersonInfo = {} as PersonInfo;

  /**
   * @internal
   */
  @property({ type: Boolean, attribute: false, reflect: false })
  isFloatingOpen = false;

  /**
   * Sets the avatar to be rendered as disabled.
   */
  @property({ type: Boolean })
  disabled?: boolean;

  /**
   * @internal
   */
  @queryAsync('#floating')
  public floating!: Promise<HTMLDivElement>;

  /**
   * @internal
   */
  @queryAsync('#root')
  public root!: Promise<HTMLDivElement>;

  /**
   * @internal
   */
  @state()
  protected intersected = false;

  /**
   * @internal
   */
  protected controllers = {
    observer: new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.intersected = true;
          // stop observing all targets
          this.controllers.observer.disconnect();
        }
      });
    }),
  };

  connectedCallback(): void {
    super.connectedCallback();
    this.controllers.observer.observe(this);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    // stop observing all targets
    this.controllers.observer.disconnect();
  }

  protected triggerCardTimer: number | null = null;

  protected triggerTimeout(show: boolean): void {
    if (this.triggerCardTimer) {
      clearTimeout(this.triggerCardTimer);
    }
    this.triggerCardTimer = setTimeout(() => {
      this.isFloatingOpen = show;
      this.triggerCardTimer = null;
    }, 500);
  }

  protected triggerCardShow(): void {
    if (this.disabled) {
      return;
    }

    this.triggerTimeout(true);
  }

  protected triggerCardHide(): void {
    this.triggerTimeout(false);
  }

  protected renderApplicationBadge(): TemplateResult {
    if (!this.dataSource.applicationId) {
      return html``;
    }

    return html`
      <div slot="badge" id="application-badge" style="background-color: ${this.dataSource.avatarColor};">
        <fwc-icon
          icon="apps"
        ></fwc-icon>
      </div>
    `;
  }

  protected renderImageWhenIntersected() {
    if (!this.intersected) {
      return html`<fwc-skeleton size="small" variant="circle"></fwc-skeleton>`;
    }
    return html`<img src="${this.dataSource.avatarUrl}" alt="${this.dataSource.name}" />`;
  }

  protected renderImage(hoverEvents: boolean = true) {
    if (this.dataSource.avatarUrl) {
      if (hoverEvents) {
        return html`<div id="image-container" @mouseover=${this.triggerCardShow} @mouseout=${this.triggerCardHide}>${this.renderImageWhenIntersected()}</div>`;
      }

      return html`<div id="image-container">${this.renderImageWhenIntersected()}</div>`;
    }

    return html``;
  }

  protected renderImageAndBadge(hoverEvents: boolean = true): TemplateResult {
    return html`
      <div class="image-container">
        ${this.renderImage(hoverEvents)}
        ${this.renderApplicationBadge()}
      </div>
    `;
  }

  protected render(): TemplateResult {
    return html`
      <div id="root">
        ${this.renderImageAndBadge()}
        <div id="floating" @mouseover=${this.triggerCardShow} @mouseout=${this.triggerCardHide}>
          <slot name="floating" >
          ${when(this.isFloatingOpen, () => html`
            <fwc-person-card shadow="true" @click=${(e: MouseEvent) => e.stopPropagation()} .dataSource="${this.dataSource}">
              <div slot="avatar">
                ${this.renderImageAndBadge(false)}
              </div>
            </fwc-person-card>
          `)}
          </slot>
        </div>
      </div>
    `;
  }
}

export default PeopleAvatarElement;
