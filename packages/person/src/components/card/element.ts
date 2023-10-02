import { CSSResult, html, TemplateResult, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';

import { PersonAccountType, PersonAvailability, PersonItemSize } from '../../types';
import { CardData, PersonCardElementProps } from './types';

import personStyle from '../../style.css';
import style from './element.css';
import { PersonPhotoTask, PersonPhotoControllerHost } from '../../tasks/person-photo-task';
import { PersonDetailTask, PersonDetailControllerHost } from '../../tasks/person-detail-task';

import './element.manager';

import Avatar from '@equinor/fusion-wc-avatar';
import Badge, { BadgeColor, BadgeElementProps } from '@equinor/fusion-wc-badge';
import Icon from '@equinor/fusion-wc-icon';
import IconButton from '@equinor/fusion-wc-button/icon-button';
import Skeleton, { SkeletonSize, SkeletonVariant } from '@equinor/fusion-wc-skeleton';

Avatar;
Badge;
Icon;
IconButton;
Skeleton;

/**
 * Element for displaying a persons card with person avatar and person info.
 * {@inheritdoc}
 *
 * @tag fwc-person-card
 *
 * @property {string} azureId - Azure unique id for the person.
 * @property {PersonItemSize} size - Size of the avatar, also used for font size
 * @property {number} maxWidth - Set maximum width of person card in pixels, default value 300
 * @property {number} contentHeight - Set height of person content in pixels, default value 150
 *
 */

export class PersonCardElement
  extends LitElement
  implements PersonCardElementProps, PersonDetailControllerHost, PersonPhotoControllerHost
{
  static styles: CSSResult[] = [style, personStyle];

  /** Azure unique id */
  @property({ type: String })
  public azureId?: string;

  @property({ type: String })
  public upn?: string;

  @property({ type: String })
  public dataSource?: CardData;

  private tasks?: {
    details: PersonDetailTask;
    photo: PersonPhotoTask;
  };

  @state()
  protected intersected = false;

  protected controllers = {
    observer: new IntersectionController(this, {
      callback: (e) => {
        if (!this.intersected) {
          this.intersected = !!e.find((x) => x.isIntersecting);
          if (this.intersected) {
            this.controllers.observer.unobserve(this);
            this.tasks = {
              details: new PersonDetailTask(this),
              photo: new PersonPhotoTask(this),
            };
          }
        }
      },
    }),
  };

  /** Size of the component */
  @property({ type: String, reflect: true })
  size: PersonItemSize = 'medium';

  /** Maximum width of the component */
  @property({ type: Number, reflect: true })
  maxWidth = 300;

  /** Height of content */
  @property({ type: Number, reflect: true })
  contentHeight = 150;

  /**
   * Render person job title
   */
  protected renderJobTitle(details: CardData): TemplateResult {
    return html`${details.jobTitle ? html`<div class="person-card__jobtitle">${details.jobTitle}</div>` : null}`;
  }

  /**
   * Render the account TYPE status
   */
  protected renderTypeStatus(details: CardData): TemplateResult {
    return html`<div class="person-card-type__row">
      ${details.accountType
        ? html`<div class="person-card-type__icon ${this.getAccountTypeColorClass(details.accountType)}"></div>
            ${details.accountType}`
        : null}
    </div>`;
  }

  protected copyToClipboard = (textToCopy: string | undefined) => {
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
    }
  };

  /**
   * Render person email
   */
  protected renderEmail(details: CardData): TemplateResult {
    return html`${details.mail
      ? html`<div class="person-card-info__row">
          <div class="person-card-info__link">
            <fwc-icon title="Email: ${details.mail}" class="person-card-info__icon" icon="email"></fwc-icon>
            <a title="Email: ${details.mail}" href="mailto:${details.mail}">${details.mail}</a>
          </div>
          <fwc-icon-button
            class="person-card-info__copy"
            title="Copy email"
            @click=${{ handleEvent: () => this.copyToClipboard(details.mail) }}
            icon="copy"
            rounded
            size="x-small"
          />
        </div>`
      : null}`;
  }

  /**
   * Render person mobile phone
   */
  protected renderMobile(details: CardData): TemplateResult {
    return html`${details.mobilePhone
      ? html`<div class="person-card-info__row">
          <div class="person-card-info__link">
            <fwc-icon title="Mobile: ${details.mobilePhone}" class="person-card-info__icon" icon="phone"></fwc-icon>
            <a title="Mobile: ${details.mobilePhone}" href="callto:${details.mobilePhone}">${details.mobilePhone}</a>
          </div>
          <fwc-icon-button
            class="person-card-info__copy"
            title="Copy phone number"
            @click=${{ handleEvent: () => this.copyToClipboard(details.mobilePhone) }}
            icon="copy"
            rounded
            size="x-small"
          />
        </div>`
      : null}`;
  }

  /**
   * Render person projects
   */
  protected renderProjects(details: CardData): TemplateResult | null {
    const filterProjects = [...new Set(details.positions?.map((p) => p.project.name))];
    if (filterProjects.length === 0) return null;
    return html`<div class="info-item">
      <div class="info-item_heading" title="Tasks the current person is allocated to">Tasks</div>
      <div class="person-card-projects__projects">
        ${filterProjects.map((p) => {
          return html`<div class="person-card-projects__project">${p}</div>`;
        })}
      </div>
    </div>`;
  }

  /**
   * Render person positions
   */
  protected renderPositions(details: CardData): TemplateResult | null {
    const filterPositions = [...new Set(details.positions?.map((p) => p.name))];
    if (filterPositions.length === 0) return null;
    return html`<div class="info-item">
      <div class="info-item_heading" title="Unique list of generic task positions the person is allocated to">
        Task positions
      </div>
      <div class="person-card-projects__projects">
        ${filterPositions.map((p) => {
          return html`<div class="person-card-projects__project">${p}</div>`;
        })}
      </div>
    </div>`;
  }

  public renderManager(manager: CardData['manager']): TemplateResult | void {
    return (
      manager &&
      html`
      <div class="manager">
        <div class="manager_heading">Reports to</div>
        <fwc-person-card-manager .azureId=${manager.azureUniqueId}  .dataSource=${manager} .size=${this.size}>
      </div>
    `
    );
  }

  /**
   * Returns the badge color for the current presence
   */
  protected getAvatarBadgeColor(availability: PersonAvailability): BadgeElementProps['color'] {
    switch (availability) {
      case PersonAvailability.Available:
      case PersonAvailability.AvailableIdle:
        return BadgeColor.Success;
      case PersonAvailability.Away:
      case PersonAvailability.BeRightBack:
        return BadgeColor.Warning;
      case PersonAvailability.Busy:
      case PersonAvailability.BusyIdle:
      case PersonAvailability.DoNotDisturb:
        return BadgeColor.Danger;
      default:
        return BadgeColor.Disabled;
    }
  }

  /**
   * Returns the icon size deppending on the avatar
   */
  public getStatusIconSize(size: PersonItemSize): PersonItemSize {
    switch (size) {
      case 'small':
      case 'medium':
        return 'medium';
      case 'large':
        return 'medium';
      default:
        return 'small';
    }
  }

  /**
   * Renders the avatar badge
   */
  protected renderBadge(availability: PersonAvailability): TemplateResult {
    return html`<fwc-badge
      class="fwc-person-avatar-badge"
      slot="badge"
      .color=${this.getAvatarBadgeColor(availability)}
      .size=${this.size}
      position="bottom-right"
      circular
    />`;
  }

  /**
   * Renders the avatar
   */
  protected renderAvatar(details: CardData): TemplateResult {
    // TODO error and pending
    return html`${this.tasks?.photo.render({
      complete: (pictureSrc) => html`
        <fwc-avatar
          title="${details.accountType}"
          class="${this.getAccountTypeColorClass(details.accountType)}"
          .size=${this.size}
          .src=${pictureSrc}
          .value=${this.getInitial(details.name)}
          border=${true}
        ></fwc-avatar>
      `,
      pending: () => html`
        <fwc-avatar
          title="${details.accountType}"
          class="${this.getAccountTypeColorClass(details.accountType)}"
          .size=${this.size}
          .value=${this.getInitial(details.name)}
          border=${true}
        ></fwc-avatar>
      `,
    })}`;
  }

  /**
   * Renders the error
   */
  protected renderError(error: Error): TemplateResult {
    return html`${error}`;
  }

  /** {@inheritDoc} */
  protected render(): TemplateResult {
    if (!this.tasks) {
      return this.renderPending();
    }
    return html`
      <div class="person-card__section" style="max-width:${this.maxWidth}px">
        ${this.tasks.details.render({
          complete: (details: CardData) => {
            return html`<div class="person-card__heading">
                <div class="fwc-person-avatar">${this.renderAvatar(details)}</div>
                <div class="person-card__header">
                  ${details.name &&
                  html`<header title="${details.name}" class="person-card__name">${details.name}</header>`}
                  ${details.department && html`<div class="person-card__department">${details.department}</div>`}
                  ${details.jobTitle && html`<div class="person-card__jobtitle">${details.jobTitle}</div>`}
                </div>
              </div>
              <div class="person-card__content" style="max-height:${this.contentHeight}px">
                <div class="info-item">
                  <div class="info-item_heading">Contact</div>
                  ${this.renderMobile(details)} ${this.renderEmail(details)}
                </div>
                ${this.renderProjects(details)} ${this.renderPositions(details)}
                ${details.manager &&
                html`<fwc-person-card-manager
                  .azureId=${details.manager.azureUniqueId}
                  .dataSource=${details.manager}
                  .size=${this.size}
                ></fwc-person-card-manager>`}
              </div>`;
          },
          pending: () => this.renderPending(),
          error: () => this.renderTextPlaceholder(true, SkeletonSize.Medium),
        })}
      </div>
    `;
  }

  protected renderPending() {
    return html` <div class="person-card__heading">
        <fwc-skeleton-wrapper direction="horizontal">
          ${this.renderImagePlaceholder(false, this.size)}
          <fwc-skeleton-wrapper direction="vertical">
            ${this.renderTextPlaceholder(false, SkeletonSize.small)}
            ${this.renderTextPlaceholder(false, SkeletonSize.small)}
          </fwc-skeleton-wrapper>
        </fwc-skeleton-wrapper>
      </div>
      <div class="person-card__content">
        <div class="info-item_heading">
          <fwc-skeleton-wrapper direction="vertical">
            ${this.renderTextPlaceholder(false, SkeletonSize.small)}
            ${this.renderTextPlaceholder(false, SkeletonSize.small)}
            ${this.renderTextPlaceholder(false, SkeletonSize.small)}
            ${this.renderTextPlaceholder(false, SkeletonSize.small)}
          </fwc-skeleton-wrapper>
        </div>
      </div>`;
  }

  public renderImagePlaceholder(inactive?: boolean, size?: string, list?: boolean): TemplateResult {
    return html`<fwc-skeleton
      class="${list ? 'person-list__avatar' : ''}"
      size=${list ? this.getToolbarPlaceholderIconSize(size ?? 'small') : size}
      variant=${SkeletonVariant.Circle}
      icon="image"
      ?inactive=${inactive}
    ></fwc-skeleton>`;
  }

  /**
   * Renders pending state for content
   */
  public renderTextPlaceholder(inactive?: boolean, size?: SkeletonSize): TemplateResult {
    return html`<fwc-skeleton size="${size}" variant=${SkeletonVariant.Text} ?inactive=${inactive}></fwc-skeleton>`;
  }

  /**
   * Renders pending state for avatar
   */
  public getToolbarPlaceholderIconSize(size: string): string {
    if (size === 'small') {
      return 'x-small';
    }
    return 'small';
  }

  /**
   * Returns color classes for the account type
   */
  public getAccountTypeColorClass(accountType?: PersonAccountType[keyof PersonAccountType]): string | void {
    switch (accountType) {
      case PersonAccountType.Employee:
        return 'fwc-person-type__employee';
      case PersonAccountType.Consultant:
      case PersonAccountType.Enterprise:
        return 'fwc-person-type__consultant';
      case PersonAccountType.External:
        return 'fwc-person-type__external';
      case PersonAccountType.ExternalHire:
        return 'fwc-person-type__external-hire';
    }
  }

  /**
   * Returns the first character in the person's name as upper case initial
   */
  public getInitial(name?: string): string | undefined {
    return name?.substring(0, 1)?.toUpperCase();
  }
}
