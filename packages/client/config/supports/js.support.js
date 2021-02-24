import Config from 'webpack-chain';

/**
 * @param {any[]} options
 * @param {Config} chain
 * @param {object} args
 */
function swcImpl(options, chain, args) {
  chain
    .resolve
    .extensions
    .prepend('.js')
    .prepend('.jsx');

  const rule = chain
    .module
    .rule(jsSupport.name);

  rule
    .test(/\.jsx?$/)
    .exclude.add(/node_modules/);

  rule
    .use('swc-loader')
    .loader('swc-loader')
    .options({
      minify: args.isProd,
      jsc: {
        target: 'es5',
        parser: {
          syntax: 'ecmascript',
          jsx: true,
          dynamicImport: true,
          privateMethod: true,
          functionBind: true,
          exportDefaultFrom: true,
          exportNamespaceFrom: false,
          decorators: true,
          decoratorsBeforeExport: false,
          topLevelAwait: true,
          importMeta: true,
        },
        transform: {
          legacyDecorator: true,
        },
      },
    });
}

/**
 * @param {any[]} options
 * @param {Config} chain
 * @param {object} args
 */
function babelImpl(options, chain, args) {
  chain
    .resolve
    .extensions
    .prepend('.js')
    .prepend('.jsx');

  const rule = chain
    .module
    .rule(jsSupport.name);

  rule
    .test(/\.jsx?$/)
    .exclude.add(/node_modules/);

  rule
    .use('babel-loader')
    .loader('babel-loader');
}

export default function jsSupport(...options) {
  return (
    /**
     * @param {Config} chain
     * @param {object} args
     * @returns {import("webpack").Configuration}
     */
    function (chain, args) {
      if (chain.module.rules.has(jsSupport.name)) return chain.toConfig();

      babelImpl(options, chain, args);

      return chain.toConfig();
    }
  );
}
