import { useMemoValue } from '@packages/client/hooks/useMemoValue';
import { motion } from '@packages/client/util/reexport';
import { HTMLMotionProps } from 'framer-motion';
import { createContext } from 'react';
import styled from 'styled-components';

export function normalizeGutter(gutter: IRowProps['gutter']): [number, number] {
  return Array.isArray(gutter)
    ? gutter
    : [gutter ?? 0, 0];
}

interface IRowContext {
  gutter?: [number, number] | number
}

export const RowContext = createContext<IRowContext>({
  gutter: [0, 0],
});

interface IRowProps extends HTMLMotionProps<'div'> {
  gutter?: IRowContext['gutter']
}

export const Row = styled(_Row)`
display: flex;
flex-flow: row wrap;
`;



function _Row({ children, gutter, style, ...rest }: IRowProps) {
  const normalizedGutter: [number, number] = normalizeGutter(gutter);

  const contextMemo = useMemoValue<IRowContext>({
    gutter: normalizedGutter,
  });

  return (
    <RowContext.Provider value={contextMemo}>
      <motion.div {...rest} style={{ rowGap: `${normalizedGutter[1]}px`, ...style }}>
        {children}
      </motion.div>
    </RowContext.Provider>
  );
}
