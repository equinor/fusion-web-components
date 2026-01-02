import { html } from 'lit';

import { fusionElement } from '@equinor/fusion-wc-core';

import { PillElement } from "../pill/element";
import type { PillElementProps } from '../pill/types';

export type { PillElementProps as ViewerPillElementProps };
export const tag = 'fwc-people-viewer-pill';

@fusionElement(tag)

export class ViewerPillElement extends PillElement {
  static styles = PillElement.styles;

  removePerson(azureId: string) {
    this.dispatchEvent(new CustomEvent<string>('azureid-removed', { detail: azureId }));
  }

  deleteButton(azureId: string) {
    return html`
      <button type="button" @click=${() => this.removePerson(azureId)}>
        <fwc-icon icon="close"></fwc-icon>
      </button>
    `;
  }
}

export default class _ extends ViewerPillElement { }

declare global {
  interface HTMLElementTagNameMap {
    [tag]: ViewerPillElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<React.HTMLAttributes<ViewerPillElement>, ViewerPillElement>;
    }
  }
}
