import { html, type CSSResult, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import Skeleton, { SkeletonSize, SkeletonVariant } from '@equinor/fusion-wc-skeleton';

import { PersonItemSize } from '../../types';
import style from './element.css';
// TODO - NOPE
import personStyle from '../../style.css';
import { ListItemData, PersonListItemElementProps } from './types';

import { mapResolveToPersonInfo } from '../../utils';
import { PersonAvatarElement } from '../avatar';
import { PersonBaseElement } from '../base';

PersonAvatarElement;
Skeleton;

/**
 * Element for displaying a persons card with person avatar and person info.
 * {@inheritdoc}
 *
 * @tag fwc-person-list-item
 *
 * @property {string} resolveId - AzureId or UPN for the person to resolve.
 * @property {ListItemData} dataSource - Custom data source for the person.
 * @property {PersonItemSize} size - Size of the avatar, also used for font size
 * @property {boolean} clickable - Make whole List Item clickable
 *
 * @deperecated azureId - Use resolveId instead.
 * @deperecated upn - Use resolveId instead.
 */

export class PersonListItemElement extends PersonBaseElement implements PersonListItemElementProps {
  static styles: CSSResult[] = [style, personStyle];

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
    if (details.isExpired) {
      return html`<div class="person-list__sub-heading person-list__sub-heading-expired">Account expired</div>`;
    }

    return html`
      <div class="person-list__sub-heading">
        ${details.department ?? details.applicationId ?? details.azureId ?? html`&nbsp;`}
      </div>
    `;
  }

  /**
   * Renders the error
   */
  protected renderError(error: Error): TemplateResult {
    return html`${error}`;
  }

  protected render(): TemplateResult {
    if (!this.tasks) {
      return this.renderPending();
    }
    // TODO why are title and department spaced, if to inline elements, wrap it <span>
    return html`
      <div class="person-list__item ${this.clickable ? 'person-list__item-clickable' : ''}">
        ${this.tasks.resolve.render({
          complete: (details) => {
            const person = details.length > 0 ? mapResolveToPersonInfo(details[0]) : this.dataSource;
            if (!person?.avatarUrl) {
              return;
            }
            return html`
              <div class="person-list__about">
                <div class="person-list__avatar">
                  <fwc-person-avatar .dataSource=${person} size="small"></fwc-person-avatar>
                </div>
                <div class="person-list__content">${this.renderTitle(person)} ${this.renderDepartment(person)}</div>
              </div>
              <slot class="person-list__toolbar"></slot>
            `;
          },
          pending: () => this.renderPending(),
          error: () => this.renderTextPlaceholder(true, SkeletonSize.Medium),
        })}
      </div>
    `;
  }

  protected renderPending() {
    return html`<div class="person-list__about">
        <div class="person-list__avatar">${this.renderImagePlaceholder(false, this.size, true)}</div>
        <div class="person-list__content">
          <fwc-skeleton-wrapper direction="vertical">
            ${this.renderTextPlaceholder(false, SkeletonSize.small)}
            ${this.renderTextPlaceholder(false, SkeletonSize.small)}
          </fwc-skeleton-wrapper>
        </div>
      </div>
      <div class="person-list__toolbar">${this.renderCirclePlaceholder(false, SkeletonSize.small)}</div> `;
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
   * Renders pending state for toolbar
   */
  public renderCirclePlaceholder(inactive?: boolean, size?: SkeletonSize): TemplateResult {
    return html`<fwc-skeleton size="${size}" variant=${SkeletonVariant.Circle} ?inactive=${inactive}></fwc-skeleton>`;
  }
}
