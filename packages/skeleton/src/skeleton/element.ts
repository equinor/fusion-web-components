import { LitElement, CSSResult, html } from 'lit';
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
  fullWidth?: boolean;
};

export class SkeletonElement extends LitElement implements SkeletonElementProps {
  static styles: CSSResult[] = [style];

  @property({ type: String, reflect: true })
  size: SkeletonSize = 'medium';

  @property({ type: String, reflect: true })
  variant: SkeletonVariant = SkeletonVariant.Rectangle;

  @property({ type: Boolean, reflect: true })
  inactive: boolean = false;

  @property({ type: Boolean, reflect: true })
  fullWidth: boolean = false;

  render() {
    return html`<span><slot class="fwc-skeleton__icon" name="icon"></slot></span>`;
  }
}

export default SkeletonElement;
