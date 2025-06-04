import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';

import {
  DividerColor,
  DividerElement,
  DividerElementProps,
  DividerOrientation,
  DividerSpacing,
  DividerVariant,
} from '@equinor/fusion-wc-divider';
import cem from '@equinor/fusion-wc-divider/custom-elements.json';

DividerElement;

setCustomElementsManifest(cem);

type Story = StoryObj<DividerElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-divider',
};

const render = (props: DividerElementProps) => html`
  <fwc-divider
    color="${ifDefined(props.color)}"
    spacing="${ifDefined(props.spacing)}"
    orientation="${ifDefined(props.orientation)}"
    variant="${ifDefined(props.variant)}"
    style="${props.orientation === DividerOrientation.Vertical ? 'height: 4em;' : ''}"
  />
`;

const dividerColors: Array<DividerColor> = [DividerColor.Medium, DividerColor.Light, DividerColor.Lighter];
const dividerSpacings: Array<DividerSpacing> = [DividerSpacing.Small, DividerSpacing.Medium, DividerSpacing.Large];
const dividerVariants: Array<DividerVariant> = [DividerVariant.Full, DividerVariant.Middle, DividerVariant.List];
const dividerOrientations: Array<DividerOrientation> = [DividerOrientation.Horizontal, DividerOrientation.Vertical];

export const Default: Story = {
  args: {},
  render,
};

export const Colors: Story = {
  ...Default,
  render: (props) => html`${dividerColors.map((color) => render({ ...props, color }))}`,
};

export const Spacing: Story = {
  ...Default,
  render: (props) => html`${dividerSpacings.map((spacing) => render({ ...props, spacing }))}`,
};

export const Vaiant: Story = {
  ...Default,
  render: (props) => html`${dividerVariants.map((variant) => render({ ...props, variant }))}`,
};

export const orientation: Story = {
  ...Default,
  render: (props) => html`${dividerOrientations.map((orientation) => render({ ...props, orientation }))}`,
};

export default meta;
