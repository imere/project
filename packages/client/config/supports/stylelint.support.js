import StylelintWebpackPlugin from 'stylelint-webpack-plugin';
import Config from 'webpack-chain';

export default function stylelintSupport(...options) {
  return (
    /**
     * @param {Config} chain
     * @param {object} args
     * @returns {import("webpack").Configuration}
     */
    function (chain, args) {
      chain
        .plugin(stylelintSupport.name)
        .use(StylelintWebpackPlugin, [
          {
            configFile: undefined,
            files: ['**/*.{vue,html,css,less,scss,sass}'],
            fix: false,
          },
        ]);

      return chain.toConfig();
    }
  );
}
