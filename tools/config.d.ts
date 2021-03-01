export interface Conf {
  /** excludes path */
  excludes?: RegExp[]
  packageRoot?: string
  packages?: Record<string, PerPackageConf>
}

interface PerPackageConf {
  tsconfig?: Record<string, any>[]
}

interface TsConfig {
  compilerOptions?: TsCompilerOptions
}

interface TsCompilerOptions {
  lib?: string[]
  module?: string
  target?: string
  noEmit?: boolean,
  jsx?: string,
  declaration?: boolean,
  emitDecoratorMetadata?: boolean,
  skipLibCheck?: boolean,
  skipDefaultLibCheck?: boolean,
  sourceMap?: boolean,
  baseUrl?: string,
  outDir?: string,
  allowJs?: boolean,
  paths?: TsPaths
}

export type TsPaths = Record<string, string[]>;
