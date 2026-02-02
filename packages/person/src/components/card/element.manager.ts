import { type CSSResult, type HTMLTemplateResult, LitElement, html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import { PersonDetails } from '../../types';
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
      section {
        display: flex;
        flex-flow: column;
      }
      .name {
        font-weight: ${unsafeCSS(theme.typography.paragraph.body_short_bold.getVariable('fontWeight'))};
        font-size: ${unsafeCSS(theme.typography.input.helper.getVariable("fontSize"))};
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .department {
        font-size: ${unsafeCSS(theme.typography.input.helper.getVariable("fontSize"))};
      }
    `,
  ];

  @property({ type: Object })
  public dataSource?: PersonDetails['manager'];

  render(): HTMLTemplateResult {
    const { name, department, azureUniqueId } = this.dataSource ?? {};
    return html`<div class="root">
      <fwc-person-avatar azureid=${azureUniqueId} trigger="none" size="small"></fwc-person-avatar>
      <section>
        ${name && html`<header title="${name}" class="name">${name}</header>`}
        ${department && html`<span class="department">${department}</span>`}
      </section>
    </div>`;
  }
}
