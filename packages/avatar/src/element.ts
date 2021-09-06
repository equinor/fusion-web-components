import { LitElement, CSSResult, TemplateResult, html, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { BadgeColor, IconName } from '@equinor/fusion-wc-badge';
import style from './element.css';

export type AvatarSize = 'small' | 'medium' | 'large';

export type PersonPresence =
  | 'Available'
  | 'AvailableIdle'
  | 'Away'
  | 'BeRightBack'
  | 'Busy'
  | 'BusyIdle'
  | 'DoNotDisturb'
  | 'Offline'
  | 'PresenceUnknown';

export type PersonPosition = 'Employee' | 'External hire' | 'X-External' | 'Joint venture/Affiliate';

export type AvatarElementProps = {
  size?: AvatarSize;
  presence?: PersonPresence;
  position?: PersonPosition;
  initial?: string;
  src?: string;
  badge?: boolean;
  badgeIcon?: IconName;
  clickable?: boolean;
};

export class AvatarElement extends LitElement {
  static styles: CSSResult[] = [style];

  @property({ type: String, reflect: true })
  size: AvatarSize = 'medium';

  @property({ type: String, reflect: true })
  presence: PersonPresence = 'PresenceUnknown';

  @property({ type: String, reflect: true })
  position?: PersonPosition;

  @property({ type: String })
  initial?: string;

  @property({ type: String })
  src?: string;

  @property({ type: Boolean })
  badge = true;

  @property({ type: String })
  badgeIcon?: IconName;

  @property({ type: Boolean })
  clickable?: boolean;

  protected getBadgeColor(): BadgeColor {
    switch (this.presence) {
      case 'Available' || 'AvailableIdle':
        return 'success';
      case 'Away' || 'BeRightBack':
        return 'warning';
      case 'Busy' || 'BusyIdle' || 'DoNotDisturb':
        return 'danger';
      default:
        return 'disabled';
    }
  }

  protected renderBadge(): TemplateResult {
    return html`<fwc-badge
      position="bottom-right"
      color=${this.getBadgeColor()}
      circular
      size=${this.size}
      icon=${ifDefined(this.badgeIcon)}
    />`;
  }

  protected renderImage(): TemplateResult {
    return html`
      <div>
        ${this.badge && this.renderBadge()}
        <div class="circle">
          <fwc-picture class="image" src=${ifDefined(this.src)} cover></fwc-picture>
        </div>
      </div>
    `;
  }

  protected renderInitial(): TemplateResult {
    return html`${this.badge && this.renderBadge()}
      <div class="circle">${this.initial?.substr(0, 1).toUpperCase()}</div>`;
  }

  protected renderSlot(): TemplateResult {
    return html`${this.badge && this.renderBadge()}
      <div class="circle"><slot></slot></div>`;
  }

  protected render(): TemplateResult {
    if (this.src) {
      return this.renderImage();
    }
    if (this.initial) {
      return this.renderInitial();
    }
    return this.renderSlot();
  }
}

export default AvatarElement;
