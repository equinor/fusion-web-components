import { SVGTemplateResult, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { repeat } from 'lit/directives/repeat.js';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';
import IconElement, { IconElementProps, iconNames } from '@equinor/fusion-wc-icon';
import cem from '@equinor/fusion-wc-avatar/lib/custom-elements.json';

IconElement;

setCustomElementsManifest(cem);

type Story = StoryObj<IconElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-avatar',
};

const render = (props: IconElementProps & { slot?: SVGTemplateResult }) => html`
  <fwc-icon
    icon="${ifDefined(props.icon)}"
    >${props.slot}</fwc-avatar
  >
`;

export const Default: Story = {
  args: {
    icon: 'computer',
  },
  render,
};

export const WithSlottedSvg: Story = {
  render: () => html`
    <fwc-icon>
      <svg viewBox="0 0 24 24">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16 6.5h4c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2l.01-11c0-1.11.88-2 1.99-2h4v-2c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2Zm-6 0h4v-2h-4v2Z"
        ></path>
      </svg>
    </fwc-icon>
  `,
};

export const AllIcons: Story = {
  render: () => html`
    ${repeat(
      iconNames,
      (icon) => icon,
      (icon) => html`
        <fwc-icon
          icon="${ifDefined(icon)}"
        ></fwc-avatar>`,
    )}
  `,
};

export default meta;