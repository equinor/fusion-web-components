import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';

import { DateTimeElement, DateTimeElementProps } from '@equinor/fusion-wc-date';
import cem from '@equinor/fusion-wc-date/custom-elements.json';

DateTimeElement;

setCustomElementsManifest(cem);

type Story = StoryObj<DateTimeElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-datetime',
};

const render = (props: DateTimeElementProps) => html`
  <div>
    <fwc-datetime
      date="${ifDefined(props.date)}"
      locale="${ifDefined(props.locale)}"
      format="${ifDefined(props.format)}"
    />
  </div>
`;

export const Default: Story = {
  args: {
    date: '2021-08-09T09:12:49Z',
  },
  render,
};

export const Formatting: Story = {
  ...Default,
  render: (props) => html`${render({ ...props, format: 'yyyy-mm-dd' })} ${render({ ...props, format: 'd MMMM yy' })}`,
};

export default meta;
