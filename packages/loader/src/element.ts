import { LitElement, HTMLTemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import style from './element.css';

import { graphics, styles as graphicsStyles } from './graphics.svg';

export type LoaderElementProps = {
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
 * @tag fwc-loader
 *
 */
export class LoaderElement extends LitElement implements LoaderElementProps {
  @property({ type: Number, reflect: true })
  size = 200;

  @property({ type: String, reflect: false })
  text?: string;

  protected override render(): HTMLTemplateResult {
    const { size = 200, text } = this;
    return html`
      <div class="container" style="--fwc-loader-size: ${size};">
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

LoaderElement.styles = [style, graphicsStyles];

export default LoaderElement;
