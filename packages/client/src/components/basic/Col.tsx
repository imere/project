import { motion } from '../../util/reexport';
import { withClassNames } from '../../util/withClassNames';
import { HTMLMotionProps, MotionStyle } from 'framer-motion';
import { useContext } from 'react';
import styled from 'styled-components';
import { normalizeGutter, RowContext } from './Row';
import { calcPercent, percentBase } from './util';

interface IColProps extends HTMLMotionProps<'div'> {
  offset?: number
  span?: number
}

export const Col = styled(withClassNames(_Col, ['col']))`
flex-grow: 0;
flex-shrink: 0;
`;



function _Col({ children, style, offset, span, ...rest }: IColProps) {
  const { gutter } = useContext(RowContext);

  const colStyle: MotionStyle = {};

  const normalizedGutter: [number, number] = normalizeGutter(gutter);
  colStyle.paddingLeft = colStyle.paddingRight = `${normalizedGutter[0] / 2}px`;

  colStyle.flexBasis = colStyle.minWidth = span && span >= 0 && span <= percentBase
    ? `${calcPercent(span)}%`
    : undefined;

  colStyle.marginLeft = offset && offset >= 0 && offset <= percentBase
    ? `${calcPercent(offset)}%`
    : undefined;

  return (
    <motion.div {...rest} style={{ ...colStyle, ...style }}>
      {children}
    </motion.div>
  );
}
