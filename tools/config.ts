export default {
  excludes: [/coverage$/, /services$/],
  /** TODO: override strategies */
  strategies: {},
  packages: {
    client: {
      tsconfig: [
        {
          compilerOptions: {
            module: 'ES6',
            target: 'ES5',
            // noEmit: true,
            jsx: 'react-jsx',
            declaration: false,
            lib: [
              'DOM',
              'DOM.Iterable',
            ],
          },
        },
      ],
    },
    server: {
      tsconfig: [
        {
          compilerOptions: {
            sourceMap: false,
          },
        },
      ],
    },
    'analytics-front': {
      tsconfig: [
        {
          compilerOptions: {
            module: 'ESNext',
            lib: [
              'DOM',
              'DOM.Iterable',
            ],
          },
        },
      ],
    },
    shared: {
      tsconfig: [
        {
          compilerOptions: {
            module: 'ESNext',
            emitDecoratorMetadata: false,
          },
        },
      ],
    },
  },
};
