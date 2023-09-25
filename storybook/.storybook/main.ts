// import {type StorybookConfig} from '@storybook/web-components-vite';
import {type StorybookConfig} from '@storybook/web-components-vite';

export const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.ts', 
  ],
  framework: '@storybook/web-components-vite',
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-docs'
  ],
  docs: {
    autodocs: 'tag',
  }
};

export default config;
