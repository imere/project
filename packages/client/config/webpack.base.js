import Config from 'webpack-chain';
import * as path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import { fileURLToPath } from 'url';

/**
   * @param {Config} chain
   * @param {object} args
   * @returns {import("webpack").Configuration}
   */
export default function (chain, args) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  chain
    .entry('app')
    .add('./src/index');

  chain.output
    .path(path.resolve(__dirname, '..', 'dist'))
    .publicPath('/');

  chain.resolve
    .symlinks(false)
    .extensions
    .add('.json');

  chain
    .resolve
    .modules
    .add(path.resolve(__dirname, '..', 'node_modules'));

  chain
    .plugin('copy')
    .use(CopyPlugin, [
      {
        patterns: [
          {
            from: './src/public/**/**',
            to: '.',
            globOptions: {
              ignore: ['./src/public/**/index.html'],
            },
          },
        ],
      },
    ]);

  chain
    .optimization
    .runtimeChunk({
      name: (entry) => `r~${entry.name}`,
    });

  return chain
    .merge({
      experiments: {
        asyncWebAssembly: true,
        topLevelAwait: true,
      },
    })
    .toConfig();
}
