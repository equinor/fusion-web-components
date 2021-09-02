import { html, LitElement, property, TemplateResult } from 'lit-element';
import { format as formatDate } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { DateTimeFormat } from '../types';
import { resolveLocale, dateConverter } from '../utils';

export type DateTimeElementProps = {
  date: Date | string;
  locale?: string;
  format?: DateTimeFormat | string;
};

const formatConverter = (value: string | null): string | null => {
  if (value && value in DateTimeFormat) {
    return DateTimeFormat[value as keyof typeof DateTimeFormat];
  }
  return value;
};

export class DateTimeElement extends LitElement implements DateTimeElementProps {
  @property({ type: Date, reflect: true, converter: dateConverter })
  date: Date = new Date();

  @property({ type: String, converter: { fromAttribute: formatConverter } })
  format?: DateTimeFormat;

  @property({ type: String })
  locale: string = enGB.code as string;

  get formatted(): string {
    const { date, locale, format = DateTimeFormat.datetime } = this;
    return formatDate(date, format, { locale: resolveLocale(locale) });
  }

  /** @override */
  protected createRenderRoot(): Element {
    return this;
  }

  protected render(): TemplateResult {
    return html`<time datetime=${this.date.toISOString()}>${this.formatted}</time>`;
  }
}

export default DateTimeElement;
