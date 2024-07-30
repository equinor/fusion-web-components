import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import Avatar from '@equinor/fusion-wc-avatar';
import Skeleton, { SkeletonSize, SkeletonVariant } from '@equinor/fusion-wc-skeleton';

import { PersonItemSize } from '../../types';
import { PersonInfoTask, PersonInfoControllerHost } from '../../tasks/person-info-task';
import personStyle from '../../style.css';

import { TableCellData, PersonTableCellElementProps } from './types';
import style from './element.css';

Avatar;
Skeleton;

/**
 * Element for displaying a persons table cell with person avatar and person info.
 * {@inheritdoc}
 *
 * @tag fwc-person-table-cell
 *
 * @property {string} azureId - Azure unique id for the person.
 * @property {string} upn - Unique email(upn) for the person.
 * @property {TableCellData} dataSource - Custom data source for the person.
 * @property {PersonItemSize} size - Size of the avatar, also used for font size
 * @property {boolean} showAvatar - Show Avatar in cell
 * @property {(person: ListItemData) => string | undefined} heading - Function to determine title based on person data.
 * @property {(person: ListItemData) => string | undefined} subHeading - Function to determine title based on person data.
 *
 */

export class PersonTableCellElement extends LitElement implements PersonTableCellElementProps, PersonInfoControllerHost {
  static styles: CSSResult[] = [style, personStyle];

  /** Unique person Azure ID */
  @property({ type: String })
  public azureId?: string;

  /** Unique person email(upn) */
  @property({ type: String })
  public upn?: string;

  /** Custom person data source */
  @property({ type: String })
  public dataSource?: TableCellData;

  /** Function to determine heading based on person data */
  @property({ type: Function })
  public heading: <T extends TableCellData>(person:T) => string | undefined = (person: TableCellData) => person.name;

  /** Function to determine sub heading based on person data */
  @property({ type: Function })
  public subHeading?: <T extends TableCellData>(person:T) => string | undefined;



  /**
   * @internal
   */
  private tasks?: {
    info: PersonInfoTask;
  };

  /**
   * @internal
   */
  @state()
  protected intersected = false;

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
              info: new PersonInfoTask(this),
            };
          }
        }
      },
    }),
  };

  /** Size of component */
  @property({ type: String, reflect: true })
  size: PersonItemSize = 'medium';

  /** Show Avatar */
  @property({ type: Boolean, reflect: true, converter: {
    fromAttribute: (value) => {
      if (value === null) {
        return true;
      }
      return value.toLowerCase() !== 'false';
    },
    toAttribute: (value) => {
      return value ? '' : 'false';
    }
  } })
  showAvatar: boolean = false;

  /**
   * Renders person cell title
   */
  protected renderHeading(details: TableCellData): TemplateResult {
    const titleText = this.heading(details);
    return html`${titleText ? html`<div class="person-cell__heading">${unsafeHTML(titleText)}</div>` : null}`;
  }

  /**
   * Render person cell sub title
   */
  private renderSubHeading(details: TableCellData): TemplateResult {
    const subTitleText = this.subHeading ? this.subHeading(details) : undefined;
    return html`${subTitleText ? html`<div class="person-cell__sub-heading">${unsafeHTML(subTitleText)}</div>` : null}`;
  }


  protected render(): TemplateResult {
    if (!this.tasks) {
      return this.renderPending(false);
    }
    return html`
      <div class="person-cell__item">
        ${this.tasks.info.render({
          complete: (details) => {
            return html`<div class="person-cell__about">
                ${this.showAvatar ? html`<fwc-person-avatar azureId=${details.azureId} .dataSource=${details} trigger="disabled" />` : null}
                <div class="person-cell__content">
                  ${this.renderHeading(details as TableCellData)} ${this.renderSubHeading(details as TableCellData)}
                </div>
              </div>`;
          },
          pending: () => this.renderPending(false),
          error: () => this.renderPending(true),
        })}
      </div>
    `;
  }

  /**
   * Render person cell pending and error state
   */
  protected renderPending(error: boolean) {
    return html`<div class="person-cell__about ${error ? "person-cell__about--error" : ""}">
        ${this.showAvatar ? this.renderImagePlaceholder(error, this.size) : null}
        <div class="person-cell__content person-cell__content-gap">
            ${this.renderTextPlaceholder(error, SkeletonSize.small)}
            ${this.renderTextPlaceholder(error, SkeletonSize.small)}
        </div>
      </div>`;
  }

  public renderImagePlaceholder(inactive: boolean, size?: PersonItemSize): TemplateResult {
    return html`<fwc-skeleton
      size=${this.getToolbarPlaceholderIconSize(size ?? 'small')}
      variant=${SkeletonVariant.Circle}
      icon="image"
      ?inactive=${inactive}
    />`;
  }

  /**
   * Renders pending state for content
   */
  public renderTextPlaceholder(inactive: boolean, size?: SkeletonSize): TemplateResult {
    return html`<fwc-skeleton size="${size}" variant=${SkeletonVariant.Text} ?inactive=${inactive} />`;
  }

  /**
   * Renders pending state for avatar
   */
  public getToolbarPlaceholderIconSize(size: PersonItemSize): string {
    switch (size) {
      case "small":
        return 'x-small';
      case "large":
        return 'medium';
      default:
        return 'small';
    }
  }

  /**
   * Renders pending state for toolbar
   */
  public renderCirclePlaceholder(inactive?: boolean, size?: SkeletonSize): TemplateResult {
    return html`<fwc-skeleton size="${size}" variant=${SkeletonVariant.Circle} ?inactive=${inactive}></fwc-skeleton>`;
  }
}
