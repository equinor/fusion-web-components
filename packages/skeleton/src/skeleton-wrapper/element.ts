import { LitElement, CSSResult, HTMLTemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import style from './element.css';

export type SkeletonSpacing = 'small' | 'medium' | 'large';
export type SkeletonDirection = 'horizontal' | 'vertical';

export type SkeletonWrapperElementProps = {
  spacing?: SkeletonSpacing;
  direction?: SkeletonDirection;
};

/**
 * Wrapper element for combining skeleton elements.
 * {@inheritdoc}
 *
 * @tag fwc-skeleton-wrapper
 *
 * @property {SkeletonSpacing} spacing - Sets the spacing between the skeleton child elements.
 * @property {SkeletonVariant} direction - Sets direction to flex the skeleton child elements.
 *
 * @cssprop {theme.spacing.comfortable.medium} --fwc-skeleton-wrapper-spacing - gap spacing between the child elements.
 */
export class SkeletonWrapperElement extends LitElement implements SkeletonWrapperElementProps {
  static styles: CSSResult[] = [style];

  /**
   * Spacing between the skeleton elements.
   */
  @property({ type: String, reflect: true })
  spacing: SkeletonSpacing = 'medium';

  /**
   * Direction to flex the skeleton elements.
   */
  @property({ type: String, reflect: true })
  direction: SkeletonDirection = 'horizontal';

  /** {@inheritDoc} */
  protected override render(): HTMLTemplateResult {
    return html`<slot></slot>`;
  }
}

export default SkeletonWrapperElement;
