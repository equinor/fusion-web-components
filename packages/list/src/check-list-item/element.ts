import { CSSResult, html } from 'lit';
import { property, query } from 'lit/decorators';
import { classMap } from 'lit/directives/class-map';
import Checkbox from '@equinor/fusion-wc-checkbox';
import { ListItemElement, ListItemElementProps } from '../list-item';
import { styles as mdcStyle } from '@material/mwc-list/mwc-list-item.css';
import style from './element.css';

// persist elements
Checkbox;

export class CheckListItemElement extends ListItemElement implements ListItemElementProps {
  static styles: CSSResult[] = [mdcStyle, style];

  @query('slot') protected override slotElement!: HTMLSlotElement | null;
  @query('mwc-checkbox') protected checkboxElement!: Checkbox;

  @property({ type: Boolean }) left = false;
  @property({ type: String, reflect: true })
  override render() {
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

  protected async onChange(evt: Event) {
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
