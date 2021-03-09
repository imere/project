import {
  RequestFunction,
  ConcreteRequestFunction,
  ConcreteMethod,
} from './index';

export function createConcreteMethodHandler(request: RequestFunction, method: ConcreteMethod): void {
  request[method] = function (input, init) {
    return request(input, {
      ...init,
      method,
    });
  } as ConcreteRequestFunction;
}

export function createJsonSpecialHandler(request: RequestFunction, method: ConcreteMethod): void {
  request[method].json = function (input, init) {
    if (!init) init = {};

    let { headers } = init;
    if (!headers) init.headers = (headers ??= new Headers());

    if (headers instanceof Headers) {
      headers.set('Content-Type', 'application/json; charset=utf-8');
    } else if (Array.isArray(headers)) {
      headers = init.headers = new Headers(headers);
      headers.set('Content-Type', 'application/json; charset=utf-8');
    } else {
      headers['Content-Type'] = 'application/json; charset=utf-8';
    }

    return request(input, {
      ...init,
      method,
    });
  } as ConcreteRequestFunction;
}
