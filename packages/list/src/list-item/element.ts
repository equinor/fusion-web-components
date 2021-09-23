import { CSSResult, TemplateResult, html } from 'lit';
import { ListItemBase, GraphicType } from '@material/mwc-list/mwc-list-item-base';
import { styles as mdcStyle } from '@material/mwc-list/mwc-list-item.css';
import style from './element.css';

export type ListItemElementProps = {
  group?: string | null;
  tabIndex?: number;
  twoline?: boolean;
  activated?: boolean;
  graphic?: GraphicType;
};

export class ListItemElement extends ListItemBase implements ListItemElementProps {
  static styles: CSSResult[] = [mdcStyle, style];

  protected renderText() {
    const inner = this.twoline ? this.renderTwoline() : this.renderSingleLine();
    return html` <span class="fwc-list-item__text"> ${inner} </span>`;
  }

  protected renderTwoline() {
    return html`
      <span class="fwc-list-item__primary-text">
        <slot></slot>
      </span>
      <span class="fwc-list-item__secondary-text">
        <slot name="secondary"></slot>
      </span>
    `;
  }

  override render(): TemplateResult<1> {
    const text = this.renderText();
    return html` ${this.renderRipple()} <span class="fwc-list-item__graphic"><slot name="graphic"></slot></span> ${text}
      <slot class="fwc-list-item__meta" name="meta"></slot>`;
  }
}

export default ListItemElement;
