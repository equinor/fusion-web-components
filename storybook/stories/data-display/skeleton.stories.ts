import { CSSResult, HTMLTemplateResult, css, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';
import Skeleton, { SkeletonElementProps, SkeletonSize, SkeletonVariant } from '@equinor/fusion-wc-skeleton';
import Icon, { IconName } from '@equinor/fusion-wc-icon';
import cem from '@equinor/fusion-wc-skeleton/lib/custom-elements.json';
import style from '@equinor/fusion-wc-icon/src/element.css';

Skeleton;
Icon;

setCustomElementsManifest(cem);

type Story = StoryObj<SkeletonElementProps>;

const meta: Meta<typeof cem> = {
  component: 'fwc-skeleton',
};

const render = (props: SkeletonElementProps & { slot?: HTMLTemplateResult; style?: CSSResult }) => html`
  <fwc-skeleton
    ?fluid="${ifDefined(props.fluid)}"
    ?inactive="${ifDefined(props.inactive)}"
    size="${ifDefined(props.size)}"
    variant="${ifDefined(props.variant)}"
    style=${props.style}
    >${props.slot}</fwc-skeleton
  >
`;

export const Default: Story = {
  args: {},
  render,
};

export const Sizes: Story = {
  ...Default,
  render: (props) =>
    html`${Object.values(SkeletonSize)
      .map((size) => ({ ...props, size }))
      .map(
        (props) =>
          html` <h5>${props.size}</h5>
            ${render(props)}`,
      )}`,
};

export const Variants: Story = {
  ...Default,
  render: (props) =>
    html`${Object.values(SkeletonVariant)
      .map((variant) => ({ size: SkeletonSize.Medium, ...props, variant }))
      .map(
        (props) =>
          html` <h5>${props.variant}</h5>
            ${render(props)}`,
      )}`,
};

export const withText: Story = {
  ...Default,
  render: (props) => render({ ...props, slot: html`Fusion` }),
};

export const withIcon: Story = {
  ...Default,
  render: (props) => render({ ...props, slot: html`<fwc-icon icon=${'slack' satisfies IconName}></fwc-icon>` }),
};

export const CustomColor: Story = {
  ...Default,
  render: (props) =>
    render({
      ...props,
      slot: html`<h5>Custom Color</h5>`,
      style: css`
        --fwc-skeleton-fill-color: rgba(0, 111, 0, 0.25);
        --fwc-skeleton-ink-color: #000;
      `,
    }),
};

export default meta;
