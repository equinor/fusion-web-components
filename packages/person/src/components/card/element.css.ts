import { css, unsafeCSS, type CSSResult } from "lit";
import { styles as theme } from "@equinor/fusion-web-theme";

// TODO - remove!
import personStyle from "../../style.css";

const styleSizes = css`
  :host {
    .person-card__section {
      min-width: 250px;
    }
    .person-card__content {
      font-size: 1rem;
      --fwc-avatar-size: 2.5em;
    }
  }
  :host([size='small']) {
    .person-card__section {
      min-width: 200px;
    }
    .person-card__content {
      font-size: 0.85rem;
      --fwc-avatar-size: 2rem;
    }
  }
  :host([size='large']) .person-card__content {
    font-size: 1.25rem;
  }
`;

const style: CSSResult = css`
  :host {
    display: inline-flex;
    text-align: left;
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
    min-width: 200px;
    background-color: ${unsafeCSS(theme.colors.ui.background__default.getVariable("color"))};
    
    &.shadow {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    }
  }
  
  .person-card__heading {
    display: flex;
    align-items: center;
    column-gap: var(--small-size-space);
    padding: var(--small-size-space);
    padding-bottom: calc(var(--small-size-space) * 0.5);
  }
  .person-card__iconbar {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--medium-size-space);
    padding: calc(var(--small-size-space) * 0.5) var(--small-size-space);
    border-bottom: 1px solid;
    border-color: ${unsafeCSS(theme.colors.ui.background__medium.getVariable("color"))};
    font-size: calc(${unsafeCSS(theme.typography.paragraph.meta.getVariable("fontSize"))} * var(--content-resize, 1));

    a {
      color: ${unsafeCSS(theme.colors.interactive.primary__hover.getVariable("color"))};
      text-decoration: none;
      
      &:hover {
        color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable("color"))};
      }
      &.disabled {
        pointer-events: none;
        opacity: 0.5;
      }
    }
  }
  .person-card__content {
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
  }
  .person-card__header {
    flex: 1;  
    overflow: hidden;
  }
  .person-card__name {
    display: -webkit-box;
    font-weight: ${unsafeCSS(theme.typography.paragraph.body_short_bold.getVariable("fontWeight"))};
    font-size: calc(0.9em * var(--content-resize, 1));
  }
  .person-card__department,
  .person-card__expired,
  .person-card__jobtitle {
    font-size: calc(0.66rem * var(--content-resize, 1));
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 1.1;
  }
  .person-card__expired {
    color: ${unsafeCSS(theme.colors.interactive.danger__text.getVariable('color'))};
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
    margin: 0 var(--medium-size-space);
    padding: var(--small-size-space) 0;
    border-top: 1px solid;
    border-color: ${unsafeCSS(theme.colors.ui.background__medium.getVariable("color"))};

    &:first-child {
      border-top: none;
    }
  }
  .info-item_heading {
    font-size: calc(${unsafeCSS(theme.typography.input.label.getVariable("fontSize"))} * var(--content-resize, 1));
    font-weight: ${unsafeCSS(theme.typography.input.label.getVariable("fontWeight"))};
  }
  .info-item_items {
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    margin-top: var(--small-size-space);
  }

  .person-card-info__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: calc(var(--small-size-space) * 0.5);
    font-size: calc(0.66rem * var(--content-resize, 1));
    
    &:hover {
      background-color: ${unsafeCSS(theme.colors.ui.background__light.getVariable("color"))};

      .person-card-info__copy {
        opacity: 1;
      }
    }
  }
  .person-card-info__icon {
    font-size: calc(${unsafeCSS(theme.typography.input.helper.getVariable("fontSize"))} * 0.9 * var(--content-resize, 1));
  }
  .person-card-info__text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }
  .person-card-info__copy {
    opacity: 0;
    transition: opacity 0.2s ease-in;
    font-size: calc(${unsafeCSS(theme.typography.input.helper.getVariable("fontSize"))} * 0.6 * var(--content-resize, 1));
  }
  .person-card-info__show_more {
    font-size: calc(${unsafeCSS(theme.typography.input.helper.getVariable("fontSize"))} * var(--content-resize, 1));
  }
  .person-card-projects__projects {
    display: flex;
    flex-wrap: wrap;
    gap: var(--small-size-space);
  }
  .person-card-projects__project {
    font-size: calc(${unsafeCSS(theme.typography.input.helper.getVariable("fontSize"))} * var(--content-resize, 1));
    padding: 2px 6px;
    border: 1px solid;
    border-color: ${unsafeCSS(theme.colors.ui.background__medium.getVariable("color"))};
    border-radius: 4px;
  }
  .copyable-text {
    position: relative;
    
    .copyable-text__text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin: 0;
      width: 100%;
    }
    
    .copyable-text__button {
      display: none;
      position: absolute;
      right: 0;
      top: -0.1em;
      z-index: 1;
      border: none;
      outline: none;
      background: ${unsafeCSS(theme.colors.ui.background__light.getVariable("color"))};
      cursor: pointer;
      font-size: 0.55rem;
      padding: 0.5em;
      border-radius: 100%;

      fwc-icon {
        position: relative;
        top: 0.2em;
      }

      &:hover, &:focus {
        background: ${unsafeCSS(theme.colors.ui.background__medium.getVariable("color"))};
      }
    }
    
    &:hover .copyable-text__button {
      display: block;
    }
  }
`;

export default [personStyle, styleSizes, style];
