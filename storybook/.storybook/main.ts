import {type StorybookConfig} from '@storybook/web-components-vite';
import { mergeConfig } from 'vite';
import { resolve } from 'path'

export const config: StorybookConfig = {
  stories: [
    {
      directory: '../stories/data-display',
      titlePrefix: 'Data Display'
    },
    {
      directory: '../stories/input',
      titlePrefix: 'Input'
    },
    {
      directory: '../stories/person',
      titlePrefix: 'Person'
    }
  ],
  framework: '@storybook/web-components-vite',
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-docs'
  ],
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      resolve: {
        alias: [
            { find: '@components', replacement: resolve(__dirname, '../components') },
        ],
    },
    });
  },
};

export default config;
