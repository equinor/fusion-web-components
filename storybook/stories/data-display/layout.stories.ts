import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';

import { LayoutElement, type LayoutElementProps } from '@equinor/fusion-wc-layout';
import { PageElement } from '@equinor/fusion-wc-page';

import cem from '@equinor/fusion-wc-layout/custom-elements.json';
LayoutElement;
PageElement;

setCustomElementsManifest(cem);

type Story = StoryObj<LayoutElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-layout',
};

const render = (props: LayoutElementProps) => html`
  <div style="height: 650px">
    <fwc-layout sidebar="${ifDefined(props.sidebar)}">
      <div slot="sidebar" style="width: 240px;"><p style="padding: 1em">Sidebar content</p></div>
      <div slot="content">
        <fwc-page>
          <p slot="main" style="padding: 1em">Main content</p>
          <p slot="header" style="padding: 1em">Header content</p>
          <p slot="footer" style="padding: 1em">Footer content</p>
        </fwc-page>
      </div>
    </fwc-layout>
  </div>
`;

export const Default: Story = {
  args: {},
  render,
};

export const Sidebar: Story = {
  args: {
    sidebar: true,
  },
  render,
};

export default meta;
