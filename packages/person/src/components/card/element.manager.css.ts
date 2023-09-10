import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

// TODO add shared for all content items

export const style = css`
  .root {
    display: flex;
    flex-flow: column;
    row-gap: var(--small-size-space);
  }
  .title {
    font-size: calc(${unsafeCSS(theme.typography.input.label.getVariable('fontSize'))} * var(--content-resize, 1));
    font-weight: ${unsafeCSS(theme.typography.input.label.getVariable('fontWeight'))};
  }
  .content {
    display: flex;
    align-items: center;
    column-gap: var(--small-size-space);
  }
  :host([size='small']) fwc-avatar {
    width: 2rem;
    height: 2rem;
  }
  :host([size='medium']) fwc-avatar {
    width: 2.5rem;
    height: 2.5rem;
  }
  :host([size='large']) fwc-avatar {
    width: 3.5rem;
    height: 3.5rem;
  }
  .name {
    display: -webkit-box;
    font-weight: ${unsafeCSS(theme.typography.paragraph.body_short_bold.getVariable('fontWeight'))};
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .department {
    font-size: calc(
      ${unsafeCSS(theme.typography.paragraph.caption.getVariable('fontSize'))} * var(--content-resize, 1)
    );
  }
`;
