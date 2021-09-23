import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { formatDistance, formatRelative } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { DateRangeVariant, DateTimeFormat, WeekDay } from '../types';
import { dateConverter, resolveLocale } from '../utils';

import '../datetime';

export type DateRangeElementProps = {
  /** ISO start time */
  from: Date | string;

  /** ISO end time */
  to?: Date | string;

  /** Range variant to display */
  variant?: DateRangeVariant;

  /** Formatting when variant `datetime` is provided */
  format?: DateTimeFormat | string;

  // see date-fns/locale
  locale?: string;

  /** Include seconds in the calculation */
  seconds?: boolean;

  /** define which weekday is the start of the week */
  weekstart?: WeekDay | number;

  suffix?: boolean;

  /** Capitalize first letter of resolved value */
  capitalize?: boolean;
};

export class DateRangeElement extends LitElement implements DateRangeElementProps {
  //#region Attributes

  @property({ type: Boolean })
  suffix?: boolean = undefined;

  @property({ type: String, converter: dateConverter })
  from = new Date();

  @property({ type: String, converter: dateConverter })
  to?: Date;

  @property({ type: Boolean })
  seconds?: boolean = undefined;

  @property({ type: String, reflect: true })
  /** date-fns/locale */
  locale: string = enGB.code as string;

  @property({ type: String })
  variant: DateRangeVariant = 'datetime';

  @property({ type: Number })
  weekstart: WeekDay = 1;

  @property({ type: String })
  format?: DateTimeFormat | string = undefined;

  @property({ type: Boolean })
  capitalize?: boolean = undefined;
  //#endregion

  // #region PROPS
  get Locale(): Locale {
    return resolveLocale(this.locale);
  }

  get Distance(): string {
    return formatDistance(this.from, this.to || new Date(), {
      locale: this.Locale,
      addSuffix: this.suffix,
      includeSeconds: this.seconds,
    });
  }

  get Relative(): string {
    return formatRelative(this.from, this.to || new Date(), {
      locale: this.Locale,
      weekStartsOn: this.weekstart,
    });
  }
  //#endregion

  /** @overide */
  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('format')) {
      if (this.format !== undefined && this.variant !== 'datetime') {
        this.variant = 'datetime';
      }
      this.requestUpdate();
    }
  }

  protected formatText = (value: string): string => {
    return this.capitalize ? value.charAt(0).toUpperCase() + value.slice(1) : value;
  };

  protected render(): TemplateResult {
    switch (this.variant) {
      case 'relative':
        return html`<span>
          <time data-date-start=${this.from.toISOString()}></time>
          <time data-date-end=${ifDefined(this.to?.toISOString())}></time>
          ${this.formatText(this.Relative)}
        </span>`;
      case 'distance':
        return html`<span>
          <time data-date-start=${this.from.toISOString()}></time>
          <time data-date-end=${ifDefined(this.to?.toISOString())}></time>
          ${this.formatText(this.Distance)}
        </span>`;
      case 'datetime':
        return html`<span>
          <fwc-datetime .date=${this.from} format=${ifDefined(this.format)}></fwc-datetime>
          <slot name="separator"><span>-</span></slot>
          <fwc-datetime .date=${this.to} format=${ifDefined(this.format)}></fwc-datetime>
        </span>`;
    }
  }
}

export default DateRangeElement;
