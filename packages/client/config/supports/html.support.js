import Config from 'webpack-chain';
import HtmlWebpackPlugin from 'html-webpack-plugin';

/**
 * @param {HtmlWebpackPlugin['options']} options
 */
export default function htmlSupport(options) {
  return (
    /**
     * @param {Config} chain
     * @param {object} args
     * @returns {import("webpack").Configuration}
     */
    function (chain, args) {
      chain
        .plugin(htmlSupport.name)
        .use(HtmlWebpackPlugin, [
          {
            filename: 'index.html',
            template: './src/public/index.html',
            inject: true,
            templateParameters: {
              PUBLIC_PATH: '/',
            },
            minify: args.isProd,
            chunksSortMode: 'auto',
            ...options,
          },
        ]);

      return chain.toConfig();
    }
  );
}
