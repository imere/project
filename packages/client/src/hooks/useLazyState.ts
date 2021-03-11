import { useState, useRef, useCallback } from 'react';
import deepEqual from 'fast-deep-equal';

/**
 * Set state only if value deeply changed
 *
 * @export
 * @template S
 * @param {S} initialState
 * @returns {[S, (state: S) => void]}
 */
export function useLazyState<S>(initialState: S): [S, (state: S) => void] {
  const [state, setState] = useState(initialState);
  const prevRef = useRef<S>({} as S);

  const set = useCallback((val) => {
    if (!deepEqual(prevRef.current, val)) setState(val);
    prevRef.current = val;
  }, [setState]);

  return [
    state,
    set,
  ];
}
