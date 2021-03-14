import { withClassNames } from '../../util/withClassNames';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Label = styled(withClassNames(motion.label, ['label']))`
padding: 0.25rem 0.5rem;

color: ${({ theme }) => theme.$text.primary};

letter-spacing: 0.5px;
`;

