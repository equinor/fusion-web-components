import { css, type CSSResult, html, LitElement, type PropertyValues, type TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MarkdownViewerElementProps } from './types';
import { defaultMarkdownParser } from 'prosemirror-markdown';

const styles = css`
  slot {
    display: none;
  }
`;

export class MarkdownViewerElement extends LitElement implements MarkdownViewerElementProps {
  static styles: CSSResult = styles;

  @property({
    type: String,
    reflect: false,
    attribute: true,
  })
  public value = '';

  protected content = '';

  @query('slot')
  mainSlot!: HTMLSlotElement;

  protected updated(props: PropertyValues): void {
    if (props.has('value') && this.value !== props.get('value')) {
      this.content = defaultMarkdownParser.tokenizer.render(this.value);
      this.requestUpdate('content');
    }
  }

  protected handleSlotChange(): void {
    this.value = this.mainSlot.assignedNodes()[0]?.textContent || '';
  }

  protected render(): TemplateResult {
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
      <div id="content">${unsafeHTML(this.content)}</div>
    `;
  }
}

export default MarkdownViewerElement;
