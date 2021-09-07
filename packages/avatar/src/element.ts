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
  initial: string;
  src?: string;
  clickable?: boolean;
};

export class AvatarElement extends LitElement {
  static styles: CSSResult[] = [style];

  @property({ type: String, reflect: true })
  size: AvatarSize = 'medium';

  @property({ type: String, reflect: true })
  presence?: PersonPresence;

  @property({ type: String, reflect: true })
  position?: PersonPosition;

  @property({ type: String })
  initial = '';

  @property({ type: String })
  src?: string;

  @property({ type: Boolean })
  clickable?: boolean;

  protected getBadgeColor(): BadgeColor {
    switch (this.presence) {
      case 'Available':
      case 'AvailableIdle':
        return 'success';
      case 'Away':
      case 'BeRightBack':
        return 'warning';
      case 'Busy':
      case 'BusyIdle':
      case 'DoNotDisturb':
        return 'danger';
      default:
        return 'disabled';
    }
  }

  protected getBadgeIcon(): IconName | undefined {
    switch (this.presence) {
      case 'Available':
        return 'check';
      case 'AvailableIdle':
      case 'Away':
      case 'BeRightBack':
      case 'BusyIdle':
        return 'time';
      case 'DoNotDisturb':
        return 'blocked';
      case 'Offline':
        return 'close_circle_outlined';
      default:
        return undefined;
    }
  }

  protected renderBadge(): TemplateResult {
    return html`<fwc-badge
      position="bottom-right"
      color=${this.getBadgeColor()}
      circular
      size=${this.size}
      icon=${ifDefined(this.getBadgeIcon())}
      tooltip=${ifDefined(this.presence)}
    />`;
  }

  protected renderImage(): TemplateResult {
    return html`
      ${this.presence && this.renderBadge()}
      <div class="circle"><fwc-picture src=${ifDefined(this.src)} cover></fwc-picture></div>
    `;
  }

  protected renderInitial(): TemplateResult {
    return html`${this.presence && this.renderBadge()}
      <div class="circle">${this.initial?.substr(0, 1).toUpperCase()}</div>`;
  }

  protected renderSlot(): TemplateResult {
    return html`${this.presence && this.renderBadge()}
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
