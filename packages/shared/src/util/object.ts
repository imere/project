export function isUndef(val: unknown): val is undefined {
  return val === undefined;
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isNullOrUndef(val: unknown): val is null | undefined {
  return isNull(val) || isUndef(val);
}

/**
 * Pick specific properties
 *
 * @export
 * @template T
 * @template K
 * @param {T} obj
 * @param {K[]} keys
 * @returns {Pick<T, K>}
 */
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const res: T = Object.create(null);

  if (isNullOrUndef(obj)) return res;

  for (let i = 0, key = '' as K; i < keys.length; i++) {
    key = keys[i];
    res[key] = obj[key];
  }

  return res;
}

/**
 * Omit specific properties
 *
 * @export
 * @template T
 * @template K
 * @param {T} obj
 * @param {K[]} keys
 * @returns {Omit<T, K>}
 */
export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  if (isNullOrUndef(obj)) return Object.create(null);

  const res = {
    ...obj,
  };


  for (let i = 0, key = '' as K; i < keys.length; i++) {
    key = keys[i];
    delete res[key];
  }

  return res;
}

/**
 * Make all properties optional for typing
 *
 * @export
 * @template T
 * @param {T} obj
 * @returns {Partial<T>}
 */
export function partialType<T>(obj: T): Partial<T> {
  return obj;
}
