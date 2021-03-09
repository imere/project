import styled from 'styled-components';

interface IProps {
  block?: boolean
}

export const Placeholder = styled.div<IProps>`
display: ${({ block }) => block ? 'block' : 'inline-block'};

visibility: hidden;
`;
