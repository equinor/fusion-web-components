import { createComponent } from '@equinor/fusion-react-utils';

import {
  MarkdownEditorElementProps,
  MarkdownEditorElement,
  tag as MarkdownEditorTag,
} from '@equinor/fusion-wc-markdown';

export { MenuSizes } from '@equinor/fusion-wc-markdown';

MarkdownEditorElement;

export const MarkdownEditor = createComponent<MarkdownEditorElement, MarkdownEditorElementProps>(
  MarkdownEditorElement,
  MarkdownEditorTag
);

export type MarkdownEditorProps = React.ComponentProps<typeof MarkdownEditor>;

export default MarkdownEditor;
