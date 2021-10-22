import { CSSResult, HTMLTemplateResult, html, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import Radio from '@equinor/fusion-wc-radio';
import Icon, { IconName } from '@equinor/fusion-wc-icon';
import { styles as mdcStyle } from '@material/mwc-list/mwc-list-item.css';
import style from './element.css';
import { GraphicType } from '@material/mwc-list/mwc-list-item-base';
import { ListItemElement } from '../list-item';

// persist elements
Radio;
Icon;

/**
 * Element for radio list item
 * {@inheritdoc}
 *
 * @tag fwc-radio-list-item
 *
 * @property {boolean} left - Displays the checkbox on the left. Overrides graphic.
 *
 * @summary Enhanced radio list item element based on [FWC Radio](https://github.com/equinor/fusion-web-components/tree/main/packages/radio)
 */
export class RadioListItemElement extends ListItemElement {
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

  /**
   * Name of the icon to be rendered. Overrides graphic.
   */
  @property({ type: String })
  icon?: IconName;

  protected _changeFromClick = false;

  /** {@inheritDoc} */
  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('icon')) {
      if (this.icon) {
        this.graphic = 'icon';
      }
    }
  }

  /**
   * Render icon by slot or name
   */
  protected renderIcon(): HTMLTemplateResult {
    return html`<slot name="icon"><fwc-icon icon=${ifDefined(this.icon)}></fwc-icon></slot>`;
  }

  /**
   * Render avatar slot
   */
  protected renderAvatar(): HTMLTemplateResult {
    if (this.graphic === 'avatar') {
      return html`<slot name="avatar"></slot>`;
    }
    return html``;
  }

  /** {@inheritDoc} */
  protected override renderGraphic(): HTMLTemplateResult {
    switch (this.graphic) {
      case 'avatar':
        return this.renderAvatar();
      case 'icon':
        return this.renderIcon();
      default:
        return super.renderGraphic();
    }
  }

  /** {@inheritDoc} */
  override render(): HTMLTemplateResult {
    const radioClasses = {
      'fwc-list-item__radio-right': !this.left,
      'fwc-list-item__radio-left': this.left,
    };

    const text = this.renderText();
    const graphic = this.graphic && this.graphic !== 'control' && !this.left ? this.renderGraphic() : html``;
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

  protected override onClick(): void {
    this._changeFromClick = true;
    super.onClick();
  }

  /**
   * Handle on change and fire required events
   */
  protected async onChange(evt: Event): Promise<void> {
    const checkbox = evt.target as Radio;
    const changeFromProp = this.selected === checkbox.checked;

    if (!changeFromProp) {
      this._skipPropRequest = true;
      this.selected = checkbox.checked;
      await this.updateComplete;
      this._skipPropRequest = false;

      if (!this._changeFromClick) {
        this.fireRequestSelected(this.selected, 'interaction');
      }
    }

    this._changeFromClick = false;
  }
}

export default RadioListItemElement;
