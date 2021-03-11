import { Doc, W } from '../global';

let beforeUnloadFixAdded = false;

export function onVisibilityChange(cb: (event: Event) => void, once?: boolean): void {
  // Adding a `beforeunload` listener is needed to fix this bug:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=987409
  if (!beforeUnloadFixAdded &&
    // Avoid adding this in Firefox as it'll break bfcache:
    // https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    typeof InstallTrigger === 'undefined'
  ) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    W.addEventListener('beforeunload', () => {});
    beforeUnloadFixAdded = true;
  }

  function onVisibilityChange(event: Event) {
    if (Doc.visibilityState === 'hidden') {
      if (once) Doc.removeEventListener('visibilitychange', onVisibilityChange, true);
      cb(event);
    }
  }
  Doc.addEventListener('visibilitychange', onVisibilityChange, true);
}

export function didPageHide(cb: () => void): void {
  if (Doc.hidden) cb();
}
