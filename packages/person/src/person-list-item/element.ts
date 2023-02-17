import { BadgeColor } from '@equinor/fusion-wc-badge';
import { CSSResult, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { PersonElement } from '../person';
import { PersonAvailability, PersonDetails, PersonItemSize, PersonPresence } from '../types';
import style from './element.css';
import personStyle from '../style.css';
import { delveIcon, teamsIcon } from './icons';
import { PersonListItemElementProps } from './types';
import { SkeletonSize } from '@equinor/fusion-wc-skeleton';

/**
 * Element for displaying a persons card with person avatar and person info.
 * {@inheritdoc}
 *
 * @tag fwc-person-list-item
 *
 * @property {string} azureId - Azure unique id for the person.
 * @property {PersonItemSize} size - Size of the avatar, also used for font size
 *
 */

export class PersonListItemElement extends PersonElement implements PersonListItemElementProps {
  static styles: CSSResult[] = [style, personStyle];

  @property({ type: String, reflect: true })
  azureId!: string;

  @property({ type: String, reflect: true })
  size: PersonItemSize = 'medium';

  /**
   * Renders person name
   */
  private renderTitle(): TemplateResult {
    return html`${this.details?.render({
      complete: (_details: PersonDetails) =>
        html`${_details.name ? html`<header class="person-list__heading">${_details.name}</header>` : null}`,
      pending: () => this.renderTextPlaceholder(false, SkeletonSize.small),
      error: () => this.renderTextPlaceholder(true),
    })}`;
  }

  /**
   * Render person job department
   */
  private renderDepartment(): TemplateResult {
    return html`${this.details?.render({
      complete: (_details: PersonDetails) =>
        html`${_details.department ? html`<div class="person-list__sub-heading">${_details.department}</div>` : null}`,
      pending: () => this.renderTextPlaceholder(false, SkeletonSize.small),
      error: () => this.renderTextPlaceholder(true),
    })}`;
  }

  /**
   * Returns the badge color for the current presence
   */
  protected getAvatarBadgeColor(availability: PersonAvailability): BadgeColor {
    switch (availability) {
      case PersonAvailability.Available:
      case PersonAvailability.AvailableIdle:
        return BadgeColor.Success;
      case PersonAvailability.Away:
      case PersonAvailability.BeRightBack:
        return BadgeColor.Warning;
      case PersonAvailability.Busy:
      case PersonAvailability.BusyIdle:
      case PersonAvailability.DoNotDisturb:
        return BadgeColor.Danger;
      default:
        return BadgeColor.Disabled;
    }
  }

  protected getToolbarPlaceholderIconSize(size: PersonItemSize): string {
    switch (size) {
      case 'small':
        return 'x-small';
      case 'medium':
        return 'small';
      case 'large':
        return 'medium';
      default:
        return 'small';
    }
  }

  /**
   * Renders the avatar badge
   */
  protected renderBadge(availability: PersonAvailability): TemplateResult {
    return html`<fwc-badge
      class="fwc-person-avatar-badge"
      slot="badge"
      .color=${this.getAvatarBadgeColor(availability)}
      position="bottom-right"
      circular
    />`;
  }

  /**
   * Renders the avatar
   */
  protected renderAvatar(details: PersonDetails): TemplateResult {
    return html`<fwc-avatar
      class="person-list__avatar ${this.getAccountTypeColorClass(details.accountType)}"
      .size=${this.size}
      .src=${details.pictureSrc}
      .value=${this.getInitial(details.name)}
      border=${true}
      clickable
      @click=${this.handleOnClick}
    >
      ${this.presence?.render({
        complete: (presence: PersonPresence) => this.renderBadge(presence.availability),
        pending: () => this.renderBadge(PersonAvailability.Pending),
        error: () => this.renderBadge(PersonAvailability.Offline),
      })}</fwc-avatar
    >`;
  }

  protected renderDelveIcon(): TemplateResult {
    return html`${this.details?.render({
      complete: () =>
        html`<fwc-icon-button
          href="https://eur.delve.office.com/?u=${this.azureId}&v=work"
          target="_new"
          rounded
        />${delveIcon}</fwc-icon-button>`,
      pending: () => this.renderImagePlaceholder(false, this.getToolbarPlaceholderIconSize(this.size)),
      error: () => this.renderImagePlaceholder(true, this.getToolbarPlaceholderIconSize(this.size)),
    })}`;
  }

  protected renderTeamsIcon(): TemplateResult {
    return html`${this.details?.render({
      complete: (_details: PersonDetails) =>
        html`${_details.mail
          ? html`<fwc-icon-button
              href="msteams:/l/chat/0/0?users=${_details.mail}"
              target="_new"
              rounded
            />${teamsIcon}</fwc-icon-button>`
          : null}`,
      pending: () => this.renderImagePlaceholder(false, this.getToolbarPlaceholderIconSize(this.size)),
      error: () => this.renderImagePlaceholder(true, this.getToolbarPlaceholderIconSize(this.size)),
    })}`;
  }

  /**
   * Renders the error
   */
  protected renderError(error: Error): TemplateResult {
    return html`${error}`;
  }

  /**
   * Handle on click.
   */
  protected handleOnClick(e: PointerEvent): void {
    this.dispatchEvent(new PointerEvent('click', e));
  }

  protected render(): TemplateResult {
    return html`<div class="person-list__item">
      <div class="person-list__about">
        <div class="person-list__avatar">
          ${this.details?.render({
            complete: (details: PersonDetails) => this.renderAvatar(details),
            pending: () => this.renderImagePlaceholder(false, this.size),
            error: () => this.renderImagePlaceholder(true),
          })}
        </div>
        <div class="person-list__content">${this.renderTitle()} ${this.renderDepartment()}</div>
      </div>
      <div class="person-list__toolbar">${this.renderDelveIcon()}${this.renderTeamsIcon()}</div>
    </div>`;
  }
}
