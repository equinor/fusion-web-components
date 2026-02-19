import { type CSSResult, html, LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ContextConsumer } from '@lit/context';

import { IconElement } from '@equinor/fusion-wc-icon';
import { PersonAvatarElement } from '@equinor/fusion-wc-person';

import type { PersonInfo } from '@equinor/fusion-wc-person';

import type { ListItemElementProps } from './types';
import { listItemStyle } from './element.css';
import { pickerContext } from '../../controllers/context';
import { NavigateController } from './NavigateController';

// register webcomponents
PersonAvatarElement;
IconElement;

export class ListItemElement extends LitElement implements ListItemElementProps {
  static styles: CSSResult[] = [listItemStyle];

  private _context = new ContextConsumer(this, { context: pickerContext, subscribe: true });

  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  protected controllers = {
    navigate: new NavigateController(this),
  };

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

  selectAction(): void {
    if (this._context.value?.selected?.selectedPeople.has(this.dataSource.azureId)) {
      this._context.value?.selected?.removePerson(this.dataSource.azureId);
    } else {
      this._context.value?.selected?.addPerson(this.dataSource);
    }
  }

  handleSelectClick(): void {
    this.selectAction();
  }

  handleSelectKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectAction();
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      this.controllers.navigate.navigateToAdjacentItem(direction);
      return;
    }
  }

  renderSubtitle(person: Partial<PersonInfo>): TemplateResult {
    const subtitle = this._context.value?.subtitle ?? '';

    // IsExpired is rendered in the secondary subtitle, but if expired we want to skip rendering the main subtitle as well
    if (!subtitle || person.isExpired) {
      return html``;
    }

    if (subtitle in person) {
      return html`<p>${person[subtitle]}</p>`;
    }

    console.warn(`The subtitle field '${subtitle}' is not a valid property of the person`);
    return html``;
  }

  renderSecondarySubtitle(person: Partial<PersonInfo>): TemplateResult {
    if (person.isExpired) {
      return html`<p id="expired">Account expired</p>`;
    }

    const secondarySubtitle = this._context.value?.secondarySubtitle ?? '';

    if (!secondarySubtitle) {
      return html``;
    }

    if (secondarySubtitle in person) {
      return html`<p>${person[secondarySubtitle]}</p>`;
    }

    console.warn(`The secondarySubtitle field '${secondarySubtitle}' is not a valid property of the person`);
    return html``;
  }

  render(): TemplateResult {
    const cssClasses = {
      selected: this._context.value?.selected?.selectedPeople.has(this.dataSource.azureId) ?? false,
    };
    return html`
      <div id="item"
        tabindex="0"
        class=${classMap(cssClasses)}
        @click=${this.handleSelectClick}
        @keydown=${this.handleSelectKeyDown}
      >
        <div id="item-avatar">
          <fwc-person-avatar .dataSource=${this.dataSource} size="small"></fwc-person-avatar>
        </div>
        <div id="item-name">
          <p>${this.dataSource.name || this.dataSource.applicationName || 'No name available'}</p>
          ${this.renderSubtitle(this.dataSource)}
          ${this.renderSecondarySubtitle(this.dataSource)}
        </div>
      </div>
    `;
  }
}

export default ListItemElement;
