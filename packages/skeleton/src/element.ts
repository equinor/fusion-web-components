import { LitElement, CSSResult, HTMLTemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import { SkeletonSize, SkeletonVariant } from './static';
import styles from './element.css';

export type SkeletonElementProps = Pick<SkeletonElement, 'size' | 'variant' | 'inactive' | 'fluid'>;

/**
 * Element for rendering pending state placeholders for components.
 *
 * @tag fwc-skeleton
 *
 * @cssprop {theme.colors.interactive.disabled__fill} --fwc-skeleton-fill-color - background color of the element.
 * @cssprop {theme.colors.interactive.disabled__text} --fwc-skeleton-ink-color - text color of the element.
 *
 * @slot default - Inner content of the skeleton
 *
 * Icons can be slotted in with a slot named 'icon'.
 */
export class SkeletonElement extends LitElement {
  static styles: CSSResult[] = styles;

  /**
   * Size of the skeleton element.
   * @default medium
   */
  @property({ type: String, reflect: true })
  size?: SkeletonSize;

  /**
   * Variant of the skeleton element.
   * @default rectangle
   */
  @property({ type: String, reflect: true })
  variant: SkeletonVariant = SkeletonVariant.Rectangle;

  /**
   * Disables the skeleton element's active animation.
   */
  @property({ type: Boolean, reflect: true })
  inactive?: boolean;

  /**
   * Expands the skeleton element width to the width of the parent.
   */
  @property({ type: Boolean, reflect: true })
  fluid?: boolean;

  /** {@inheritDoc} */
  protected override render(): HTMLTemplateResult {
    return html`<div id="root"><slot></slot></div>`;
  }
}

export default SkeletonElement;
