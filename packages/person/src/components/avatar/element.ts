// TODO - CLEAN UP!
import { html, LitElement } from 'lit';
import type { CSSResult, TemplateResult, PropertyValues } from 'lit';

import { property, queryAsync, state } from 'lit/decorators.js';
import { type ClassInfo, classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';

import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';
import type { AvatarData, PersonAvatarElementProps } from './types';
import { type AccountClassification, PersonAccountType, PersonAvailability } from '../../types';
import '../card';
import { computePosition, shift, offset, autoPlacement, autoUpdate } from '@floating-ui/dom';
import style from './element.css';
import { type PersonInfoControllerHost, PersonInfoTask } from '../../tasks/person-info-task';
import { type PersonPhotoControllerHost, PersonPhotoTask } from '../../tasks/person-photo-task';

import Badge, { BadgeColor, type BadgeElementProps } from '@equinor/fusion-wc-badge';
import Avatar, { type AvatarElementProps } from '@equinor/fusion-wc-avatar';
import Skeleton, { SkeletonVariant } from '@equinor/fusion-wc-skeleton';
import Icon, { type IconElementProps } from '@equinor/fusion-wc-icon';

// persist elements
Badge;
Avatar;
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
export class PersonAvatarElement
  extends LitElement
  implements PersonAvatarElementProps, PersonInfoControllerHost, PersonPhotoControllerHost {
  static styles: CSSResult[] = [style];

  @property({ type: String })
  public azureId?: string;

  @property({ type: String })
  public upn?: string;

  @property({ type: String })
  public dataSource?: AvatarData;

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
  size?: AvatarElementProps['size'];

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
   */
  @property({ type: Boolean })
  showLetter?: boolean;

  /**
   * Custom color of the avatar.
   */
  @property({ type: String })
  customColor?: string;

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
  private tasks?: {
    info: PersonInfoTask;
    photo: PersonPhotoTask;
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
              photo: new PersonPhotoTask(this),
            };
          }
        }
      },
    }),
  };

  /**
   * @internal
   */
  static openedPersonAvatars: PersonAvatarElement[] = [];

  connectedCallback(): void {
    super.connectedCallback();

    // if the dataSource is set, also set the azureId to resolve the photo from tasks
    if (this.dataSource) {
      this.azureId = this.dataSource.azureId;
    }
  }

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

  /**
   * Returns the badge color for the current presence
   */
  protected getRenderClasses(
    accountType?: PersonAccountType[keyof PersonAccountType],
    accountClassification?: AccountClassification,
  ): ClassInfo {
    const isEmployee = accountType === PersonAccountType.Employee;
    const isConsultantOrEnterprise =
      accountType === PersonAccountType.Consultant || accountType === PersonAccountType.Enterprise;
    const isExternal = accountType === PersonAccountType.External;

    return {
      'employee-color': isEmployee && accountClassification === 'Internal',
      'consultant-color': isConsultantOrEnterprise,
      'external-color': isExternal,
      'external-hire-color': isEmployee && accountClassification === 'External',
    };
  }

  /**
   * Returns the badge color for the current presence
   */
  protected getBadgeColor(availability: PersonAvailability): BadgeElementProps['color'] {
    if (this.disabled) {
      return BadgeColor.Disabled;
    }

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
   * Returns the badge icon for the current presence
   */
  protected getBadgeIcon(availability: PersonAvailability): IconElementProps['icon'] {
    switch (availability) {
      case PersonAvailability.Available:
        return 'check_circle_outlined';
      case PersonAvailability.AvailableIdle:
      case PersonAvailability.Away:
      case PersonAvailability.BeRightBack:
      case PersonAvailability.BusyIdle:
        return 'time';
      case PersonAvailability.DoNotDisturb:
      case PersonAvailability.Busy:
        return 'blocked';
      case PersonAvailability.Offline:
        return 'close_circle_outlined';
      case PersonAvailability.Pending:
        return 'more_horizontal';
      default:
        return 'do_not_disturb';
    }
  }

  /**
   * Renders the presence badge
   */
  protected renderBadge(availability: PersonAvailability): TemplateResult {
    return html`<fwc-badge
      slot="badge"
      .color=${this.getBadgeColor(availability)}
      .icon=${this.getBadgeIcon(availability)}
      .size=${this.size}
      position="bottom-right"
      ?disabled=${this.disabled}
      circular
    />`;
  }

  protected renderApplicationBadge(person: Partial<AvatarData>): TemplateResult {
    if (!person.applicationId) {
      return html``;
    }

    return html`
      <div slot="badge" id="application-badge" style="background-color: ${person.avatarColor};">
        <fwc-icon
          icon="apps"
        ></fwc-icon>
      </div>
    `;
  }

  protected renderImage(person: Partial<AvatarData>): TemplateResult {
    if (this.showLetter) {
      return html`${person.name?.substring(0, 1)?.toUpperCase()}`;
    }

    return this.tasks?.photo.render({
      complete: (src) => html`<img src="${src}" alt="${person.name}" />`,
      pending: () => this.renderImagePlaceholder(true),
      error: () => {
        return html`${person.name?.substring(0, 1)?.toUpperCase()}`;
      },
    }) ?? html``;
  }

  protected renderAvatarElement(details: Partial<AvatarData>): TemplateResult {
    const { accountType, accountClassification } = details;
    const classes = classMap(this.getRenderClasses(accountType, accountClassification));
    const avatarColorVariable = this.customColor ? `--fwc-avatar-color: ${this.customColor}` : '';
    return html`
      <fwc-avatar
        style=${avatarColorVariable}
        class=${classes}
        .size=${this.size}
        clickable=${this.clickable}
        ?disabled=${this.disabled}
        @click=${this.handleOnClick}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
        border
      >
        ${this.renderImage(details)}
        ${this.renderApplicationBadge(details)}
      </fwc-avatar>
    `;
  }

  protected render(): TemplateResult {
    if (!this.tasks) {
      return this.renderImagePlaceholder();
    }
    return html`
      <div id="root">
        ${this.tasks.info.render({
      complete: (details) => {
        return html`
          ${this.renderAvatarElement(details)}
          <div id="floating" @mouseover="${this.handleFloatingMouseOver}" @mouseout="${this.handleFloatingMouseOut}">
            <slot name="floating">
              ${when(this.isFloatingOpen, () =>
          html`<fwc-person-card onclick="event.stopPropagation()" .dataSource="${details}" customColor=${this.customColor}></fwc-person-card>`,
        )}
            </slot>
          </div>
        `;
      },
      pending: () => html`< fwc-avatar size=${this.size}>${this.renderImagePlaceholder(true)}</fwc-avatar>`,
      error: () => html`<fwc-avatar size=${this.size} inactive>${this.renderImagePlaceholder(false)}</fwc-avatar>`,
    })}
    </div>
  `;
  }

  public renderImagePlaceholder(inactive?: boolean): TemplateResult {
    const { size } = this;
    return html`<fwc-skeleton
      size=${size}
      variant=${SkeletonVariant.Circle}
      icon="image"
      ?inactive=${inactive}
    ></fwc-skeleton>`;
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
