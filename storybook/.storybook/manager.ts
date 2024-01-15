import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

export const theme = create({
  base: 'dark',
  brandTitle: 'Fusion Web Components',
  brandUrl: 'https://github.com/equinor/fusion-web-components',
  colorPrimary: '#007079',
  colorSecondary: '#FF1243',
  fontBase: 'Equinor, sans-serif',
  fontCode: '"Operator Mono","Fira Code Retina","Fira Code","FiraCode-Retina","Andale Mono","Lucida Console",Consolas,Monaco,monospace'
});

addons.setConfig({theme});
