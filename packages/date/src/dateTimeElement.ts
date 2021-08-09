import { html, LitElement, property, TemplateResult } from 'lit-element';
import { format, formatISO, Locale } from 'date-fns';
import { enGB } from 'date-fns/locale';
import parseISO from 'date-fns/parseISO';

export enum DateTimeFormat {
  date = 'dd.MM.yyyy',
  time = 'HH:mm',
  dateTime = 'HH:mm dd.MM.yyyy',
  timeWithSeconds = 'HH:mm:ss',
  dateTimeWithSeconds = 'HH:mm:ss dd.MM.yyyy',
}

export interface DateTimeElementProps {
  date: string;
  locale?: Locale;
  format?: DateTimeFormat | string;
}

export class DateTimeElement extends LitElement implements DateTimeElementProps {
  @property({ type: String })
  date: string = formatISO(new Date());

  @property({ type: String })
  format: string = DateTimeFormat.dateTime;

  @property({ type: Object })
  locale: Locale = enGB;

  /** @override */
  protected createRenderRoot(): Element {
    return this;
  }

  protected render(): TemplateResult {
    return html`<time datetime=${this.date}
      >${format(parseISO(this.date), this.format, { locale: this.locale })}</time
    >`;
  }
}

export default DateTimeElement;
