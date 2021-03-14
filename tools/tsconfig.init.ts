import type { TsPaths } from './config.d';
import * as fs from 'fs';
import * as path from 'path';
import deepmerge from 'deepmerge';
import baseTsconfig from './tsconfig.base.json';
import configOverrides from './config';

const { excludes } = configOverrides;

const root = path.posix.join(__dirname, '..');

const packagesRoot = path.posix.join(root, 'packages');

function getPackageDirs() {
  return fs.readdirSync(
    packagesRoot,
    { encoding: 'utf-8' }
  )
    .map(dir => path.posix.join(packagesRoot, dir))
    .filter(val => fs.statSync(val).isDirectory());
}

function writePackageConfig(dir: string, packageDirs: string[]) {
  let config = baseTsconfig;

  const { compilerOptions: { paths } } = config;

  for (const d of packageDirs) {
    const alias = d.replace(/^packages/, 'package');
    if (dir === d) {
      (<TsPaths>paths)[`@${alias}/*`] = ['./*'];
      continue;
    }
    // TODO: detect dir depth
    (<TsPaths>paths)[`@${alias}/*`] = [`../../${d}/*`];
  }

  {
    const name = path.basename(dir) as keyof typeof configOverrides['packages'];
    const tsconfigOverrides = configOverrides.packages?.[name]?.tsconfig;
    if (Array.isArray(tsconfigOverrides)) {
      config = deepmerge.all(
        [config, ...tsconfigOverrides],
        {
          arrayMerge(target, source) {
            return target.concat(source);
          },
        }
      ) as typeof config;
    }
  }

  fs.writeFileSync(
    path.posix.join(dir, 'tsconfig.json'),
    JSON.stringify(config, null, 2),
    { encoding: 'utf-8' }
  );
}

function writeRootConfig(dir: string, packageDirs: string[]) {
  const config = baseTsconfig;

  const { compilerOptions: { paths } } = config;

  if (!paths) config.compilerOptions.paths = {};

  for (const d of packageDirs) {
    const alias = d.replace(/^packages/, 'package');
    (<TsPaths>paths)[`@${alias}/*`] = [`./${d}/*`];
  }

  fs.writeFileSync(
    path.posix.join(dir, 'tsconfig.json'),
    JSON.stringify(config, null, 2),
    { encoding: 'utf-8' }
  );
}

function run() {
  const dirs = getPackageDirs()
    .filter(predicate => !excludes.some(reg => reg.test(predicate)));

  writeRootConfig(root, dirs);

  dirs.forEach(dir => {
    writePackageConfig(dir, dirs);
  });
}

run();
