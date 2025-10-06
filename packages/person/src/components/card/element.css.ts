import { css, unsafeCSS, type CSSResult } from "lit";
import { styles as theme } from "@equinor/fusion-web-theme";

// TODO - remove!
import personStyle from "../../style.css";

const styleSizes = css`
  :host .person-card__content {
    font-size: 1rem;
    --fwc-avatar-size: 2.5em;
  }
  :host([size='small']) .person-card__content {
    font-size: 0.85rem;
    --fwc-avatar-size: 2rem;
  }
  :host([size='large']) .person-card__content {
    font-size: 1.25rem;
  }
`;

const style: CSSResult = css`
  :host {
    display: inline-flex;
    --x-small-size-space: calc(
      ${unsafeCSS(theme.spacing.comfortable.x_small.getVariable("padding"))} * var(--content-resize, 1)
    );
    --small-size-space: calc(
      ${unsafeCSS(theme.spacing.comfortable.small.getVariable("padding"))} * var(--content-resize, 1)
    );
    --medium-size-space: calc(
      ${unsafeCSS(theme.spacing.comfortable.medium.getVariable("padding"))} * var(--content-resize, 1)
    );
  }

  .person-card__section {
    display: flex;
    flex-direction: column;
    border: 1px solid;
    border-color: ${unsafeCSS(theme.colors.ui.background__medium.getVariable("color"))};
    border-radius: ${unsafeCSS(theme.spacing.comfortable.small.getVariable("padding"))};
    min-width: 220px;
    background-color: ${unsafeCSS(theme.colors.ui.background__default.getVariable("color"))};
  }
  .person-card__heading {
    display: flex;
    align-items: center;
    column-gap: var(--small-size-space);
    padding: var(--medium-size-space);
    border-bottom: 1px solid;
    border-color: ${unsafeCSS(theme.colors.ui.background__medium.getVariable("color"))};
  }
  .person-card__iconbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: var(--small-size-space);
    padding: var(--small-size-space) var(--medium-size-space);
    border-bottom: 1px solid;
    border-color: ${unsafeCSS(theme.colors.ui.background__medium.getVariable("color"))};
  }
  .person-card__content {
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
  }

  .person-card__content > * {
    margin: 0 var(--medium-size-space);
    padding: var(--medium-size-space) 0;
  }
  .person-card__content > * + * {
    border-top: 1px solid;
    border-color: ${unsafeCSS(theme.colors.ui.background__medium.getVariable("color"))};
  }
  .person-card__name {
    display: -webkit-box;
    font-weight: ${unsafeCSS(theme.typography.paragraph.body_short_bold.getVariable("fontWeight"))};
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: break-spaces;
  }
  .person-card__department,
  .person-card__jobtitle {
    white-space: break-spaces;
    word-break: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    font-size: calc(
      ${unsafeCSS(theme.typography.paragraph.caption.getVariable("fontSize"))} * var(--content-resize, 1)
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
    border-color: var(--fwc-avatar-color);
  }
  .fwc-person-avatar-badge {
    --fwc-badge-size: calc(0.8rem * var(--content-resize, 1));
  }
  .info-item {
    display: flex;
    flex-flow: column;
    gap: var(--small-size-space);
  }
  .info-item_heading {
    font-size: calc(${unsafeCSS(theme.typography.input.label.getVariable("fontSize"))} * var(--content-resize, 1));
    font-weight: ${unsafeCSS(theme.typography.input.label.getVariable("fontWeight"))};
  }
  .person-card-info__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: var(--small-size-space);
  }
  .person-card-info__row:hover {
    background-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable("color"))};
  }
  .person-card-info__row:not(:hover) .person-card-info__copy {
    visibility: hidden;
  }
  .person-card-info__link {
    display: flex;
    align-items: center;
    column-gap: var(--small-size-space);
    font-size: calc(
      ${unsafeCSS(theme.typography.paragraph.caption.getVariable("fontSize"))} * var(--content-resize, 1)
    );
  }
  .person-card-info__icon {
    font-size: calc(14px * var(--content-resize, 1));
  }
  .person-card-projects__projects {
    display: flex;
    flex-wrap: wrap;
    gap: var(--small-size-space);
  }
  .person-card-projects__project {
    font-size: calc(
      ${unsafeCSS(theme.typography.paragraph.caption.getVariable("fontSize"))} * var(--content-resize, 1)
    );
    padding: 2px 6px;
    border: 1px solid;
    border-color: ${unsafeCSS(theme.colors.ui.background__medium.getVariable("color"))};
    border-radius: 4px;
  }
`;

export default [personStyle, styleSizes, style];
