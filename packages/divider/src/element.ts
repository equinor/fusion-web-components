import { LitElement, CSSResult, TemplateResult, PropertyValues, html } from 'lit';
import { property } from 'lit/decorators.js';
import style from './element.css';

export type DividerColor = 'medium' | 'light' | 'lighter';

export type DividerSpacing = 'small' | 'medium' | 'large';

export type DividerVariant = 'full' | 'middle' | 'list';

export type DividerOrientation = 'horizontal' | 'vertical';

export type DividerElementProps = {
  color?: DividerColor;
  spacing?: DividerSpacing;
  variant?: DividerVariant;
  orientation?: DividerOrientation;
};

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
  color: DividerColor = 'medium';

  /**
   * Spacing of the divider.
   */
  @property({ type: String, reflect: true })
  spacing: DividerSpacing = 'medium';

  /**
   * Variant of the divider.
   */
  @property({ type: String, reflect: true })
  variant: DividerVariant = 'full';

  /**
   * Orientation of the divider.
   */
  @property({ type: String, reflect: true })
  orientation: DividerOrientation = 'horizontal';

  /** {@inheritDoc} */
  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('variant')) {
      if (this.variant === 'list' && this.orientation === 'vertical') {
        this.variant = 'full';
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
