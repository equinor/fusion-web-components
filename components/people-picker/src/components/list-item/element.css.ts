import { css, unsafeCSS, type CSSResult } from "lit";
import { styles as theme } from '@equinor/fusion-web-theme';

export const listItemStyle: CSSResult = css`
  :host {
    display: block;
  }

  #item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 1rem;
    margin: 0;
    padding: 0.5rem;

    &:hover, &:focus {
      background: ${unsafeCSS(theme.colors.interactive.primary__selected_highlight.getVariable('color'))};
      outline: none;
    }

    &.selected {
      background: ${unsafeCSS(theme.colors.interactive.primary__selected_highlight.getVariable('color'))};

      &:hover, &:focus {
        background: ${unsafeCSS(theme.colors.interactive.danger__highlight.getVariable('color'))};
      }
    }
  }

  #item-name p {
    margin: .1rem 0 0 0;
    font-size: 0.8rem;

    &:first-child {
      font-size: 0.875rem;
      margin-top: 0;
      font-weight: ${unsafeCSS(theme.typography.paragraph.body_short_bold.getVariable('fontWeight'))};
    }
    &:last-child {
      font-size: 0.625rem;
    }
  }

  #expired {
    color: ${unsafeCSS(theme.colors.interactive.danger__text.getVariable('color'))};
  }
`;
