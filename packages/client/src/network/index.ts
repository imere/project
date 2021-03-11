import {
  createConcreteMethodHandler,
  createJsonSpecialHandler,
} from './extend';
import {
  bodyConvert,
  configureCORS,
  configureCredentials,
} from './middleware';

export type TRequestInit<Body = unknown> =
  Omit<RequestInit, 'body'> &
  { body?: RequestInit['body'] | Body; }

/**
 * Original function `request`
 *
 * @export
 * @interface BasicRequestFunction
 */
export interface BasicRequestFunction {
  <Body = unknown>(input: RequestInfo, init?: TRequestInit<Body>): ReturnType<typeof fetch>
}

/**
 * Signature for function `request`
 *
 * @export
 * @interface RequestFunction
 */
export interface RequestFunction {
  <Body = unknown>(input: RequestInfo, init?: TRequestInit<Body>): ReturnType<typeof fetch>
}

/**
 * Signature for static methods on function `request`
 *
 * @export
 * @interface ConcreteRequestFunction
 */
export interface ConcreteRequestFunction {
  <Body = unknown>(input: RequestInfo, init?: TRequestInit<Body>): ReturnType<typeof fetch>
}

/**
 * Implemented static methods on function `request`
 *
 * @export
 * @interface RequestFunction
 */
export interface RequestFunction {
  get: ConcreteRequestFunction
  post: ConcreteRequestFunction
  put: ConcreteRequestFunction
  delete: ConcreteRequestFunction
}
export type ConcreteMethod = keyof RequestFunction

/**
 * Extend function on static methods
 *
 * @export
 * @interface ConcreteRequestFunction
 */
export interface ConcreteRequestFunction {
  /**
   * Use Content-Type: application/json; charset=utf-8 by default
   * @template Body
   * @param {RequestInfo} input
   * @param {TRequestInit<Body>} [init]
   * @returns {ReturnType<typeof fetch>}
   * @memberof ConcreteRequestFunction
   */
  json<Body = unknown>(input: RequestInfo, init?: TRequestInit<Body>): ReturnType<typeof fetch>
}


export const request = function request<Body = unknown>(input: RequestInfo, init?: TRequestInit<Body>): ReturnType<typeof fetch> {

  if (!init) init = Object.create(null);

  [
    configureCredentials,
    configureCORS,
    bodyConvert,
  ].forEach(configure => configure(input, init));

  return fetch(input, init as unknown as RequestInit);
} as RequestFunction;

initMethodsForRequest(
  createConcreteMethodHandler,
  createJsonSpecialHandler
);


/**
 * Add methods to function `request`
 */
function initMethodsForRequest(...impls: Array<(request: RequestFunction, method: keyof RequestFunction) => void>): void {
  const concreteMethods: readonly (keyof RequestFunction)[] = ['get', 'post', 'put', 'delete'];

  concreteMethods.forEach((method) => {
    impls.forEach(impl => impl(request, method));
  });
}

export async function requestData<R = unknown>(...args: Parameters<typeof request>): Promise<R> {
  return (await request(...args)).json();
}
