import { type TemplateResult, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { html } from 'lit/static-html.js';

import type { LayoutElementProps } from './types';
import { layoutStyle } from './element.css';

/**
 * Element for layout
 * @tag fwc-layout
 */
export class LayoutElement extends LitElement implements LayoutElementProps {
  static styles = layoutStyle;

  @property({ type: Boolean })
  sidebar = false;

  renderSideBar(): TemplateResult | null {
    if (!this.sidebar) {
      return null;
    }

    return html`
      <div class="sidebar">
        <slot name="sidebar"></slot>
      </div>
    `;
  }

  render() {
    return html`
      <div class="layout ${this.sidebar ? 'with-sidebar' : ''}">
        ${this.renderSideBar()}
        <div class="content">
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }
}

export default LayoutElement;
