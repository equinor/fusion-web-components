import { LitElement, CSSResult, TemplateResult, PropertyValues, html } from 'lit';
import { property } from 'lit/decorators.js';
import { DividerElementProps, DividerColor, DividerSpacing, DividerVariant, DividerOrientation } from './types';
import style from './element.css';

/**
 * Element for rendering a divider
 * {@inheritdoc}
 *
 * @tag fwc-divider
 *
 * @property {DividerColor} color - Sets the color of the divider.
 * @property {DividerSpacing} spacing - Sets the spacing type for the divider.
 * @property {DividerVariant} variant - Sets the divider variant.
 * @property {DividerOrientation} orientation - Sets orientation type for the divider.
 *
 * @cssprop {theme.colors.ui.background__medium} --fwc-divider-color - color of the divider.
 */
export class DividerElement extends LitElement implements DividerElementProps {
  static styles: CSSResult[] = [style];

  /**
   * Color of the divider.
   */
  @property({ type: String, reflect: true })
  color: DividerColor = DividerColor.Medium;

  /**
   * Spacing of the divider.
   */
  @property({ type: String, reflect: true })
  spacing: DividerSpacing = DividerSpacing.Medium;

  /**
   * Variant of the divider.
   */
  @property({ type: String, reflect: true })
  variant: DividerVariant = DividerVariant.Full;

  /**
   * Orientation of the divider.
   */
  @property({ type: String, reflect: true })
  orientation: DividerOrientation = DividerOrientation.Horizontal;

  /** {@inheritDoc} */
  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('variant')) {
      if (this.variant === 'list' && this.orientation === 'vertical') {
        this.variant = DividerVariant.Full;
      }
      this.requestUpdate();
    }
  }

  /** {@inheritDoc} */
  protected override render(): TemplateResult {
    if (this.variant === 'list' && this.orientation === 'horizontal') {
      return html`<li class="divider" role="separator"></li>`;
    }
    return html`<hr class="divider" />`;
  }
}

export default DividerElement;
