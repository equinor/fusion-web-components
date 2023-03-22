import { fusionElement } from '@equinor/fusion-wc-core';
import { MarkdownEditorElement } from './element';
import { MarkdownEditorElementProps } from './types';

export * from './element';
export * from './types';
export const tag = 'fwc-markdown-editor';

@fusionElement(tag)
export default class _ extends MarkdownEditorElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: MarkdownEditorElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<React.PropsWithChildren<MarkdownEditorElementProps>, MarkdownEditorElement>;
    }
  }
}
