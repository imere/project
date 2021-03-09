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
 * assign value to object by path
 * @example
 * const target = {}
 * assign(target, 'a.b.c', 5)
 * console.log(target) // { a: { b: { c: 5 } } }
 * @export
 * @param {(Record<string | number, unknown>)} target
 * @param {string} path
 * @param {unknown} source
 * @returns {void}
 */
export function assign(target: Record<string | number, unknown>, path: string, source: unknown): void {
  if (isNullOrUndef(target)) return;

  const namespaces = path.split('.');
  const targetName = namespaces.pop();

  if (isNullOrUndef(targetName)) throw new TypeError(`assign: got wrong target ${targetName} from path ${path}`);

  if (!namespaces.length) {
    target[targetName as string] = source;
    return;
  }

  let result = target;

  namespaces.forEach(namespace => {
    if (!result[namespace]) result[namespace] = {};
    result = result[namespace] as typeof target;
  });

  result[targetName] = source;
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

type O = Record<string, unknown>
/**
 * Simple deep merge, only works for object who's
 * values are `primitive`、`array` and `pure object`
 * @export
 * @param {O} target
 * @param {O} source
 * @param {boolean} [concat=false] whether concat array, default false
 * @returns {O}
 */
export function simpleMerge(target: O, source: O, concat = false): O {
  if (!source) return target;
  if (!target) return source;

  const res = {
    ...target,
  };

  let val;
  Object.keys(source).forEach(key => {
    val = source[key];
    if (Array.isArray(val)) {
      if (concat && (res[key] as [])?.push) {
        (res[key] as unknown[]).push(val);
      } else {
        res[key] = val;
      }
    } else if (typeof val === 'object') {
      res[key] = simpleMerge(target[key] as O, val as O);
    } else {
      res[key] = val;
    }
  });

  return res;
}

type TPrimitive = string | boolean | number | BigInt | symbol | undefined | null

/**
 * Returns true if `val` is a JS primitive
 *
 * @export
 * @param {unknown} val
 * @returns {val is TPrimitive}
 */
export function isPrimitive(val: unknown): val is TPrimitive {
  return Object(val) !== val;
}


/**
 * Create an object with value mirrored to its key
 *
 * @export
 * @template K
 * @param {...K[]} args
 * @returns {{[V in K]: V}}
 */
export function createMirror<K extends string>(...args: K[]): {[V in K]: V} {
  const res = Object.create(null);

  args.forEach(key => {
    res[key] = key;
  });

  return res;
}
