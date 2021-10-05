import { LitElement, TemplateResult, PropertyValues, html } from 'lit';
import { property } from 'lit/decorators.js';
import { IconName } from '@equinor/fusion-wc-icon';
import style from './element.css';

export type ChipSize = 'small' | 'medium' | 'large';
export type ChipVariant = 'filled' | 'outlined';
export type ChipColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'disabled';

export type ChipElementProps = {
  size?: ChipSize;
  variant?: ChipVariant;
  color?: ChipColor;
  value?: string;
  icon?: IconName;
  tooltip?: string;
  active?: boolean;
  clickable?: boolean;
  removeable?: boolean;
  disabled?: boolean;
};

/**
 * @tag fwc-chip
 * @property {ChipSize} size - Set the size of the chip element
 * @property {ChipVariant} variant - Set the variant of the chip element
 * @property {ChipColor} size - Set the color of the chip element
 * @property {string} value - Set the text value to render within the chip
 * @property {IconName} icon - Set the icon to render within the chip
 * @property {string} tooltip - Set a tooltip text to display on hover
 * @property {boolean} active - Set the chip as active (selected)
 * @property {boolean} clickable - Set the chip as clickable to render hover/click effects
 * @property {boolean} removeable - Set the chip as removeable to render remove icon
 * @property {boolean} disabled - Set the chip to render as disabled
 *
 * @cssprop {theme.colors.text.static_icons__tertiary} --fwc-chip-base-color - Base color of the element
 * @cssprop {theme.colors.ui.background__light} --fwc-chip-fill-color - Background color of element
 * @cssprop {theme.colors.text.static_icons__default} --fwc-chip-ink-color - Text color
 * @cssprop {theme.colors.text.static_icons__default} --fwc-chip-disabled-ink-color - Text color when disabled
 *
 * @fires click - When the element is clicked
 * @fires remove - When the remove icon is clicked
 *
 * @summary Component to render chips
 */
export class ChipElement extends LitElement implements ChipElementProps {
  /**
   * Size of the chip
   * @default medium
   */
  @property({ type: String, reflect: true })
  size: ChipSize = 'medium';

  /**
   * Variant of the chip
   * @default outlined
   */
  @property({ type: String, reflect: true })
  variant: ChipVariant = 'filled';

  /**
   * Color of the chip
   * @default primary
   */
  @property({ type: String, reflect: true })
  color: ChipColor = 'primary';

  /**
   * Text value to be rendered within the chip
   */
  @property({ type: String })
  value?: string;

  /**
   * Icon to be rendered within the chip
   */
  @property({ type: String, reflect: true })
  icon?: IconName;

  /**
   * Tooltip text to show on hover
   */
  @property({ type: String })
  tooltip?: string;

  /**
   * If the chip is active (selected)
   */
  @property({ type: Boolean, reflect: true })
  active?: boolean;

  /**
   * If the chip is clickable
   */
  @property({ type: Boolean, reflect: true })
  clickable?: boolean;

  /**
   * If the chip is removeable (renders clickable remove icon)
   */
  @property({ type: Boolean, reflect: true })
  removeable?: boolean;

  /**
   * If the chip is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled?: boolean;

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.clickable = false;
        this.color = 'disabled';
        this.requestUpdate('clickable');
        this.requestUpdate('color');
      }
    }
  }

  protected renderGraphic(): TemplateResult {
    if (this.icon) {
      return html`<fwc-icon class="fwc-chip__graphic" icon=${this.icon}></fwc-icon>`;
    }
    return html`<slot class="fwc-chip__graphic" name="graphic"></slot>`;
  }

  protected renderRemoveIcon(): TemplateResult {
    if (this.removeable) {
      return html`<fwc-icon class="fwc-chip__remove" icon="close"></fwc-icon>`;
    }
    return html`<slot class="fwc-chip__remove" name="remove"></slot>`;
  }

  protected renderContent(): TemplateResult {
    if (this.value) {
      return html`${this.value}`;
    }
    return html`<slot></slot>`;
  }

  protected render(): TemplateResult {
    return html`${this.renderGraphic()} ${this.renderContent()} ${this.renderRemoveIcon()}`;
  }
}

ChipElement.styles = [style];

export default ChipElement;
