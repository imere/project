import webpack from 'webpack';

export default function hmrSupport(...options) {
  return (
    /**
     * @param {import('webpack-chain').} chain
     * @param {object} args
     * @returns {import("webpack").Configuration}
     */
    function (chain, args) {
      chain
        .devServer
        .hot(true);

      chain
        .plugin(hmrSupport.name)
        .use(webpack.HotModuleReplacementPlugin);

      return chain.toConfig();
    }
  );
}
