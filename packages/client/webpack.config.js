import Chain from 'webpack-chain';
import { merge } from 'webpack-merge';
import yargs from 'yargs-parser';

import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';

import createBaseConfig from './config/webpack.base.js';
import createDevServerConfig from './config/webpack.server.js';
import createProductionConfig from './config/webpack.production.js';
import createDevelopmentConfig from './config/webpack.development.js';
import tsPathSupport from './config/supports/tspath.support.js';
import reactSupport from './config/supports/react.support.js';
import stylelintSupport from './config/supports/stylelint.support.js';
import tsSupport from './config/supports/ts.support.js';
import eslintSupport from './config/supports/eslint.support.js';
import jsSupport from './config/supports/js.support.js';
import htmlSupport from './config/supports/html.support.js';
import TerserPlugin from 'terser-webpack-plugin';
import assetSupport from './config/supports/asset.support.js';
import cssSupport from './config/supports/css.support.js';

const mode = yargs(process.argv).mode ?? ('production' && 'development');
console.warn('Running in', mode);
const args = {
  env: process.env,
  isProd: mode === 'production',
  measure: process.env.MEASURE ?? false,
  mode,
};

const chain = new Chain();

chain
  .merge(createBaseConfig(chain, args))
  .merge(createDevServerConfig(chain, args))
  .merge(args.isProd ? createProductionConfig(chain, args) : createDevelopmentConfig(chain, args));

for (const addSupport of [
  htmlSupport(),
  reactSupport(),
  jsSupport(),
  tsSupport(),
  tsPathSupport(),
  cssSupport(),
  assetSupport(),
  stylelintSupport(),
  eslintSupport(),
]) {
  addSupport(chain, args);
}

const merged = merge(chain.toConfig(), {
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.(j|t)sx?$/,
        parallel: true,
        extractComments: false,
        exclude: [/node_modules/],
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
});

// console.log(merged);

const smp = new SpeedMeasurePlugin({
  disable: !args.measure,
});

export default smp.wrap(merged);
