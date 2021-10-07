import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';
import { styles as mdcStyle } from '@material/mwc-textfield/mwc-textfield.css';

export const attributes = css`
  :host {
    --fwc-text-field-base-color: ${unsafeCSS(theme.colors.text.static_icons__tertiary.getVariable('color'))};
    --fwc-text-field-fill-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
    --fwc-text-field-ink-color: ${unsafeCSS(theme.colors.text.static_icons__default.getVariable('color'))};
    --fwc-text-field-disabled-ink-color: ${unsafeCSS(theme.colors.text.static_icons__default.getVariable('color'))};
  }
`;

export const mdcOverride = css`
  :host {
    --mdc-text-field-idle-line-color: var(--fwc-text-field-base-color);
    --mdc-text-field-hover-line-color: var(--fwc-text-field-base-color);
    --mdc-text-field-disabled-line-color: transparent;
    --mdc-text-field-outlined-idle-border-color: var(--fwc-text-field-base-color);
    --mdc-text-field-outlined-hover-border-color: var(--fwc-text-field-base-color);
    --mdc-text-field-outlined-disabled-border-color: var(--fwc-text-field-base-color);
    --mdc-text-field-fill-color: var(--fwc-text-field-fill-color);
    --mdc-text-field-disabled-fill-color: var(--fwc-text-field-fill-color);
    --mdc-text-field-ink-color: var(--fwc-text-field-ink-color);
    --mdc-text-field-label-ink-color: var(--fwc-text-field-base-color);
    --mdc-text-field-disabled-ink-color: var(--fwc-text-field-disabled-ink-color);
  }
`;

export const dense = css`
  :host([dense]) {
    --textinput-dense-size: 32px;
  }

  :host([dense]) .mdc-text-field__icon {
    font-size: calc(var(--textinput-dense-size) / 2.5);
    padding: 0;
  }

  :host([dense]) .mdc-text-field__input {
    height: calc(var(--textinput-dense-size) * 1.1);
    font-size: calc(var(--textinput-dense-size) / 2);
  }

  :host([dense]) .mdc-text-field__icon--leading {
    margin: 0;
    padding-right: 4px;
  }

  :host([dense]) .mdc-text-field--outlined,
  :host([dense]) .mdc-text-field--filled {
    height: var(--textinput-dense-size);
    padding: 0 calc(var(--textinput-dense-size) / 4);
  }

  :host([dense]) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label {
    left: calc(var(--textinput-dense-size) / 2);
  }
  :host([dense]) .mdc-text-field--outlined .mdc-floating-label--float-above {
    transform: translateY(calc(var(--textinput-dense-size) * -0.75)) scale(1);
  }
  :host([dense]) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above {
    transform: translateY(calc(var(--textinput-dense-size) * -0.75))
      translateX(calc(var(--textinput-dense-size) * -0.4)) scale(1);
  }

  :host([dense]) .mdc-text-field--filled .mdc-floating-label {
    left: 8px;
  }
  :host([dense]) .mdc-text-field--filled.mdc-text-field--with-leading-icon .mdc-floating-label {
    left: var(--textinput-dense-size);
  }
  :host([dense]) .mdc-text-field--filled:before {
    height: calc(var(--textinput-dense-size) / 2);
  }
  :host([dense]) .mdc-text-field--filled .mdc-floating-label--float-above {
    transform: translateY(calc(var(--textinput-dense-size) * -0.55)) scale(0.75);
  }
`;

const search = css`
  input[type='search']::-webkit-search-cancel-button {
    -webkit-appearance: none;
    height: 1em;
    width: 1em;
    margin-left: 0.25em;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23777'><path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/></svg>");
    cursor: pointer;
  }
`;

export const styles = [mdcStyle, mdcOverride, attributes, dense, search];

export default styles;
