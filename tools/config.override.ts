export default {
  /** excludes path */
  excludes: [/services/],
  /** TODO: override strategies */
  strategies: {},
  packages: {
    client: {
      tsconfig: [
        {
          compilerOptions: {
            // noEmit: true,
            jsx: 'react-jsx',
            declaration: false,
            emitDecoratorMetadata: true,
            lib: [
              'DOM',
              'DOM.Iterable',
            ],
            module: 'es6',
            target: 'es5',
            skipLibCheck: true,
            skipDefaultLibCheck: true,
            sourceMap: false,
            outDir: './dist',
            baseUrl: './',
            allowJs: true,
          },
        },
      ],
    },
    server: {
      tsconfig: [
        {
          compilerOptions: {
            module: 'commonjs',
            declaration: true,
            target: 'es2017',
            sourceMap: false,
            moduleResolution: 'node',
            baseUrl: './',
            outDir: './dist',
          },
        },
      ],
    },
    shared: {
      tsconfig: [
        {
          compilerOptions: {
            module: 'commonjs',
            emitDecoratorMetadata: false,
            target: 'es2017',
            sourceMap: false,
            outDir: './dist',
            incremental: true,
            moduleResolution: 'node',
            baseUrl: './',
          },
        },
      ],
    },
  },
};
