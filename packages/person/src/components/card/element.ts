import { html, LitElement, type CSSResult, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';
import { TaskStatus } from '@lit/task';

import Icon from '@equinor/fusion-wc-icon';
import IconButton from '@equinor/fusion-wc-button/icon-button';
import Skeleton, { SkeletonSize, SkeletonVariant } from '@equinor/fusion-wc-skeleton';

import { PersonItemSize, PersonResolveResult } from '../../types';
import { CardData, PersonCardElementProps } from './types';

import { PersonResolveTask } from '../../tasks';
import styles from './element.css';
import { mapResolveToPersonInfo } from '../../utils';

import delveIcon from './delve.svg';
import entraIcon from './entra.svg';
import { PersonCardAdditionalInfoElement } from './element.additional-info';

import '../avatar';
import { ResolvePropertyMapper } from '../../ResolvePropertyMapper';

Icon;
IconButton;
Skeleton;
PersonCardAdditionalInfoElement;

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
  implements PersonCardElementProps {
  static styles: CSSResult[] = styles;

  /** Azure unique id */
  @property({ type: String })
  public azureId?: string;

  @property({ type: String })
  public upn?: string;

  @property({ type: Object })
  public dataSource?: CardData;

  @property({ type: Array })
  resolveIds: string[] = [];

  @property({ type: Boolean })
  public shadow: boolean = true;

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

  /**
   * @internal
   */
  @state()
  protected intersected = false;

  /**
   * @internal
   */
  private tasks?: {
    resolve: PersonResolveTask;
  };

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
              resolve: new PersonResolveTask(this),
            };
          }
        }
      },
    }),
    propertyMapper: new ResolvePropertyMapper(this),
  };

  createApplicationEntraLink(applicationId: string): string {
    return `https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Overview/appId/${applicationId}`;
  }

  createManagedIdentityEntraLink(azureId: string, applicationId?: string): string {
    const urlParts = [
      'https://portal.azure.com/#view/Microsoft_AAD_IAM/ManagedAppMenuBlade/~/Overview',
      `objectId/${azureId}`,
    ];
    if (applicationId) {
      urlParts.push(`appId/${applicationId}`);
    }

    return urlParts.join('/');
  }

  /**
   * Render the icon bar
   */
  protected renderIconBar(details: CardData): TemplateResult {
    const generateLink = (props: { title: string, href: string, icon: string, hasValue: boolean, blank?: boolean }): TemplateResult => {
      const { title, href, icon, hasValue, blank } = props;
      const iconElement = icon === 'delveIcon' ? html`<fwc-icon>${delveIcon}</fwc-icon>` : html`<fwc-icon icon="${icon}"></fwc-icon>`;

      if (!hasValue) {
        return html`
          <a
            title="${title}"
            href="${href}"
            @click="${(e: MouseEvent) => {
            e.preventDefault();
            return;
          }}"
            class="disabled"
          >
            ${iconElement}
          </a>
        `;
      }
      return html`
        <a
          title="${title}"
          href="${href}"
          target="${blank ? '_blank' : '_self'}"
        >
          ${iconElement}
        </a>
      `;
    };

    if (details.applicationId) {
      const href =
        details.servicePrincipalType === 'Application'
          ? this.createApplicationEntraLink(details.applicationId)
          : this.createManagedIdentityEntraLink(details.azureId, details.applicationId);

      return html`
        <slot name="icon-bar">
          ${generateLink({
        title: 'Open application in azure portal',
        href,
        icon: 'home',
        hasValue: Boolean(details.applicationId),
        blank: true,
      })}
        </slot>
      `;
    }

    return html`
      <slot name="icon-bar">
        ${generateLink({
      title: 'Open profile',
      href: `/apps/people-search/person?user=${details.azureId}`,
      icon: 'home',
      hasValue: Boolean(details.azureId),
      blank: true,
    })}


        ${generateLink({
      title: `Email: ${details.mail}`,
      href: `mailto:${details.mail}`,
      icon: 'email',
      hasValue: Boolean(details.mail),
    })}

        ${generateLink({
      title: "Chat in Teams",
      href: `https://teams.microsoft.com/l/chat/0/0?users=${details.mail}`,
      icon: "comment_chat",
      hasValue: Boolean(details.mail),
    })}
        
        ${generateLink({
      title: "Call in Teams",
      href: `https://teams.microsoft.com/l/call/0/0?users=${details.mail}`,
      icon: "call",
      hasValue: Boolean(details.mail),
    })}

        ${generateLink({
      title: "Delve",
      href: `https://eur.delve.office.com/?v=work&u=${details.azureId}`,
      icon: "delveIcon",
      hasValue: Boolean(details.azureId),
    })}
      </slot>
    `;
  }

  protected copyToClipboard = (textToCopy: string | undefined) => {
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
    }
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

  renderCopyableContact(value: string, href: string, icon: string, title: string): TemplateResult {
    return html`
      <div class="person-card-info__link copyable-text" title="${title}">
        <fwc-icon class="person-card-info__icon" icon="${icon === 'entraIcon' ? null : icon}">${entraIcon}</fwc-icon>
        ${href ?
        html`
          <a class="person-card-info__text" href="${href}">${value}</a>
          <div class="copyable-text__actions">${this.renderCopyToClipboardIcon(value, `Copy to clipboard`)}</div>
        ` :
        html`
          <p class="person-card-info__text">${value}</p>
          <div class="copyable-text__actions">
            ${this.renderCopyToClipboardIcon(value, `Copy to clipboard`)}
          </div>
        `
      }
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

    return this.renderCopyableContact(mobilePhone, `callto:${mobilePhone}`, 'phone', 'Mobile Phone Number');
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

    return this.renderCopyableContact(details.mail, `mailto:${details.mail}`, 'email', 'Email address');
  }

  protected renderAzureId(details: CardData): TemplateResult {
    const title = () => {
      if (details.applicationId) {
        return 'This is the unique ID of the service principal object associated with this application. This ID can be useful when performing management operations against this application using PowerShell or other programmatic interfaces.';
      }

      return 'Azure ID'
    };

    const href = () => {
      if (details.applicationId) {
        if (details.servicePrincipalType === 'Application') {
          return this.createApplicationEntraLink(details.applicationId);
        }

        return this.createManagedIdentityEntraLink(details.azureId);
      }
      return `/apps/people-search/person?user=${details.azureId}`;
    };

    return html`
      <div class="person-card-info__link copyable-text" title="${title()}">
        <fwc-icon class="person-card-info__icon">${entraIcon}</fwc-icon>
        <p class="person-card-info__text">${details.azureId}</p>
        <div class="copyable-text__actions">
          ${this.renderCopyToClipboardIcon(details.azureId, `Copy to clipboard`)}
          <button
            class="copyable-text__button"
            @click=${(e: MouseEvent) => {
        e.preventDefault();
        window.open(href(), '_blank');
      }}
            title="Open in ${details.applicationId ? 'Azure Portal' : 'People Search'}"
          >
            <fwc-icon icon="external_link"></fwc-icon>
          </button>
        </div>
      </div>
    `;
  }

  protected renderApplicationId(details: CardData): TemplateResult {
    if (!details.applicationId) {
      return html``;
    }

    const href = () => {
      if (details.servicePrincipalType === 'Application') {
        return this.createApplicationEntraLink(details.applicationId ?? '');
      }

      return this.createManagedIdentityEntraLink(details.azureId, details.applicationId);
    };

    const title = 'This is the unique application ID of this application in your directory. You can use this application ID if you ever need help from Microsoft Support, or if you want to perform operations against this specific instance of the application using Microsoft Graph or PowerShell APIs.';

    return html`
      <div class="person-card-info__link copyable-text" title="${title}">
        <fwc-icon class="person-card-info__icon" icon="apps"></fwc-icon>
        <p class="person-card-info__text">${details.applicationId}</p>
        <div class="copyable-text__actions">
          ${this.renderCopyToClipboardIcon(details.applicationId, `Copy to clipboard`)}
          <button
            class="copyable-text__button"
            @click=${(e: MouseEvent) => {
        e.preventDefault();
        window.open(href(), '_blank');
      }}
            title="Open in Azure Portal"
          >
            <fwc-icon icon="external_link"></fwc-icon>
          </button>
        </div>
      </div>
    `;
  }

  protected renderUpn(upn: string | undefined): TemplateResult {
    if (!upn) {
      return html``;
    }

    return this.renderCopyableContact(upn, '', 'person', 'User Principal Name - Username that looks like an email (but might not receive emails).');
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
    const { mobilePhone, upn, employeeNumber } = details;

    return html`
      <div class="info-item">
        <div class="info-item_heading">Contact</div>
        <div class="info-item_items">
          ${this.renderMobile(mobilePhone)}
          ${this.renderEmail(details)}
          ${details.applicationId || this.showExtraContactInfo
        ? html`
              ${this.renderAzureId(details)}
              ${this.renderApplicationId(details)}
              ${this.renderUpn(upn)}
              ${this.renderEmployeeNumber(employeeNumber)}
            `
        : html``
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

  protected renderPersonName(details: CardData): TemplateResult {
    const name = details.applicationName ?? details.name;

    if (!name) {
      return html``;
    };

    return html`
      <header title="Person name" class="person-card__name copyable-text">
        <p class="copyable-text__text">${name}</p>
        <div class="copyable-text__actions">
          ${this.renderCopyToClipboardIcon(name, "Copy name")}
        </div>
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

    if (this.tasks.resolve.status === TaskStatus.COMPLETE) {
      if ((this.tasks.resolve.value?.length ?? 0) > 0) {
        this.dataSource = mapResolveToPersonInfo(this.tasks.resolve.value?.[0] as PersonResolveResult);
        this.resolveIds = [];
      }
    } else {
      return this.renderPending();
    }

    return html`
      <div class="person-card__section ${this.shadow ? 'shadow' : ''}" style="max-width:${this.maxWidth}px; max-height:${this.maxWidth}px">
        ${this.dataSource && html`
          <div class="person-card__heading">
            <div class="fwc-person-avatar">
              <slot name="avatar">
                <fwc-person-avatar
                  size=${avatarSize()}
                  .dataSource=${this.dataSource}
                  trigger="none"
                ></fwc-person-avatar>
              </slot>
            </div>
            <div class="person-card__header">
              ${this.renderPersonName(this.dataSource)}
              ${this.renderPersonDepartments(this.dataSource)}
            </div>
          </div>
          <div class="person-card__iconbar">${this.renderIconBar(this.dataSource)}</div>
          <div class="person-card__content">
            ${this.renderContact(this.dataSource)}
            ${!this.dataSource.applicationId ? html`<fwc-person-card-additional-info azureid=${this.dataSource.azureId}></fwc-person-card-additional-info>` : null}
          </div>
        `}
      </div>
    `;
  }
}
