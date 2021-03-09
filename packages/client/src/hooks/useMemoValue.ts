import deepEqual from 'fast-deep-equal';
import { useEffect, useRef } from 'react';
import { useUpdate } from './useUpdate';

/**
 * Memoize simple value reference
 *
 * @export
 * @template V
 * @param {V} newValue
 * @returns {V}
 */
export function useMemoValue<V>(newValue: V): V {
  const prevRef = useRef<V>(newValue);

  const [, update] = useUpdate();

  useEffect(() => {
    if (deepEqual(newValue, prevRef.current)) return;

    prevRef.current = newValue;

    update();
  }, [newValue, update]);

  return prevRef.current;
}
