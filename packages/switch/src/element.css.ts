import { css, type CSSResult } from 'lit';

const style: CSSResult = css`
  :host {
    --mdc-switch-selected-track-color: var(--eds-color-bg-accent-fill-muted-active);
    --mdc-switch-selected-focus-track-color: var(--eds-color-bg-accent-fill-muted-active);
    --mdc-switch-selected-pressed-track-color: var(--eds-color-bg-accent-fill-muted-active);
    --mdc-switch-selected-hover-track-color: var(--eds-color-bg-accent-fill-muted-active);
    --mdc-switch-selected-hover-handle-color: var(--eds-color-bg-accent-fill-emphasis-default);
    --mdc-switch-selected-focus-handle-color: var(--eds-color-bg-accent-fill-emphasis-default);
    --mdc-switch-selected-pressed-handle-color: var(--eds-color-bg-accent-fill-emphasis-default);
    --mdc-switch-unselected-hover-handle-color: var(--eds-color-bg-accent-fill-emphasis-default);
    --mdc-switch-unselected-focus-handle-color: var(--eds-color-bg-accent-fill-emphasis-default);
    --mdc-switch-unselected-pressed-handle-color: var(--eds-color-bg-accent-fill-emphasis-default);
  }
`;

export default style;
