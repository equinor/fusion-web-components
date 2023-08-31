import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    --mdc-switch-selected-track-color: ${unsafeCSS(
      theme.colors.interactive.primary__selected_highlight.getVariable('color'),
    )};
    --mdc-switch-selected-focus-track-color: ${unsafeCSS(
      theme.colors.interactive.primary__selected_highlight.getVariable('color'),
    )};
    --mdc-switch-selected-pressed-track-color: ${unsafeCSS(
      theme.colors.interactive.primary__selected_highlight.getVariable('color'),
    )};
    --mdc-switch-selected-hover-track-color: ${unsafeCSS(
      theme.colors.interactive.primary__selected_highlight.getVariable('color'),
    )};
    --mdc-switch-selected-hover-handle-color: ${unsafeCSS(
      theme.colors.interactive.primary__resting.getVariable('color'),
    )};
    --mdc-switch-selected-focus-handle-color: ${unsafeCSS(
      theme.colors.interactive.primary__resting.getVariable('color'),
    )};
    --mdc-switch-selected-pressed-handle-color: ${unsafeCSS(
      theme.colors.interactive.primary__resting.getVariable('color'),
    )};
    --mdc-switch-unselected-hover-handle-color: ${unsafeCSS(
      theme.colors.interactive.primary__resting.getVariable('color'),
    )};
    --mdc-switch-unselected-focus-handle-color: ${unsafeCSS(
      theme.colors.interactive.primary__resting.getVariable('color'),
    )};
    --mdc-switch-unselected-pressed-handle-color: ${unsafeCSS(
      theme.colors.interactive.primary__resting.getVariable('color'),
    )};
  }
`;

export default style;
