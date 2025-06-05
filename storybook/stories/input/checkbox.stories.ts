import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';
import { CheckboxElement, CheckboxElementProps } from '@equinor/fusion-wc-checkbox';
import cem from '@equinor/fusion-wc-checkbox/custom-elements.json';

CheckboxElement;

setCustomElementsManifest(cem);

type Story = StoryObj<CheckboxElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-checkbox',
};

const render = (props: CheckboxElementProps) => html`
  <fwc-checkbox
    checked="${ifDefined(props.checked)}"
    value="${ifDefined(props.value)}"
    disabled="${ifDefined(props.disabled)}"
    indeterminate="${ifDefined(props.indeterminate)}"
  ></fwc-checkbox>
`;

const renderAllStates = (props: CheckboxElementProps) =>
  html`${render(props)}${render({ ...props, checked: true })}${render({ ...props, indeterminate: true })}`;

export const Default: Story = {
  args: {},
  render,
};

export const Standard: Story = {
  ...Default,
  render: renderAllStates,
};
export const Disabled: Story = {
  ...Default,
  args: {
    ...Default.args,
    disabled: true,
  },
  render: renderAllStates,
};

export const Sizes: Story = {
  ...Default,
  render: () => html`
    <fwc-checkbox style="--fwc-checkbox-size: 8px"></fwc-checkbox>
    <fwc-checkbox style="--fwc-checkbox-size: 16px"></fwc-checkbox>
    <fwc-checkbox style="--fwc-checkbox-size: 24px"></fwc-checkbox>
    <fwc-checkbox style="--fwc-checkbox-size: 32px"></fwc-checkbox>
    <fwc-checkbox style="--fwc-checkbox-size: 64px"></fwc-checkbox>
  `,
};

export default meta;
