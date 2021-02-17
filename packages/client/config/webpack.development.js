import Config from 'webpack-chain';

/**
 * @param {Config} chain
 * @param {object} args
 * @returns {import("webpack").Configuration}
 */
export default function (chain, args) {
  chain
    .optimization
    .minimize(false);

  return chain.toConfig();
}
