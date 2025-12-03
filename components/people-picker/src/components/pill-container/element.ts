import { type CSSResult, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import { default as PillElement } from '../pill';
import { default as SearchElement } from '../search';

import type { PersonInfo } from "@equinor/fusion-wc-person";
import type { PillContainerElementProps } from "./types";
import { pillContainerStyle } from "./element.css";

// register the webcomponents
PillElement;
SearchElement;

export class PillContainerElement extends LitElement implements PillContainerElementProps {
  static styles: CSSResult[] = [pillContainerStyle];

  /**
   * The Azure ID of the person to resolve person info for
   */
  @property({
    type: Array,
    converter: (value: string | null) => value ? value.split(',').map((id) => id.trim()) : []
  })
  azureIds?: string[];

  /**
   * The unique email(upn) of the person to resolve person info for
   */
  @property({
    type: Array,
    converter: (value: string | null) => value ? value.split(',').map((upn) => upn.trim()) : []
  })
  upns?: string[];

  /**
   * The custom data source of the person to display in the pill
   */
  @property({
    type: Array,
    converter: (value: string | null) => value ? JSON.parse(value) : []
  })
  dataSources?: PersonInfo[];

  renderPills() {
    if (this.dataSources) {
      return this.dataSources.map(dataSource => html`
        <fwc-people-picker-pill
          .dataSource=${dataSource}
        </fwc-people-picker-pill>
      `);
    } else if (this.azureIds) {
      return this.azureIds.map(azureId => html`
        <fwc-people-picker-pill
          azureId=${azureId}
        </fwc-people-picker-pill>
      `);
    } else if (this.upns) {
      return this.upns.map(upn => html`
        <fwc-people-picker-pill
          upn=${upn}
        </fwc-people-picker-pill>
      `);
    }

    return html`<p>No persons provided</p>`;
  }

  render() {
    return html`
      <div id="pills">
        ${this.renderPills()}
        <fwc-people-picker-search
          placeholder="Search for a person"
        </fwc-people-picker-search>
      </div>
    `;
  }

}

export default PillContainerElement;
