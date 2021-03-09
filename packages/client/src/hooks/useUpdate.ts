import { useCallback, useState } from 'react';

export function useUpdate(): [Record<string, never>, (cb?: () => void) => void] {
  const [state, setState] = useState({});

  return [
    state,
    useCallback((cb) => {
      cb?.();
      setState({});
    }, []),
  ];
}
