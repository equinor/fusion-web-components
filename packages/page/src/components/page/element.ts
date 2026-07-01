import { LitElement, html } from 'lit';

import { pageStyle } from './element.css';

/**
 * Composes application pages into header, main content, and footer regions.
 *
 * @slot header - Optional page header content.
 * @slot main - Primary page content.
 * @slot footer - Optional page footer content.
 *
 * @tag fwc-page
 */
 * Element for page
 * @tag fwc-page
 */
export class PageElement extends LitElement {
  static styles = pageStyle;

  render() {
    return html`
      <section class="page">
        <slot name="header"></slot>
        <main>
            <slot name="main"></slot>
        </main>
        <slot name="footer"></slot>
      </section>
    `;
  }
}

export default PageElement;
