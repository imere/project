import { IPerformanceEntryExtend } from './typings/performance';

export interface IdleDeadline {
  didTimeout: boolean
}

export interface IdleRequestOptions {
  timeout?: number
}

export interface IHostWindow extends Window {
  requestIdleCallback: (callback: (deadline: IdleDeadline) => void, options?: IdleRequestOptions) => number
}

export type EffectiveType =
  | 'slow-2g'
  | '2g'
  | '3g'
  | '4g'
  | 'lte'
  | '5g'

export interface INetworkInfo {
  effectiveType: EffectiveType
  downlink: number
  rtt: number
  saveData: boolean
}

export interface IHostNavigator extends Navigator {
  connection: INetworkInfo
  deviceMemory?: number
}

export interface IHostPerformance extends Performance {
  getEntries: () => IPerformanceEntryExtend[]
}

export const W = globalThis as unknown as IHostWindow;

export const Doc = W.document;

export const Perf = W.performance as IHostPerformance;

export const Nav = W.navigator as IHostNavigator;
