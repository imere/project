import { HTMLMotionProps, motion } from 'framer-motion';
import styled from 'styled-components';
import { Image } from './Image';

export interface IAvatarInfo {
  image?: string
}

interface IProps extends IAvatarInfo, HTMLMotionProps<'a'> {}

export const Avatar = styled(_Avatar)`
display: flex;
width: 100%;
height: 100%;
overflow: hidden;
`;

function _Avatar(props: IProps) {
  const { image, ...rest } = props;

  return (
    <motion.a
      {...rest}
    >
      <Image src={image} />
    </motion.a>
  );
}

