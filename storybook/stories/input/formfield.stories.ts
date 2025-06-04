import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';

import { FormfieldElement, FormfieldElementProps } from '@equinor/fusion-wc-formfield';
import { CheckboxElement } from '@equinor/fusion-wc-checkbox';
import { SwitchElement } from '@equinor/fusion-wc-switch';
import { RadioElement } from '@equinor/fusion-wc-radio';
import { TextInputElement } from '@equinor/fusion-wc-textinput';
import cem from '@equinor/fusion-wc-formfield/custom-elements.json';

FormfieldElement;
CheckboxElement;
SwitchElement;
RadioElement;
TextInputElement;

setCustomElementsManifest(cem);

type Story = StoryObj<FormfieldElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-formfield',
};

const render = (props: FormfieldElementProps) => html`
  <div style="display:flex; flex-flow: column; gap: 10px;">
    <fwc-formfield
      label="${ifDefined(props.label)}"
      ?alignEnd="${ifDefined(props.alignEnd)}"
      ?spaceBetween="${ifDefined(props.spaceBetween)}"
      ?nowrap="${ifDefined(props.nowrap)}"
    >
      <fwc-checkbox />
    </fwc-formfield>

    <fwc-formfield
      label="${ifDefined(props.label)}"
      ?alignEnd="${ifDefined(props.alignEnd)}"
      ?spaceBetween="${ifDefined(props.spaceBetween)}"
      ?nowrap="${ifDefined(props.nowrap)}"
    >
      <fwc-switch />
    </fwc-formfield>

    <fwc-formfield
      label="${ifDefined(props.label)}"
      ?alignEnd="${ifDefined(props.alignEnd)}"
      ?spaceBetween="${ifDefined(props.spaceBetween)}"
      ?nowrap="${ifDefined(props.nowrap)}"
    >
      <fwc-radio />
    </fwc-formfield>

    <fwc-formfield
      label="${ifDefined(props.label)}"
      ?alignEnd="${ifDefined(props.alignEnd)}"
      ?spaceBetween="${ifDefined(props.spaceBetween)}"
      ?nowrap="${ifDefined(props.nowrap)}"
    >
      <fwc-textinput />
    </fwc-formfield>
  </div>
`;

export const Default: Story = {
  args: { label: 'Lorem ipsum' },
  render,
};

export const AlignEnd: Story = {
  ...Default,
  render: (props) => render({ ...props, alignEnd: true }),
};

export const SpaceBetween: Story = {
  ...Default,
  render: (props) => render({ ...props, spaceBetween: true, alignEnd: true }),
};

export const NoWrap: Story = {
  ...Default,
  render: (props) =>
    render({
      ...props,
      spaceBetween: true,
      alignEnd: true,
      label:
        'Bacon ipsum dolor amet biltong turducken bacon, boudin salami ball tip pork loin ground round rump turkey brisket doner tail jowl drumstick.',
      nowrap: true,
    }),
};

export default meta;
