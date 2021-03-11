import { motion } from '@packages/client/util/reexport';
import { withClassNames } from '@packages/client/util/withClassNames';
import styled from 'styled-components';

export const Plus = styled(withClassNames(motion.div, ['plus']))`
position: relative;
display: inline-block;

&::before,
&::after {
    content: '';
    display: block;
    width: 100%;
    height: 20%;

    position: absolute;
    top: 50%;
    left: 50%;

    background-color: rgba(238, 238, 238, 0.637);
    border-radius: 2px;
}

&::before {
    transform: translate(-50%, -50%);
}
&::after {
    transform: translate(-50%, -50%) rotateZ(0.25turn);
}
`;
