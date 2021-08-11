import { html, LitElement, property, TemplateResult } from 'lit-element';
import { format, formatISO, Locale } from 'date-fns';
import { enGB } from 'date-fns/locale';
import parseISO from 'date-fns/parseISO';
import { DateTimeFormat } from './types';

export interface DateTimeElementProps {
  date: string;
  locale?: Locale;
  format?: DateTimeFormat | string;
}

export class DateTimeElement extends LitElement implements DateTimeElementProps {
  @property({ type: String })
  date: string = formatISO(new Date());

  @property({ type: String })
  format: DateTimeFormat | string = DateTimeFormat.datetime;

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
