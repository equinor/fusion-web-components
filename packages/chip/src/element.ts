import { LitElement, TemplateResult, PropertyValues, html } from 'lit';
import { property } from 'lit/decorators.js';
import { IconName } from '@equinor/fusion-wc-icon';
import style from './element.css';

export type ChipSize = 'small' | 'medium' | 'large';
export type ChipVariant = 'filled' | 'outlined';
export type ChipColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

export type ChipElementProps = {
  size?: ChipSize;
  variant?: ChipVariant;
  color?: ChipColor;
  value?: string;
  icon?: IconName;
  tooltip?: string;
  active?: boolean;
  clickable?: boolean;
  removable?: boolean;
  disabled?: boolean;
};

/**
 * TODO: Chips that are set to both removable and clickable will not handle the 'click' and 'remove' events correctly.
 * @tag fwc-chip
 * @property {ChipSize} size - Set the size of the chip element
 * @property {ChipVariant} variant - Set the variant of the chip element
 * @property {ChipColor} size - Set the color of the chip element
 * @property {string} value - Set the text value to render within the chip
 * @property {IconName} icon - Set the icon to render within the chip
 * @property {string} tooltip - Set a tooltip text to display on hover
 * @property {boolean} active - Set the chip as active (selected)
 * @property {boolean} clickable - Set the chip as clickable to render hover/click effects
 * @property {boolean} removable - Set the chip as removable to render remove icon
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
   * If the chip is removable (renders clickable remove icon)
   */
  @property({ type: Boolean, reflect: true })
  removable?: boolean;

  /**
   * If the chip is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled?: boolean;

  protected handleOnClick(e: PointerEvent): void {
    if (this.clickable) {
      this.dispatchEvent(new PointerEvent('clicked', e));
    }
  }

  protected handleRemoveOnClick(e: PointerEvent): void {
    if (this.removable) {
      this.dispatchEvent(new PointerEvent('remove', e));
    }
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.clickable = false;
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
    if (this.removable) {
      return html`<fwc-icon class="fwc-chip__remove" icon="close" @click=${this.handleRemoveOnClick}></fwc-icon>`;
    }
    return html`<slot class="fwc-chip__remove" name="remove" @click=${this.handleRemoveOnClick}></slot>`;
  }

  protected renderContent(): TemplateResult {
    if (this.value) {
      return html`<span>${this.value}</span>`;
    }
    return html`<slot></slot>`;
  }

  protected render(): TemplateResult {
    return html`<span class="fwc-chip" @click=${this.handleOnClick}
      >${this.renderGraphic()} ${this.renderContent()} ${this.renderRemoveIcon()}</span
    >`;
  }
}

ChipElement.styles = [style];

export default ChipElement;
