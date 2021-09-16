import { LitElement, CSSResult, TemplateResult, html, property } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import Picture from '@equinor/fusion-wc-picture';
import style from './element.css';

// persist element
Picture;

export type AvatarSize = 'x-small' | 'small' | 'medium' | 'large';

export type AvatarColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'disabled';

export type AvatarElementProps = {
  size?: AvatarSize;
  color?: AvatarColor;
  value?: string;
  src?: string;
  clickable?: boolean;
  disabled?: boolean;
};

export class AvatarElement extends LitElement implements AvatarElementProps {
  static styles: CSSResult[] = [style];

  @property({ type: String, reflect: true })
  size: AvatarSize = 'medium';

  @property({ type: String, reflect: true })
  color?: AvatarColor;

  @property({ type: String })
  value?: string;

  @property({ type: String })
  src?: string;

  @property({ type: Boolean })
  clickable?: boolean;

  protected renderPicture(): TemplateResult {
    return html`<slot name="badge"></slot>
      <span class="circle"><fwc-picture class="picture" src=${ifDefined(this.src)} cover></fwc-picture></span> `;
  }

  protected renderValue(): TemplateResult {
    return html` <slot name="badge"></slot>
      <span class="circle">${this.value}</span>`;
  }

  protected renderSlot(): TemplateResult {
    return html`<slot name="badge"></slot> <span class="circle"><slot></slot></span>`;
  }

  protected render(): TemplateResult {
    const content = this.src ? this.renderPicture() : this.value ? this.renderValue() : this.renderSlot();
    return html`<span class="circle"><slot name="badge"></slot>${content}</span>`;
  }
}

export default AvatarElement;
