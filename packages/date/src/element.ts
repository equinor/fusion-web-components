import { html, LitElement, property, PropertyValues, TemplateResult } from 'lit-element';
import { format, formatDistance, formatRelative, Locale } from 'date-fns';
import { enGB } from 'date-fns/locale';

const defaultDateFormat = 'dd.MM.yyyy';
const defaultTimeFormat = 'HH:mm';
const defaultTimeSecondsFormat = 'HH:mm:ss';
const defaultDateTimeFormat = 'HH:mm dd.MM.yyyy';
const defaultDateTimeSecondsFormat = 'HH:mm:ss dd.MM.yyyy';

export type DateVariant = 'date' | 'time' | 'datetime' | 'relative' | 'distance' | 'custom';

export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface DateElementProps {
  addSuffix?: boolean;
  capitalizeFirstLetter?: boolean;
  date?: Date;
  baseDate?: Date;
  format?: string;
  includeSeconds?: boolean;
  locale?: Locale;
  variant?: DateVariant;
  weekStartsOn?: WeekDay;
}

export class DateElement extends LitElement implements DateElementProps {
  @property({ type: Boolean, reflect: true })
  addSuffix: boolean = false;

  @property({ type: Boolean, reflect: true })
  capitalizeFirstLetter: boolean = false;

  @property({ type: Object, reflect: true })
  date: Date = new Date();

  @property({ type: Object, reflect: true })
  baseDate: Date = new Date();

  @property({ type: String, reflect: true })
  format?: string = undefined;

  @property({ type: Boolean, reflect: true })
  includeSeconds?: boolean = false;

  @property({ type: Object, reflect: true })
  locale: Locale = enGB;

  @property({ type: Boolean, reflect: true })
  relative: boolean = false;

  @property({ type: String, reflect: true })
  variant: DateVariant = 'datetime';

  @property({ type: Number, reflect: true })
  weekStartsOn: WeekDay = 1;

  constructor() {
    super();
    this.baseDate = this.date;
  }

  protected resolveDateString(): string {
    if (this.format) {
      return format(this.date ?? new Date(), this.format, { locale: this.locale });
    }

    switch (this.variant) {
      case 'date':
        return format(this.date, defaultDateFormat, { locale: this.locale });
      case 'time':
        return format(this.date, this.includeSeconds ? defaultTimeSecondsFormat : defaultTimeFormat, {
          locale: this.locale,
        });
      case 'datetime':
        return format(this.date, this.includeSeconds ? defaultDateTimeSecondsFormat : defaultDateTimeFormat, {
          locale: this.locale,
        });
      case 'relative':
        return formatRelative(this.date, this.baseDate, { locale: this.locale });
      case 'distance':
        return formatDistance(this.date, this.baseDate, {
          locale: this.locale,
          includeSeconds: this.includeSeconds,
          addSuffix: this.addSuffix,
        });
      default:
        return format(this.date, defaultDateTimeFormat, { locale: this.locale });
    }
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('format')) {
      if (this.format) {
        this.variant = 'custom';
      }
      this.requestUpdate();
    }
  }

  protected render(): TemplateResult {
    let dateString = this.resolveDateString();

    if (this.capitalizeFirstLetter) {
      dateString = dateString.charAt(0).toUpperCase() + dateString.slice(1);
    }

    return html`<span>${dateString}</span>`;
  }
}

export default DateElement;
