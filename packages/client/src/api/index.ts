type TSpecialImpl = 'json'

interface RequestFunction {
  <Body = unknown>(input: RequestInfo, init?: TRequestInit<Body>): ReturnType<typeof fetch>
  get<Body = unknown>(input: RequestInfo, init?: TRequestInit<Body>): ReturnType<typeof fetch>
  post<Body = unknown>(input: RequestInfo, init?: TRequestInit<Body>): ReturnType<typeof fetch>
  put<Body = unknown>(input: RequestInfo, init?: TRequestInit<Body>): ReturnType<typeof fetch>
  delete<Body = unknown>(input: RequestInfo, init?: TRequestInit<Body>): ReturnType<typeof fetch>
  /**
   * Use Content-Type: application/json; charset=utf-8 by default
   *
   * @type {RequestFunction['get']}
   * @memberof RequestFunction
   */
  json: Omit<RequestFunction, TSpecialImpl>
}

export const request = function request<Body = unknown>(input: RequestInfo, init?: TRequestInit<Body>): ReturnType<typeof fetch> {

  if (!init) return fetch(input, init);

  [
    configureCredentials,
    configureCORS,
  ].forEach(configure => configure(input, init));

  if (!bodyConverter(init)) return fetch(input, init);

  // for tracing
  return fetch(input, init as unknown as RequestInit);
} as RequestFunction;

initMethodsForRequest();


/**
 * Add methods to function `request`
 */
function initMethodsForRequest(): void {
  const basicMethods: (keyof Omit<RequestFunction, TSpecialImpl>)[] = ['get', 'post', 'put', 'delete'];

  request.json = {} as unknown as RequestFunction['json'];
  basicMethods.forEach((method) => {
    request[method] = createBasicMethodHandler(method);
    request.json[method] = createJsonGroupHandler(method);
  });

  function createBasicMethodHandler(method: typeof basicMethods[number]): RequestFunction['get'] {
    return function (input, init) {
      init && (init.method = method);
      return request(input, init);
    };
  }

  function createJsonGroupHandler(method: typeof basicMethods[number]): RequestFunction['get'] {
    return function (input, init) {
      if (init) {
        let { headers } = init;
        init.headers = (headers ??= {});
        if (headers instanceof Headers) {
          headers.set('Content-Type', 'application/json; charset=utf-8');
        } else if (Array.isArray(headers)) {
          headers.push(['Content-Type', 'application/json; charset=utf-8']);
        } else {
          headers['Content-Type'] = 'application/json; charset=utf-8';
        }
      }
      init && (init.method = method);
      return request(input, init);
    };
  }
}

function configureMethodUpperCase(...args: Parameters<typeof request>): void {
  args[1]?.method && (args[1].method = args[1].method.toUpperCase());
}

/**
 * Add credentials if not set
 *
 * @param {...Parameters<typeof request>} args
 */
function configureCredentials(...args: Parameters<typeof request>): void {
  args[1] && (args[1].credentials ??= 'include');
}

/**
 * Add CORS if not set
 *
 * @param {...Parameters<typeof request>} args
 */
function configureCORS(...args: Parameters<typeof request>): void {
  args[1] && (args[1].mode ??= 'cors');
}

/**
 * See if `type` "equals" `headers.Content-Type`
 *
 * @export
 * @param {string} type predicted content type
 * @param {RequestInit['headers']} headers
 * @param {boolean} [strict=false] strict equals or includes. default `false`
 * @returns {boolean}
 */
export function isContentType(type: string, headers: RequestInit['headers'], strict = false): boolean {
  if (!headers) return false;

  const CONTENT_TYPE = 'Content-Type';

  if (headers instanceof Headers) {

    const t = headers.get(CONTENT_TYPE);
    return Boolean(strict ? t === type : t?.includes(type));

  } else if (Array.isArray(headers)) {

    return headers.some(([k, v]) => {
      return k === CONTENT_TYPE && (strict ? v === type : v.includes(type));
    });

  } else {

    const t = headers[CONTENT_TYPE];
    return Boolean(strict ? t === type : t?.includes(type));

  }
}

export type TRequestInit<Body = unknown> =
  Omit<RequestInit, 'body'> &
  { body: RequestInit['body'] | Body; }

/**
 * Convert `body` regards to `headers.Content-Type`
 *
 * @export
 * @param {(TRequestInit | RequestInit)} options
 * @returns {options is TRequestInit} true if converted
 */
export function bodyConverter<Body = unknown>(options: TRequestInit | RequestInit): options is TRequestInit<Body> {
  const { headers, body } = options;

  switch (true) {
  case isContentType('text/plain', headers):
    break;
  case typeof body === 'object' && isContentType('application/json', headers):
    options.body = JSON.stringify(body);
    break;
  default:
    return false;
  }

  return true;
}
