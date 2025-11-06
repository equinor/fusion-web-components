import { type CSSResult, html, LitElement, PropertyValues } from "lit";
import { property } from "lit/decorators/property.js";
import { query } from "lit/decorators/query.js";

import type { SearchElementProps } from "./types";

import { searchStyle } from "./element_inline.css";

export class ClearInputEvent extends CustomEvent<void> {
  static readonly eventName = 'clearinput';
  constructor(args?: CustomEventInit<void>) {
    super(ClearInputEvent.eventName, args);
  }
}

export class SearchElement extends LitElement implements SearchElementProps {
  static styles: CSSResult[] = [searchStyle];

  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: String, reflect: true })
  value = '';

  @property()
  placeholder = 'Start typing name';

  @query('input#people-search')
  inputElement!: HTMLInputElement;

  updated(changedProperties: PropertyValues): void {
    // Sync input element value when property changes
    if (changedProperties.has('value') && this.inputElement) {
      this.inputElement.value = this.value;
    }
  }

  handleFocus() {
    const searchLength = this.inputElement.value.length;
    this.inputElement.setSelectionRange(searchLength, searchLength);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focus', this.handleFocus);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('focus', this.handleFocus);
  }

  handleInput(event: InputEvent) {
    this.value = (event.target as HTMLInputElement).value;
  }

  /**
   * Clears the input field by setting the value property to an empty string
   */
  public clear(): void {
    this.value = '';
    if (this.inputElement) {
      this.inputElement.value = '';
      this.inputElement.focus();
    }
  }

  clearInput(): void {
    this.clear();
    this.dispatchEvent(new ClearInputEvent());
  }

  render() {
    return html`
      <div id="input">
        <input type="text" id="people-search" placeholder=${this.placeholder} @input=${this.handleInput} />
        <div id="clear-button-container">
          ${this.value ? html`<button id="clear-button" @click=${this.clearInput}><fwc-icon icon="close"></fwc-icon></button>` : html``}
        </div>
      </div>
    `;
  }
}

export default SearchElement;
