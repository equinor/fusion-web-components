import { AvatarSize } from '@equinor/fusion-wc-avatar';
import { BadgePosition, IconName } from '@equinor/fusion-wc-badge';
import { SkeletonSize, SkeletonVariant } from '@equinor/fusion-wc-skeleton';
import { CSSResult, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { PersonElement } from '../person';
import { PersonAvailability, PersonDetails, PersonPresence } from '../types';
import style from './element.css';
import { PersonCardAccountType, PersonCardElementProps } from './types';

/**
 * Element for displaying a persons card with person avatar and person info.
 * {@inheritdoc}
 *
 * @tag fwc-person-card
 *
 * @property {string} azureId - Azure unique id for the person.
 * @property {AvatarSize} size - Size of the avatar, also used for font size
 *
 */

export class PersonCardElement extends PersonElement implements PersonCardElementProps {
  static styles: CSSResult[] = [style];

  @property({ type: String, reflect: true })
  azureId!: string;

  @property({ type: String, reflect: true })
  size: AvatarSize = AvatarSize.Medium;
  /**
   * Renders person name
   */
  protected renderTitle(): TemplateResult {
    return html`${this.details?.render({
      complete: (_details: PersonDetails) => html`${_details.name ? html`<header>${_details.name}</header>` : null}`,
      pending: () => this.renderTextPlaceholder(false, SkeletonSize.small),
      error: () => this.renderTextPlaceholder(true),
    })}`;
  }

  /**
   * Render person job title
   */
  protected renderJobTitle(): TemplateResult {
    return html`${this.details?.render({
      complete: (_details: PersonDetails) => html`${_details.jobTitle ? html`<div>${_details.jobTitle}</div>` : null}`,
      pending: () => this.renderTextPlaceholder(false, SkeletonSize.small),
      error: () => this.renderPlaceholder(true),
    })}`;
  }
  /**
   * Render person job department
   */
  protected renderDepartment(): TemplateResult {
    return html`${this.details?.render({
      complete: (_details: PersonDetails) =>
        html`${_details.department ? html`<div>${_details.department}</div>` : null}`,
      pending: () => this.renderTextPlaceholder(false, SkeletonSize.small),
      error: () => this.renderPlaceholder(true),
    })}`;
  }
  /**
   * Render person email
   */
  protected renderEmail(): TemplateResult {
    return html`${this.details?.render({
      complete: (_details: PersonDetails) =>
        html`${_details.mail ? html`<div><a href="mailto:${_details.mail}">${_details.mail}</a></div>` : null}`,
      pending: () => this.renderTextPlaceholder(false, SkeletonSize.small),
      error: () => this.renderPlaceholder(true),
    })}`;
  }
  /**
   * Render person mobile phone
   */
  protected renderMobile(): TemplateResult {
    return html`${this.details?.render({
      complete: (_details: PersonDetails) =>
        html`${_details.mobilePhone ? html`<div>${_details.mobilePhone}</div>` : null}`,
      pending: () => this.renderTextPlaceholder(false, SkeletonSize.small),
      error: () => this.renderPlaceholder(true),
    })}`;
  }
  /**
   * Render person office location
   */
  protected renderLocation(): TemplateResult {
    return html`${this.details?.render({
      complete: (_details: PersonDetails) =>
        html`${_details.officeLocation ? html`<div>${_details.officeLocation}</div>` : null}`,
      pending: () => this.renderTextPlaceholder(false, SkeletonSize.small),
      error: () => this.renderPlaceholder(true),
    })}`;
  }
  /**
   * Returns the status color for the current availability of the person
   */
  protected getStatusColor(availability?: PersonAvailability): ClassInfo {
    return {
      'fwc-status-icon__success': availability === (PersonAvailability.Available || PersonAvailability.AvailableIdle),
      'fwc-status-icon__warning': availability === (PersonAvailability.Away || PersonAvailability.BeRightBack),
      'fwc-status-icon__danger':
        availability === (PersonAvailability.Busy || PersonAvailability.BusyIdle || PersonAvailability.DoNotDisturb),
    };
  }
  /**
   * Returns the staus icon for the current availability of the person
   */
  protected getStatusIcon(availability: PersonAvailability): IconName | undefined {
    switch (availability) {
      case PersonAvailability.Available:
        return 'check';
      case PersonAvailability.AvailableIdle:
      case PersonAvailability.Away:
      case PersonAvailability.BeRightBack:
      case PersonAvailability.BusyIdle:
        return 'time';
      case PersonAvailability.DoNotDisturb:
        return 'blocked';
      case PersonAvailability.Offline:
        return 'close_circle_outlined';
      case PersonAvailability.Pending:
        return 'more_horizontal';
      default:
        return undefined;
    }
  }
  /**
   * Returns the icon size deppending on the avatar
   */
  protected getStatusIconSize(size: AvatarSize): AvatarSize {
    switch (size) {
      case AvatarSize.XSmall:
      case AvatarSize.Small:
      case AvatarSize.Medium:
        return AvatarSize.Small;
      case AvatarSize.Large:
        return AvatarSize.Medium;
      default:
        return AvatarSize.Small;
    }
  }
  /**
   * Renders the status icon for availability
   */
  protected renderStatusIcon(availability: PersonAvailability): TemplateResult {
    return html`<fwc-icon
      class="fwc-status-icon__icon ${classMap(this.getStatusColor(availability))}"
      .icon=${this.getStatusIcon(availability)}
    />`;
  }
  /**
   * Render AVAILABILITY status badge
   */
  protected renderAvailabilityStatus(): TemplateResult {
    return html`<div class="fwc-person-status__row">
      ${this.presence?.render({
        complete: (presence: PersonPresence) =>
          html`${this.renderStatusIcon(presence.availability)} ${presence.availability}`,
        pending: () =>
          html`${this.renderStatusIcon(PersonAvailability.Pending)}
          ${this.renderTextPlaceholder(false, SkeletonSize.XSmall)}`,
        error: () => html`${this.renderStatusIcon(PersonAvailability.Offline)} ${this.renderTextPlaceholder(true)}`,
      })}
    </div>`;
  }
  /**
   * Checks if job title starts with 'ext' for external hire
   */
  protected isExternalHire(person: PersonDetails): boolean {
    return !!(person.jobTitle && person.jobTitle.toLowerCase().startsWith('ext'));
  }
  /**
   * Returns name of the account type
   */
  protected getAccountTypeName(person: PersonDetails): string {
    switch (person.accountType as unknown as PersonCardAccountType) {
      case PersonCardAccountType.Consultant:
        return 'Contractor/Enterprise';
      case PersonCardAccountType.External:
        return 'External/Affiliate';
      case PersonCardAccountType.Employee:
        if (this.isExternalHire(person)) {
          return 'External hire/Consultant';
        }
        return 'Employee';
      default:
        return String(person.accountType);
    }
  }

  /**
   * Returns the badge color classes for the account type
   */
  protected getBadgeColorClasses(accountType?: string): ClassInfo {
    return {
      'fwc-person-badge__employee': accountType === PersonCardAccountType.Employee,
      'fwc-person-badge__consultant': accountType === PersonCardAccountType.Consultant,
      'fwc-person-badge__external': accountType === PersonCardAccountType.External,
    };
  }

  /**
   * Renders the avatar badge
   */
  protected renderBadge(details: PersonDetails, position?: BadgePosition): TemplateResult {
    return html`<fwc-badge
      class=${classMap(this.getBadgeColorClasses(details.accountType))}
      slot="badge"
      icon="person"
      .size=${this.size}
      .position=${position}
      circular
    />`;
  }

  /**
   * Returns the first character in the person's name as upper case initial
   */
  protected getInitial(name?: string): string | undefined {
    return name?.substr(0, 1)?.toUpperCase();
  }

  /**
   * Renders the avatar
   */
  protected renderAvatar(details: PersonDetails): TemplateResult {
    return html`<fwc-avatar .size=${this.size} .src=${details.pictureSrc} .value=${this.getInitial(details.name)}>
      ${this.renderBadge(details, BadgePosition.BottomRight)}</fwc-avatar
    >`;
  }

  /**
   * Renders the account type badge
   */
  protected renderTypeBadge(details: PersonDetails): TemplateResult {
    return html`<fwc-badge
      class="fwc-person-status__icon ${classMap(this.getBadgeColorClasses(details.accountType))}"
      size=${this.getStatusIconSize(this.size)}
      icon="person"
      position
    />`;
  }

  /**
   * Render the account TYPE status
   */
  protected renderTypeStatus(): TemplateResult {
    return html`<div class="fwc-person-status__row">
      ${this.details?.render({
        complete: (details: PersonDetails) =>
          html`${this.renderTypeBadge(details)} ${this.getAccountTypeName(details)}`,
        pending: () =>
          html`${this.renderStatusIcon(PersonAvailability.Pending)}
          ${this.renderTextPlaceholder(false, SkeletonSize.small)}`,
        error: () => html`${this.renderStatusIcon(PersonAvailability.Offline)} ${this.renderTextPlaceholder(true)}`,
      })}
    </div>`;
  }

  /**
   * Renders pending state for avatar
   */
  protected renderPlaceholder(inactive?: boolean): TemplateResult {
    return html`<fwc-skeleton
      size=${this.size}
      variant=${SkeletonVariant.Circle}
      icon="image"
      ?inactive=${inactive}
    ></fwc-skeleton>`;
  }

  /**
   * Renders pending state for content
   */
  protected renderTextPlaceholder(inactive?: boolean, size?: SkeletonSize): TemplateResult {
    return html`<fwc-skeleton
      size=${size}
      variant=${SkeletonVariant.Text}
      icon="image"
      ?inactive=${inactive}
    ></fwc-skeleton>`;
  }

  /**
   * Renders the error
   */
  protected renderError(error: Error): TemplateResult {
    return html`${error}`;
  }

  /** {@inheritDoc} */
  protected render(): TemplateResult {
    return html`<section class="fwc-person-section">
      <div class="fwc-person-status">
        <div class="fwc-person-status__heading">${this.renderTitle()} ${this.renderAvailabilityStatus()}</div>
        <div class="fwc-person-status__profession">
          ${this.renderJobTitle()} ${this.renderDepartment()} ${this.renderTypeStatus()}
        </div>
        <div class="fwc-person-status__info">${this.renderEmail()} ${this.renderMobile()} ${this.renderLocation()}</div>
      </div>
      <div class="fwc-person-avatar">
        ${this.details?.render({
          complete: (details: PersonDetails) => this.renderAvatar(details),
          pending: () => this.renderPlaceholder(),
          error: () => this.renderPlaceholder(true),
        })}
      </div>
    </section>`;
  }
}
