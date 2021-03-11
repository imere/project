import { useCallback, useLayoutEffect, useRef } from 'react';

type WindowGeo = Pick<Window, 'innerWidth' | 'innerHeight' | 'outerWidth' | 'outerHeight'>

export function useWindowResize(cb: (geo: WindowGeo) => void): void {
  const timerRef = useRef<number | null>(null);

  const handleResize = useCallback(function () {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      cb({ innerWidth, innerHeight, outerWidth, outerHeight });
      timerRef.current = null;
    }) as unknown as number;
  }, [cb]);

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
}
