import {
  config,
  IConfig,
} from './config/index';
import { finalResult } from './data';
import { isPerformanceObserverSupported, isPerformanceSupported } from './helper/support';
import { onError, onPromiseError } from './error/index';
import { didPageHide, onVisibilityChange } from './lifecycle/visibility';
import { send } from './logger/net';
import { initPerformanceObserver, observers } from './performance';
import { getNavigationTiming } from './performance/timing';
import { scheduler } from './scheduler';

export class Analytics {
  config: IConfig

  constructor(options?: Partial<IConfig>) {
    this.config = Object.assign(config, options);
  }

  initError(): this {
    onError((eventOrMessage, uri, line, col, error) => {
      scheduler.push(() => {
        send(this.config.errorUri, JSON.stringify({ type: 'w', uri, line, col, message: error?.stack }));
      });
    });
    onPromiseError((err) => {
      scheduler.push(() => {
        send(this.config.errorUri, JSON.stringify({ type: 'p', message: err.reason?.stack }));
      });
    });

    return this;
  }

  initMeasure(): this {
    const { logger } = this.config;

    if (isPerformanceObserverSupported()) initPerformanceObserver();

    if (isPerformanceSupported()) logger.log('timing', getNavigationTiming());

    return this;
  }

  ready(uri?: string, method?: 'GET' | 'POST'): Promise<this> {
    return new Promise((r) => {
      onVisibilityChange(didPageHide.bind(this, () => {
        scheduler.push(() => {
          send(uri ?? this.config.analyticUri, JSON.stringify(finalResult), method);
          r(this);
        });
      }));
    });
  }

  cleanup(): void {
    observers.forEach(observer => observer.disconnect());
    observers.clear();
    Object.keys(finalResult).forEach(key => delete finalResult[key]);
  }
}

export function runAnalytics(options?: Partial<IConfig>, method?: 'GET' | 'POST'): void {
  new Analytics(options)
    .initMeasure()
    .initError()
    .ready(undefined, method)
    .then(a => setTimeout(() => a.cleanup(), 100));
}
