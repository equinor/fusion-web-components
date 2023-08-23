import { CSSResult, TemplateResult, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { PersonAvatarElementProps } from './types';
import { PersonAccountType, PersonAvailability } from '../types';
import Badge, { BadgeColor, IconName } from '@equinor/fusion-wc-badge';
import Avatar, { AvatarSize } from '@equinor/fusion-wc-avatar';
import Skeleton, { SkeletonVariant } from '@equinor/fusion-wc-skeleton';
import style from './element.css';
import { AvatarData, PersonControllerHost, PersonAvatarTask } from './task';

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
export class PersonAvatarElement extends LitElement implements PersonAvatarElementProps, PersonControllerHost {
  static styles: CSSResult[] = [style];

  @property({ type: String })
  public azureId?: string;

  @property({ type: String })
  public upn?: string;

  @property({ type: String })
  public dataSource?: AvatarData;

  private task = new PersonAvatarTask(this);

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
  protected getRenderClasses(accountType?: string): ClassInfo {
    return {
      'fwc-person-avatar__employee': accountType === PersonAccountType.Employee,
      'fwc-person-avatar__consultant': accountType === PersonAccountType.Consultant || PersonAccountType.Enterprise,
      'fwc-person-avatar__external': accountType === PersonAccountType.External,
      'fwc-person-avatar__external-hire': accountType === PersonAccountType.ExternalHire,
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
        return 'check_circle_outlined';
      case PersonAvailability.AvailableIdle:
      case PersonAvailability.Away:
      case PersonAvailability.BeRightBack:
      case PersonAvailability.BusyIdle:
        return 'time';
      case PersonAvailability.DoNotDisturb:
      case PersonAvailability.Busy:
        return 'blocked';
      case PersonAvailability.Offline:
        return 'close_circle_outlined';
      case PersonAvailability.Pending:
        return 'more_horizontal';
      default:
        return 'do_not_disturb';
    }
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
   * Returns the first character in the person's name as upper case initial
   */
  public getInitial(name?: string): string | undefined {
    return name?.substring(0, 1)?.toUpperCase();
  }

  /**
   * Renders the avatar
   */
  protected renderAvatar(details: AvatarData): TemplateResult {
    return html`
      <fwc-avatar
        class=${classMap(this.getRenderClasses(details.accountType))}
        .size=${this.size}
        .src=${details.pictureSrc}
        .value=${this.getInitial(details.name)}
        ?clickable=${this.clickable}
        ?disabled=${this.disabled}
        ?border=${true}
        @click=${this.handleOnClick}
      ></fwc-avatar>
    `;
  }

  /**
   * Renders the avatar pending state
   */
  protected renderError(error: Error): TemplateResult {
    return html`${error}`;
  }

  /** {@inheritDoc} */
  protected render(): TemplateResult {
    return html`${this.task.render({
      complete: (details: AvatarData) => this.renderAvatar(details),
      pending: () => this.renderImagePlaceholder(false, this.size),
      error: () => this.renderImagePlaceholder(true),
    })}`;
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
   * Renders pending state for avatar
   */
  public getToolbarPlaceholderIconSize(size: string): string {
    if (size === 'small') {
      return 'x-small';
    }
    return 'small';
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
