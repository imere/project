import { motion } from '../../util/reexport';
import { withClassNames } from '../../util/withClassNames';
import styled from 'styled-components';

export const Loading = styled(withClassNames(motion.div, ['loading']))`
position: relative;

display: inline-block;
width: 1.5rem;
height: 1.5rem;

border-radius: 9999px;

background-image: conic-gradient(
    rgba(255, 255, 255, 0),
    rgb(238, 238, 238)
);

animation: loading 1s linear infinite;

@keyframes loading {
    from {
        transform: rotateZ(0.25turn);
    }
    to {
        transform: rotateZ(1.25turn);
    }
}
`;
