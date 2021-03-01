import { Nav, W } from '../global';

export function send(uri: string, body: string, method: 'GET' | 'POST' = 'POST'): void {
  if (method === 'GET') {
    let img: HTMLImageElement | null = new Image();
    img.src = `${uri}?body=${body}`;
    img.onload = function () { img = null; };
  } else if (method === 'POST') {
    if (Nav?.sendBeacon) {
      Nav.sendBeacon(uri, body);
    } else if (W?.fetch) {
      W.fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
        keepalive: true,
      });
    } else {
      let xhr: XMLHttpRequest | null = new XMLHttpRequest();
      xhr.open('POST', uri, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(body);
      xhr.onload = function () { xhr = null; };
    }
  }
}
