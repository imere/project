import { readFileSync } from 'fs';
import tj from 'ts-jest/utils/index.js';

const { compilerOptions } = JSON.parse(readFileSync('./tsconfig.json'));

export default {
  preset: 'ts-jest/presets/js-with-babel',
  globals: {
    'ts-jest': {
      tsconfig: true,
      babelConfig: true,
    },
  },
  moduleFileExtensions: [
    'tsx',
    'ts',
    'json',
    'js',
  ],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts?(x)$',
  // testMatch: ['**/src/**/?(*.)+(spec).[tj]s?(x)',],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  transform: {
    '^.+\\.(t|j)s?(x)$': 'ts-jest',
    // '\\.css': './config/jest-transform.cjs',
  },
  transformIgnorePatterns: ['\\\\node_modules\\\\'],
  setupFilesAfterEnv: ['./config/jest-setup.ts'],
  collectCoverageFrom: [
    '**/*.(t|j)s?(x)',
  ],
  coverageDirectory: '../coverage/client',
  testEnvironment: 'jsdom',
  moduleNameMapper: tj.pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};
