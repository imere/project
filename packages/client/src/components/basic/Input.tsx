import { motion } from 'framer-motion';
import styled from 'styled-components';
import { withClassNames } from '../../util/withClassNames';

export const Input = styled(withClassNames(motion.input, ['input']))`
padding: 0.06rem 0.5rem;

background-color: transparent;

color: ${({ theme }) => theme.$text.regular};
caret-color: ${({ theme }) => theme.$text.secondary};

letter-spacing: 0.5px;
`;
