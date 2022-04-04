import { SelectBase } from '@material/mwc-select/mwc-select-base';
import { html, HTMLTemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styles } from '@material/mwc-select/mwc-select.css';

export class SearchableSelectElement extends SelectBase {
  static styles = styles;
  override render(): HTMLTemplateResult {
    const classes = {
      'mdc-select--disabled': this.disabled,
      'mdc-select--no-label': !this.label,
      'mdc-select--filled': !this.outlined,
      'mdc-select--outlined': this.outlined,
      'mdc-select--with-leading-icon': !!this.icon,
      'mdc-select--required': this.required,
      'mdc-select--invalid': !this.isUiValid,
    };
    const labelledby = this.label ? 'label' : undefined;
    const describedby = this.shouldRenderHelperText ? 'helper-text' : undefined;
    return html` <div class="mdc-select ${classMap(classes)}">
        <input
          class="formElement"
          name="${this.name}"
          .value="${this.value}"
          hidden
          ?disabled="${this.disabled}"
          ?required=${this.required}
        />
        <!-- @ts-ignore -->
        <div
          class="mdc-select__anchor"
          aria-autocomplete="none"
          role="combobox"
          aria-expanded=${this.menuOpen}
          aria-invalid=${!this.isUiValid}
          aria-haspopup="listbox"
          aria-labelledby=${ifDefined(labelledby)}
          aria-required=${this.required}
          aria-describedby=${ifDefined(describedby)}
          @click=${this.onClick}
          @focus=${this.onFocus}
          @blur=${this.onBlur}
          @keydown=${this.onKeydown}
        >
          ${this.renderRipple()} ${this.outlined ? this.renderOutline() : this.renderLabel()}
          ${this.renderLeadingIcon()}
          <span class="mdc-select__selected-text-container">
            <span class="mdc-select__selected-text">${this.selectedText}</span>
          </span>
          <span class="mdc-select__dropdown-icon">
            <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5" focusable="false">
              <polygon
                class="mdc-select__dropdown-icon-inactive"
                stroke="none"
                fill-rule="evenodd"
                points="7 10 12 15 17 10"
              ></polygon>
              <polygon
                class="mdc-select__dropdown-icon-active"
                stroke="none"
                fill-rule="evenodd"
                points="7 15 12 10 17 15"
              ></polygon>
            </svg>
          </span>
          ${this.renderLineRipple()}
        </div>
        ${this.renderMenu()}
      </div>
      ${this.renderHelperText()}`;
  }
  protected renderMenu(): HTMLTemplateResult {
    const menuClasses = {
      'mdc-select__menu--invalid': !this.isUiValid,
    };
    return html`<fwc-menu
      innerRole="listbox"
      wrapFocus
      class="mdc-select__menu mdc-menu mdc-menu-surface ${classMap(menuClasses)}"
      activatable
      .fullwidth=${this.fixedMenuPosition ? false : !this.naturalMenuWidth}
      .open=${this.menuOpen}
      .anchor=${this.anchorElement}
      .fixed=${this.fixedMenuPosition}
      @selected=${this.onSelected}
      @opened=${this.onOpened}
      @closed=${this.onClosed}
      @items-updated=${this.onItemsUpdated}
      @keydown=${this.handleTypeahead}
    >
      <slot></slot>
    </fwc-menu>`;
  }
}

export default SearchableSelectElement;
