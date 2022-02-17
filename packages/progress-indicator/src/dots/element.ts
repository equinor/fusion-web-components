import { LitElement, TemplateResult, svg } from 'lit';
import { property } from 'lit/decorators.js';
import style from './element.css';

export enum DotsSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type DotsColorProps = 'primary' | 'tertiary' | 'neutral';

export type DotsProgressElementProps = {
  /** Size */
  size?: DotsSize;
  /** Color */
  color?: DotsColorProps;
};

/**
 * Element for displaying a Equinor loader.
 * {@inheritdoc}
 *
 * @tag fwc-dots-progress
 *
 */
export class DotsProgressElement extends LitElement implements DotsProgressElementProps {
  /**
   * Size of the element.
   * @default DotsSize.Small
   */
  @property({ type: String, reflect: true })
  size: DotsSize = DotsSize.Small;

  /**
   * Color of the element.
   * @default 'primary'
   */
  @property({ type: String, reflect: true })
  color: DotsColorProps = 'primary';

  protected override render(): TemplateResult {
    return svg`
      <svg 
        role="progressbar"
        viewBox="0 0 16 4"
        preserveAspectRatio="xMidYMid meet" 
      >
        <circle cx="2" cy="2" r="2" />
        <circle cx="8" cy="2" r="2" />
        <circle cx="14" cy="2" r="2" />
      </svg>
    `;
  }
}

DotsProgressElement.styles = [style];

export default DotsProgressElement;
