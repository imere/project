import {
  ILogger,
  log,
} from '../logger';

export interface IConfig {
  logger: ILogger
  // for basic analytics report
  analyticUri: string
  // for error info report
  errorUri: string
}

export const config: IConfig = {
  analyticUri: '/analytic',
  errorUri: '/error',
  logger: {
    log,
  },
};
