export default function assetSupport(...options) {
  return (
    /**
     * @param {import('webpack-chain').} chain
     * @param {object} args
     * @returns {import("webpack").Configuration}
     */
    function (chain, args) {
      chain
        .module
        .rule(assetSupport.name)
        .test(/\.(jpe?g|png|svg)$/)
        .type('asset')
        .set('generator', {
          filename: 'static/[name][hash:5][ext]',
        });

      return chain.toConfig();
    }
  );
}
