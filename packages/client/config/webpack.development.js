/**
 * @param {import('webpack-chain')} chain
 * @param {object} args
 * @returns {import("webpack").Configuration}
 */
export default function (chain, args) {
  chain
    .mode('development')
    .cache({
      type: 'memory',
    });

  chain.devtool('eval-source-map');

  chain
    .optimization
    .minimize(false);

  return chain.toConfig();
}
