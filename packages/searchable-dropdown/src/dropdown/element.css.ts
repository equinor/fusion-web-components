import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';
import { styles as mdcStyle } from '@material/mwc-textfield/mwc-textfield.css';

export const fwcsdd = css`
  :host {
    position: relative;
    width: 100%;
    --textinput-dense-size: 32px;
  }
  .input {
    posistion: relative;
  }
  fwc-textinput {
    --fwc-text-field-base-color: ${unsafeCSS(theme.colors.text.static_icons__tertiary.getVariable('color'))};
    --fwc-text-field-fill-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
    --fwc-text-field-ink-color: ${unsafeCSS(theme.colors.text.static_icons__default.getVariable('color'))};
    --fwc-text-field-disabled-ink-color: ${unsafeCSS(theme.colors.text.static_icons__default.getVariable('color'))};
    width: 100%;
  }
  fwc-textinput[dense] {
    --mdc-text-field-outlined-idle-border-color: transparent;
  }
  fwc-textinput[dense] mwc-notched-outline {
    border-bottom-width: 20px;
  }
  .interactive {
    cursor: pointer;
  }
  [slot='trailing'] {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: var(--textinput-dense-size);
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
    font-size: 0.8em;
  }
  .list {
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
  .list-scroll {
    width: calc(100% + 16px);
    height: auto;
    overflow: hidden auto;
  }
  fwc-list {
    background-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
  }
  .variant-outlined fwc-list {
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

export const styles = [mdcStyle, fwcsdd];

export default styles;
