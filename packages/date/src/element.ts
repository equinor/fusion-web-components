import { html, LitElement, property, TemplateResult } from 'lit-element';
import { format, formatDistance, formatRelative, Locale } from 'date-fns';
import { enGB } from 'date-fns/locale';

const defaultDateFormat = 'dd.MM.yyyy';
const defaultTimeFormat = 'HH:mm';
const defaultDateTimeFormat = 'HH:mm dd.MM.yyyy';

export type DateVariant = 'date' | 'time' | 'datetime' | 'relative' | 'distance';

export interface DateElementProps {
  date?: Date;
  dateFrom?: Date;
  dateTo?: Date;
  format?: string;
  locale?: Locale;
  variant?: DateVariant;
}

export class DateElement extends LitElement implements DateElementProps {
  @property({ type: Object, reflect: true })
  date: Date = new Date();

  @property({ type: Object, reflect: true })
  dateFrom?: Date = undefined;

  @property({ type: Object, reflect: true })
  dateTo?: Date = undefined;

  @property({ type: String, reflect: true })
  format?: string = undefined;

  @property({ type: Object, reflect: true })
  locale: Locale = enGB;

  @property({ type: Boolean, reflect: true })
  relative: boolean = false;

  @property({ type: String, reflect: true })
  variant: DateVariant = 'datetime';

  constructor() {
    super();
    this.dateFrom = this.date;
  }

  protected resolveDateString(): string {
    if (this.format) {
      return format(this.date ?? new Date(), this.format, { locale: this.locale });
    }

    switch (this.variant) {
      case 'date':
        return format(this.date, defaultDateFormat, { locale: this.locale });
      case 'time':
        return format(this.date, defaultTimeFormat, { locale: this.locale });
      case 'datetime':
        return format(this.date, defaultDateTimeFormat, { locale: this.locale });
      case 'relative':
        return formatRelative(this.dateFrom ?? new Date(), this.dateTo ?? new Date(), { locale: this.locale });
      case 'distance':
        return formatDistance(this.dateFrom ?? new Date(), this.dateTo ?? new Date(), { locale: this.locale });
      default:
        return format(this.date ?? new Date(), defaultDateTimeFormat, { locale: this.locale });
    }
  }

  protected render(): TemplateResult {
    return html`<span>${this.resolveDateString()}</span>`;
  }
}

export default DateElement;
