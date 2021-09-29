import { CSSResult, TemplateResult, PropertyValues, html } from 'lit';
import { property } from 'lit/decorators';
import { ifDefined } from 'lit/directives/if-defined';
import { PersonElement, PersonElementProps } from '../person';
import { Availability, AccountType, PersonPresence, PersonDetails } from '../types';
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
};

export class PersonAvatarElement extends PersonElement implements PersonAvatarElementProps {
  static styles: CSSResult[] = [style];

  @property({ type: Boolean })
  resolveDetails?: boolean = true;

  @property({ type: Boolean })
  resolvePresence?: boolean = true;

  @property({ type: String, reflect: true })
  name?: string;

  @property({ type: String, reflect: true })
  accountType?: AccountType;

  @property({ type: String, reflect: true })
  availability?: Availability;

  @property({ type: String, reflect: true })
  pictureSrc?: string;

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

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
  }

  private getBadgeColor(presence: PersonPresence): BadgeColor {
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

  private getBadgeIcon(presence: PersonPresence): IconName | undefined {
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

  private getInitial(name?: string): string | undefined {
    return name?.substr(0, 1)?.toUpperCase();
  }

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

  protected renderAvatar(details: PersonDetails): TemplateResult {
    return html`<fwc-avatar
      size=${ifDefined(this.size)}
      src=${ifDefined(details.pictureSrc)}
      value=${ifDefined(this.getInitial(details.name))}
      ?clickable=${this.clickable}
      ?disabled=${this.disabled}
    >
      ${this.controller.presence.render({
        complete: (presence: PersonPresence) => this.renderBadge(presence),
      })}</fwc-avatar
    >`;
  }

  protected renderLoader(): TemplateResult {
    return html`<fwc-avatar ?disabled=${true}></fwc-avatar>`;
  }

  protected render(): TemplateResult {
    return html`${this.controller.details.render({
      complete: (details: PersonDetails) => this.renderAvatar(details),
      pending: () => this.renderLoader(),
      error: () => html`<span>ERROR</span>`,
    })}`;
  }
}

export default PersonAvatarElement;
