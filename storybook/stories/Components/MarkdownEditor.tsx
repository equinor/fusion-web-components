import { createComponent } from '@equinor/fusion-react-utils';

import { MarkdownEditorElementProps, MarkdownEditorElement, markdownEditorTag } from '@equinor/fusion-wc-markdown';

export { MenuSizes } from '@equinor/fusion-wc-markdown';

MarkdownEditorElement;

export const MarkdownEditor = createComponent<MarkdownEditorElement, MarkdownEditorElementProps>(
  MarkdownEditorElement,
  markdownEditorTag
);

export type MarkdownEditorProps = React.ComponentProps<typeof MarkdownEditor>;

export default MarkdownEditor;
