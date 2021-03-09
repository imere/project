import hmrSupport from './supports/hmr.support.js';

/**
 * @param {import('webpack-chain').Config} chain
 * @param {object} args
 * @returns {import("webpack").Configuration}
 */
export default function (chain, args) {
  chain
    .devServer
    .headers({
      'Cache-Control': 'no-store',
    })
    .host('127.0.0.1')
    .port(8000)
    .historyApiFallback({
      rewrites: [
        {
          from: '/.*/',
          to: '/index.html',
        },
      ],
    });

  if (!args.isProd) hmrSupport()(chain, args);

  return chain.toConfig();
}
