import { html, LitElement, TemplateResult } from 'lit';
import { Task } from '@lit-labs/task';
import { property } from 'lit/decorators.js';
import { ClassInfo } from 'lit/directives/class-map.js';
import { PersonElementProps } from './types';
import { PersonPresence, PersonDetails, PersonAccountType, PersonAvailability } from '../types';
import { PersonHost } from '../person-provider';
import { PersonController } from '../person-provider';
import { SkeletonSize, SkeletonVariant } from '@equinor/fusion-wc-skeleton';

/**
 * @property {string} azureId - Azure unique id for the person.
 *
 * @summary Base element for person elements implementing a reactive controller to resolve person data by 'azureId'.
 */
export class PersonElement extends LitElement implements PersonHost, PersonElementProps {
  /**
   * Unique Azure ID
   */
  @property({ type: String })
  azureId = '';

  protected controller: PersonController;

  details?: Task<[string], PersonDetails>;

  presence?: Task<[string], PersonPresence>;

  constructor() {
    super();
    this.controller = new PersonController(this);
  }

  /**
   * Renders pending state for content
   */
  public renderTextPlaceholder(inactive?: boolean, size?: SkeletonSize): TemplateResult {
    return html`<fwc-skeleton
      size=${size}
      variant=${SkeletonVariant.Text}
      icon="image"
      ?inactive=${inactive}
    ></fwc-skeleton>`;
  }

  /**
   * Renders pending state for avatar
   */
  public renderImagePlaceholder(inactive?: boolean, size?: string): TemplateResult {
    return html`<fwc-skeleton
      size=${size}
      variant=${SkeletonVariant.Circle}
      icon="image"
      ?inactive=${inactive}
    ></fwc-skeleton>`;
  }

  /**
   * Returns the first character in the person's name as upper case initial
   */
  public getInitial(name?: string): string | undefined {
    return name?.substring(0, 1)?.toUpperCase();
  }

  /**
   * Returns color classes for the account type
   */
  public getAccountTypeColorClass(accountType?: PersonAccountType): string | void {
    switch (accountType) {
      case PersonAccountType.Employee:
        return 'fwc-person-type__employee';
      case PersonAccountType.ExternalHire:
      case PersonAccountType.XExternal:
        return 'fwc-person-type__external';
      case PersonAccountType.JointVentureAffiliate:
        return 'fwc-person-type__consultant';
    }
  }

  /**
   * Returns the status color for the current availability of the person
   */
  public getStatusColor(availability?: PersonAvailability): ClassInfo {
    return {
      'fwc-status-icon__success': availability === (PersonAvailability.Available || PersonAvailability.AvailableIdle),
      'fwc-status-icon__warning': availability === (PersonAvailability.Away || PersonAvailability.BeRightBack),
      'fwc-status-icon__danger':
        availability === (PersonAvailability.Busy || PersonAvailability.BusyIdle || PersonAvailability.DoNotDisturb),
    };
  }
}

export default PersonElement;
