import { CSSResult, TemplateResult, html, LitElement, PropertyValues } from 'lit';
import { property, queryAssignedElements, queryAsync, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';
import { AvatarData, PersonAvatarElementProps } from './types';
import { PersonAccountType, PersonAvailability } from '../../types';
import Badge, { BadgeColor, IconName } from '@equinor/fusion-wc-badge';
import Avatar, { AvatarSize } from '@equinor/fusion-wc-avatar';
import Skeleton, { SkeletonVariant } from '@equinor/fusion-wc-skeleton';
import '../card';
import { computePosition, flip, shift, offset } from '@floating-ui/dom';
import style from './element.css';
import { PersonInfoControllerHost, PersonInfoTask } from '../../tasks/person-info-task';
import { PersonPhotoControllerHost, PersonPhotoTask } from '../../tasks/person-photo-task';

// persist elements
Badge;
Avatar;
Skeleton;

const clickOutside = (e: MouseEvent) => {
  PersonAvatarElement.openedPersonAvatars.forEach((el) => {
    if (el !== e.target) {
      PersonAvatarElement.hideFloating(el);
    }
  });
};

export type PersonAvatarShowCardOnType = 'click' | 'hover';

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

  @property({ type: Boolean, attribute: false, reflect: false })
  isFloatingOpen = false;

  /**
   * Size of the avatar.
   */
  @property({ type: String, reflect: true })
  size: AvatarSize = AvatarSize.Medium;

  @property({ type: String, reflect: true })
  pictureSrc?: string;

  /**
   * Sets the avatar to be clickable to render hover/ripple effects.
   */
  @property({ type: Boolean, reflect: true })
  clickable?: boolean;

  @property({ type: String, attribute: true, reflect: true })
  showFloatingOn: PersonAvatarShowCardOnType = 'click';

  /**
   * Sets the avatar to be rendered as disabled.
   */
  @property({ type: Boolean })
  disabled?: boolean;

  @queryAsync('#floating')
  public floating!: Promise<HTMLSlotElement>;

  @queryAssignedElements({ slot: 'floating', flatten: true })
  private assignedFloating!: Array<HTMLElement>;

  private tasks?: {
    info: PersonInfoTask;
    photo: PersonPhotoTask;
  };

  @state()
  protected intersected = false;

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

  static openedPersonAvatars: PersonAvatarElement[] = [];

  async updated(props: PropertyValues) {
    if (props.has('isFloatingOpen') && this.isFloatingOpen && (await this.floating) instanceof HTMLElement) {
      await this.updateComplete;
      computePosition(this, await this.floating, {
        placement: 'bottom-start',
        middleware: [offset(10), flip(), shift({ padding: 10 })],
      }).then(async ({ x, y }) => {
        // use 3d translate
        Object.assign((await this.floating).style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    }
  }

  /**
   * Returns the badge color for the current presence
   */
  protected getRenderClasses(accountType?: string): ClassInfo {
    return {
      'fwc-person-avatar__employee': accountType === PersonAccountType.Employee,
      'fwc-person-avatar__consultant': accountType === PersonAccountType.Consultant || PersonAccountType.Enterprise,
      'fwc-person-avatar__external': accountType === PersonAccountType.External,
      'fwc-person-avatar__external-hire': accountType === PersonAccountType.ExternalHire,
    };
  }

  /**
   * Returns the badge color for the current presence
   */
  protected getBadgeColor(availability: PersonAvailability): BadgeColor {
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
  protected getBadgeIcon(availability: PersonAvailability): IconName | undefined {
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

  /**
   * Returns the first character in the person's name as upper case initial
   */
  public getInitial(name?: string): string | undefined {
    return name?.substring(0, 1)?.toUpperCase();
  }

  /**
   * Renders the avatar
   */
  protected renderAvatar(details: AvatarData): TemplateResult {
    // TODO - make own component for the image!
    return html`
      ${this.tasks?.photo.render({
        complete: (pictureSrc: string) =>
          html`<fwc-avatar
            class=${classMap(this.getRenderClasses(details.accountType))}
            .size=${this.size}
            .src=${pictureSrc}
            .value=${this.getInitial(details.name)}
            ?clickable=${this.clickable}
            ?disabled=${this.disabled}
            ?border=${true}
            @click=${this.handleOnClick}
            @mouseover=${this.handleMouseOver}
            @mouseout=${this.handleMouseOut}
          ></fwc-avatar>`,
        pending: () =>
          html`<fwc-avatar
            class=${classMap(this.getRenderClasses(details.accountType))}
            .size=${this.size}
            .value=${this.getInitial(details.name)}
            ?clickable=${this.clickable}
            ?disabled=${this.disabled}
            ?border=${true}
            @click=${this.handleOnClick}
            @mouseover=${this.handleMouseOver}
            @mouseout=${this.handleMouseOut}
          ></fwc-avatar>`,
        error: () => this.renderImagePlaceholder(true),
      })}

      <slot id="floating" name="floating">
        ${when(
          this.isFloatingOpen,
          () => html`<fwc-person-card .azureId="${this.azureId}" .upn="${this.upn}"></fwc-person-card>`,
        )}
      </slot>
    `;
  }

  /**
   * Renders the avatar pending state
   */
  protected renderError(error: Error): TemplateResult {
    return html`${error}`;
  }

  /** {@inheritDoc} */
  protected render(): TemplateResult {
    if (!this.tasks) {
      return this.renderImagePlaceholder(false, this.size);
    }
    return html`${this.tasks.info.render({
      complete: (details: AvatarData) => this.renderAvatar(details),
      pending: () => this.renderImagePlaceholder(false, this.size),
      error: () => this.renderImagePlaceholder(true),
    })}`;
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
  protected handleOnClick(e: PointerEvent): void {
    if (this.showFloatingOn === 'click') {
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
    if (this.showFloatingOn === 'hover' && this.isFloatingOpen === false) {
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
    if (this.showFloatingOn === 'hover' && this.isFloatingOpen) {
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
