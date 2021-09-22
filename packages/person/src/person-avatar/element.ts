import { CSSResult, TemplateResult, PropertyValues, html, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { PersonElement, PersonElementProps } from '../person';
import { Availability, AccountType } from '../types';
import Badge, { BadgeColor, IconName } from '@equinor/fusion-wc-badge';
import Avatar, { AvatarSize } from '@equinor/fusion-wc-avatar';
import style from './element.css';

// persist elements
Badge;
Avatar;

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

  @property({ type: Boolean })
  resolveDetails?: boolean = true;

  @property({ type: Boolean })
  resolvePresence?: boolean = true;

  @property({ type: Boolean })
  resolvePicture?: boolean = true;

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

  @property({ type: Boolean, reflect: true })
  clickable?: boolean;

  @property({ type: Boolean })
  disabled?: boolean;

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('personResolver')) {
      if (this.resolveDetails) {
        this.resolveDetailsAsync();
      }
      if (this.resolvePresence) {
        this.resolvePresenceAsync();
      }
      if (this.resolvePicture) {
        this.resolvePictureAsync();
      }
    }
  }

  protected async resolveDetailsAsync() {
    if (!this.name || !this.accountType) {
      const details = await this.getDetailsAsync();
      if (details) {
        if (!this.name) {
          this.name = details.name;
        }
        if (!this.accountType) {
          this.accountType = details.accountType;
        }
      }
    }
  }

  protected async resolvePresenceAsync() {
    if (!this.availability) {
      const presence = await this.getPresenceAsync();
      if (presence) {
        this.availability = presence.availability;
      }
    }
  }

  protected async resolvePictureAsync() {
    if (!this.pictureSrc) {
      const picture = await this.getPictureAsync();
      if (picture) {
        this.pictureSrc = picture.src;
      }
    }
  }

  protected getBadgeColor(): BadgeColor {
    switch (this.availability) {
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

  protected getBadgeIcon(): IconName | undefined {
    switch (this.availability) {
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

  protected getInitial(): string | undefined {
    return this.name?.substr(0, 1)?.toUpperCase();
  }

  protected renderBadge(): TemplateResult | undefined {
    if (this.availability) {
      return html`<fwc-badge
        slot="badge"
        color=${this.getBadgeColor()}
        icon=${ifDefined(this.getBadgeIcon())}
        size=${ifDefined(this.size)}
        position="bottom-right"
        ?disabled=${this.disabled}
        circular
      />`;
    }
    return undefined;
  }

  protected render(): TemplateResult {
    return html`<fwc-avatar
      size=${ifDefined(this.size)}
      src=${ifDefined(this.pictureSrc)}
      value=${ifDefined(this.getInitial())}
      ?clickable=${this.clickable}
      ?disabled=${this.disabled}
      >${this.renderBadge()}</fwc-avatar
    >`;
  }
}

export default PersonAvatarElement;
