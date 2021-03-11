import { config } from '../config';
import { getVitalScore, vitalsScore } from '../helper/vitals';
import {
  TPerformanceObserverType,
} from '../typings/performance';
import { et, initElementTiming } from './element';
import { fid, fidVital, initFirstInputDelay } from './first-input';
import { initLargestContentfulPaint, lcp } from './largest-contentful-paint';
import { cls, initCumulativeLayoutShift } from './layout-shift';
import { initTotalBlockingTime, tbt } from './long-task';
import { fcp, fp, initFirstPaint } from './paint';
import { initResourceSize, rt } from './resource';

export interface IPerformanceObserverCallback {
  (entries: PerformanceEntryList, calledCb?: () => void): void
}

export const observers = new Map<PropertyKey, PerformanceObserver>();

export function connect(type: TPerformanceObserverType, cb: IPerformanceObserverCallback, calledCb?: () => void): PerformanceObserver {
  const observer = new PerformanceObserver((entryList) => {
    cb(entryList.getEntries(), calledCb);
  });

  observer.observe({ type, buffered: true });

  return observer;
}

export function disconnect(id: PropertyKey): void {
  observers.get(id)?.disconnect();
  observers.delete(id);
}

export function initPerformanceObserver(): void {
  const { logger } = config;

  observers.set('resource', connect('resource', initResourceSize, () => {
    logger.log('resource', rt);
  }));

  observers.set('element', connect('element', initElementTiming, () => {
    logger.log('element', et);
  }));

  observers.set('paint', connect('paint', initFirstPaint, () => {
    disconnect('paint');
    logger.log('metric.fp', fp.value);
    vitalsScore.fp = getVitalScore('fp', fp.value);
    logger.log('metric.fcp', fcp.value);
    vitalsScore.fcp = getVitalScore('fcp', fcp.value);
  }));

  observers.set('largest-contentful-paint', connect('largest-contentful-paint', initLargestContentfulPaint, () => {
    disconnect('largest-contentful-paint');
    logger.log('metric.lcp', lcp.value);
    vitalsScore.lcp = getVitalScore('lcp', lcp.value);
  }));
  observers.set('layout-shift', connect('layout-shift', initCumulativeLayoutShift, () => {
    logger.log('metric.cls', cls.value);
    vitalsScore.cls = getVitalScore('cls', cls.value);
  }));

  observers.set('first-input', connect('first-input', initFirstInputDelay, () => {
    disconnect('first-input');
    logger.log('metric.fid', fid);
    logger.log('metric.fidVital', fidVital);
  }));

  observers.set('longtask', connect('longtask', initTotalBlockingTime, () => {
    logger.log('metric.tbt', tbt.value);
    vitalsScore.tbt = getVitalScore('tbt', tbt.value);

    setTimeout(() => {
      logger.log('metric.tbt5s', tbt.value);
      vitalsScore.tbt5s = getVitalScore('tbt5s', tbt.value);
    }, 4999);

    setTimeout(() => {
      logger.log('metric.tbt10s', tbt.value);
      vitalsScore.tbt10s = getVitalScore('tbt10s', tbt.value);
      disconnect('longtask');
    }, 9999);
  }));
}
