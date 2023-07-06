import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { property, queryAsync, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { MarkdownEditorElementProps } from './types';
import { MenuSizes } from '../types';
import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { schema, defaultMarkdownSerializer, defaultMarkdownParser } from 'prosemirror-markdown';
import { history } from 'prosemirror-history';
import { EditorState, TextSelection, Transaction, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Node } from 'prosemirror-model';
import { buildKeymap } from './keymap';
import menuPlugin from './menu';
import { MdMenuItemType } from './menuItems';
import styles from './element.css';

const defaultMenuItem: Array<MdMenuItemType> = ['strong', 'em', 'bullet_list', 'ordered_list'];

/**
 * Element for editing markdown.
 *
 * @example
 *
 * ```html
 * <fwc-markdown-editor>**some** markdown *text*</fwc-markdown-editor>
 * ```
 *
 * @usage
 *
 * ```js
 * const md = '#my heading';
 * <fwc-markdown-editor value="md" onInput={(e)=>{console.log(e)}}></fwc-markdown-editor>
 * ```
 *
 * @tag fwc-markdown-editor
 *
 * @property {Array} menuItems - List of visible menu buttons
 * @property {String} minHeight - Markdown Editor minimum height
 * @property {String} value - Markdown editors value
 * @property {MenuSizes} menuSize - Size of the menu buttons
 *
 */

export class MarkdownEditorElement extends LitElement implements MarkdownEditorElementProps {
  static styles = styles;

  /** List of visible menu buttons */
  @property({ reflect: true, type: Array, converter: (a) => a?.split(',') })
  menuItems: Array<MdMenuItemType> = defaultMenuItem;

  /** Markdown Editor minimum height */
  @property({ type: String, reflect: true })
  minHeight: string | undefined;

  /** Markdown editors value */
  @property({ type: String, reflect: true })
  value = '';

  /** Size of the menu buttons */
  @property({ type: String, reflect: true })
  menuSize: MenuSizes = 'medium';

  @state()
  _focused!: boolean;

  protected view!: EditorView;

  @queryAsync('#editor')
  editor!: Promise<HTMLDivElement>;

  @queryAsync('#menu')
  menu!: Promise<HTMLDivElement>;

  // internal state of markdown
  protected _value: string | undefined;

  /**
   * update editor state with new markdown
   * @todo move to function for setState and create a clearState
   */
  public set markdown(value: string | null) {
    const {
      state,
      view,
      state: { tr: transaction },
    } = this;
    const selection = TextSelection.create(transaction.doc, 0, transaction.doc.content.size);
    transaction.setSelection(selection);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    transaction.replaceSelectionWith(defaultMarkdownParser.parse(value));
    view.updateState(state.apply(transaction));
  }

  /**
   * get markdown from the current state of the editor
   */
  public get markdown(): string {
    const { view } = this;
    return defaultMarkdownSerializer.serialize(view.state.doc);
  }

  public get state() {
    return this.view.state;
  }

  firstUpdated(props: PropertyValues) {
    super.firstUpdated(props);

    /**
     * @todo this should get content from main slot
     * if value not provided, look in dom
     */
    if (!props.has('value') || !this.value) {
      this.value = this.innerHTML;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.innerHTML = null;
  }

  protected updated(props: PropertyValues): void {
    // update markdown state if editor is created and value has changed
    if (this.view && props.has('value') && this.value !== this._value) {
      this.markdown = this.value;
    }
  }

  /**
   * create editor when element connects to dom
   */
  connectedCallback() {
    super.connectedCallback();
    this.initializeEditor();
  }

  /**
   * teardown editor when element disconnects from dom
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.view && this.view.destroy();
  }

  private async initializeEditor() {
    const state = await this.createEditorState();
    this.view = await this.createEditorView(state);
  }

  focusPlugin(element: this, handleActiveState: (element: this, state: boolean) => void) {
    return new Plugin({
      props: {
        handleDOMEvents: {
          focus(view) {
            view.dom.classList.add('ProseMirror-focused');
            handleActiveState(element, true);
            return true;
          },
          blur() {
            handleActiveState(element, false);
            return true;
          },
        },
      },
    });
  }

  handleActiveState(element: this, state: boolean): void {
    element._focused = state;
  }

  protected async createEditorState() {
    const menu = await this.menu;
    const { menuItems, value } = this;
    return EditorState.create({
      schema,
      doc: defaultMarkdownParser.parse(value) as unknown as Node,
      plugins: [
        history(),
        keymap(buildKeymap(schema)),
        keymap(baseKeymap),
        menuPlugin(menu, menuItems),
        this.focusPlugin(this, this.handleActiveState),
      ],
    });
  }

  protected async createEditorView(state: EditorState) {
    const editor = await this.editor;
    const options = {
      state,
      dispatchTransaction: this.handleTransaction.bind(this),
    };
    return new EditorView(editor, options);
  }

  /**
   *  handle editor transitions
   */
  protected handleTransaction(tr: Transaction): void {
    const state = this.view.state.apply(tr);
    this.view.updateState(state);

    if (tr.docChanged) {
      console.log('handleTransaction', tr);
      const { markdown } = this;
      this._value = markdown;

      // add new mardownEvent
      const inputEvent = new CustomEvent('markdownEvent', { detail: this });
      this.dispatchEvent(inputEvent);
    }
  }

  /**
   * handle change event
   */
  protected handleChange(_tr: Transaction): void {
    const { markdown } = this;
    this._value = markdown;
  }

  private setMinHeight(): TemplateResult {
    return !this.minHeight
      ? html``
      : html`<style>
          #editor {
            min-height: ${this.minHeight};
          }
        </style>`;
  }

  protected render(): TemplateResult {
    return html`
      <div class=${classMap({ container: true, focused: this._focused })}>
        <div id="menu"></div>
        <div id="editor"></div>
      </div>
      ${this.setMinHeight()}
    `;
  }
}

export default MarkdownEditorElement;
