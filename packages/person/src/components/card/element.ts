import { CSSResult, html, TemplateResult, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';

import { PersonAccountType, PersonAvailability, PersonItemSize } from '../../types';
import { CardData, PersonCardElementProps } from './types';

import styles from './element.css';
import { PersonPhotoTask, PersonPhotoControllerHost } from '../../tasks/person-photo-task';
import { PersonDetailTask, PersonDetailControllerHost } from '../../tasks/person-detail-task';

import './element.manager';
import delveIcon from './delve.svg';
import entraIcon from './entra.svg';

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
  implements PersonCardElementProps, PersonDetailControllerHost, PersonPhotoControllerHost {
  static styles: CSSResult[] = styles;

  /** Azure unique id */
  @property({ type: String })
  public azureId?: string;

  @property({ type: String })
  public upn?: string;

  @property({ type: String })
  public dataSource?: CardData;

  @property({ type: Boolean })
  public shadow: boolean = true;

  /**
   * @internal
   */
  private tasks?: {
    details: PersonDetailTask;
    photo: PersonPhotoTask;
  };

  /**
   * @internal
   */
  @state()
  protected intersected = false;

  /**
   * @internal
   */
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
  maxWidth = 250;

  /** Height of content */
  @property({ type: Number, reflect: true })
  contentHeight = 150;

  /** Custom color */
  @property({ type: String })
  customColor?: string;

  @state()
  showExtraContactInfo = false;

  createApplicationEntraLink(applicationId: string): string {
    return `https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Overview/appId/${applicationId}/isMSAApp~/false`;
  }

  /**
   * Render the icon bar
   */
  protected renderIconBar(details: CardData): TemplateResult {
    if (details.applicationId) {
      return html`
        <slot name="icon-bar">
          <a
            title="Open application in azure portal"
            href="${this.createApplicationEntraLink(details.applicationId)}"
          >
            <fwc-icon icon="home" title="Open application in azure portal"  ></fwc-icon>
          </a>
        </slot>
      `;
    }

    return html`
      <slot name="icon-bar">
        <a
          title="Open profile"
          href="/apps/people-search/person?user=${details.azureId}"
        >
          <fwc-icon icon="home"></fwc-icon>
        </a>

        <a
          title="Email: ${details.mail}"
          href="mailto:${details.mail}"
        >
          <fwc-icon icon="email"></fwc-icon>
        </a>

        <a
          title="Chat in Teams"
          href="https://teams.microsoft.com/l/chat/0/0?users=${details.mail}"
        >
          <fwc-icon icon="comment_chat" ></fwc-icon
        </a>

        <a
          title="Call in Teams"
          href="https://teams.microsoft.com/l/call/0/0?users=${details.mail}"
        >
          <fwc-icon icon="call"></fwc-icon>
        </a>

        <a
          title="Delve"
          href="https://eur.delve.office.com/?v=work&u=${details.azureId}"
        >
          <fwc-icon>${delveIcon}</fwc-icon>
        </a>
      </slot>
    `;
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
  }

  renderCopyableContact(value: string, href: string, icon: string, title: string): TemplateResult {
    return html`
      <div class="person-card-info__link copyable-text" title="${title}">
        <fwc-icon class="person-card-info__icon" icon="${icon === 'entraIcon' ? null : icon}">${entraIcon}</fwc-icon>
        ${
          href ?
          html`<a class="person-card-info__text" href="${href}">${value}</a>` :
          html`<p class="person-card-info__text" title="${title}">${value}</p>`
        }
        ${this.renderCopyToClipboardIcon(value, `Copy ${title} to clipboard`)}
      </div>
    `;
  }
  
  /**
   * Render person mobile phone
   */
  protected renderMobile(mobilePhone: string | undefined): TemplateResult {
    if (!mobilePhone) {
      return html``;
    }
    
    return this.renderCopyableContact(mobilePhone, `callto:${mobilePhone}`, 'phone', 'Mobile');
  }

  /**
   * Render person email
   */
  protected renderEmail(details: CardData): TemplateResult {
    if (!details.mail) {
      if (details.applicationId) {
        return html``;
      }
      return this.renderCopyableContact('No user email', '', 'email', 'The user does not have an email address');
    }

    return this.renderCopyableContact(details.mail, `mailto:${details.mail}`, 'email', 'Email');
  }

  protected renderAzureId(details: CardData): TemplateResult {
    const title = () => {
      if (details.applicationId) {
        return 'This is the unique ID of the service principal object associated with this application. This ID can be useful when performing management operations against this application using PowerShell or other programmatic interfaces.';
      }
      
      return 'Azure ID'
    };

    return this.renderCopyableContact(details.azureId, `/apps/people-search/person?user=${details.azureId}`, 'entraIcon', title());
  }

  protected renderApplicationId(applicationId: string | undefined): TemplateResult {
    if (!applicationId) {
      return html``;
    }

    return this.renderCopyableContact(applicationId, this.createApplicationEntraLink(applicationId), 'apps', 'This is the unique application ID of this application in your directory. You can use this application ID if you ever need help from Microsoft Support, or if you want to perform operations against this specific instance of the application using Microsoft Graph or PowerShell APIs.');
  }

  protected renderUpn(upn: string | undefined): TemplateResult {
    if (!upn) {
      return html``;
    }

    return this.renderCopyableContact(upn, `mailto:${upn}`, 'person', 'UPN');
  }

  protected renderEmployeeNumber(employeeNumber: string | undefined): TemplateResult {
    if (!employeeNumber) {
      return html``;
    }

    return this.renderCopyableContact(employeeNumber, '', 'assignment_user', 'Employee Number');
  }

  /**
   * Render contact information
   * @param details - type CardData
   * @returns TemplateResult
   */
  protected renderContact(details: CardData): TemplateResult {
    const { mobilePhone, upn, applicationId, employeeNumber } = details;

    return html`
      <div class="info-item">
        <div class="info-item_heading">Contact</div>
        <div class="info-item_items">
          ${this.renderMobile(mobilePhone)}
          ${this.renderEmail(details)}
          ${details.applicationId || this.showExtraContactInfo
            ? html`
              ${this.renderAzureId(details)}
              ${this.renderApplicationId(applicationId)}
              ${this.renderUpn(upn)}
              ${this.renderEmployeeNumber(employeeNumber)}
            `
            : html ``
          }
          
          ${!details.applicationId ? html`
            <a class="person-card-info__show_more" href="#" @click=${(e: Event) => {
              e.preventDefault();
              this.showExtraContactInfo = !this.showExtraContactInfo;
            }}>Show ${this.showExtraContactInfo ? 'less' : 'more'}</a>
          ` : html``
          }
        </div>
      </div>
    `;
  }

  /**
   * Render person projects
   */
  protected renderProjects(details: CardData): TemplateResult | null {
    const filterProjects = [...new Set(details.positions?.map((p) => p.project.name))];
    if (filterProjects.length === 0) return null;
    return html`
      <div class="info-item">
        <div class="info-item_heading" title="Tasks the current person is allocated to">Tasks</div>
        <div class="person-card-projects__projects">
          ${filterProjects.map((p) => html`<div class="person-card-projects__project">${p}</div>`)}
        </div>
      </div>
    `;
  }

  /**
   * Render person positions
   */
  protected renderPositions(details: CardData): TemplateResult | null {
    const filterPositions = [...new Set(details.positions?.map((p) => p.name))];
    if (filterPositions.length === 0) return null;
    return html`
      <div class="info-item">
        <div class="info-item_heading" title="Unique list of generic task positions the person is allocated to">
          Task positions
        </div>
        <div class="person-card-projects__projects">
          ${filterPositions.map((p) => html`<div class="person-card-projects__project">${p}</div>`)}
        </div>
      </div>
    `;
  }

  public renderManager(manager: Required<CardData>['manager'] | undefined): TemplateResult | void {
    if (!manager) {
      return html``;
    }
    return html`
      <div class="info-item">
        <div class="info-item_heading">Reports to</div>
        <fwc-person-card-manager .dataSource=${manager}>
      </div>
    `;
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
    return html`
      <fwc-badge
        class="fwc-person-avatar-badge"
        slot="badge"
        .color=${this.getAvatarBadgeColor(availability)}
        .size=${this.size}
        position="bottom-right"
        circular
      />
    `;
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
          size="small"
          .src=${pictureSrc}
          .value=${this.getInitial(details.name)}
          border=${true}
        ></fwc-avatar>
      `,
      pending: () => html`
        <fwc-avatar
          title="${details.accountType}"
          class="${this.getAccountTypeColorClass(details.accountType)}"
          size="small"
          .value=${this.getInitial(details.name)}
          border=${true}
        ></fwc-avatar>
      `,
    })}`;
  }

  renderCopyToClipboardIcon(value: string, title: string): TemplateResult {
    return html`
      <button
        class="copyable-text__button"
        @click=${{ handleEvent: () => this.copyToClipboard(value) }}
        title=${title}
      >
        <fwc-icon icon="copy"></fwc-icon>
      </button>
    `;
  }

  protected renderPersonName(details: CardData): TemplateResult {
    const name = details.applicationName ?? details.name;
    
    if (!name) {
      return html``;
    };

    return html`
      <header title="Person name" class="person-card__name copyable-text">
        <p class="copyable-text__text">${name}</p>
        ${this.renderCopyToClipboardIcon(name, "Copy name")}
      </header>
    `;
  }

  /**
   * Renders the error
   */
  protected renderError(error: Error): TemplateResult {
    return html`${error}`;
  }

  protected renderPersonDepartments(details: CardData): TemplateResult {
    if (details.isExpired) {
      return html`<div class="person-card__expired">Account Expired</div>`;
    }

    return html`
      ${details.department && html`<div class="person-card__department" title="Department">${details.department}</div>`}
      ${details.jobTitle && html`<div class="person-card__jobtitle" title="Job Title">${details.jobTitle}</div>`}
      ${details.servicePrincipalType && html`<div class="person-card__jobtitle" title="Service Principal Type">${details.servicePrincipalType}</div>`}
    `;
  }

  protected renderPending() {
    return html`
      <div class="person-card__heading">
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
      </div>
    `;
  }

  public renderImagePlaceholder(inactive?: boolean, size?: string, list?: boolean): TemplateResult {
    return html`
      <fwc-skeleton
        class="${list ? 'person-list__avatar' : ''}"
        size=${list ? this.getToolbarPlaceholderIconSize(size ?? 'small') : size}
        variant=${SkeletonVariant.Circle}
        icon="image"
        ?inactive=${inactive}
      ></fwc-skeleton>
    `;
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

  /** {@inheritDoc} */
  protected render(): TemplateResult {
    if (!this.tasks) {
      return this.renderPending();
    }
    const avatarSize = () => {
      switch (this.size) {
        case 'small':
          return 'x-small';
        case 'large':
          return 'medium';
        default:
          return 'small';
      }
    };
    return html`
      <div class="person-card__section ${this.shadow ? 'shadow' : ''}" style="max-width:${this.maxWidth}px">
        ${this.tasks.details.render({
          complete: (details: CardData) => {
            return html`
              <div class="person-card__heading">
                <div class="fwc-person-avatar">
                  <slot name="avatar">
                    <fwc-person-avatar
                      size=${avatarSize()}
                      .azureId=${details.azureId}
                      .dataSource=${details}
                      trigger="none"
                      customColor=${ifDefined(this.customColor)}
                    ></fwc-person-avatar>
                  </slot>
                </div>
                <div class="person-card__header">
                  ${this.renderPersonName(details)}
                  ${this.renderPersonDepartments(details)}
                </div>
              </div>
              <div class="person-card__iconbar">${this.renderIconBar(details)}</div>
              <div class="person-card__content" style="max-height:${this.contentHeight}px">
                ${this.renderContact(details)}
                ${this.renderManager(details.manager)}
                ${this.renderProjects(details)}
                ${this.renderPositions(details)}
              </div>`;
          },
          pending: () => this.renderPending(),
          error: () => this.renderTextPlaceholder(true, SkeletonSize.Medium),
        })}
      </div>
    `;
  }
}
