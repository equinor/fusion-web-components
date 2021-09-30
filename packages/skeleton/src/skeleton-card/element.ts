import { CSSResult, TemplateResult, html } from 'lit';
import SkeletonElement, { SkeletonElementProps } from '../skeleton';
import style from './element.css';

export type SkeletonCardElementProps = SkeletonElementProps;

export class SkeletonCardElement extends SkeletonElement implements SkeletonCardElementProps {
  static styles: CSSResult[] = [style];

  render(): TemplateResult<1> {
    return html`<fwc-skeleton></fwc-skeleton>`;
  }
}

export default SkeletonElement;
