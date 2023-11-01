import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';

import { MenuElement, MenuElementProps } from '@equinor/fusion-wc-menu';
import cem from '@equinor/fusion-wc-menu/custom-elements.json';

MenuElement;

setCustomElementsManifest(cem);

type Story = StoryObj<MenuElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-menu',
};

const render = (props: MenuElementProps) => html`
  <fwc-menu ?open="${ifDefined(props.open)}">
    <fwc-list-item>Foo</fwc-list-item>
    <fwc-list-item>Bar</fwc-list-item>
    <fwc-list-item>Baz</fwc-list-item>
  </fwc-menu>
`;

export const Default: Story = {
  args: {
    open: true,
  },
  render,
};

export default meta;
