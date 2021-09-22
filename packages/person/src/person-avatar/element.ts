import { CSSResult, TemplateResult, html } from 'lit';
import { property } from 'lit/decorators';
import { ifDefined } from 'lit/directives/if-defined';
import { PersonElement, PersonElementProps } from '../person';
import { Availability, PersonPresence, PersonDetails, AccountType } from '../types';
import Badge, { BadgeColor, IconName } from '@equinor/fusion-wc-badge';
import Avatar, { AvatarSize } from '@equinor/fusion-wc-avatar';
import style from './element.css';

// persist elements
Badge;
Avatar;

//TODO: Handle errors better in task error render function

/**
 * @tag fwc-person-avatar
 * @property {string} azureId - Azure unique id for the person.
 * @property {AvatarSize} size - Size of the avatar.
 * @property {boolean} clickable - Sets the avatar to be clickable to render hover/ripple effects.
 * @property {disabled} disabled - Sets the avatar to be rendered as disabled.
 *
 * @summary Base element for person elements implementing a reactive controller to resolve person data by 'azureId'.
 */
export type PersonAvatarElementProps = PersonElementProps & {
  name?: string;
  accountType?: AccountType;
  availability?: Availability;
  pictureSrc?: string;
  size?: AvatarSize;
  clickable?: boolean;
  disabled?: boolean;
  resolveDetails?: boolean;
  resolvePresence?: boolean;
  resolvePicture?: boolean;
};

export class PersonAvatarElement extends PersonElement implements PersonAvatarElementProps {
  static styles: CSSResult[] = [style];

  /**
   * Size of the avatar.
   */
  @property({ type: String, reflect: true })
  size: AvatarSize = 'medium';

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
   * Returns the badge color for the current presence availability
   */
  protected getBadgeColor(presence: PersonPresence): BadgeColor {
    switch (presence.availability) {
      case Availability.Available:
      case Availability.AvailableIdle:
        return 'success';
      case Availability.Away:
      case Availability.BeRightBack:
        return 'warning';
      case Availability.Busy:
      case Availability.BusyIdle:
      case Availability.DoNotDisturb:
        return 'danger';
      default:
        return 'disabled';
    }
  }

  /**
   * Returns the badge icon for the current presence availability
   */
  protected getBadgeIcon(presence: PersonPresence): IconName | undefined {
    switch (presence.availability) {
      case Availability.Available:
        return 'check';
      case Availability.AvailableIdle:
      case Availability.Away:
      case Availability.BeRightBack:
      case Availability.BusyIdle:
        return 'time';
      case Availability.DoNotDisturb:
        return 'blocked';
      case Availability.Offline:
        return 'close_circle_outlined';
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
   * Renders the badge
   */
  protected renderBadge(presence: PersonPresence): TemplateResult {
    return html`<fwc-badge
      slot="badge"
      color=${this.getBadgeColor(presence)}
      icon=${ifDefined(this.getBadgeIcon(presence))}
      size=${ifDefined(this.size)}
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
      size=${ifDefined(this.size)}
      src=${ifDefined(details.pictureSrc)}
      value=${ifDefined(this.getInitial(details.name))}
      ?clickable=${this.clickable}
      ?disabled=${this.disabled}
    >
      ${this.presence?.render({
        complete: (presence: PersonPresence) => this.renderBadge(presence),
      })}</fwc-avatar
    >`;
  }

  /**
   * Renders the avatar pending state
   */
  protected renderPending(): TemplateResult {
    return html`<fwc-avatar pending></fwc-avatar>`;
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
      pending: () => this.renderPending(),
      error: () => this.renderPending(),
    })}`;
  }
}

export default PersonAvatarElement;
