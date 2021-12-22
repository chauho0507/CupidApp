const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#ff9aa2',
              '@link-color': '#ff9aa2',
              '@border-radius-base': '4px',
              '@anchor-border-color': 'white',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
