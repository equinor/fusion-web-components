import { html, LitElement, HTMLTemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { Task } from '@lit-labs/task';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { SearchableDropdownController } from '../provider';
import {
  SearchableDropdownProps,
  SearchableDropdownControllerHost,
  SearchableDropdownResult,
  SearchableDropdownResultItem,
} from '../types';
import { styles as CSSstyles } from './element.css';

/**
 * Element for SearchableDropdown
 * @tag fwc-searchabledropdown
 * @property {string} label Label for the fwc-textinput
 * @property {string} placeholder Palceholder text for the fwc-textinput
 * @property {string} variant Set variant, filled|outlined, on fwc-textinput and dropdown. defaults to filled.
 * @property {string} meta Icon name to show after each list-item textContent
 * @property {string} selected The selected items title property.
 * @fires action Fires when a selection has been made via click or keyboard action.
 */
export class SearchableDropdownElement
  extends LitElement
  implements SearchableDropdownProps, SearchableDropdownControllerHost
{
  // style object css
  static styles = [CSSstyles];

  controller = new SearchableDropdownController(this);

  /** Label passed to the fwc-text-input component */
  @property()
  label = '';

  /** Placeholder passe to fwc-textinput */
  @property()
  placeholder = '';

  /** Textinput variant passed to the fwc-text-input component */
  @property()
  variant = 'filled';

  /* The icon string to render in result list items on the meta slot */
  @property()
  meta = '';

  // The selected items title property
  @property()
  selected = '';

  /** Tasks to bind from controller */
  pendingQuery?: Task<[string], SearchableDropdownResult>;

  /**
   * Render the menu if state is open
   * @returns HTMLTemplateResult
   */
  protected renderList(): HTMLTemplateResult {
    if (!this.controller.isOpen) {
      return html``;
    }

    const renderItemText = (item: SearchableDropdownResultItem) => {
      const itemClasses = {
        'fwc-sdd-list-item-text': true,
        'fwc-sdd-list-item-text-error': item.isError !== undefined,
      };
      // show meta icon for list item, either for all items or for single item.
      const metaSlot = () => {
        if (!item.isDisabled) {
          if (this.meta || item.meta) {
            return html`<fwc-icon icon=${item.meta ? item.meta : this.meta} slot="meta" />`;
          }
        }
        return html``;
      };
      if (item.subTitle) {
        return html`<span class=${classMap(itemClasses)}>${item.title}</span>
          <span slot="secondary" class="fwc-sdd-list-item-subtext">${item.subTitle}</span>
          ${metaSlot()}`;
      }
      return html`<span class=${classMap(itemClasses)}>${item.title}</span>${metaSlot()}`;
    };
    return html`<fwc-list @action=${this.controller.handleAction} activatable=${true}>
      ${this.pendingQuery?.render({
        // any result from resolvers serachQuery
        complete: (result) =>
          result?.map(
            (item) =>
              html`<fwc-list-item
                key=${item.id}
                disabled=${ifDefined(item.isDisabled)}
                selected=${ifDefined(item.isSelected)}
                twoline=${ifDefined(item.subTitle)}
              >
                ${renderItemText(item)}
              </fwc-list-item>`
          ),
        // Inital state
        initial: () =>
          html`<fwc-list-item disabled=${true}>
            <span class="fwc-sdd-list-item-text">Input a search term...</span>
          </fwc-list-item>`,
        // Loader item
        pending: () => html`<fwc-list-item><fwc-dots-progress size="small" color="primary" /></fwc-list-item>`,
        // Error from resolvers searchQuery Promise
        error: (e: unknown) =>
          html`<fwc-list-item disabled=${true}>
            <span class="fwc-sdd-list-item-text fwc-sdd-list-item-error">${e}</span>
          </fwc-list-item>`,
      })}
    </fwc-list>`;
  }
  /**
   * The main render function
   * @returns HTMLTemplateResult
   */
  protected render(): HTMLTemplateResult {
    const cssClasses = {
      'fwc-sdd-column': true,
      'fwc-sdd-outlined': this.variant === 'outlined',
    };
    return html`<div>
      <div class=${classMap(cssClasses)}>
        <div class="fwc-sdd-input">
          <slot name="leading"></slot>
          <fwc-textinput
            label=${this.label}
            type="search"
            variant=${this.variant}
            value=${this.selected}
            name="searchabledropdown"
            iconTrailing="chevron_down"
            placeholder=${this.placeholder}
            @focus=${() => (this.controller.isOpen = true)}
            @keyup=${this.controller.handleKeyup}
          ></fwc-textinput>
          <slot name="trailing"></slot>
        </div>
        <div class="fwc-sdd-list">${this.renderList()}</div>
      </div>
    </div>`;
  }
}

export default SearchableDropdownElement;
