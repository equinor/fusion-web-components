import { LitElement } from 'lit';
import { html } from 'lit/static-html.js';

import { pageStyle } from './element.css';
import { HeaderElement } from '../header';

HeaderElement;

/**
 * Element for page
 * @tag fwc-page
 */
export class PageElement extends LitElement {
  static styles = pageStyle;

  render() {
    return html`
      <section class="page">
        <slot name="header">
          <fwc-page-header><h1 slot="title">Im the Header</h1></fwc-page-header>
        </slot>
        <main>
          <div style="height: 300%;">
            <slot name="main">
              <p>Im the main content</p>
            </slot>
          </div>
        </main>
        <slot name="footer">
          <footer>Im the footer</footer>
        </slot>
      </section>
    `;
  }
}

export default PageElement;
