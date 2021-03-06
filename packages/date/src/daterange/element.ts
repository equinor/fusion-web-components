import { html, LitElement, property, PropertyValues, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { formatDistance, formatISO, formatRelative } from 'date-fns';
import { enGB } from 'date-fns/locale';
import parseISO from 'date-fns/parseISO';
import { DateRangeVariant, DateTimeFormat, LocaleName, WeekDay } from '../types';
import { resolveLocale } from '../utils/resolve-locale';

export type DateRangeElementProps = {
  from: string;
  to?: string;
  variant?: DateRangeVariant;
  format?: DateTimeFormat | string;
  locale?: LocaleName;
  seconds?: boolean;
  weekstart?: WeekDay;
  suffix?: boolean;
  capitalize?: boolean;
};

export class DateRangeElement extends LitElement implements DateRangeElementProps {
  @property({ type: Boolean })
  suffix?: boolean = undefined;

  @property({ type: String })
  from: string = formatISO(new Date());

  @property({ type: String })
  to: string = formatISO(new Date());

  @property({ type: Boolean })
  seconds?: boolean = undefined;

  @property({ type: String })
  locale: LocaleName = enGB.code as LocaleName;

  @property({ type: String })
  variant: DateRangeVariant = 'datetime';

  @property({ type: Number })
  weekstart: WeekDay = 1;

  @property({ type: String })
  format?: DateTimeFormat | string = undefined;

  @property({ type: Boolean })
  capitalize?: boolean = undefined;

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
    if (this.capitalize) {
      value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  };

  protected render(): TemplateResult {
    switch (this.variant) {
      case 'relative':
        return html`<time datetime=${this.from}
          >${this.formatText(
            formatRelative(parseISO(this.from), parseISO(this.to), {
              locale: resolveLocale(this.locale),
              weekStartsOn: this.weekstart,
            })
          )}</time
        >`;
      case 'distance':
        return html`<time datetime=${this.from}
          >${this.formatText(
            formatDistance(parseISO(this.from), parseISO(this.to), {
              locale: resolveLocale(this.locale),
              includeSeconds: this.seconds,
              addSuffix: this.suffix,
            })
          )}</time
        >`;
      case 'datetime':
        return html`<span>
          <fwc-datetime date=${this.from} format=${ifDefined(this.format)}></fwc-datetime>
          <slot name="separator"><span>-</span></slot>
          <fwc-datetime date=${this.to} format=${ifDefined(this.format)}></fwc-datetime>
        </span>`;
    }
  }
}

export default DateRangeElement;
