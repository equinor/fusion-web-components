import { fusionElement } from '@equinor/fusion-wc-core';
import { MarkdownViewerElement } from './element';
import { MarkdownViewerElementProps } from './types';

export * from './element';
export * from './types';
export const tag = 'fwc-markdown-viewer';

@fusionElement(tag)
export default class _ extends MarkdownViewerElement {}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: MarkdownViewerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      [tag]: React.DetailedHTMLProps<React.PropsWithChildren<MarkdownViewerElementProps>, MarkdownViewerElement>;
    }
  }
}
