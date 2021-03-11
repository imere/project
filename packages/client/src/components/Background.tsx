import { HTMLMotionProps, motion } from 'framer-motion';
import { CSSProperties } from 'react';
import styled, { css } from 'styled-components';

interface IProps extends HTMLMotionProps<'div'> {
  /**
   * image url
   * @type {string}
   * @memberof IProps
   */
  url?: string
  gradient?: CSSProperties['backgroundImage']
}

export const Background = styled(motion.div) <IProps>`
position: absolute;
top: 0;
left: 0;
bottom: 0;
right: 0;

z-index: -1;

${({ url, gradient }) => {
    if (url) return css`background-image: url(${url});`;
    if (gradient) return css`background-image: ${gradient};`;
  }}

background-repeat: no-repeat;
background-attachment: fixed;
background-size: cover;
`;
