import TerserPlugin from 'terser-webpack-plugin';
import Config from 'webpack-chain';

/**
 * @param {Config} chain
 * @param {object} args
 * @returns {import("webpack").Configuration}
 */
export default function (chain, args) {

  chain
    .mode('production')
    .cache({
      type: 'filesystem',
    });

  chain
    .output
    .pathinfo(false);

  chain
    .optimization
    .minimize(true);
  // .minimizer('terser')
  // .use(TerserPlugin, [
  //   {
  //     test: /\.(j|t)sx?$/,
  //     parallel: true,
  //     extractComments: false,
  //     exclude: [/node_modules/],
  //     terserOptions: {
  //       // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
  //       output: {
  //         comments: false,
  //       },
  //     },
  //   },
  // ]);

  return chain.toConfig();
}
