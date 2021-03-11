export function isString(val: unknown): val is string {
  return typeof val === 'string';
}

export function classnames(...names: Array<string | boolean | null | undefined>): string {
  return names
    .filter(isString)
    .map(n => n.trim())
    .join(' ');
}
