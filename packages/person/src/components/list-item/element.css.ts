import { css, unsafeCSS, type CSSResult }  from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

const style: CSSResult = css`
  :host {
  }
  :host([size='medium']) .person-list__avatar {
    width: 2.5rem;
    height: 2.5rem;
  }
  :host([size='large']) .person-list__avatar {
    width: 3rem;
    height: 3rem;
  }
  .person-list__item {
    display: flex;
    justify-content: space-between;
    column-gap: ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))};
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
