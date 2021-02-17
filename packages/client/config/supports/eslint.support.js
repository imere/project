import Config from 'webpack-chain';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';

export default function eslintSupport(...options) {
  return (
    /**
     * @param {Config} chain
     * @param {object} args
     * @returns {import("webpack").Configuration}
     */
    function (chain, args) {
      chain
        .plugin(eslintSupport.name)
        .use(ESLintWebpackPlugin, [
          {
            fix: false,
            threads: true,
          },
        ]);

      return chain.toConfig();
    }
  );
}
