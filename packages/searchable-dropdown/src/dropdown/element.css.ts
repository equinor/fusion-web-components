import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';
/**
 * @todo
 * @eikeland
 * Why this import, shouldn`t this come from @equinor/fusion-wc-textfield?
 */
import { styles as mdcStyle } from '@material/mwc-textfield/mwc-textfield.css';

export const fwcsdd: CSSResult = css`
  :host {
    position: relative;
    width: 100%;
    --textinput-dense-size: 32px;
    --fwc-list-item-vertical-padding: 0.5rem;
    --fwc-text-field-base-color: ${unsafeCSS(theme.colors.text.static_icons__tertiary.getVariable('color'))};
    --fwc-text-field-fill-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
    --fwc-text-field-ink-color: ${unsafeCSS(theme.colors.text.static_icons__default.getVariable('color'))};
    --fwc-text-field-disabled-ink-color: ${unsafeCSS(theme.colors.text.static_icons__default.getVariable('color'))};
  }
  .input {
    posistion: relative;
  }
  fwc-textinput {
    width: 100%;
  }
  fwc-textinput[disabled] {
    opacity: 0.5;
  }
  fwc-textinput[dense] {
    --mdc-text-field-outlined-idle-border-color: transparent;
    --mdc-shape-small: 0;
    --mdc-text-field-outlined-hover-border-color: ${unsafeCSS(
      theme.colors.interactive.primary__resting.getVariable('color'),
    )};
  }
  .interactive {
    cursor: pointer;
  }
  [slot='trailing'] {
    display: block;
    position: absolute;
    top: 2px;
    right: 2px;
    bottom: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--textinput-dense-size);
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
    box-shadow:
      0px 1px 5px rgba(0, 0, 0, 0.2),
      0px 3px 4px rgba(0, 0, 0, 0.12),
      0px 2px 4px rgba(0, 0, 0, 0.14);
    border-radius: 4px;
  }
  .list-scroll {
    width: 100%;
    height: auto;
    overflow: hidden auto;
    scrollbar-width: thin;
    scrollbar-color: ${unsafeCSS(theme.colors.ui.background__medium.getVariable('color'))} transparent;
  }
  fwc-list {
    background-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
  }
  .variant-outlined fwc-list {
    background-color: ${unsafeCSS(theme.colors.ui.background__default.getVariable('color'))};
  }
  fwc-list-item {
    --fwc-list-item-vertical-padding: 0.5rem;
  }

  fwc-list-item[twoline] [slot="graphic"] svg {
    font-size: 1.5rem;
  }

  .item-text {
    display: flex;
    flex-direction: column;
    font-size: 1em;
  }
  .item-title {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 1em;
    line-height: 1.6;
  }
  .item-subtitle {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 0.8em;
    font-style: italic;
    line-height: 1.6;
  }
  [slot='graphic'] {
    display: flex;
  }
  [slot='graphic'] svg {
    height: 1em;
    width: auto;
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
    --fwc-item-interactive-color: ${unsafeCSS(theme.colors.interactive.danger__highlight.getVariable('color'))};
  }
`;

export const sddStyles: CSSResult[] = [mdcStyle, fwcsdd];

export default sddStyles;
