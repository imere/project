import webpack from 'webpack';
import Config from 'webpack-chain';

export default function hmrSupport(...options) {
  return (
    /**
     * @param {Config} chain
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
