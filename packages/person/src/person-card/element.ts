import { CSSResult, html, TemplateResult, LitElement } from 'lit';
import { BadgeColor } from '@equinor/fusion-wc-badge';
import { SkeletonSize, SkeletonVariant } from '@equinor/fusion-wc-skeleton';
import { property } from 'lit/decorators.js';
import { PersonAccountType, PersonAvailability, PersonItemSize } from '../types';
import { CardData, PersonCardElementProps } from './types';

import personStyle from '../style.css';
import style from './element.css';
import { PersonCardTask } from './task';

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

export class PersonCardElement extends LitElement implements PersonCardElementProps {
  static styles: CSSResult[] = [style, personStyle];

  /** Azure unique id */
  @property({ type: String })
  public azureId?: string;

  @property({ type: String })
  public upn?: string;

  @property({ type: String })
  public dataSource?: CardData;

  private task = new PersonCardTask(this);

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
   * Renders person name
   */
  private renderName(details: CardData): TemplateResult {
    return html`${details.name
      ? html`<header title="${details.name}" class="person-card__name">${details.name}</header>`
      : null}`;
  }

  /**
   * Render person job department
   */
  private renderDepartment(details: CardData): TemplateResult {
    return html`${details.department ? html`<div class="person-card__department">${details.department}</div>` : null}`;
  }

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
  protected renderProjects(details: CardData): TemplateResult {
    const filterProjects = [...new Set(details.positions?.map((p) => p.project.name))];
    return html`${filterProjects.length > 0
      ? html`<div class="person-card__projects">
          <div class="person-card-projects__heading">Projects</div>
          <div class="person-card-projects__projects">
            ${filterProjects.map((p) => {
              return html`<div class="person-card-projects__project">${p}</div>`;
            })}
          </div>
        </div>`
      : null}`;
  }

  /**
   * Render person positions
   */
  protected renderPositions(details: CardData): TemplateResult {
    const filterPositions = [...new Set(details.positions?.map((p) => p.name))];
    return html`${filterPositions.length > 0
      ? html`<div class="person-card__projects">
          <div class="person-card-projects__heading">Positions</div>
          <div class="person-card-projects__projects">
            ${filterPositions.map((p) => {
              return html`<div class="person-card-projects__project">${p}</div>`;
            })}
          </div>
        </div>`
      : null}`;
  }

  /**
   * Renders manager name
   */
  private renderManagerName(details: CardData): TemplateResult {
    return html`${details.manager?.name
      ? html`<header title="${details.manager?.name}" class="person-manager__name">${details.manager?.name}</header>`
      : null}`;
  }

  /**
   * Render manager job department
   */
  private renderManagerDepartment(details: CardData): TemplateResult {
    return html`${details.manager?.department
      ? html`<div class="person-card-manager__department">${details.manager?.department}</div>`
      : null}`;
  }

  /**
   * Renders the avatar for manager
   */
  protected renderManagerAvatar(details: CardData): TemplateResult {
    return html`<fwc-avatar
      title="${details.manager?.accountType}"
      class="person-card-manager__avatar ${this.getAccountTypeColorClass(details.manager?.accountType)}"
      .size="${this.size}"
      .src=${details.manager?.pictureSrc}
      .value=${this.getInitial(details.manager?.name)}
      border=${true}
    ></fwc-avatar>`;
  }

  /**
   * Renders the manager
   */
  protected renderManager(details: CardData): TemplateResult {
    return html`${details.manager
      ? html`<div class="person-card__manager">
          <div class="person-card-manager__heading">Reports to</div>
          <div class="person-card__manager-avatar">
            <div class="person-card-manager__avatar">${this.renderManagerAvatar(details)}</div>
            <div class="person-card-manager__content">
              ${this.renderManagerName(details)} ${this.renderManagerDepartment(details)}
            </div>
          </div>
        </div>`
      : null}`;
  }

  /**
   * Returns the badge color for the current presence
   */
  protected getAvatarBadgeColor(availability: PersonAvailability): BadgeColor {
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
    return html`
      <fwc-avatar
        title="${details.accountType}"
        class="${this.getAccountTypeColorClass(details.accountType)}"
        .size=${this.size}
        .src=${details.pictureSrc}
        .value=${this.getInitial(details.name)}
        border=${true}
      ></fwc-avatar>
    `;
  }

  /**
   * Renders the error
   */
  protected renderError(error: Error): TemplateResult {
    return html`${error}`;
  }

  /** {@inheritDoc} */
  protected render(): TemplateResult {
    return html`
      <div class="person-card__section" style="max-width:${this.maxWidth}px">
        ${this.task.render({
          complete: (details: CardData) => {
            return html`<div class="person-card__heading">
                <div class="fwc-person-avatar">${this.renderAvatar(details)}</div>
                <div class="person-card__header">
                  ${this.renderName(details)} ${this.renderDepartment(details)} ${this.renderJobTitle(details)}
                </div>
              </div>
              <div class="person-card__content" style="max-height:${this.contentHeight}px">
                <div class="person-card__info">
                  <div class="person-card-info__heading">Contact</div>
                  ${this.renderMobile(details)} ${this.renderEmail(details)}
                </div>
                ${this.renderProjects(details)} ${this.renderPositions(details)} ${this.renderManager(details)}
              </div>`;
          },
          pending: () => {
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
                <div class="person-card-info__heading">
                  <fwc-skeleton-wrapper direction="vertical">
                    ${this.renderTextPlaceholder(false, SkeletonSize.small)}
                    ${this.renderTextPlaceholder(false, SkeletonSize.small)}
                    ${this.renderTextPlaceholder(false, SkeletonSize.small)}
                    ${this.renderTextPlaceholder(false, SkeletonSize.small)}
                  </fwc-skeleton-wrapper>
                </div>
              </div>`;
          },
          error: () => this.renderTextPlaceholder(true, SkeletonSize.Medium),
        })}
      </div>
    `;
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
  public getAccountTypeColorClass(accountType?: PersonAccountType): string | void {
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
