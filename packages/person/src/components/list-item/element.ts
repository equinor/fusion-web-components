import { html, LitElement, type CSSResult, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';

import { PersonItemSize } from '../../types';
import style from './element.css';
// TODO - NOPE
import personStyle from '../../style.css';
import { ListItemData, PersonListItemElementProps } from './types';
import { PersonResolveTask } from '../../tasks';

import Skeleton, { SkeletonSize, SkeletonVariant } from '@equinor/fusion-wc-skeleton';
import { mapResolveToPersonInfo } from '../../utils';
import { ResolvePropertyMapper } from '../../ResolvePropertyMapper';
import { PersonAvatarElement } from '../avatar';

PersonAvatarElement;
Skeleton;

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

  /** 
   * Unique person AzureId 
   * @deprecated use resolveId instead.
   */
  @property({ type: String })
  public azureId?: string;

  /**
   * Unique person User Principal Name
   * @deprecated use resolveId instead.
   */
  @property({ type: String })
  public upn?: string;

  /**
   * Unique id used to resolve person details.
   * Can be azureId or upn.
   * Using this property will take precedence over azureId and upn.
   */
  @property({ type: String })
  resolveId?: string;

  /**
   * Person details data source. If provided, it will be used to render the component without resolving the details.
   * If the dataSource does not contain an avatarUrl, the component will attempt to resolve the details.
   */
  @property({ type: Object })
  public dataSource?: ListItemData;

  /** Internal state used to trigger resolve task */
  @state()
  resolveIds: string[] = [];

  /** Size of component */
  @property({ type: String, reflect: true })
  size: PersonItemSize = 'medium';

  /** Clickable List Item */
  @property({ type: Boolean, reflect: true })
  clickable = false;

  /**
   * @internal
   */
  @state()
  protected intersected = false;

  /**
   * @internal
   */
  private tasks?: {
    resolve: PersonResolveTask;
  };

  /**
   * @internal
   */
  protected controllers = {
    observer: new IntersectionController(this, {
      callback: (e) => {
        if (!this.intersected) {
          this.intersected = !!e.find((x) => x.isIntersecting);
          if (this.intersected) {
            this.controllers.observer.unobserve(this);
            this.tasks = {
              resolve: new PersonResolveTask(this),
            };
          }
        }
      },
    }),
    propertyMapper: new ResolvePropertyMapper(this),
  };

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

    return html`<div class="person-list__sub-heading">${details.department ?? details.applicationId ?? details.azureId ?? html`&nbsp;`}</div>`;
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
                <div class="person-list__content">
                  ${this.renderTitle(person)}
                  ${this.renderDepartment(person)}
                </div>
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
