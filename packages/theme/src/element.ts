import { html, LitElement, TemplateResult } from 'lit-element';

import style from './element.css';

const FONT_ID = 'FUSION_EQUINOR_FONT';

/**
 * REMARKS - might unload font on disconnect
 */
export default class ThemeElement extends LitElement {
  static styles = [style];

  get FontLink(): HTMLLinkElement | null {
    return document.head.querySelector<HTMLLinkElement>(`link#${FONT_ID}`);
  }

  /** @override */
  connectedCallback(): void {
    super.connectedCallback();
    !this.FontLink && this.injectFont();
  }

  /**
   * Inject font to head of current document
   */
  protected injectFont(): void {
    const link = document.createElement('link');
    link.id = FONT_ID;
    link.href = 'https://eds-static.equinor.com/font/equinor-font.css';
    link.rel = 'stylesheet';
    document.head.append(link);
  }

  render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
