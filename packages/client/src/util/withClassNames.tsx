import { FC, forwardRef } from 'react';
import { classnames } from './classnames';

/**
 * Add CSS classes to a component
 *
 * @export
 * @template C
 * @template P
 * @param {C} Component
 * @param {string[]} classes
 * @returns {FC<P>}
 */
export function withClassNames<
  C extends FC<unknown>,
  P = C extends FC<infer P> ? P : never
>(Component: C, classes: string[]): FC<P> {
  return forwardRef(function _withClassNames({ children, className, ...rest }: any, ref) {
    return (
      <Component
        ref={ref}
        className={classnames(
          ...classes,
          className
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  });
}
