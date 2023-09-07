import { BadgeColor } from '@equinor/fusion-wc-badge';
import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { PersonAccountType, PersonAvailability, PersonItemSize } from '../types';
import style from './element.css';
import personStyle from '../style.css';
import { ListItemData, PersonListItemElementProps } from './types';
import { SkeletonSize, SkeletonVariant } from '@equinor/fusion-wc-skeleton';
import { PersonListItemTask } from './task';

/**
 * Element for displaying a persons card with person avatar and person info.
 * {@inheritdoc}
 *
 * @tag fwc-person-list-item
 *
 * @property {string} azureId - Azure unique id for the person.
 * @property {PersonItemSize} size - Size of the avatar, also used for font size
 * @property {boolean} clickable - Make whole List Item clickable
 *
 */

export class PersonListItemElement extends LitElement implements PersonListItemElementProps {
  static styles: CSSResult[] = [style, personStyle];

  /** Unique person Azure ID */
  @property({ type: String })
  public azureId?: string;

  @property({ type: String })
  public upn?: string;

  @property({ type: String })
  public dataSource?: ListItemData;

  private task = new PersonListItemTask(this);

  /** Size of component */
  @property({ type: String, reflect: true })
  size: PersonItemSize = 'medium';

  /** Clickable List Item */
  @property({ type: Boolean, reflect: true })
  clickable = false;

  /**
   * Renders person name
   */
  protected renderTitle(details: ListItemData): TemplateResult {
    return html`${details.name ? html`<header class="person-list__heading">${details.name}</header>` : null}`;
  }

  /**
   * Render person job department
   */
  private renderDepartment(details: ListItemData): TemplateResult {
    return html`${details.department ? html`<div class="person-list__sub-heading">${details.department}</div>` : null}`;
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
  protected renderAvatar(details: ListItemData): TemplateResult {
    return html`
      <fwc-avatar
        class="person-list__avatar ${this.getAccountTypeColorClass(details.accountType)}"
        .size=${this.size}
        .src=${details.pictureSrc}
        .value=${this.getInitial(details.name)}
        border=${true}
      ></fwc-avatar>
    `;
  }

  /**
   * Renders the error
   */
  protected renderError(error: Error): TemplateResult {
    return html`${error}`;
  }

  protected render(): TemplateResult {
    return html`
      <div class="person-list__item ${this.clickable ? 'person-list__item-clickable' : ''}">
        ${this.task?.render({
          complete: (details: ListItemData) => {
            return html`<div class="person-list__about">
                <div class="person-list__avatar">${this.renderAvatar(details)}</div>
                <div class="person-list__content">${this.renderTitle(details)} ${this.renderDepartment(details)}</div>
              </div>
              <slot class="person-list__toolbar"></slot>`;
          },
          pending: () => {
            return html`<div class="person-list__about">
                <div class="person-list__avatar">${this.renderImagePlaceholder(false, this.size, true)}</div>
                <div class="person-list__content">
                  <fwc-skeleton-wrapper direction="vertical">
                    ${this.renderTextPlaceholder(false, SkeletonSize.small)}
                    ${this.renderTextPlaceholder(false, SkeletonSize.small)}
                  </fwc-skeleton-wrapper>
                </div>
              </div>
              <div class="person-list__toolbar">${this.renderCirclePlaceholder(false, SkeletonSize.small)}</div>`;
          },
          error: () => this.renderTextPlaceholder(true, SkeletonSize.Medium),
        })}
      </div>
    `;
  }

  public renderImagePlaceholder(inactive?: boolean, size?: string, list?: boolean): TemplateResult {
    return html`<fwc-skeleton
      class="${list ? 'person-list__avatar' : ''}"
      size=${list ? this.getToolbarPlaceholderIconSize(size ?? 'small') : size}
      variant=${SkeletonVariant.Circle}
      icon="image"
      ?inactive=${inactive}
    ></fwc-skeleton>`;
  }

  /**
   * Renders pending state for content
   */
  public renderTextPlaceholder(inactive?: boolean, size?: SkeletonSize): TemplateResult {
    return html`<fwc-skeleton size="${size}" variant=${SkeletonVariant.Text} ?inactive=${inactive}></fwc-skeleton>`;
  }

  /**
   * Renders pending state for avatar
   */
  public getToolbarPlaceholderIconSize(size: string): string {
    if (size === 'small') {
      return 'x-small';
    }
    return 'small';
  }

  /**
   * Returns color classes for the account type
   */
  public getAccountTypeColorClass(accountType?: PersonAccountType): string | void {
    switch (accountType) {
      case PersonAccountType.Employee:
        return 'fwc-person-type__employee';
      case PersonAccountType.Consultant:
      case PersonAccountType.Enterprise:
        return 'fwc-person-type__consultant';
      case PersonAccountType.External:
        return 'fwc-person-type__external';
      case PersonAccountType.ExternalHire:
        return 'fwc-person-type__external-hire';
    }
  }

  /**
   * Returns the first character in the person's name as upper case initial
   */
  public getInitial(name?: string): string | undefined {
    return name?.substring(0, 1)?.toUpperCase();
  }

  /**
   * Renders pending state for toolbar
   */
  public renderCirclePlaceholder(inactive?: boolean, size?: SkeletonSize): TemplateResult {
    return html`<fwc-skeleton size="${size}" variant=${SkeletonVariant.Circle} ?inactive=${inactive}></fwc-skeleton>`;
  }
}
