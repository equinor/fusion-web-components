import { type CSSResult, html, LitElement, TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
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
        return value;
      }
    },
  })
  dataSource: PersonInfo = {} as PersonInfo;

  personSubtitle(person: Partial<PersonInfo>): TemplateResult {
    if (person.isExpired) {
      return html`<p id="subtitle-expired">Account expired</p>`;
    }

    const subTitle = this._context.value?.subTitle ?? 'department';

    if (!subTitle) {
      return html``;
    }

    if (subTitle in person) {
      return html`<p>${person[subTitle]}</p>`;
    }

    console.warn(`The subTitle field '${subTitle}' is not a valid property of the person`);
    return html``;
  }

  renderServicePrincipalType(person: Partial<PersonInfo>): TemplateResult {
    if (!person.servicePrincipalType) {
      return html``;
    }

    return html`<p>${person.servicePrincipalType}</p>`;
  }

  deleteButton(azureId: string) {
    return html`
      <button type="button" @click=${() => this._context.value?.selected?.removePerson(azureId)}>
        <fwc-icon icon="close"></fwc-icon>
      </button>
    `;
  }

  render() {
    return html`
      <div id="person-pill">
        <div id="person-pill-avatar">
          <fwc-person-avatar .dataSource=${this.dataSource} size="small" showLetter=${ifDefined(this.dataSource.applicationId)} customColor=${this.dataSource.avatarColor}></fwc-person-avatar>
        </div>
        <div id="person-pill-name">
          <p>${this.dataSource.name}</p>
          ${this.personSubtitle(this.dataSource)}
          ${this.renderServicePrincipalType(this.dataSource)}
        </div>
        <div id="person-pill-delete">
          ${this.deleteButton(this.dataSource.azureId)}
        </div>
      </div>
    `;
  }
}

export default PillElement;
