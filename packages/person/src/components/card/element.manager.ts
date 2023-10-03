import { type CSSResult, type HTMLTemplateResult, LitElement, html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import { PersonDetails } from 'person/src/types';
import { fusionElement } from '@equinor/fusion-wc-core';

import { styles as theme } from '@equinor/fusion-web-theme';

@fusionElement('fwc-person-card-manager')
export class PersonCardManagerElement extends LitElement {
  static styles: CSSResult[] = [
    css`
      .root {
        display: flex;
        flex-flow: row;
        gap: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
        align-items: center;
      }
      .name {
        display: -webkit-box;
        font-weight: ${unsafeCSS(theme.typography.paragraph.body_short_bold.getVariable('fontWeight'))};
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .department {
        font-size: calc(
          ${unsafeCSS(theme.typography.paragraph.caption.getVariable('fontSize'))} * var(--content-resize, 1)
        );
      }
    `,
  ];

  /** Azure unique id */
  @property({ type: String })
  public azureId?: string;

  @property({ type: String })
  public dataSource?: PersonDetails['manager'];

  render(): HTMLTemplateResult {
    const { name, department, azureUniqueId } = this.dataSource ?? {};
    const { azureId = azureUniqueId } = this;
    // TODO make avatar have pending state!
    return html`<div class="root">
      <fwc-person-avatar azureId=${azureId} trigger="none"></fwc-person-avatar>
      <section>
        ${name && html`<header title="${name}" class="name">${name}</header>`}
        ${department && html`<span class="department">${department}</span>`}
      </section>
    </div>`;
  }
}
