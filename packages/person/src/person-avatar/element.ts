import { CSSResult, TemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { PersonElement } from '../person';
import { PersonAvatarElementProps } from './types';
import { PersonAccountType, PersonAvailability, PersonPresence, PersonDetails } from '../types';
import Badge, { BadgeColor, IconName } from '@equinor/fusion-wc-badge';
import Avatar, { AvatarSize } from '@equinor/fusion-wc-avatar';
import Skeleton, { SkeletonVariant } from '@equinor/fusion-wc-skeleton';
import style from './element.css';

// persist elements
Badge;
Avatar;
Skeleton;

//TODO: Handle errors better in task error render function

/**
 * Element for displaying a persons avatar with presence badge.
 * {@inheritdoc}
 *
 * @tag fwc-person-avatar
 *
 * @property {string} azureId - Azure unique id for the person.
 * @property {AvatarSize} size - Size of the avatar.
 * @property {boolean} clickable - Sets the avatar to be clickable to render hover/ripple effects.
 * @property {disabled} disabled - Sets the avatar to be rendered as disabled.
 *
 * @fires click - When the element is clicked, only fires when `clickable` is set to `true` and `disabled` is set to `false`.
 *
 * @summary
 */
export class PersonAvatarElement extends PersonElement implements PersonAvatarElementProps {
  static styles: CSSResult[] = [style];

  /**
   * Size of the avatar.
   */
  @property({ type: String, reflect: true })
  size: AvatarSize = AvatarSize.Medium;

  /**
   * Sets the avatar to be clickable to render hover/ripple effects.
   */
  @property({ type: Boolean, reflect: true })
  clickable?: boolean;

  /**
   * Sets the avatar to be rendered as disabled.
   */
  @property({ type: Boolean })
  disabled?: boolean;

  /**
   * Returns the badge color for the current presence
   */
  protected getRenderClasses(accountType?: PersonAccountType): ClassInfo {
    return {
      'fwc-person-avatar__employee': accountType === PersonAccountType.Employee,
      'fwc-person-avatar__external-hire': accountType === PersonAccountType.ExternalHire,
      'fwc-person-avatar__x-external': accountType === PersonAccountType.XExternal,
      'fwc-person-avatar__joint-venture-affiliate': accountType === PersonAccountType.JointVentureAffiliate,
    };
  }

  /**
   * Returns the badge color for the current presence
   */
  protected getBadgeColor(availability: PersonAvailability): BadgeColor {
    if (this.disabled) {
      return BadgeColor.Disabled;
    }

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
   * Returns the badge icon for the current presence
   */
  protected getBadgeIcon(availability: PersonAvailability): IconName | undefined {
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
   * Returns the first character in the person's name as upper case initial
   */
  protected getInitial(name?: string): string | undefined {
    return name?.substr(0, 1)?.toUpperCase();
  }

  /**
   * Renders the presence badge
   */
  protected renderBadge(availability: PersonAvailability): TemplateResult {
    return html`<fwc-badge
      slot="badge"
      .color=${this.getBadgeColor(availability)}
      .icon=${this.getBadgeIcon(availability)}
      .size=${this.size}
      position="bottom-right"
      ?disabled=${this.disabled}
      circular
    />`;
  }

  /**
   * Renders the avatar
   */
  protected renderAvatar(details: PersonDetails): TemplateResult {
    return html`<fwc-avatar
      class=${classMap(this.getRenderClasses(details.accountType))}
      .size=${this.size}
      .src=${details.pictureSrc}
      .value=${this.getInitial(details.name)}
      ?clickable=${this.clickable}
      ?disabled=${this.disabled}
      ?border=${true}
      @click=${this.handleOnClick}
    >
      ${this.presence?.render({
        complete: (presence: PersonPresence) => this.renderBadge(presence.availability),
        pending: () => this.renderBadge(PersonAvailability.Pending),
        error: () => this.renderBadge(PersonAvailability.Offline),
      })}</fwc-avatar
    >`;
  }

  /**
   * Renders the avatar pending state
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
   * Renders the avatar pending state
   */
  protected renderError(error: Error): TemplateResult {
    return html`${error}`;
  }

  /** {@inheritDoc} */
  protected render(): TemplateResult {
    return html`${this.details?.render({
      complete: (details: PersonDetails) => this.renderAvatar(details),
      pending: () => this.renderPlaceholder(),
      error: () => this.renderPlaceholder(true),
    })}`;
  }

  /**
   * Handle on click.
   */
  protected handleOnClick(e: PointerEvent): void {
    if (this.clickable) {
      this.dispatchEvent(new PointerEvent('click', e));
    }
  }
}

export default PersonAvatarElement;
