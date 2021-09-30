import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'Fusion Web Components',
  brandUrl: 'https://github.com/equinor/fusion-web-components',
  colorPrimary: '#FF1243',
  colorSecondary: '#007079',
  fontBase: 'Equinor, sans-serif',
  fontCode: '"Operator Mono","Fira Code Retina","Fira Code","FiraCode-Retina","Andale Mono","Lucida Console",Consolas,Monaco,monospace'
});

addons.setConfig({theme});
