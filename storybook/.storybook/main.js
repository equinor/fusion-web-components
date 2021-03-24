module.exports = {
  "stories": ["../stories/**/*.stories.mdx"],
  // "stories": ["../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  "addons": [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
    // {
    //   name: "@storybook/addon-docs",
    //   options: {
    //     configureJSX: true,

    //     babelOptions: {
    //       presets:[
    //         "@babel/preset-env",
    //         [
    //           "@babel/preset-react",
    //           { runtime: "automatic"}
    //         ]
    //       ]
    //     },
    //     sourceLoaderOptions: null,
    //     showRoots: true,
    //   },
    // },
    "@storybook/addon-links",
    "@storybook/addon-essentials",

  ],
  // babel: async (options) => {
  //   // Object.assign(options.plugins.find((plugin) => plugin[0].includes('plugin-proposal-decorators'))[1], {
  //   //   decoratorsBeforeExport: true,
  //   //   legacy: false
  //   // })
  //   options.plugins.push('@babel/plugin-transform-react-jsx')
  //   return options;
  // },
  // webpackFinal: async config => {
  //   // find web-components rule for extra transpilation
  //   const webComponentsRule = config.module.rules.find(
  //     rule => rule.use && rule.use.options && rule.use.options.babelrc === false
  //   );
  //   // add your own `my-library`
  //   // webComponentsRule.test.push(/fusion-wc-/);

  //   return config;
  // },
}