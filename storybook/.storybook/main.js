module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ['../stories/**/*.stories.@(ts|tsx|md|mdx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      }
    },
  ]
};
