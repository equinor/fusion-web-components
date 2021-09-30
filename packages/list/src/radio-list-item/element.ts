import { CSSResult, TemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { IconName } from '@equinor/fusion-wc-icon';
import { RadioListItemBase } from '@material/mwc-list/mwc-radio-list-item-base';
import Radio from '@equinor/fusion-wc-radio';
import Icon from '@equinor/fusion-wc-icon';
import { styles as mdcStyle } from '@material/mwc-list/mwc-list-item.css';
import style from './element.css';

// persist elements
Radio;
Icon;

export type RadioListItemElementProps = {
  group?: string | null;
  tabIndex?: number;
  twoline?: boolean;
  activated?: boolean;
  icon?: IconName;
  avatar?: boolean;
};

export class RadioListItemElement extends RadioListItemBase implements RadioListItemElementProps {
  static styles: CSSResult[] = [mdcStyle, style];

  @property({ type: String })
  icon?: IconName;

  @property({ type: Boolean })
  avatar?: boolean;

  protected renderIcon(): TemplateResult {
    return html`<fwc-icon icon=${ifDefined(this.icon)}></fwc-icon>`;
  }

  protected renderAvatar(): TemplateResult {
    return html`<slot name="avatar"></slot>`;
  }

  override render(): TemplateResult<1> {
    const radioClasses = {
      'fwc-list-item__radio-right': !this.left,
      'fwc-list-item__radio-left': this.left,
    };

    const text = this.renderText();
    const graphic = this.icon ? this.renderIcon() : this.avatar ? this.renderAvatar() : html``;
    const meta = this.hasMeta && this.left ? this.renderMeta() : html``;
    const ripple = this.renderRipple();

    return html` ${ripple} ${graphic} ${this.left ? '' : text}
      <fwc-radio
        global
        class=${classMap(radioClasses)}
        tabindex=${this.tabindex}
        name=${ifDefined(this.group === null ? undefined : this.group)}
        .checked=${this.selected}
        ?disabled=${this.disabled}
        @checked=${this.onChange}
      >
      </fwc-radio>
      ${this.left ? text : ''} ${meta}`;
  }
}

export default RadioListItemElement;
