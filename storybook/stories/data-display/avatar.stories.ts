import { HTMLTemplateResult, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';
import AvatarElement, { AvatarElementProps, AvatarColor, AvatarSize } from '@equinor/fusion-wc-avatar';
import cem from '@equinor/fusion-wc-avatar/lib/custom-elements.json';

import BadgeElement, { BadgeColor, BadgePosition } from '@equinor/fusion-wc-badge';

AvatarElement;
BadgeElement;

setCustomElementsManifest(cem);

type Story = StoryObj<AvatarElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-avatar',
};

const render = (props: AvatarElementProps & { slotBadge?: HTMLTemplateResult }) => html`
  <fwc-avatar
    size="${ifDefined(props.size)}"
    value="${ifDefined(props.value)}"
    color="${ifDefined(props.color)}"
    border="${ifDefined(props.border)}"
    elevated="${ifDefined(props.elevated)}"
    >${props.slotBadge}</fwc-avatar
  >
`;

export const Default: Story = {
  args: {
    value: 'A',
  },
  render,
};

export const Colors: Story = {
  ...Default,
  render: (props) =>
    html`${Object.values(AvatarColor)
      .map((color) => ({ ...props, color }))
      .map(render)}`,
};

export const ColorsWithBorder: Story = {
  ...Default,
  args: {
    ...Default.args,
    border: true,
  },
  render: (props) =>
    html`${Object.values(AvatarColor)
      .map((color) => ({ ...props, color }))
      .map(render)}`,
};

export const Sizes: Story = {
  ...Default,
  render: (props) =>
    html`${Object.values(AvatarSize)
      .map((size) => ({ ...props, size }))
      .map(render)}`,
};

export const CustomColors: Story = {
  ...Default,
  render: (props) => html`
    <fwc-avatar size="${props.size}" style="--fwc-avatar-color: #495057" value="${props.value}"></fwc-avatar>
    <fwc-avatar
      size="${props.size}"
      style="--fwc-avatar-color: #ffc6ff; --fwc-avatar-ink-color: red"
      value="${props.value}"
    ></fwc-avatar>
  `,
};

export const WithImage: Story = {
  ...Default,
  render: () => html`
    <div style="display:flex; gap: 10px">
      <fwc-avatar src="https://i.imgur.com/GcZeeXX.jpeg"></fwc-avatar>
      <fwc-avatar src="https://i.imgur.com/GcZeeXX.jpeg" border color="primary"></fwc-avatar>
    </div>
  `,
};

export const WithBadge: Story = {
  ...Default,
  render: (props) =>
    html`${Object.values(AvatarSize)
      .map((size) => ({
        ...props,
        size,
        slotBadge: html`<fwc-badge slot="badge" size="${size}" icon="person" color="success" circular />`,
      }))
      .map(render)}
    ${Object.values(BadgePosition)
      .map((position) => ({
        ...props,
        slotBadge: html`<fwc-badge
          slot="badge"
          size="${props.size}"
          position=${position}
          icon="person"
          color="success"
          circular
        />`,
      }))
      .map(render)}
    ${Object.values(BadgeColor)
      .map((color) => ({
        ...props,
        slotBadge: html`<fwc-badge slot="badge" size="${props.size}" icon="person" color=${color} circular />`,
      }))
      .map(render)} `,
};

export const Clickable: Story = {
  args: {
    color: AvatarColor.Primary,
    value: 'A',
    size: AvatarSize.Medium,
  },
  render: (props) => html`
    <fwc-avatar size="${props.size}" value="${props.value}" color="${props.color}" clickable></fwc-avatar>
  `,
};
export const Disabled: Story = {
  args: {
    color: AvatarColor.Primary,
    value: 'A',
    size: AvatarSize.Medium,
  },
  render: (props) => html`
    <fwc-avatar size="${props.size}" value="${props.value}" color="${props.color}" disabled></fwc-avatar>
  `,
};

export default meta;
