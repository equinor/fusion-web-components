import { html, LitElement, HTMLTemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { v4 as uuid } from 'uuid';

import { SearchableDropdownController } from '../provider';
import {
  SearchableDropdownProps,
  SearchableDropdownControllerHost,
  SearchableDropdownResult,
  SearchableDropdownResultItem,
} from '../types';

import { ListElement, ListItemElement } from '@equinor/fusion-wc-list';
import { TextInputElement } from '@equinor/fusion-wc-textinput';
import { DividerElement } from '@equinor/fusion-wc-divider';
import { IconElement } from '@equinor/fusion-wc-icon';
ListElement;
ListItemElement;
TextInputElement;
DividerElement;
IconElement;

import { styles as CSSstyles } from './element.css';

/**
 * Element for SearchableDropdown
 * @tag fwc-searchabledropdown
 *
 * @property {string} label Label for fwc-textinput element
 * @property {string} placeholder Placeholder text for fwc-textinput element
 * @property {string} value Inital preselected value for TextInput element
 * @property {filled: string} variant Set variant to filled|outlined on fwc-textinput and fwc-list elements. defaults to filled
 * @property {string} meta Icon to show after each fwc-list-item. If you want an icon only on one list-item then use the meta property on the SearchableDropdownResultItem
 * @property {string} multiple Able to select multiple items
 * @property {string} graphic Icon to show before each fwc-list-item. If you want an icon only on one list-item then use the meta property on the SearchableDropdownResultItem
 * @property {string} selected Display selected item's title
 * @property {string} initialText Text to display in dropdown before/without querystring in fwc-textinput
 * @property {string} trailingIcon Trailing Icon to display in fwc-text-input
 * @property {string} leadingIcon Leading Icon to display in fwc-text-input
 *
 * @fires action Fires when a selection has been made on the fwc-list element
 */
export class SearchableDropdownElement
  extends LitElement
  implements SearchableDropdownProps, SearchableDropdownControllerHost
{
  /* style object css */
  static styles = [CSSstyles];

  controller = new SearchableDropdownController(this);

  /* Label passed to the fwc-text-input component */
  @property()
  label = '';

  /* Placeholder passe to fwc-textinput */
  @property()
  placeholder = '';

  /* Textinput variant passed to the fwc-text-input component */
  @property()
  variant = 'filled';

  /* The icon string to render in result list items on the meta slot */
  @property()
  meta = '';

  @property()
  value = '';

  /* The icon string to render in result list items on the graphic slot */
  @property()
  graphic = '';

  /* The selected item(s) title property */
  @property()
  selected = '';

  /* The initial text in the dropdown before keyup event */
  @property()
  initialText = 'Start typing to search';

  /* The leading icon to display in fwc-textinput */
  @property()
  leadingIcon = 'search';

  /* The leading icon to display in fwc-textinput */
  @property()
  multiple = false;

  /* The trailing icon to display in fwc-textinput */
  trailingIcon = '';

  protected buildListItem(item: SearchableDropdownResultItem): HTMLTemplateResult {
    this.controller._listItems.push(item.id);
    const itemClasses = {
      'list-item': true,
      'item-selected': !!item.isSelected,
      'item-error': !!item.isError,
    };
    const renderItemText = () => {
      /* Geticonf for either meta or graphic slot */
      const getIconSlot = (type: 'meta' | 'graphic') => {
        if (this[type] || item[type]) {
          return html`<span class="slot-${type}" slot=${type}>
            <fwc-icon icon=${item[type] ? item[type] : this[type]} />
          </span>`;
        }
        return html``;
      };

      /* title and subtitle slots */
      const generateTextContent = () => {
        const text = [];
        if (item.title) {
          text.push(html`<span class="item-title">${item.title}</span>`);
        }
        if (item.subTitle) {
          text.push(html`<span slot="secondary" class="item-subtitle">${item.subTitle}</span></span>`);
        }
        return text;
      };

      return html`${getIconSlot('graphic')}
        <span class="item-text">${generateTextContent()}</span>
        ${getIconSlot('meta')}`;
    };

    const disabled = item.isDisabled || item.isError ? true : undefined;
    const selected = item.isSelected ? true : undefined;

    /* Sett checkmark on selected items */
    // item.meta = selected ? 'check' : '';
    return html`<fwc-list-item
      key=${item.id}
      class=${classMap(itemClasses)}
      disabled=${ifDefined(disabled)}
      selected=${ifDefined(selected)}
      twoline=${ifDefined(item.subTitle)}
    >
      ${renderItemText()}
    </fwc-list-item>`;
  }

  /**
   * Render the menu if state is open
   * @returns HTMLTemplateResult
   */
  protected renderList(): HTMLTemplateResult {
    if (!this.controller.isOpen) {
      return html``;
    }

    return html`<fwc-list @action=${this.controller.handleSelect} activatable=${true} multi=${this.multiple}>
      ${this.controller.task.render({
        complete: (result: SearchableDropdownResult) => {
          console.log('COMPONENT RENDERING TASK');
          /*
           * clear previous render items.
           * we need to save rendered items in state to be able to select them by index from action event
           */
          this.controller._listItems = [];

          /* Loop over task result */
          return result.map((item) => {
            if (item.type === 'section') {
              if (item.children?.length) {
                const kids = item.children.map((i) => this.buildListItem(i));
                return html`
                  <p key=${uuid()} class="section-title">${item.title}</p>
                  ${kids}
                  <fwc-divider key=${uuid()} variant="list" color="medium"></fwc-divider>
                `;
              }
            }

            /* Divider after the selected items stored in controller */
            if (item.type === 'divider') {
              return html`<fwc-divider key=${item.id} variant="list" color="medium"></fwc-divider>`;
            }

            return this.buildListItem(item);
          });
        },
        pending: () =>
          html`<fwc-list-item disabled=${true}><fwc-dots-progress size="small" color="primary" /></fwc-list-item>`,
        /* Error from resolvers searchQuery Promise */
        error: (e: unknown) =>
          html`<fwc-list-item disabled=${true} class="item-error">
            <span class="item-text"><span class="item-title">${e}</span></span>
          </fwc-list-item>`,
      })}
    </fwc-list>`;
  }

  protected trailingClick(): void {
    const input = this.renderRoot.querySelector('fwc-textinput') as TextInputElement;
    if (!this.controller.isOpen) {
      this.controller.isOpen = true;
      if (input) {
        input.focus();
      }
    } else {
      this.controller.isOpen = false;
    }
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
    return html`<div id="sdd">
      <div class=${classMap(cssClasses)}>
        <div class="fwc-sdd-input">
          <slot name="leading"></slot>
          <fwc-textinput
            icon=${this.leadingIcon}
            label=${ifDefined(this.label)}
            type="search"
            variant=${this.variant}
            value=${this.selected || this.value}
            name="searchabledropdown"
            placeholder=${this.placeholder}
            @focus=${() => (this.controller.isOpen = true)}
            @keyup=${this.controller.handleKeyup}
          ></fwc-textinput>
          <slot name="trailing"
            ><fwc-icon
              @click=${this.trailingClick}
              class=${classMap({ 'trailing-slot': true, 'no-hover': this.trailingIcon === '' })}
              icon=${this.trailingIcon}
            />
          </slot>
        </div>
        <div class="fwc-sdd-list">${this.renderList()}</div>
      </div>
    </div>`;
  }
}

export default SearchableDropdownElement;
