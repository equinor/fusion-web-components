import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';

import {
  MarkdownEditorElement,
  MarkdownEditorElementProps,
  MenuSizes as MenuSizesType,
} from '@equinor/fusion-wc-markdown';
import cem from '@equinor/fusion-wc-markdown/custom-elements.json';
import markdownExample from './markdown.example.md?raw';

MarkdownEditorElement;

setCustomElementsManifest(cem);

type Story = StoryObj<MarkdownEditorElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-markdown-editor',
};

const render = (props: MarkdownEditorElementProps) => html`
  <fwc-markdown-editor
    menuItems="${ifDefined(props.menuItems)}"
    menuSize="${ifDefined(props.menuSize)}"
    minHeight="${ifDefined(props.minHeight)}"
  >
    ${markdownExample}
  </fwc-markdown-editor>
`;

const sizes: Array<MenuSizesType> = ['small', 'medium', 'large'];

const renderAllMenuSizes = (props: MarkdownEditorElementProps) => html`
  ${sizes.map((menuSize) => render({ ...props, menuSize }))}
`;

export const Default: Story = {
  args: {},
  render,
};

export const MenuSizes: Story = {
  ...Default,
  render: (props) => renderAllMenuSizes(props),
};

export const Height: Story = {
  ...Default,
  render: (props) => render({ ...props, minHeight: '300px' }),
};

export const MenuItems: Story = {
  ...Default,
  render: (props) => render({ ...props, menuItems: ['h1', 'h2', 'blockquote'] }),
};

export default meta;
