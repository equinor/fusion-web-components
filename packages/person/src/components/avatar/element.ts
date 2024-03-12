// TODO - CLEAN UP!
import { CSSResult, TemplateResult, html, LitElement, PropertyValues } from 'lit';

import { property, queryAssignedElements, queryAsync, state } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';

import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';
import { AvatarData, PersonAvatarElementProps } from './types';
import { PersonAccountType, PersonAvailability } from '../../types';
import '../card';
import { computePosition, shift, offset, autoPlacement, autoUpdate } from '@floating-ui/dom';
import style from './element.css';
import { PersonInfoControllerHost, PersonInfoTask } from '../../tasks/person-info-task';
import { PersonPhotoControllerHost, PersonPhotoTask } from '../../tasks/person-photo-task';

import Badge, { BadgeColor, BadgeElementProps } from '@equinor/fusion-wc-badge';
import Avatar, { type AvatarElementProps } from '@equinor/fusion-wc-avatar';
import Skeleton, { SkeletonVariant } from '@equinor/fusion-wc-skeleton';
import Icon, { IconElementProps } from '@equinor/fusion-wc-icon';

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
 *
 * @fires click - When the element is clicked, only fires when `clickable` is set to `true` and `disabled` is set to `false`.
 *
 * @summary
 */
export class PersonAvatarElement
  extends LitElement
  implements PersonAvatarElementProps, PersonInfoControllerHost, PersonPhotoControllerHost
{
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
  @queryAssignedElements({ slot: 'floating', flatten: true })
  private assignedFloating!: Array<HTMLElement>;

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
  protected getRenderClasses(accountType?: PersonAccountType[keyof PersonAccountType]): ClassInfo {
    return {
      'employee-color': accountType === PersonAccountType.Employee,
      'consultant-color': accountType === PersonAccountType.Consultant || accountType === PersonAccountType.Enterprise,
      'external-color': accountType === PersonAccountType.External,
      'external-hire-color': accountType === PersonAccountType.ExternalHire,
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

  protected render(): TemplateResult {
    if (!this.tasks) {
      return this.renderImagePlaceholder();
    }
    return html`<div id="root">
      ${this.tasks.info.render({
        complete: (details: AvatarData) => {
          const { accountType, name } = details;
          const classes = classMap(this.getRenderClasses(accountType));
          return html`<div>
            <fwc-avatar
              class=${classes}
              .size=${this.size}
              ?clickable=${this.clickable}
              ?disabled=${this.disabled}
              @click=${this.handleOnClick}
              @mouseover=${this.handleMouseOver}
              @mouseout=${this.handleMouseOut}
              border
            >
              ${this.tasks?.photo.render({
                complete: (src) => html`<img src=${src} alt="${name}" />`,
                pending: () => this.renderImagePlaceholder(true),
                error: () => {
                  console.log('failed');
                  return html`${name?.substring(0, 1)?.toUpperCase()}`;
                },
              })}
            </fwc-avatar>
          </div>`;
        },
        pending: () => html`<fwc-avatar size=${this.size}>${this.renderImagePlaceholder(true)}</fwc-avatar>`,
        error: () => html`<fwc-avatar size=${this.size} inactive>${this.renderImagePlaceholder(false)}</fwc-avatar>`,
      })}
      <div id="floating">
        <slot name="floating">
          ${when(
            this.isFloatingOpen,
            () => html`<fwc-person-card .azureId="${this.azureId}" .upn="${this.upn}"></fwc-person-card>`,
          )}
        </slot>
      </div>
    </div>`;
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

  protected handleMouseOver(_e: MouseEvent): void {
    if (this.trigger === 'hover' && this.isFloatingOpen === false && !this.disabled) {
      PersonAvatarElement.hideAllFloating();

      const timeout = setTimeout(() => {
        this.showFloating.bind(this)();
        this.removeEventListener('mouseout', listenerForMouseOut);
      }, 500);

      const listenerForMouseOut = (_e: MouseEvent) => {
        clearTimeout(timeout);
        this.removeEventListener('mouseout', listenerForMouseOut);
      };

      this.addEventListener('mouseout', listenerForMouseOut);
    }
  }

  protected handleMouseOut(_e: MouseEvent): void {
    if (this.trigger === 'hover' && this.isFloatingOpen && !this.disabled) {
      const timeoutMouseOverAssignerFloating = setTimeout(() => {
        PersonAvatarElement.hideAllFloating();

        this.assignedFloating.forEach((el) => {
          el.removeEventListener('mouseover', listenerForMouseOverAssignedFloating);
        });
      }, 500);

      const listenerForMouseOverAssignedFloating = (_e: MouseEvent) => {
        clearTimeout(timeoutMouseOverAssignerFloating);
        this.assignedFloating.forEach((el) => {
          el.removeEventListener('mouseover', listenerForMouseOverAssignedFloating);

          this.assignedFloating.forEach((el) => {
            el.addEventListener('mouseout', () => {
              const timeoutMouseOutAssignerFloating = setTimeout(() => {
                PersonAvatarElement.hideAllFloating();
                this.removeEventListener('mouseover', listenerForMouseOutAssignedFloating);
              }, 500);

              const listenerForMouseOutAssignedFloating = (_e: MouseEvent) => {
                clearTimeout(timeoutMouseOutAssignerFloating);
                this.removeEventListener('mouseover', listenerForMouseOutAssignedFloating);
              };

              this.addEventListener('mouseover', listenerForMouseOutAssignedFloating);
            });
          });
        });
      };

      this.assignedFloating.forEach((el) => {
        el.addEventListener('mouseover', listenerForMouseOverAssignedFloating);
      });
    }
  }
}

export default PersonAvatarElement;
