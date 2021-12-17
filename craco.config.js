const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#f195b2',
              '@link-color': '#f195b2',
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
