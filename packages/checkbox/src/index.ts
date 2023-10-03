import { fusionElement } from '@equinor/fusion-wc-core';
import CheckboxElement from './element';
export * from './element';

export const tag = 'fwc-checkbox';

export type CheckboxElementProps = Pick<
  CheckboxElement,
  'checked' | 'disabled' | 'indeterminate' | 'value' | 'reducedTouchTarget' | 'name'
>;

@fusionElement(tag)
export default class _ extends CheckboxElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: CheckboxElement;
  }
}
