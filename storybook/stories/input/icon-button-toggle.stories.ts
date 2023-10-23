import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';
import { IconButtonToggleElement, IconButtonToggleElementProps } from '@equinor/fusion-wc-button/icon-button-toggle';
import cem from '@equinor/fusion-wc-button/custom-elements.json';
import { IconButtonColor, IconButtonSize } from '@equinor/fusion-wc-button/icon-button';

IconButtonToggleElement;

setCustomElementsManifest(cem);

type Story = StoryObj<IconButtonToggleElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-icon-button-toggle',
};

const render = (props: IconButtonToggleElementProps) => html`
  <fwc-icon-button-toggle
    onIcon="${ifDefined(props.onIcon)}"
    offIcon="${ifDefined(props.offIcon)}"
    onColor="${ifDefined(props.onColor)}"
    offColor="${ifDefined(props.offColor)}"
    size="${ifDefined(props.size)}"
    rounded="${ifDefined(props.rounded)}"
    ?on="${ifDefined(props.on)}"
    ?disabled="${ifDefined(props.disabled)}"
  ></fwc-icon-button-toggle>
`;

const sizes: Array<IconButtonSize> = ['x-small', 'small', 'medium', 'large', 'x-large'];

const renderAllSizes = (props: IconButtonToggleElementProps) => html`
  ${sizes.map((size) => render({ ...props, size }))}
`;

const btnColors: Array<IconButtonColor> = ['primary', 'secondary', 'success', 'danger', 'warning'];

const renderAllColors = (props: IconButtonToggleElementProps) => html`
  ${btnColors.map((color) => render({ ...props, onColor: color, offColor: color }))}
  ${render({ ...props, disabled: true, onColor: 'disabled', offColor: 'disabled' })}
`;

export const Default: Story = {
  args: {
    offIcon: 'wifi_off',
    onIcon: 'wifi',
    offColor: 'danger',
    onColor: 'success',
    size: 'medium',
    on: true,
  },
  render,
};

export const Sizes: Story = {
  ...Default,
  render: (props) => renderAllSizes(props),
};

export const Colors: Story = {
  ...Default,
  render: (props) => renderAllColors(props),
};

export const Rounded: Story = {
  ...Default,
  render: (props) => renderAllSizes({ ...props, rounded: true }),
};

export const InitialState: Story = {
  ...Default,
  render: (props) => html`${render({ ...props, on: true })} ${render({ ...props, on: false })}`,
};

export const CustomIcon: Story = {
  ...Default,
  render: (_props) => html`
    <fwc-icon-button-toggle offColor="warning" onColor="secondary">
      <svg slot="onIcon" viewBox="0 0 576 512">
        <path d="M128 320c-53 0-96-43-96-96c0-42.5 27.6-78.6 65.9-91.2C96.7 126.1 96 119.1 96 112C96 50.1 146.1 0 208 0c43.1 0 80.5 24.3 99.2 60c14.7-17.1 36.5-28 60.8-28c44.2 0 80 35.8 80 80c0 5.5-.6 10.8-1.6 16c.5 0 1.1 0 1.6 0c53 0 96 43 96 96s-43 96-96 96H128zm-14.5 33.9c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6zm120 0c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6zm244.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6s17.8 19.3 12.6 31.5zM345.5 353.9c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6z"
        />
      </svg>
      <svg slot="offIcon" viewBox="0 0 512 512">
        <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM352 256c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zm32 0c0-70.7-57.3-128-128-128s-128 57.3-128 128s57.3 128 128 128s128-57.3 128-128z"
        />
      </svg>
    </fwc-icon-button-toggle>
  `,
};

export const CustomImage: Story = {
  ...Default,
  render: (_props) => html`
    <fwc-icon-button-toggle offColor="disabled" onColor="warning">
      <img slot="onIcon" src="https://i.imgur.com/SN0HUEf.png" />
      <img slot="offIcon" src="https://i.imgur.com/xHVKTlm.png" />
    </fwc-icon-button-toggle>
  `,
};

export default meta;
