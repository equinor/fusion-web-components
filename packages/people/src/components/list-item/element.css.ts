import { css, unsafeCSS, type CSSResult } from 'lit';
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

    &:hover,
    &:focus {
      background: var(--eds-color-bg-accent-fill-muted-hover);
    }

    &:focus {
      outline: 2px inset var(--eds-color-border-focus);
    }

    &.selected {
      background: var(--eds-color-bg-info-fill-muted-default);

      &:hover,
      &:focus {
        background: var(--eds-color-bg-danger-fill-muted-default);
      }
    }
  }

  #item-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  #item-name p {
    margin: 0.1rem 0 0 0;
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
    color: var(--eds-color-text-danger-subtle);
  }
`;
