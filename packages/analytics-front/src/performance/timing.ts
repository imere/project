import { Perf } from '../global';

export interface INavigationTiming{
  fetchTime?: number;
  workerTime?: number;
  totalTime?: number;
  downloadTime?: number;
  timeToFirstByte?: number;
  headerSize?: number;
  dnsLookupTime?: number;
  tcpTime?: number;
  whiteTime?: number;
  domTime?: number;
  loadTime?: number;
  parseDomTime?: number;
}

export function getNavigationTiming(): INavigationTiming {
  // There is an open issue to type correctly getEntriesByType
  // https://github.com/microsoft/TypeScript/issues/33866

  const n = (Perf.getEntriesByType('navigation')[0] || Perf.timing) as PerformanceNavigationTiming & PerformanceTiming;
  // In Safari version 11.2 Navigation Timing isn't supported yet

  if (!n) return {};

  const {
    responseStart,
    responseEnd,
    fetchStart,
    workerStart,
    requestStart,
    transferSize,
    encodedBodySize,
    domainLookupEnd,
    domainLookupStart,
    connectEnd,
    connectStart,
    navigationStart,
    domContentLoadedEventEnd,
    loadEventEnd,
    domComplete,
    domInteractive,
  } = n;

  return {
    // fetchStart marks when the browser starts to fetch a resource
    // responseEnd is when the last byte of the response arrives
    fetchTime: responseEnd - fetchStart,
    // Service worker time plus response time
    workerTime: workerStart > 0 ? responseEnd - workerStart : 0,
    // Request plus response time (network only)
    totalTime: responseEnd - requestStart,
    // Response time only (download)
    downloadTime: responseEnd - responseStart,
    timeToFirstByte: responseStart - requestStart,
    headerSize: transferSize - encodedBodySize || 0,
    dnsLookupTime: domainLookupEnd - domainLookupStart,
    tcpTime: connectEnd - connectStart || 0,
    whiteTime: responseStart - navigationStart || 0,
    domTime: domContentLoadedEventEnd - navigationStart || 0,
    loadTime: loadEventEnd - navigationStart || 0,
    parseDomTime: domComplete - domInteractive || 0,
  };
}
