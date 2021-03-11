import { W } from '../global';

export function onError(cb: NonNullable<GlobalEventHandlers['onerror']>, once?: boolean): void {
  const orgOnError = W.onerror;

  function onErr(...args: Parameters<NonNullable<GlobalEventHandlers['onerror']>>) {
    if (once) W.onerror = orgOnError;
    cb(...args);
    if (typeof orgOnError === 'function') orgOnError(...args);
    return true;
  }

  W.onerror = onErr;
}

export function onNetworkError(cb: (err: ErrorEvent) => unknown, once?: boolean): void {
  function onErr(ev: ErrorEvent): unknown {
    if (ev.target === W) return;

    if (once) W.removeEventListener('error', onErr, true);

    return cb(ev);
  }

  W.addEventListener('error', onErr, true);
}

export function onPromiseError(cb: (ev: PromiseRejectionEvent) => unknown, once?: boolean): void {
  function onErr(ev: PromiseRejectionEvent): unknown {
    ev.preventDefault();

    if (once) W.removeEventListener('unhandledrejection', onErr, true);

    return cb(ev);
  }

  W.addEventListener('unhandledrejection', onErr, true);
}
