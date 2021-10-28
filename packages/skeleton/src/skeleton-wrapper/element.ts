import { LitElement, CSSResult, HTMLTemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import { SkeletonWrapperElementProps, SkeletonSpacing, SkeletonDirection } from './types';
import style from './element.css';

/**
 * Wrapper element for combining skeleton elements.
 * {@inheritdoc}
 *
 * @tag fwc-skeleton-wrapper
 *
 * @property {SkeletonSpacing} spacing - Sets the spacing between the skeleton child elements.
 * @property {SkeletonDirection} direction - Sets direction to flex the skeleton child elements.
 *
 * @cssprop {theme.spacing.comfortable.medium} --fwc-skeleton-wrapper-spacing - gap spacing between the child elements.
 */
export class SkeletonWrapperElement extends LitElement implements SkeletonWrapperElementProps {
  static styles: CSSResult[] = [style];

  /**
   * Spacing between the skeleton elements.
   */
  @property({ type: String, reflect: true })
  spacing: SkeletonSpacing = SkeletonSpacing.Medium;

  /**
   * Direction to flex the skeleton elements.
   */
  @property({ type: String, reflect: true })
  direction: SkeletonDirection = SkeletonDirection.Horizontal;

  /** {@inheritDoc} */
  protected override render(): HTMLTemplateResult {
    return html`<slot></slot>`;
  }
}

export default SkeletonWrapperElement;
