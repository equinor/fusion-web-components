import { CSSResult, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import Checkbox from '@equinor/fusion-wc-checkbox';
import { ListItemElement } from '../list-item';
import { styles as mdcStyle } from '@material/mwc-list/mwc-list-item.css';
import style from './element.css';
import { GraphicType } from '@material/mwc-list/mwc-list-item-base';

// persist elements
Checkbox;

/**
 * Element for check list item
 * {@inheritdoc}
 *
 * @tag fwc-check-list-item
 *
 * @property {boolean} left - Displays the checkbox on the left. Overrides graphic.
 *
 * @summary Enhanced check list item element based on [FWC Checkbox](https://github.com/equinor/fusion-web-components/tree/main/packages/checkbox)
 */
export class CheckListItemElement extends ListItemElement {
  static styles: CSSResult[] = [mdcStyle, style];

  /**
   * Displays the checkbox on the left. Overrides graphic.
   */
  @property({ type: Boolean })
  left = false;

  /**
   * Determines which graphic layout to show and enables the graphic slot.
   */
  @property({ type: String, reflect: true })
  override graphic: GraphicType = 'control';

  override render(): TemplateResult<1> {
    const checkboxClasses = {
      'fwc-list-item__checkbox-right': !this.left,
      'fwc-list-item__checkbox-left': this.left,
    };

    const text = this.renderText();
    const graphic = this.graphic ? this.renderGraphic() : html``;
    const ripple = this.renderRipple();

    return html` ${ripple} ${graphic} ${this.left ? '' : text}
      <fwc-checkbox
        class=${classMap(checkboxClasses)}
        reducedTouchTarget
        tabindex=${this.tabindex}
        .checked=${this.selected}
        ?disabled=${this.disabled}
        @change=${this.onChange}
      >
      </fwc-checkbox>
      ${this.left ? text : ''} <slot class="meta" name="meta"></slot>`;
  }

  protected async onChange(evt: Event): Promise<void> {
    const checkbox = evt.target as Checkbox;
    const changeFromProp = this.selected === checkbox.checked;

    if (!changeFromProp) {
      this._skipPropRequest = true;
      this.selected = checkbox.checked;
      await this.updateComplete;
      this._skipPropRequest = false;
    }
  }
}

export default CheckListItemElement;
