import { html, property, CSSResult, TemplateResult, LitElement, css, unsafeCSS } from 'lit-element';
import { TypographyColor, TypographyProps, TypographyVariant } from './types';
import { styles as theme, StyleProperty } from '@equinor/fusion-web-theme';

export class TypographyElement extends LitElement implements TypographyProps {
  @property({ type: Boolean }) bold: boolean = false;
  @property({ type: String }) color: TypographyColor = 'primary';
  @property({ type: Boolean }) italic: boolean = false;
  @property({ type: Number }) lines: number = 0;
  @property({ type: Boolean }) link: boolean = false;
  @property({ type: String }) variant: TypographyVariant = 'text';

  // static get styles(): CSSResult[] {
  //   return [this.resolveStyle(this.properties)];
  // }

  protected resolveStyle(variant: TypographyVariant): CSSResult {
    for (const property in theme.typography) {
      const style = theme.typography[property as keyof typeof theme.typography];
      if (variant in style) {
        return this.resolveCSS(style[variant as keyof typeof style]);
      }
    }
    return css``;
  }

  protected resolveCSS(style: StyleProperty): CSSResult {
    return css`
      ::slotted {
        ${unsafeCSS(style.css)}
      }
    `;
  }

  protected renderSlot(): TemplateResult {
    return html`<slot></slot>`;
  }

  protected renderElement(variant: TypographyVariant): TemplateResult {
    switch (variant) {
      case 'h1':
        return html`<h1>${this.renderSlot()}</h1>`;
      case 'h2':
        return html`<h2>${this.renderSlot()}</h2>`;
      default:
        return html`<span>${this.renderSlot}</span>`;
    }
  }

  protected render(): TemplateResult {
    return html`<style>
        ${this.resolveStyle(this.variant)}</style
      ><slot></slot>`;
  }
}

export default TypographyElement;
