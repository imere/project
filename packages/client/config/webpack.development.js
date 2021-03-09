import os from 'os';

/**
 * @param {import('webpack-chain').Config} chain
 * @param {object} args
 * @returns {import("webpack").Configuration}
 */
export default function (chain, args) {
  chain
    .mode('development')
    .cache({
      type: os.freemem() / 1024 / 1024 >= 1500 ?  'memory' : 'filesystem',
    });

  chain.devtool('eval-source-map');

  chain
    .optimization
    .minimize(false);

  return chain.toConfig();
}
