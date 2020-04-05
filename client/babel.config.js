module.exports = function (api) {
  api.cache(true);

  // https://createapp.dev/webpack to take reference

  const presets = [
    [
      '@babel/preset-env', // <<Last Preset to be applied>>
      {
        targets: {
          ie: 11, //Defining browsers and versions. Exampe "chrome":10
        },
        modules: false,
        debug: true,
        useBuiltIns: 'usage',
        corejs: '2',
      },
    ],
    ['@babel/preset-react'], // <<First Preset to be applied>>
  ];
  const plugins = [
    //The plugins are applied first, top to bottom.
    '@babel/plugin-syntax-dynamic-import', // <<Start Here>>
    '@babel/plugin-proposal-object-rest-spread',
    [
      '@babel/plugin-transform-regenerator',
      {
        asyncGenerators: false,
        generators: false,
        async: false,
      },
    ],
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    '@babel/plugin-transform-react-constant-elements',
    '@babel/plugin-transform-react-inline-elements',
    'transform-es2015-shorthand-properties',
    '@babel/plugin-transform-runtime', // <<Last Plugin To Be Executed>>
  ];

  return {
    presets,
    plugins,
    env: {
      test: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                ie: 11,
              },
            },
          ],
        ],
      },
    },
  };
};
