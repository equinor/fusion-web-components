import { html, LitElement, property, PropertyValues, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { formatDistance, formatISO, formatRelative, Locale } from 'date-fns';
import { enGB } from 'date-fns/locale';
import parseISO from 'date-fns/parseISO';
import { DateRangeVariant, DateTimeFormat, WeekDay } from './types';

export interface DateRangeElementProps {
  from: string;
  to?: string;
  variant?: DateRangeVariant;
  format?: DateTimeFormat | string;
  locale?: Locale;
  seconds?: boolean;
  weekstart?: WeekDay;
  suffix?: boolean;
}

export class DateRangeElement extends LitElement implements DateRangeElementProps {
  @property({ type: Boolean })
  suffix?: boolean = undefined;

  @property({ type: String })
  from: string = formatISO(new Date());

  @property({ type: String })
  to: string = formatISO(new Date());

  @property({ type: Boolean })
  seconds?: boolean = undefined;

  @property({ type: Object })
  locale: Locale = enGB;

  @property({ type: String })
  variant: DateRangeVariant = 'relative';

  @property({ type: Number })
  weekstart: WeekDay = 1;

  @property({ type: String })
  format?: DateTimeFormat | string = undefined;

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('format')) {
      if (this.format !== undefined && this.variant !== 'datetime') {
        this.variant = 'datetime';
      }
      this.requestUpdate();
    }
  }

  /** @override */
  protected createRenderRoot(): Element {
    return this;
  }

  protected render(): TemplateResult {
    switch (this.variant) {
      case 'relative':
        return html`<time datetime=${this.from}
          >${formatRelative(parseISO(this.from), parseISO(this.to), {
            locale: this.locale,
            weekStartsOn: this.weekstart,
          })}</time
        >`;
      case 'distance':
        return html`<time datetime=${this.from}
          >${formatDistance(parseISO(this.from), parseISO(this.to), {
            locale: this.locale,
            includeSeconds: this.seconds,
            addSuffix: this.suffix,
          })}</time
        >`;
      case 'datetime':
        return html`<span>
          <fwc-datetime date=${this.from} format=${ifDefined(this.format)}></fwc-datetime>
          <span>-</span>
          <fwc-datetime date=${this.to} format=${ifDefined(this.format)}></fwc-datetime>
        </span>`;
    }
  }
}

export default DateRangeElement;
