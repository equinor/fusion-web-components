import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { Meta, StoryObj } from '@storybook/web-components';
import { setCustomElementsManifest } from '@storybook/web-components';

import BadgeElement, { BadgeColor, BadgeElementProps, BadgePosition, BadgeSize } from '@equinor/fusion-wc-badge';
import cem from '@equinor/fusion-wc-badge/lib/custom-elements.json';
import { ifDefined } from 'lit/directives/if-defined.js';

import IconElement, { IconName } from '@equinor/fusion-wc-icon';

BadgeElement;
IconElement;

setCustomElementsManifest(cem);

type Story = StoryObj<BadgeElementProps>;

const meta: Meta<BadgeElementProps> = {
  component: 'fwc-badge',
};

@customElement('storybook-badge-wrapper')
export class BadgeWrapper extends LitElement {
  @property({ reflect: true, type: Boolean })
  circular?: boolean;

  static styles = css`
    .root {
      display: inline-flex;
      width: 4rem;
      height: 4rem;
      margin: 0.5rem;
      background-color: rgba(0, 0, 0, 0.1);
      box-shadow: 0.25rem 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.25);
      position: relative;
    }
    :host([circular]) .root {
      border-radius: 50%;
    }
  `;
  protected render(): unknown {
    return html`<div class="root"><slot></slot></div>`;
  }
}

const render = (props: BadgeElementProps) => html`
  <storybook-badge-wrapper ?circular=${ifDefined(props.circular)}>
    <fwc-badge
      ?circular=${ifDefined(props.circular)}
      size="${ifDefined(props.size)}"
      position="${ifDefined(props.position)}"
      color=${ifDefined(props.color)}
      ?clickable=${props.clickable}
      tooltip=${ifDefined(props.tooltip)}
      value=${ifDefined(props.value)}
      icon=${ifDefined(props.icon)}
      disabled=${ifDefined(props.disabled)}
    ></fwc-badge>
  </storybook-badge-wrapper>
`;

export const Default: Story = {
  args: {
    circular: true,
    value: 'A',
  },
  render,
};

export const Sizes: Story = {
  ...Default,
  render: (props) =>
    html`${Object.values(BadgeSize)
      .map((size) => ({ ...props, size }))
      .map(render)}`,
};

export const Position: Story = {
  ...Default,
  render: (props) =>
    html`${Object.values(BadgePosition)
      .map((position) => ({ ...props, position }))
      .map(render)}`,
};

export const Colors: Story = {
  ...Default,
  render: (props) =>
    html`${Object.values(BadgeColor)
      .map((color) => ({ ...props, color }))
      .map(render)}`,
};

export const WithValue: Story = {
  ...Default,
  render: (props) =>
    html`${'FUSION'
      .split('')
      .map((value) => ({ ...props, value }))
      .map(render)}`,
};

export const WithIcon: Story = {
  ...Default,
  render: (props) =>
    html`${(['car', 'person', 'camera', 'accessible', 'comment_more'] as IconName[])
      .map((icon) => Object.assign({}, props, { icon }))
      .map(render)}`,
};

export const Disabled: Story = {
  ...Default,
  render: (props) => render({ ...props, disabled: true }),
};

export default meta;
