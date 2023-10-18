import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';
import { LinkButtonElement, LinkButtonElementProps } from '@equinor/fusion-wc-button/link-button';
import cem from '@equinor/fusion-wc-button/custom-elements.json';
import { ButtonColor } from '@equinor/fusion-wc-button';

LinkButtonElement;

setCustomElementsManifest(cem);

type Story = StoryObj<LinkButtonElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-link-button',
};

const render = (props: LinkButtonElementProps) => html`
  <fwc-link-button
    href="${ifDefined(props.href)}"
    target="${ifDefined(props.target)}"
    icon="${ifDefined(props.icon)}"
    label="${ifDefined(props.label)}"
    color="${ifDefined(props.color)}"
    variant="${ifDefined(props.variant)}"
    ?dense="${ifDefined(props.dense)}"
    ?disabled="${ifDefined(props.disabled)}"
    ?trailingicon="${ifDefined(props.trailingIcon)}"
  ></fwc-link-button>
`;

const btnColor: Array<ButtonColor> = ['primary', 'secondary', 'danger'];

const renderAllColors = (props: LinkButtonElementProps) => html`
  ${btnColor.map((color) => render({ ...props, color }))} ${render({ ...props, disabled: true })}
`;

export const Default: Story = {
  args: {
    label: 'Foo Bar',
    href: 'https://fusion.equinor.com',
    target: '_blank',
  } as LinkButtonElementProps,
  render,
};

export const Standard: Story = {
  ...Default,
  render: (props) => renderAllColors(props),
};

export const Dense: Story = {
  ...Default,
  render: (props) => renderAllColors({ ...props, dense: true }),
};

export const Outlined: Story = {
  ...Default,
  render: (props) => renderAllColors({ ...props, variant: 'outlined' }),
};

export const Ghost: Story = {
  ...Default,
  render: (props) => renderAllColors({ ...props, variant: 'ghost' }),
};

export const WithIcons: Story = {
  ...Default,
  render: (props) => html`
    ${render({ ...props, icon: 'notifications' })} ${render({ ...props, icon: 'notifications', trailingIcon: true })}
  `,
};

export default meta;
