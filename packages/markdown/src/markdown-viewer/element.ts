import { css, type CSSResult, html, LitElement, type PropertyValues, type TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MarkdownViewerElementProps } from './types';
import { defaultMarkdownParser } from 'prosemirror-markdown';
import { highlightCodeBlocks, codeHighlighterStyles } from './code-highlighter';

const styles = css`
  slot {
    display: none;
  }
`;

/**
 * @tag fwc-markdown-viewer
 */
export class MarkdownViewerElement extends LitElement implements MarkdownViewerElementProps {
  static styles: CSSResult[] = [styles, codeHighlighterStyles];

  @property({
    type: String,
    reflect: false,
    attribute: true,
  })
  public value = '';

  /**
   * @internal
   */
  protected content = '';

  /**
   * @internal
   */
  @query('slot')
  mainSlot!: HTMLSlotElement;

  protected firstUpdated(): void {
    this.highlightCodeBlocks();
  }

  protected updated(props: PropertyValues): void {
    if (props.has('value') && this.value !== props.get('value')) {
      this.content = defaultMarkdownParser.tokenizer.render(this.value);
      this.requestUpdate('content');
      // Highlight code blocks after content is updated
      setTimeout(() => this.highlightCodeBlocks(), 0);
    }
  }

  private async highlightCodeBlocks(): Promise<void> {
    const contentElement = this.shadowRoot?.getElementById('content');
    if (contentElement) {
      await highlightCodeBlocks(contentElement);
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
