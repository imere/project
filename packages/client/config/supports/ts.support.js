import ForkTsCheckerPlugin from 'fork-ts-checker-webpack-plugin';

/**
 * @param {any[]} options
 * @param {import('webpack-chain')} chain
 * @param {object} args
 */
function swcImpl(options, chain, args) {
  chain
    .resolve
    .extensions
    .prepend('.ts')
    .prepend('.tsx');

  const rule = chain
    .module
    .rule(tsSupport.name);

  rule
    .test(/\.tsx?$/)
    .exclude.add(/node_modules/);

  rule
    .use('swc-loader')
    .loader('swc-loader')
    .options({
      minify: args.isProd,
      jsc: {
        target: 'es5',
        parser: {
          syntax: 'typescript',
          tsx: true,
          dynamicImport: true,
          privateMethod: true,
          functionBind: true,
          exportDefaultFrom: false,
          exportNamespaceFrom: false,
          decorators: true,
          decoratorsBeforeExport: false,
          topLevelAwait: true,
          importMeta: true,
        },
        transform: {
          legacyDecorator: true,
          decoratorMetadata: true,
        },
      },
    });
}

/**
 * @param {any[]} options
 * @param {import('webpack-chain')} chain
 * @param {object} args
 */
function babelImpl(options, chain, args) {
  chain
    .resolve
    .extensions
    .prepend('.ts')
    .prepend('.tsx');

  const rule = chain
    .module
    .rule(tsSupport.name);

  rule
    .test(/\.tsx?$/)
    .exclude.add(/node_modules/);

  rule
    .use('babel-loader')
    .loader('babel-loader');

  chain
    .plugin('ts-checker')
    .use(ForkTsCheckerPlugin, [
      {
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
          mode: 'write-references',
        },
      },
    ]);
}

export default function tsSupport(...options) {
  return (
    /**
     * @param {import('webpack-chain')} chain
     * @param {object} args
     * @returns {import("webpack").Configuration}
     */
    function (chain, args) {
      babelImpl(options, chain, args);

      return chain.toConfig();
    }
  );
}
