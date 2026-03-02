// TODO - CLEAN UP!
import { html, LitElement } from 'lit';
import type { CSSResult, TemplateResult, PropertyValues } from 'lit';
import { property, queryAsync, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';
import { computePosition, shift, offset, autoPlacement, autoUpdate } from '@floating-ui/dom';

import Skeleton, { SkeletonVariant } from '@equinor/fusion-wc-skeleton';
import Icon from '@equinor/fusion-wc-icon';

import type { AvatarData, PersonAvatarElementProps } from './types';
import style from './element.css';
import { PersonResolveTask } from '../../tasks';
import { mapResolveToPersonInfo } from '../../utils';
import { ResolvePropertyMapper } from '../../ResolvePropertyMapper';
import { PersonCardElement } from '../card';

// persist elements
PersonCardElement;
Skeleton;
Icon;

const clickOutside = (e: MouseEvent) => {
  PersonAvatarElement.openedPersonAvatars.forEach((el) => {
    if (el !== e.target) {
      PersonAvatarElement.hideFloating(el);
    }
  });
};

export type PersonAvatarShowCardOnType = 'click' | 'hover' | 'none';

//TODO: Handle errors better in task error render function

/**
 * Element for displaying a persons avatar with presence badge.
 * {@inheritdoc}
 *
 * @tag fwc-person-avatar
 *
 * @property {string} azureId - Azure unique id for the person.
 * @property {AvatarSize} size - Size of the avatar.
 * @property {boolean} clickable - Sets the avatar to be clickable to render hover/ripple effects.
 * @property {disabled} disabled - Sets the avatar to be rendered as disabled.
 * @property {boolean} showLetter - Sets the avatar to show letter instead of an image.
 *
 * @fires click - When the element is clicked, only fires when `clickable` is set to `true` and `disabled` is set to `false`.
 *
 * @summary
 */
export class PersonAvatarElement extends LitElement implements PersonAvatarElementProps {
  static styles: CSSResult[] = [style];

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
  public dataSource?: AvatarData;

  /** Internal state used to trigger resolve task */
  @state()
  resolveIds: string[] = [];

  /**
   * @internal
   */
  @property({ type: Boolean, attribute: false, reflect: false })
  isFloatingOpen = false;

  /**
   * Size of the avatar.
   * @type {'click' | 'hover' | 'disabled'}
   */
  @property({ type: String, reflect: true })
  size?: PersonAvatarElementProps['size'];

  @property({ type: String, reflect: true })
  pictureSrc?: string;

  /**
   * Sets the avatar to be clickable to render hover/ripple effects.
   */
  @property({ type: Boolean, reflect: true })
  clickable?: boolean;

  /**
   * @type {'click' | 'hover' | 'disabled'}
   * @default hover
   */
  @property({ type: String, attribute: 'trigger', reflect: true })
  trigger: PersonAvatarShowCardOnType = 'hover';
  // showFloatingOn: PersonAvatarShowCardOnType = 'hover';

  /**
   * Sets the avatar to be rendered as disabled.
   */
  @property({ type: Boolean })
  disabled?: boolean;

  /**
   * Sets the avatar to show a letter instead of an image.
   * @deprecated The letter rendering has been removed. The letter will be shown automatically if no image is available.
   */
  @property({ type: Boolean })
  showLetter?: boolean;

  /**
   * @internal
   */
  @queryAsync('#floating')
  public floating!: Promise<HTMLDivElement>;

  /**
   * @internal
   */
  @queryAsync('#root')
  public root!: Promise<HTMLDivElement>;

  /**
   * @internal
   */
  @state()
  protected intersected = false;

  /**
   * @internal
   */
  private tasks?: {
    resolve: PersonResolveTask,
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
              resolve: new PersonResolveTask(this)
            };
          }
        }
      },
    }),
    propertyMapper: new ResolvePropertyMapper(this),
  };

  /**
   * @internal
   */
  static openedPersonAvatars: PersonAvatarElement[] = [];

  async handleFloatingUi(): Promise<VoidFunction> {
    const root = await this.root;
    const floating = await this.floating;

    const update = () => {
      computePosition(root, floating, {
        placement: 'bottom-start',
        middleware: [
          offset(5),
          autoPlacement({
            allowedPlacements: ['bottom-start', 'top-start'],
          }),
          shift({ padding: 5 }),
        ],
      }).then(async ({ x, y }) => {
        Object.assign(floating.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    };
    return autoUpdate(root, floating, update);
  }

  cleanup?: () => void;

  async updated(props: PropertyValues) {
    if (props.has('isFloatingOpen')) {
      if (this.isFloatingOpen) {
        this.cleanup = await this.handleFloatingUi();
      } else if (this.cleanup) {
        this.cleanup();
        delete this.cleanup;
      }
    }
  }

  protected renderBadge(person: Partial<AvatarData>): TemplateResult {
    if (person.applicationId || person.accountType === 'Admin') {
      const badgeIcon = person.applicationId ? 'apps' : 'star_filled';
      return html`
        <div slot="badge" id="avatar-badge" style="background-color: ${person.avatarColor};">
          <fwc-icon
            icon="${badgeIcon}"
          ></fwc-icon>
        </div>
      `;
    }

    return html``;
  }

  protected renderImage(person: Partial<AvatarData>): TemplateResult | undefined {
    if (!person.avatarUrl) {
      return;
    }
    return html`<img src="${person.avatarUrl}" alt="${person.name}" />`;
  }

  protected renderAvatarElement(details: Partial<AvatarData>, trigger: boolean = true): TemplateResult {
    if (!trigger) {
      return html`
      <div
        id="avatar-element-container"
        @click=${this.handleOnClick}
      >
        ${this.renderImage(details)}
        ${this.renderBadge(details)}
      </div>
    `;
    }

    return html`
      <div
        id="avatar-element-container"
        @click=${this.handleOnClick}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        ${this.renderImage(details)}
        ${this.renderBadge(details)}
      </div>
    `;
  }

  protected render(): TemplateResult {
    if (!this.tasks) {
      return this.renderImagePlaceholder();
    }
    return html`
      <div id="root">
        ${this.tasks.resolve.render({
      complete: (details) => {
        const person = details.length > 0 ? mapResolveToPersonInfo(details[0]) : this.dataSource;
        if (!person?.avatarUrl) {
          return;
        }
        return html`
              ${this.renderAvatarElement(person)}
              <div id="floating" @mouseover="${this.handleFloatingMouseOver}" @mouseout="${this.handleFloatingMouseOut}">
                <slot name="floating">
                  ${when(this.isFloatingOpen, () =>
          html`<fwc-person-card onclick="event.stopPropagation()" .dataSource="${person}">
                      <div slot="avatar">
                        ${this.renderAvatarElement(person, false)}
                      </div>
                    </fwc-person-card>`,
        )}
                </slot>
              </div>
            `;
      },
      pending: () => html`${this.renderImagePlaceholder(true)}`,
      error: () => html`${this.renderImagePlaceholder(false)}`,
    })}
      </div>
    `;
  }

  public renderImagePlaceholder(inactive?: boolean): TemplateResult {
    return html`
      <fwc-skeleton
        size=${this.size}
        variant=${SkeletonVariant.Circle}
        icon="image"
        ?inactive=${inactive}
      ></fwc-skeleton>
    `;
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

  static hideFloating(el: PersonAvatarElement): void {
    window.removeEventListener('click', clickOutside);
    el.isFloatingOpen = false;
    const index = PersonAvatarElement.openedPersonAvatars.indexOf(el);
    if (index != -1) {
      delete PersonAvatarElement.openedPersonAvatars[index];
    }
  }

  static hideAllFloating(): void {
    PersonAvatarElement.openedPersonAvatars.forEach((el) => {
      PersonAvatarElement.hideFloating(el);
    });
  }

  showFloating(): void {
    PersonAvatarElement.openedPersonAvatars.push(this);
    window.addEventListener('click', clickOutside);
    this.isFloatingOpen = true;
  }

  /**
   * Handle on click.
   */
  protected handleOnClick(e: MouseEvent): void {
    if (this.trigger === 'click' && !this.disabled) {
      PersonAvatarElement.hideAllFloating();

      if (
        e.target &&
        (e.target as Node).getRootNode() instanceof ShadowRoot &&
        ((e.target as Node).getRootNode() as ShadowRoot).host === this
      ) {
        e.stopPropagation();
      }

      this.showFloating.bind(this)();
    }
  }

  /** The timeoutId for task to hide floating. If no hide task is queued, this is undefined. */
  protected hideFloatingTask: number | undefined;

  /**
   * Function to cancel the hiding of floating.
   */
  protected clearHideFloatingTask(): void {
    if (this.hideFloatingTask) {
      clearTimeout(this.hideFloatingTask);
    }
    this.hideFloatingTask = undefined;
  }

  /**
   * Function to invoke the hiding of floating.
   */
  protected invokeHideFloatingTask(): void {
    this.hideFloatingTask = setTimeout(() => {
      PersonAvatarElement.hideAllFloating();
      this.clearHideFloatingTask();
    }, 500);
  }

  /** The timeoutId for task to show floating. If no show task is queued, this is undefined. */
  protected showFloatingTask: number | undefined;

  /**
   * Function to cancel the showing of floating.
   */
  protected clearShowFloatingTask(): void {
    if (this.showFloatingTask) {
      clearTimeout(this.showFloatingTask);
    }
    this.showFloatingTask = undefined;
  }

  /**
   * Function to incoke the showing of floating.
   */
  protected invokeShowFloatingTask(): void {
    this.showFloatingTask = setTimeout(() => {
      this.showFloating.bind(this)();
      this.clearShowFloatingTask();
    }, 500);
  }

  /**
   * Handles the mouseover for the avatar element.
   */
  protected handleMouseOver(_e: MouseEvent): void {
    // If we hover, we should cancel a potential hide.
    // This is i.e. leaving the floating element, but entering
    // the avatar element again.
    this.clearHideFloatingTask();
    if (this.trigger === 'hover' && this.isFloatingOpen === false && !this.disabled) {
      // Hide all other floating elements.
      PersonAvatarElement.hideAllFloating();

      // Schedule showing of the current floating.
      this.invokeShowFloatingTask();
    }
  }

  /**
   * Handles the mouseout for the avatar element.
   */
  protected handleMouseOut(_e: MouseEvent): void {
    if (this.showFloatingTask) {
      // If we leave the avatar element, we should cancel a potential show.
      // This is i.e. leaving the avatar element again before the floating
      // has completed showing.
      this.clearShowFloatingTask();
      return;
    }

    if (this.trigger === 'hover' && this.isFloatingOpen && !this.disabled) {
      // Schedule hiding of the current floating.
      this.invokeHideFloatingTask();
    }
  }

  /**
   * Handles the mouseover for the floating element.
   */
  protected handleFloatingMouseOver() {
    if (this.trigger === 'hover' && this.isFloatingOpen && !this.disabled) {
      // If we hover, we should cancel a potential hide.
      // This is i.e. leacing the avatar element, but entering
      // the floating element.
      this.clearHideFloatingTask();
    }
  }

  /**
   * Handles the mouseout for the floating element.
   */
  protected handleFloatingMouseOut() {
    if (this.trigger === 'hover' && this.isFloatingOpen && !this.disabled) {
      // Schedule hiding of the current floating.
      this.invokeHideFloatingTask();
    }
  }
}

export default PersonAvatarElement;
