import { css, unsafeCSS, type CSSResult } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

const style: CSSResult = css`
  :host {
    --fwc-avatar-size: 2.5rem;
    --fwc-person-list-item-background: initial;
  }
  :host([size='small']) {
    --fwc-avatar-size: 2rem;
  }
  :host([size='large']) {
    --fwc-avatar-size: 3.5rem;
  }
  .person-list__avatar {
    display: flex;
  }
  .person-list__item {
    display: flex;
    justify-content: space-between;
    column-gap: ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))};
    background-color: var(--fwc-person-list-item-background);
    border: 1px solid;
    border-color: ${unsafeCSS(theme.colors.ui.background__medium.getVariable('color'))};
    padding: calc(
        ${unsafeCSS(theme.spacing.comfortable.medium_small.getVariable('padding'))} * var(--content-resize, 1)
      )
      calc(${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))} * var(--content-resize, 1));
    border-radius: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
    transition: box-shadow 0.2s ease;
    -webkit-transition: box-shadow 0.2s ease;
  }
  .person-list__item.person-list__item-clickable:hover {
    box-shadow: ${unsafeCSS(theme.elevation.raised.getVariable('shadow'))};
    background-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
  }
  .person-list__item-clickable {
    cursor: pointer;
  }
  .person-list__about {
    display: flex;
    align-items: center;
    column-gap: ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))};
  }
  .person-list__content {
    display: flex;
    flex-direction: column;
  }
  .person-list__heading {
    font-size: calc(${unsafeCSS(theme.typography.heading.h6.getVariable('fontSize'))} * var(--content-resize, 1));
    line-height: calc(${unsafeCSS(theme.typography.heading.h6.getVariable('lineHeight'))} * var(--content-resize, 1));
  }
  .person-list__sub-heading {
    font-size: calc(
      ${unsafeCSS(theme.typography.paragraph.caption.getVariable('fontSize'))} * var(--content-resize, 1)
    );
  }
  .person-list__toolbar {
    display: flex;
    align-items: center;
    gap: ${unsafeCSS(theme.spacing.comfortable.x_small.getVariable('padding'))};
  }
  .fwc-person-avatar-badge {
    --fwc-badge-size: calc(0.58rem * var(--content-resize, 1));
  }
`;

export default style;
