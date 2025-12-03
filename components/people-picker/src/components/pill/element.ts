import { type CSSResult, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { ContextConsumer } from '@lit/context';

import type { PersonInfo } from "@equinor/fusion-wc-person";
import { PersonInfoTask } from "@equinor/fusion-wc-person";

import { pickerContext } from "../../controllers/context";

import type { PillElementProps } from "./types";
import { pillStyle } from "./element.css";
import { SelectController } from "../../controllers/SelectController";

// register the webcomponents
import { IconElement } from '@equinor/fusion-wc-icon';
import { PersonAvatarElement } from '@equinor/fusion-wc-person';
PersonAvatarElement;
IconElement;

export class PillElement extends LitElement implements PillElementProps {
  static styles: CSSResult[] = [pillStyle];

  controllers = {
    select: new SelectController(this),
  };

  tasks = {
    info: new PersonInfoTask(this),
  };

  private _context = new ContextConsumer(this, { context: pickerContext, subscribe: true });

  /**
   * The Azure ID of the person to resolve person info for
   */
  @property({ type: String })
  azureId?: string;

  /**
   * The unique email(upn) of the person to resolve person info for
   */
  @property({ type: String })
  upn?: string;

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
  dataSource?: PersonInfo;

  personSubtitle(person: Partial<PersonInfo>) {
    if (person.isExpired) {
      return html`<p id="subtitle-expired">Account expired</p>`;
    }

    const subTitle = this._context.value?.subTitle ?? '';

    if (!subTitle) {
      return html``;
    }

    if (subTitle in person) {
      return html`<p>${person[subTitle]}</p>`;
    }

    console.warn(`The subTitle field '${subTitle}' is not a valid property of the person`);
    return html``;
  }

  deleteButton(azureId: string) {
    return html`<button type="button" @click=${() => this.controllers.select.triggerRemoveEvent(azureId)}>
      <fwc-icon icon="close"></fwc-icon>
    </button>`;
  }

  render() {
    return this.tasks.info.render({
      complete: (person: Partial<PersonInfo>) => {
        return html`<div id="person-pill">
          <div id="person-pill-avatar">
            <fwc-person-avatar azureId=${person.azureId} size="small"></fwc-person-avatar>
          </div>
          <div id="person-pill-name">
            <p>${person.name}</p>
            ${this.personSubtitle(person)}
          </div>
          <div id="person-pill-delete">
            ${this.deleteButton(person.azureId ?? '')}
          </div>
        </div>`;
      },
      pending: () => html`<p>Resolving person info...</p>`,
      error: () => html`<p>Error resolving personInfo</p>`,
    });
  }
}

export default PillElement;
