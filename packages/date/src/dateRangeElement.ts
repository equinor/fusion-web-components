import { html, LitElement, property, TemplateResult } from 'lit-element';
import { formatDistance, formatISO, formatRelative, Locale } from 'date-fns';
import { enGB } from 'date-fns/locale';
import parseISO from 'date-fns/parseISO';

export type DateRangeVariant = 'distance' | 'relative';

export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface DateRangeElementProps {
  addSuffix?: boolean;
  baseDate?: string;
  date: string;
  includeSeconds?: boolean;
  locale?: Locale;
  variant?: DateRangeVariant;
  weekStartsOn?: WeekDay;
}

export class DateRangeElement extends LitElement implements DateRangeElementProps {
  @property({ type: Boolean })
  addSuffix?: boolean = false;

  @property({ type: String })
  baseDate: string = formatISO(new Date());

  @property({ type: String })
  date: string = formatISO(new Date());

  @property({ type: Boolean })
  includeSeconds?: boolean = false;

  @property({ type: Object })
  locale: Locale = enGB;

  @property({ type: String })
  variant: DateRangeVariant = 'relative';

  @property({ type: Number })
  weekStartsOn: WeekDay = 1;

  /** @override */
  protected createRenderRoot(): Element {
    return this;
  }

  protected resolveValue(): string {
    switch (this.variant) {
      case 'relative':
        return formatRelative(parseISO(this.date), parseISO(this.baseDate), {
          locale: this.locale,
          weekStartsOn: this.weekStartsOn,
        });
      case 'distance':
        return formatDistance(parseISO(this.date), parseISO(this.baseDate), {
          locale: this.locale,
          includeSeconds: this.includeSeconds,
          addSuffix: this.addSuffix,
        });
    }
  }

  protected render(): TemplateResult {
    return html`<time datetime=${this.date}>${this.resolveValue()}</time>`;
  }
}

export default DateRangeElement;
