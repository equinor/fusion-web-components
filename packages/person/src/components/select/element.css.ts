import { css, type CSSResult } from 'lit';
import { styles as textInputStyles } from '@equinor/fusion-wc-textinput';

const fwcsdd: CSSResult = css`
  :host {
    position: relative;
    width: 100%;
    --fwc-list-item-vertical-padding: 0.5rem;
    --fwc-text-field-base-color: var(--eds-color-text-neutral-subtle);
    --fwc-text-field-fill-color: var(--eds-color-bg-input);
    --fwc-text-field-ink-color: var(--eds-color-text-neutral-strong);
    --fwc-text-field-disabled-ink-color: var(--eds-color-text-neutral-strong);
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
    --textinput-dense-size: 36px;
    --mdc-text-field-outlined-idle-border-color: transparent;
    --mdc-shape-small: 0;
    --mdc-text-field-outlined-hover-border-color: var(--eds-color-border-accent-strong);
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
    color: var(--eds-color-text-accent-subtle);
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
    box-shadow: var(--eds-elevation-low);
    border-radius: 4px;
  }
  .list-scroll {
    width: 100%;
    height: auto;
    overflow: hidden auto;
    scrollbar-width: thin;
    scrollbar-color: var(--eds-color-bg-neutral-fill-muted-default) transparent;
  }
  fwc-list {
    background-color: var(--eds-color-bg-neutral-canvas);
  }
  .variant-outlined fwc-list {
    background-color: var(--eds-color-bg-neutral-surface);
  }
  fwc-list-item {
    --fwc-list-item-vertical-padding: 0.5rem;
  }
  fwc-list-item[disabled] {
    background-color: var(--eds-color-bg-neutral-canvas);
  }
  fwc-list-item[disabled] [slot='graphic'],
  fwc-list-item[disabled] [slot='meta'],
  fwc-list-item[disabled] .item-text {
    opacity: 0.6;
  }
  fwc-list-item[twoline] [slot='graphic'] svg {
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
    --fwc-list-item-ink-color: var(--eds-color-text-danger-subtle);
    color: var(--eds-color-text-danger-subtle);
  }
`;

// TODO - maybe this styling should be changed in parent!
export const styles: CSSResult[] = textInputStyles.concat(
  fwcsdd,
  css`
    fwc-list {
      --fwc-list-side-padding: 0.5rem;
    }
    fwc-list-item {
      --fwc-list-item-vertical-padding: 0;
    }
    fwc-person-list-item {
      --fwc-person-list-item-background: var(--eds-color-bg-floating);
    }
    .selected-persons fwc-textinput {
      opacity: 0;
    }
    #selected-persons {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: row;
      flex-gap: 0;
      position: absolute;
      top: 1px;
      left: 0;
      width: 100%;
    }
    #selected-persons li {
      flex: 1 0 auto;
    }
  `,
);
