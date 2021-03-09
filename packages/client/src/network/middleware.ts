import { isContentType, isCrossOrigin } from './helper';
import { request, TRequestInit } from './index';

export function configureMethodUpperCase(...args: Parameters<typeof request>): void {
  args[1]?.method && (args[1].method = args[1].method.toUpperCase());
}

/**
 * Add credentials if not set
 *
 * @param {...Parameters<typeof request>} args
 */
export function configureCredentials(...args: Parameters<typeof request>): void {
  args[1] && (args[1].credentials ??= 'same-origin');
}

/**
 * Add CORS if not set
 *
 * @param {...Parameters<typeof request>} args
 */
export function configureCORS(...args: Parameters<typeof request>): void {
  if (!args[1]) return;

  const url = args[0] instanceof Request ? args[0].url : args[0];

  if (isCrossOrigin(url)) {
    args[1].mode ??= 'cors';
  }
}

/**
 * Convert `body` regards to `headers.Content-Type`
 *
 * @export
 * @param {RequestInfo} input
 * @param {TRequestInit} init
 * @returns {boolean} true if converted
 */
export function bodyConvert(_: RequestInfo, init?: TRequestInit): boolean {
  if (!init) return false;

  const { headers, body } = init;

  switch (true) {
  case isContentType('text/plain', headers):
    break;
  case typeof body === 'object' && isContentType('application/json', headers):
    init.body = JSON.stringify(body);
    break;
  default:
    return false;
  }

  return true;
}
