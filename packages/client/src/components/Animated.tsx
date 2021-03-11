import { cloneElement, FC, useEffect, useRef } from 'react';

interface AnimatedProps {
  children: Parameters<typeof cloneElement>[0]
  activated?: Parameters<Animatable['animate']>
  deactivated?: Parameters<Animatable['animate']>
}

export const Animated: FC<AnimatedProps> = function ({ children, activated, deactivated }: AnimatedProps) {
  const elementRef = useRef<HTMLElement | null>(null);

  const activatedRef = useRef(activated);
  const deactivatedRef = useRef(deactivated);
  useEffect(() => {
    const { current } = elementRef;

    if (activatedRef.current) current?.animate(...activatedRef.current);
    return () => {
      if (deactivatedRef.current) current?.animate(...deactivatedRef.current);
    };
  }, []);


  return (
    cloneElement(children, { ref: elementRef } as Parameters<typeof cloneElement>[1])
  );
};
