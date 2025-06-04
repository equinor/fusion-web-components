import { html } from 'lit';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';

import {
  MarkdownViewerElement,
  MarkdownViewerElementProps,
} from '@equinor/fusion-wc-markdown';
import cem from '@equinor/fusion-wc-markdown/custom-elements.json';
import markdownExample from './markdown.example.md?raw';

MarkdownViewerElement;

setCustomElementsManifest(cem);

type Story = StoryObj<MarkdownViewerElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-markdown-viewer',
};

const render = (_props: MarkdownViewerElementProps) => html`
  <fwc-markdown-viewer>${markdownExample}</fwc-markdown-viewer>
`;

export const Default: Story = {
  args: {},
  render,
};

export default meta;
