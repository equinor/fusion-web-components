import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const pillStyle: CSSResult = css`
  :host {
    display: inline-block;
  }

  #people-pill {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 0.5rem;
    height: 30px;
    border-radius: calc(var(--fwc-avatar-size, 3.5rem) * 0.5);
    background-color: var(--eds-color-bg-neutral-canvas);
    border: 1px solid transparent;

    &:hover,
    &:focus-within {
      border-color: var(--eds-color-border-disabled);
    }
  }

  #people-pill-avatar {
    position: relative;
    top: 1.7px;
  }

  #people-pill-name {
    max-width: 140px;
  }

  #people-pill-name p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
    font-size: 0.75rem;

    &:first-child {
      font-weight: ${unsafeCSS(theme.typography.paragraph.body_short_bold.getVariable('fontWeight'))};
    }
  }

  #subtitle-expired {
    color: var(--eds-color-text-danger-subtle);
  }

  #people-pill-delete button {
    --fusion-close-btn-padding: calc(${unsafeCSS(theme.typography.paragraph.body_short.getVariable('fontSize'))} * 0.4);
    background: none;
    outline: none;
    padding: var(--fusion-close-btn-padding);
    margin: var(--fusion-close-btn-margin);
    color: var(--eds-color-text-neutral-subtle);
    border: none;
    border-radius: 100%;
    line-height: 0;
    font-size: 0.75rem;

    &:hover,
    &:focus {
      background: var(--eds-color-bg-accent-fill-muted-hover);
    }

    &:active {
      background: var(--eds-color-bg-accent-fill-muted-active);
    }
  }
`;
