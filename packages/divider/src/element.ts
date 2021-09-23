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

export class DividerElement extends LitElement implements DividerElementProps {
  static styles: CSSResult[] = [style];

  @property({ type: String, reflect: true })
  color: DividerColor = 'medium';

  @property({ type: String, reflect: true })
  spacing: DividerSpacing = 'medium';

  @property({ type: String, reflect: true })
  variant: DividerVariant = 'full';

  @property({ type: String, reflect: true })
  orientation: DividerOrientation = 'horizontal';

  @property({ type: Boolean })
  flexItem = false;

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('variant')) {
      if (this.variant === 'list' && this.orientation === 'vertical') {
        this.variant = 'full';
      }
      this.requestUpdate();
    }
  }

  protected render(): TemplateResult {
    if (this.variant === 'list' && this.orientation === 'horizontal') {
      return html`<li class="divider" role="separator"></li>`;
    }
    return html`<hr class="divider" />`;
  }
}

export default DividerElement;
