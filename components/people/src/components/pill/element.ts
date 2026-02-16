import { html, LitElement, type CSSResult, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { ContextConsumer } from '@lit/context';

import type { PersonInfo } from "@equinor/fusion-wc-person";

import { pickerContext } from "../../controllers/context";

import type { PillElementProps } from "./types";
import { pillStyle } from "./element.css";

// register the webcomponents
import { IconElement } from '@equinor/fusion-wc-icon';
import { PersonAvatarElement } from '@equinor/fusion-wc-person';
PersonAvatarElement;
IconElement;

export class PillElement extends LitElement implements PillElementProps {
  static styles: CSSResult[] = [pillStyle];

  private _context = new ContextConsumer(this, { context: pickerContext, subscribe: true });

  /**
   * The custom data source of the person to display in the pill
   */
  @property({
    type: Object,
    converter(value) {
      try {
        return JSON.parse(value ?? '{}');
      } catch {
        return {};
      }
    },
  })
  dataSource: PersonInfo = {} as PersonInfo;

  personSubtitle(person: Partial<PersonInfo>): TemplateResult | undefined {
    if (person.isExpired) {
      return html`<p id="subtitle-expired">Account expired</p>`;
    }

    const subtitle = this._context.value?.subtitle;

    if (!subtitle) {
      return;
    }

    if (subtitle in person) {
      return html`<p>${person[subtitle]}</p>`;
    }

    console.warn(`The subtitle field '${subtitle}' is not an available property of this person`);
    return;
  }

  deleteButton(azureId: string): TemplateResult {
    if (!this._context.value?.editable) {
      return html`<span>&nbsp;</span>`;
    }

    return html`
      <button type="button" @click=${() => this._context.value?.selected?.removePerson(azureId)}>
        <fwc-icon icon="close"></fwc-icon>
      </button>
    `;
  }

  render() {
    return html`
      <div id="people-pill">
        <div id="people-pill-avatar">
          <fwc-person-avatar .dataSource=${this.dataSource} size="small"></fwc-person-avatar>
        </div>
        <div id="people-pill-name">
          <p>${this.dataSource.name || this.dataSource.applicationName || 'No name available'}</p>
          ${this.personSubtitle(this.dataSource)}
        </div>
        <div id="people-pill-delete">
          ${this.deleteButton(this.dataSource.azureId)}
        </div>
      </div>
    `;
  }
}

export default PillElement;
