export type TPerformanceObserverType =
  | 'first-input'
  | 'largest-contentful-paint'
  | 'layout-shift'
  | 'longtask'
  | 'measure'
  | 'navigation'
  | 'paint'
  | 'element'
  | 'resource';

export type TPerformanceEntryInitiatorType =
  | 'beacon'
  | 'css'
  | 'fetch'
  | 'img'
  | 'other'
  | 'script'
  | 'xmlhttprequest';

// https://wicg.github.io/event-timing/#sec-performance-event-timing
export interface IPerformanceEntryExtend extends PerformanceEntry {
  processingStart: DOMHighResTimeStamp
  target?: Node
}

export interface IPerformanceEntryExtend {
  decodedBodySize?: number;
  duration: number;
  entryType: TPerformanceObserverType;
  initiatorType?: TPerformanceEntryInitiatorType;
  loadTime: number;
  name: string;
  renderTime: number;
  startTime: number;
  hadRecentInput?: boolean;
  value?: number;
  identifier?: string;
}
