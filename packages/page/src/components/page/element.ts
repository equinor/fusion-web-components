import { LitElement } from 'lit';
import { html } from 'lit/static-html.js';

import { pageStyle } from './element.css';

/**
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
