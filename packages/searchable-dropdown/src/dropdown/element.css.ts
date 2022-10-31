import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';
import { styles as mdcStyle } from '@material/mwc-textfield/mwc-textfield.css';

export const style = css`
  :host {
    --fwc-list-item-secondary-font-size: 10px;
    --fwc-list-item-font-size: 12px;
  }
  .fwc-sdd-column {
    position: relative;
  }
  .fwc-sdd-input {
    display: flex;
    align-items: center;
  }
  .fwc-sdd-list {
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    left: 0;
    height: auto;
    border-radius: 4px;
    background-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);
  }
  .fwc-sdd-outlined .fwc-sdd-list {
    background-color: ${unsafeCSS(theme.colors.ui.background__default.getVariable('color'))};
  }
  .fwc-sdd-list-item-text,
  .fwc-sdd-list-item-subtext {
    display: block;
    height: 1.6em;
    overflow: hidden;
    font-size: 14px;
  }
  .fwc-sdd-list-item-subtext {
    font-style: italic;
    font-size: 12px;
  }
  .fwc-sdd-list-item-text-error {
    color: ${unsafeCSS(theme.colors.interactive.danger__resting.getVariable('color'))};
  }
  fwc-divider {
    display: flex;
    align-items: center;
    height: 1em;
  }
  .section-title {
    font-weight: 600;
    font-size: 16px;
    padding: 0 1em;
  }
`;

export const styles = [mdcStyle, style];

export default styles;
