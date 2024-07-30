import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

const style: CSSResult = css`
  :host([size='small']) {
    --fwc-avatar-size: 2rem;
    --text-resize: 0.9;
  }
  :host {
    --fwc-avatar-size: 2.5rem;
    --fwc-person-table-cell-background: initial;
    --text-resize: 1;
  }
  :host([size='large']) {
    --fwc-avatar-size: 3rem;
    --text-resize: 1.1;
  }
  .person-cell__item {
    display: flex;
    justify-content: space-between;
    column-gap: ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))};
    background-color: var(--fwc-person-table-cell-background);
    border-radius: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
    transition: box-shadow 0.2s ease;
    -webkit-transition: box-shadow 0.2s ease;
  }
  .person-cell__about {
    display: flex;
    column-gap: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
  }
  .person-cell__about--error fwc-skeleton {
    --fwc-skeleton-fill-color: ${unsafeCSS(theme.colors.ui.background__danger.getVariable("color"))};
  }
  .person-cell__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 4px;
  }
  .person-cell__content-gap {
    row-gap: ${unsafeCSS(theme.spacing.comfortable.x_small.getVariable('padding'))};
  }
  .person-cell__heading {
    font-size: calc(${unsafeCSS(theme.typography.heading.h6.getVariable('fontSize'))} * var(--text-resize, 1));
    line-height: calc(${unsafeCSS(theme.typography.heading.h6.getVariable('lineHeight'))} * var(--text-resize, 1));
  }
  .person-cell__sub-heading {
    font-size: calc(
      ${unsafeCSS(theme.typography.paragraph.caption.getVariable('fontSize'))} * var(--text-resize, 1)
    );
    line-height: calc(${unsafeCSS(theme.typography.paragraph.caption.getVariable('lineHeight'))} * var(--text-resize, 1));
  }
`;

export default style;
