import StylelintWebpackPlugin from 'stylelint-webpack-plugin';
import Config from 'webpack-chain';

export default function assetSupport(...options) {
  return (
    /**
     * @param {Config} chain
     * @param {object} args
     * @returns {import("webpack").Configuration}
     */
    function (chain, args) {
      chain
        .module
        .rule(assetSupport.name)
        .test(/.(jpe?g|png|svg)$/)
        .type('asset')
        .set('generator', {
          filename: 'static/[name][hash:5][ext]',
        });

      return chain.toConfig();
    }
  );
}
