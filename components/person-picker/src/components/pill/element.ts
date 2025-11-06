import { type CSSResult, html, LitElement } from "lit";
import { property } from "lit/decorators.js";


import type { PersonInfo } from "@equinor/fusion-wc-person";
import { PersonInfoTask } from "@equinor/fusion-wc-person";
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

  /**
   * The property from PersonInfo to display as subtitle in the pill
   * Default is department
   */
  @property({ type: String })
  subTitle: keyof PersonInfo = 'department';

  personSubtitle(person: Partial<PersonInfo>) {
    if (!this.subTitle) {
      return html``;
    }

    if (person.isExpired) {
      return html`<p id="subtitle-expired">Account expired</p>`;
    }

    if (this.subTitle in person) {
      return html`<p>${person[this.subTitle]}</p>`;
    } else if (person.department) {
      return html`<p>${person.department}</p>`;
    }

    return html``;
  }

  deleteButton(azureId: string) {
    return html`<button type="button" @click=${() => this.controllers.select.triggerRemoveEvent(azureId)}>
      <fwc-icon icon="close"></fwc-icon>
    </button>`;
  }

  render() {
    return html`<div id="root">${this.tasks.info.render({
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
    })}</div>`;
  }
}

export default PillElement;
