export function isCrossOrigin(url: string): boolean {
  if (!/^https?:\/\//.test(url)) {
    url = `${location.protocol}//${url.replace(/^\/+/, '')}`;
  }
  return location.origin !== new URL(url).origin;
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
