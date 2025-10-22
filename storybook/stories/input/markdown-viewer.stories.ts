import { html } from 'lit';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';

import {
  MarkdownViewerElement,
  MarkdownViewerElementProps,
} from '@equinor/fusion-wc-markdown';
import cem from '@equinor/fusion-wc-markdown/custom-elements.json';
import markdownExample from './markdown.example.md?raw';
import markdownCodeExample from './markdown-code.example.md?raw';

MarkdownViewerElement;

setCustomElementsManifest(cem);

type Story = StoryObj<MarkdownViewerElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-markdown-viewer',
};

const renderDefault = (_props: MarkdownViewerElementProps) => html`
  <fwc-markdown-viewer>${markdownExample}</fwc-markdown-viewer>
`;

const renderCode = (_props: MarkdownViewerElementProps) => html`
  <fwc-markdown-viewer>${markdownCodeExample}</fwc-markdown-viewer>
`;

export const Default: Story = {
  args: {},
  render: renderDefault,
};

export const Code: Story = {
  args: {},
  render: renderCode,
};

export default meta;
