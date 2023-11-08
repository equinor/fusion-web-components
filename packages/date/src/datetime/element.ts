import { html, LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { format as formatDate } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { DateTimeFormat } from '../types';
import { resolveLocale, dateConverter } from '../utils';

export type DateTimeElementProps = {
  date?: Date | string;
  locale?: string;
  format?: DateTimeFormat | string;
};

const formatConverter = (value: string | null): string | null => {
  if (value && value in DateTimeFormat) {
    return DateTimeFormat[value as keyof typeof DateTimeFormat];
  }
  return value;
};

/**
 * @tag fwc-datetime
 */
export class DateTimeElement extends LitElement implements DateTimeElementProps {
  @property({ type: Date, reflect: true, converter: dateConverter })
  date?: Date = new Date();

  @property({ type: String, converter: { fromAttribute: formatConverter } })
  format?: DateTimeFormat | string;

  @property({ type: String })
  locale: string = enGB.code as string;

  get formatted(): string {
    const { date, locale, format = DateTimeFormat.datetime } = this;
    if (date) {
      return formatDate(date, format, { locale: resolveLocale(locale) });
    }
    return '';
  }

  /** @override */
  protected createRenderRoot(): HTMLElement {
    return this;
  }

  protected render(): TemplateResult {
    return html`<time datetime=${ifDefined(this.date?.toISOString())}>${this.formatted}</time>`;
  }
}

export default DateTimeElement;
