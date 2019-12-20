const { addBabelPlugin, override } = require('customize-cra');

module.exports = override(
  addBabelPlugin([
    'babel-plugin-root-import',
    {
      rootPathSuffix: 'src',
    },
  ])
);

/*
Para esse override ter efeito, é necessário também mudar os scitps de "package.json"
De originalmente:
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",

Para:
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",

Obs.: o script "eject" não precisa ser alterado
*/
