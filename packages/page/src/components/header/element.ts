import { LitElement, html } from 'lit';
import { state } from 'lit/decorators/state.js';

import { headerStyle } from './element.css';
import { ScrollController } from './ScrollController';

/**
 * Element for page header
 * @tag fwc-page-header
/**
 * Composes a page header with slots for navigation, title, actions, and
 * toolbar content, and can collapse as the page scrolls.
 *
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
        <slot name="breadcrumbs"></slot>
        <slot name="title"></slot>
        <slot name="actions"></slot>
        <slot name="toolbar"></slot>
      </header>
    `;
  }
}

export default HeaderElement;
