import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';
import { styles as mdcStyle } from '@material/mwc-textfield/mwc-textfield.css';

export const style = css`
  :host {
    width: 100%;
  }
  fwc-searchable-dropdown {
    width: 100%;
  }
  fwc-textinput {
    width: 100%;
    background-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
  }
  .fwc-sdd-column {
    position: relative;
  }
  .fwc-sdd-input {
    display: flex;
    align-items: center;
    posistion: relative;
  }
  .no-hover {
    pointer-events: none;
  }
  .trailing-slot {
    position: absolute;
    right: 5px;
    top: 0;
    height: calc(100% - 16px);
    cursor: pointer;
    margin: 8px 0;
    padding: 0 8px;
    color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
  }
  .trailing-slot:hover {
    background: ${unsafeCSS(theme.colors.interactive.primary__hover_alt.getVariable('color'))};
    border-radius: 50%;
  }
  .fwc-sdd-list {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    height: auto;
    overflow: hidden;
    z-index: 99;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);
    border-radius: 4px;
  }
  .fwc-sdd-list-scroll {
    width: calc(100% + 16px);
    height: auto;
    max-height: 220px;
    overflow: hidden;
    overflow-y: auto;
  }
  fwc-list {
    background-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
  }
  .variant-header fwc-list {
    background-color: ${unsafeCSS(theme.colors.ui.background__default.getVariable('color'))};
  }
  .item-text {
    display: flex;
    flex-direction: column;
    font-size: 1em;
  }
  .item-title {
    height: 1.4em;
    font-size: 1em;
    line-height: 1.6;
  }
  .item-subtitle {
    font-size: 0.8em;
    font-style: italic;
    line-height: 1.6;
  }
  [slot='graphic'] {
    display: flex;
    font-size: 0.8em;
    padding-right: 6px;
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
    margin: 1em 0 0;
  }
  .item-error {
    background-color: ${unsafeCSS(theme.colors.interactive.danger__highlight.getVariable('color'))};
  }
`;

export const styles = [mdcStyle, style];

export default styles;
