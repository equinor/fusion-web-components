import { css, unsafeCSS, type CSSResult }  from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';
import { styles as mdcStyle } from '@material/mwc-radio/mwc-radio.css';

const style: CSSResult = css`
  :host {
    --fwc-radio-size: 18px;
    --fwc-radio-spacing: calc(var(--fwc-radio-size) / 2);
    --fwc-radio-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --fwc-radio-circle-color: var(--fwc-radio-color);
    --fwc-radio-color-unchecked: var(--fwc-radio-color);
    --fwc-radio-color-disabled: ${unsafeCSS(theme.colors.interactive.disabled__fill.getVariable('color'))};
  }
  :host([reducedtouchtarget]) {
    --fwc-radio-size: 14px;
  }
`;

export const mdcStyleOverride = css`
  :host {
    --mdc-radio-ink-color: var(--fwc-radio-color);
    --mdc-radio-unchecked-color: var(--fwc-radio-color-unchecked);
    --mdc-radio-disabled-color: var(--fwc-radio-color-disabled);
  }
  .mdc-radio {
    flex: 0 0 var(--fwc-radio-size) !important;
    width: var(--fwc-radio-size) !important;
    height: var(--fwc-radio-size) !important;
    padding: var(--fwc-radio-spacing) !important;
    margin: 0 !important;
  }
  .mdc-radio .mdc-radio__background {
    width: var(--fwc-radio-size) !important;
    height: var(--fwc-radio-size) !important;
  }

  .mdc-radio .mdc-radio__background::before {
    top: calc(var(--fwc-radio-spacing) * -1) !important;
    left: calc(var(--fwc-radio-spacing) * -1) !important;
    width: calc(var(--fwc-radio-size) + var(--fwc-radio-spacing) * 2) !important;
    height: calc(var(--fwc-radio-size) + var(--fwc-radio-spacing) * 2) !important;
  }

  .mdc-radio .mdc-radio__native-control {
    width: calc(var(--fwc-radio-size) + var(--fwc-radio-spacing) * 2) !important;
    height: calc(var(--fwc-radio-size) + var(--fwc-radio-spacing) * 2) !important;
    top: 0 !important;
    left: 0 !important;
  }

  .mdc-radio__inner-circle {
    background: var(--fwc-radio-color);
    border: none !important;
  }

  .mdc-radio .mdc-radio__native-control:enabled:checked + .mdc-radio__background .mdc-radio__outer-circle {
    border-color: var(--fwc-radio-circle-color);
  }

  :host([disabled]) .mdc-radio__inner-circle {
    background: var(--mdc-radio-disabled-color);
  }
`;

export const styles = [mdcStyle, mdcStyleOverride, style];
export default styles;
