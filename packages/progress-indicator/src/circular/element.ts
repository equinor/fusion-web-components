import { LitElement, HTMLTemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import style from './element.css';

import { graphics, styles as graphicsStyles } from './graphics.svg';

// export enum ColorVariant {
//   primary,
//   neutral,
// }
export type CircularVariantProps = 'determinate' | 'indeterminate';

export type CircularSizeProps = 16 | 24 | 32 | 40 | 48;

export type CircularColorProps = 'primary' | 'neutral';

export type CircularProgressElementProps = {
  /**  Use indeterminate when there is no progress value */
  variant?: CircularVariantProps;
  /**  The value of the progress indicator for determinate variant.
   * Value between 0 and 100 */
  value?: number;
  /** Size */
  size?: CircularSizeProps;
  /** Color */
  color?: CircularColorProps;
};

/**
 * Element for displaying a Equinor loader.
 * {@inheritdoc}
 *
 * @tag fwc-circular-progress
 *
 */
export class CircularProgressElement extends LitElement implements CircularProgressElementProps {
  @property({ type: String, reflect: true })
  variant: CircularVariantProps = 'indeterminate';

  @property({ type: Number, reflect: true })
  value = 0;

  @property({ type: Number, reflect: true })
  size: CircularSizeProps = 24;

  @property({ type: String, reflect: true })
  color: CircularColorProps = 'primary';

  protected override render(): HTMLTemplateResult {
    const { size } = this;
    return html` <div class="container" style="--fwc-circular-progress-size: ${size};">${graphics}</div> `;
  }
}

CircularProgressElement.styles = [style, graphicsStyles];

export default CircularProgressElement;
