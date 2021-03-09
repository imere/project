import { motion } from '@packages/client/util/reexport';
import { withClassNames } from '@packages/client/util/withClassNames';
import styled from 'styled-components';

interface IProps {
  /**
   * Button type
   *
   * @type {('primary' | 'text' | 'info' | 'danger' | 'ghost')}
   * @memberof IProps
   */
  t?: 'primary' | 'text' | 'info' | 'danger' | 'ghost'
}

export const Button = styled(withClassNames(motion.button, ['button'])).attrs({ type: 'button' })<IProps>`
padding: 1px 2px;

cursor: pointer;

color: ${({ t, theme: { $text: { primary, regular, secondary } } }) => {
    switch (t) {
    case 'text': return regular;
    case 'info': return primary;
    case 'danger': return primary;
    case 'ghost': return secondary;
    case 'primary': return primary;
    default: return primary;
    }
  }};

border-color: ${({ t, theme: { $border: { lighter } } }) => {
    switch (t) {
    case 'ghost': return lighter;
    default: return undefined;
    }
  }};
  
border-width: ${({ t }) => {
    switch (t) {
    case 'ghost': return '2px';
    default: return undefined;
    }
  }};
`;
