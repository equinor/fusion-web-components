import { LitElement, CSSResult, TemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import style from './element.css';

export enum SkeletonVariant {
  Circle = 'circle',
  Rectangle = 'rectangle',
  Square = 'square',
  Text = 'text',
}

export type SkeletonSize = 'x-small' | 'small' | 'medium' | 'large';
export type SkeletonElementProps = {
  size?: SkeletonSize;
  variant?: SkeletonVariant;
  inactive?: boolean;
  fluid?: boolean;
};

/**
 * Element for rendering pending state placeholders for components
 * {@inheritdoc}
 *
 * @tag fwc-skeleton
 *
 * @property {SkeletonSize} size - Sets the size of the skeleton element
 * @property {SkeletonVariant} variant - Sets the skeleton element variant to render
 * @property {boolean} inactive - Disables the skeleton element active animation
 * @property {boolean} fluid - Sets the width of the element to fill the parent width.
 *
 * @cssprop {theme.colors.interactive.disabled__fill} --fwc-skeleton-fill-color - background color of the element
 * @cssprop {theme.colors.interactive.disabled__text} --fwc-skeleton-ink-color - text color of the element
 */
export class SkeletonElement extends LitElement implements SkeletonElementProps {
  static styles: CSSResult[] = [style];

  /**
   * Size of the skeleton element.
   */
  @property({ type: String, reflect: true })
  size: SkeletonSize = 'medium';

  /**
   * Variant of the skeleton element.
   */
  @property({ type: String, reflect: true })
  variant: SkeletonVariant = SkeletonVariant.Rectangle;

  /**
   * Disables the skeleton element's active animation.
   */
  @property({ type: Boolean, reflect: true })
  inactive = false;

  /**
   * Expands the skeleton element width to the width of the parent.
   */
  @property({ type: Boolean, reflect: true })
  fluid = false;

  render(): TemplateResult<1> {
    return html`<span><slot class="fwc-skeleton__icon" name="icon"></slot></span>`;
  }
}

export default SkeletonElement;
