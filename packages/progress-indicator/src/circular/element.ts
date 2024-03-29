import { LitElement, svg, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import styles from './element.css';

export enum CircularSize {
  XSmall = 'x-small',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  XLarge = 'x-large',
}

export type CircularColorProps = 'primary' | 'neutral';

export type CircularProgressElementProps = {
  /** Size */
  size?: CircularSize;
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
  size?: CircularSize;

  @property({ type: String, reflect: true })
  color?: CircularColorProps;

  protected override render(): TemplateResult {
    const thickness = 4;
    return svg`
        <svg 
          viewBox="0 0 48 48" 
          role="progressbar" 
          preserveAspectRatio="xMidYMid meet" 
        >
          <circle 
            cx="50%" 
            cy="50%" 
            r="${(48 - thickness) / 2}"
            fill="none" 
            stroke-width="${thickness}"
            class="track">
          </circle>
          <circle 
            cx="50%" 
            cy="50%" 
            r="${(48 - thickness) / 2}"
            fill="none" 
            stroke-width="${thickness}"
            stroke-linecap="round" 
            stroke-dasharray="48" 
            class="progress">
          </circle>
        </svg>
    `;
  }
}

CircularProgressElement.styles = styles;

export default CircularProgressElement;
