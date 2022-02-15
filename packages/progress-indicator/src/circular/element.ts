import { LitElement, HTMLTemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import style from './element.css';
import { styles as theme } from '@equinor/fusion-web-theme';

import { graphics, styles as graphicsStyles } from './graphics.svg';

export type CircularSizeProps = 16 | 24 | 32 | 40 | 48;

export type CircularColorProps = 'primary' | 'neutral';

export type CircularProgressElementProps = {
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
  @property({ type: Number, reflect: true })
  size: CircularSizeProps = 24;

  @property({ type: String, reflect: true })
  color: CircularColorProps = 'primary';

  protected override render(): HTMLTemplateResult {
    const { size, color } = this;

    const trackColor =
      color === 'neutral'
        ? theme.colors.ui.background__semitransparent.getVariable('color')
        : theme.colors.infographic.primary__moss_green_13.getVariable('color');

    const progressColor =
      color === 'neutral'
        ? theme.colors.interactive.icon_on_interactive_colors.getVariable('color')
        : theme.colors.infographic.primary__moss_green_100.getVariable('color');

    return html`
      <div
        class="container"
        style="
          --fwc-circular-progress-size: ${size}; 
          --fwc-circular-progress-track-color: ${trackColor}; 
          --fwc-circular-progress-color: ${progressColor};"
      >
        ${graphics}
      </div>
    `;
  }
}

CircularProgressElement.styles = [style, graphicsStyles];

export default CircularProgressElement;
