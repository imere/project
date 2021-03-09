import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export default function tsPathSupport(...options) {
  return (
    /**
     * @param {import('webpack-chain').Config} chain
     * @param {object} args
     * @returns {import("webpack").Configuration}
     */
    function (chain, args) {
      chain
        .resolve
        .plugin(tsPathSupport.name)
        .use(TsconfigPathsPlugin, [
          {
            configFile: 'tsconfig.json',
          },
        ]);

      return chain.toConfig();
    }
  );
}
