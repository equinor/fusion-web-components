import { css, type CSSResult } from 'lit';
import { styles as mdcStyle } from '@material/mwc-checkbox/mwc-checkbox.css';

const style: CSSResult = css`
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
    --mdc-checkbox-ink-color: var(--eds-color-text-accent-strong-on-emphasis);
    --mdc-checkbox-unchecked-color: var(--eds-color-border-accent-strong);
    --mdc-checkbox-disabled-color: var(--eds-color-text-disabled);
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
