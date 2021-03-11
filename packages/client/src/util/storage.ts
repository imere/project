/**
 * Set value to storage
 *
 * @export
 * @param {string} key
 * @param {unknown} value
 * @param {boolean} [persist]
 */
export function setStorage(key: string, value: unknown, persist?: boolean): void {
  const store = persist ? localStorage : sessionStorage;
  const val = JSON.stringify(value);
  store.setItem(key, val);
}

/**
 * Get value from storage
 *
 * @export
 * @template V
 * @param {string} key
 * @param {boolean} [persist]
 * @returns {(V | null)}
 */
export function getStorage<V = unknown>(key: string, persist?: boolean): V | undefined {
  if (persist === undefined) {
    const val = sessionStorage.getItem(key) ?? localStorage.getItem(key);
    return val === null ? undefined : JSON.parse(val);
  }

  const store = persist ? localStorage : sessionStorage;
  const val = store.getItem(key);
  return val === null ? undefined : JSON.parse(val);
}
