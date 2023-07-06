import { createComponent } from '@equinor/fusion-react-utils';

import { MarkdownViewerElementProps, MarkdownViewerElement, markdownEditorTag } from '@equinor/fusion-wc-markdown';

export const MarkdownViewer = createComponent<MarkdownViewerElement, MarkdownViewerElementProps>(
  MarkdownViewerElement,
  markdownEditorTag
);

export type MarkdownViewerProps = React.ComponentProps<typeof MarkdownViewer>;

export default MarkdownViewer;
