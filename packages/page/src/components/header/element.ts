import { LitElement } from 'lit';
import { html } from 'lit/static-html.js';
import { state } from 'lit/decorators/state.js';

import { headerStyle } from './element.css';
import { ScrollController } from './ScrollController';

/**
 * Element for page
 * @tag fwc-page-header
 */
export class HeaderElement extends LitElement {
  static styles = headerStyle;

  scrollController = new ScrollController(this);

  @state()
  collapsed = false;

  render() {
    return html`
      <header class="${this.collapsed ? 'collapsed' : 'expanded'}">
        <slot name="breadcrumbs">
          <nav class="breadcrumbs">home / page / appKey / builds</nav>
        </slot>
        <slot name="title"></slot>
        <slot name="actions">
          <div class="actions">Im the actions</div>
        </slot>
        <slot name="toolbar">
          <div class="toolbar">Im the toolbar with a long text to test if it wraps correctly. i need even longer text to see how it behaves when it exceeds the available space.</div>
        </slot>
      </header>
    `;
  }
}

export default HeaderElement;
