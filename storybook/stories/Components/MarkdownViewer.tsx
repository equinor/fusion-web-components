import { createComponent } from '@equinor/fusion-react-utils';

import { MarkdownViewerElementProps, MarkdownViewerElement, MarkdownViewerTag } from '@equinor/fusion-wc-markdown';

export const MarkdownViewer = createComponent<MarkdownViewerElement, MarkdownViewerElementProps>(
  MarkdownViewerElement,
  MarkdownViewerTag
);

export type MarkdownViewerProps = React.ComponentProps<typeof MarkdownViewer>;

export default MarkdownViewer;
