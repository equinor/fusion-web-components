import { css, unsafeCSS } from 'lit';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    --x-small-size-space: calc(
      ${unsafeCSS(theme.spacing.comfortable.x_small.getVariable('padding'))} * var(--content-resize, 1)
    );
    --small-size-space: calc(
      ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))} * var(--content-resize, 1)
    );
    --medium-size-space: calc(
      ${unsafeCSS(theme.spacing.comfortable.medium.getVariable('padding'))} * var(--content-resize, 1)
    );
  }
  :host([size='medium']) .person-card-manager__avatar {
    width: 2.5rem;
    height: 2.5rem;
  }
  :host([size='large']) .person-card-manager__avatar {
    width: 3.5rem;
    height: 3.5rem;
  }
  .person-card__section {
    display: flex;
    flex-direction: column;
    border: 1px solid;
    border-color: ${unsafeCSS(theme.colors.ui.background__medium.getVariable('color'))};
    border-radius: ${unsafeCSS(theme.spacing.comfortable.small.getVariable('padding'))};
  }
  .person-card__heading {
    display: flex;
    align-items: center;
    column-gap: var(--small-size-space);
    padding: var(--medium-size-space);
    border-bottom: 1px solid;
    border-color: ${unsafeCSS(theme.colors.ui.background__medium.getVariable('color'))};
  }
  .person-card__content {
    padding: var(--medium-size-space) 0;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    row-gap: var(--medium-size-space);
  }
  .person-card__name,
  .person-manager__name {
    display: -webkit-box;
    font-weight: ${unsafeCSS(theme.typography.paragraph.body_short_bold.getVariable('fontWeight'))};
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .person-card__department,
  .person-card__jobtitle,
  .person-card-manager__department {
    font-size: calc(
      ${unsafeCSS(theme.typography.paragraph.caption.getVariable('fontSize'))} * var(--content-resize, 1)
    );
  }
  .person-card__profession {
    display: flex;
    flex-direction: column;
    row-gap: var(--x-small-size-space);
  }
  .person-card-type__row {
    display: flex;
    align-items: center;
    column-gap: var(--small-size-space);
  }
  .person-card-type__icon {
    width: calc(0.625rem * var(--content-resize, 1));
    height: calc(0.625rem * var(--content-resize, 1));
    border-radius: 50%;
    border: 3px solid;
    border-color: var(--fwc-avatar-base-color);
  }
  .fwc-person-avatar-badge {
    --fwc-badge-size: calc(0.8rem * var(--content-resize, 1));
  }
  .person-card-info__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: var(--small-size-space);
  }
  .person-card-info__row:hover {
    background-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable('color'))};
  }
  .person-card-info__row:hover .person-card-info__copy {
    display: block;
  }
  .person-card-info__heading {
    font-size: calc(${unsafeCSS(theme.typography.input.label.getVariable('fontSize'))} * var(--content-resize, 1));
    font-weight: ${unsafeCSS(theme.typography.input.label.getVariable('fontWeight'))};
    padding-left: var(--medium-size-space);
    margin-bottom: var(--x-small-size-space);
  }
  .person-card-info__link {
    display: flex;
    align-items: center;
    column-gap: var(--small-size-space);
    font-size: calc(
      ${unsafeCSS(theme.typography.paragraph.caption.getVariable('fontSize'))} * var(--content-resize, 1)
    );
    padding: var(--small-size-space) var(--medium-size-space);
  }
  .person-card-info__icon {
    font-size: calc(14px * var(--content-resize, 1));
  }
  .person-card-info__copy {
    display: none;
  }
  .person-card__projects {
    display: flex;
    flex-direction: column;
    row-gap: var(--medium-size-space);
    margin: 0 var(--medium-size-space);
    padding-top: var(--medium-size-space);
    border-top: 1px solid;
    border-color: ${unsafeCSS(theme.colors.ui.background__medium.getVariable('color'))};
  }
  .person-card-projects__heading,
  .person-card-manager__heading {
    font-size: calc(${unsafeCSS(theme.typography.input.label.getVariable('fontSize'))} * var(--content-resize, 1));
    font-weight: ${unsafeCSS(theme.typography.input.label.getVariable('fontWeight'))};
  }
  .person-card-projects__title {
    font-size: calc(
      ${unsafeCSS(theme.typography.paragraph.body_short.getVariable('fontSize'))} * var(--content-resize, 1)
    );
    font-weight: ${unsafeCSS(theme.typography.paragraph.body_short.getVariable('fontWeight'))};
    padding-bottom: var(--x-small-size-space);
  }
  .person-card-projects__projects {
    display: flex;
    flex-wrap: wrap;
    gap: var(--small-size-space);
  }
  .person-card-projects__project {
    font-size: calc(
      ${unsafeCSS(theme.typography.paragraph.caption.getVariable('fontSize'))} * var(--content-resize, 1)
    );
    padding: 2px 6px;
    border: 1px solid;
    border-color: ${unsafeCSS(theme.colors.ui.background__medium.getVariable('color'))};
    border-radius: 4px;
  }
  .person-card__manager {
    display: flex;
    flex-direction: column;
    row-gap: var(--medium-size-space);
    margin: 0 var(--medium-size-space);
    padding-top: var(--medium-size-space);
    border-top: 1px solid;
    border-color: ${unsafeCSS(theme.colors.ui.background__medium.getVariable('color'))};
  }
  .person-card__manager-avatar {
    display: flex;
    align-items: center;
    column-gap: var(--small-size-space);
  }
`;

export default style;
