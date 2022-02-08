import { LitElement, HTMLTemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import style from './element.css';

import { graphics, styles as graphicsStyles } from './graphics.svg';

export type StarProgressElementProps = {
  /**
   * Size of loader
   */
  size: number;
  /**
   * Loader text
   */
  text?: string;
};

/**
 * Element for displaying a Equinor loader.
 * {@inheritdoc}
 *
 * @tag fwc-star-progress
 *
 */
export class StarProgressElement extends LitElement implements StarProgressElementProps {
  @property({ type: Number, reflect: true })
  size = 200;

  @property({ type: String, reflect: false })
  text?: string;

  protected override render(): HTMLTemplateResult {
    const { size = 200, text } = this;
    return html`
      <div class="container" style="--fwc-star-progress-size: ${size};">
        ${graphics}
        <header class="title">
          <slot>
            <span>${text}</span>
          </slot>
        </header
      </div>
    `;
  }
}

StarProgressElement.styles = [style, graphicsStyles];

export default StarProgressElement;
