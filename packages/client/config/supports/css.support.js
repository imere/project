import Config from 'webpack-chain';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default function cssSupport(...options) {
  return (
    /**
     * @param {Config} chain
     * @param {object} args
     * @returns {import("webpack").Configuration}
     */
    function (chain, args) {
      const rule = chain
        .module
        .rule(cssSupport.name)
        .test(/.css$/);

      rule.when(
        args.isProd,
        rule => {
          rule.use('extract-css')
            .loader(MiniCssExtractPlugin.loader);

          chain
            .plugin('extract-css')
            .use(MiniCssExtractPlugin, [
              {
                ignoreOrder: false,
              },
            ]);
        },
        rule => {
          rule.use('style-loader')
            .loader('style-loader');
        }
      );

      rule.use('css-loader')
        .loader('css-loader')
        .options({
          importLoaders: 1,
          sourceMap: !args.isProd,
        });

      rule.use('postcss-loader')
        .loader('postcss-loader')
        .options({
          sourceMap: !args.isProd,
        });

      return chain.toConfig();
    }
  );
}
