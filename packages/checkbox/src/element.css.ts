import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';
import { styles as mdcStyle } from '@material/mwc-checkbox/mwc-checkbox.css';

export const style = css`
  :host {
    --fwc-checkbox-size: 18px;
    --fwc-checkbox-spacing: calc(var(--fwc-checkbox-size) / 2);
  }
  :host([reducedtouchtarget]) {
    --fwc-checkbox-size: 14px;
  }
`;

export const mdcStyleOverride = css`
  :host {
    --mdc-checkbox-ink-color: ${unsafeCSS(theme.colors.text.static_icons__primary_white.getVariable('color'))};
    --mdc-checkbox-unchecked-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    --mdc-checkbox-disabled-color: ${unsafeCSS(theme.colors.interactive.disabled__fill.getVariable('color'))};
  }
  .mdc-checkbox {
    flex: 0 0 var(--fwc-checkbox-size) !important;
    width: var(--fwc-checkbox-size) !important;
    height: var(--fwc-checkbox-size) !important;
    padding: var(--fwc-checkbox-spacing) !important;
    margin: 0 !important;
  }
  .mdc-checkbox__background {
    width: var(--fwc-checkbox-size) !important;
    height: var(--fwc-checkbox-size) !important;
  }
  .mdc-checkbox .mdc-checkbox__background {
    top: var(--fwc-checkbox-spacing) !important;
    left: var(--fwc-checkbox-spacing) !important;
  }
  .mdc-checkbox .mdc-checkbox__native-control {
    width: calc(var(--fwc-checkbox-size) + var(--fwc-checkbox-spacing) * 2) !important;
    height: calc(var(--fwc-checkbox-size) + var(--fwc-checkbox-spacing) * 2) !important;
    top: 0 !important;
    left: 0 !important;
  }
`;

export const styles = [mdcStyle, mdcStyleOverride, style];
export default styles;
