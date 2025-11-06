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

  /**
   * The property from PersonInfo to display as subtitle in the pill
   * Default is department
   */
  @property({ type: String })
  subTitle: keyof PersonInfo = 'department';

  renderPills() {
    if (this.dataSources) {
      return this.dataSources.map(dataSource => html`
        <fwc-person-picker-pill
          .dataSource=${dataSource}
          subTitle=${this.subTitle}
        </fwc-person-picker-pill>
      `);
    } else if (this.azureIds) {
      return this.azureIds.map(azureId => html`
        <fwc-person-picker-pill
          azureId=${azureId}
          subTitle=${this.subTitle}
        </fwc-person-picker-pill>
      `);
    } else if (this.upns) {
      return this.upns.map(upn => html`
        <fwc-person-picker-pill
          upn=${upn}
          subTitle=${this.subTitle}
        </fwc-person-picker-pill>
      `);
    }

    return html`<p>No persons provided</p>`;
  }

  render() {
    return html`<div id="root">
      <div id="pills">
        ${this.renderPills()}
        <fwc-person-picker-search
          placeholder="Search for a person"
        </fwc-person-picker-search>
      </div>
    </div>`;
  }

}

export default PillContainerElement;
