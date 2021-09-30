import { CSSResult, html } from 'lit';
import SkeletonElement, { SkeletonElementProps } from '../skeleton';
import style from './element.css';

export type SkeletonCardElementProps = SkeletonElementProps & {};

export class SkeletonCardElement extends SkeletonElement implements SkeletonCardElementProps {
  static styles: CSSResult[] = [style];

  render() {
    return html`<fwc-skeleton></fwc-skeleton>`;
  }
}

export default SkeletonElement;
