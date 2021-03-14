import { motion } from '../../util/reexport';
import { withClassNames } from '../../util/withClassNames';
import styled from 'styled-components';
import { Row } from './Row';


export const Form = styled(withClassNames(motion.form, ['form']))``;

export const FormItem = styled(withClassNames(Row, ['form-item']))`
margin-bottom: 1.5rem;

& .label {
  display: flex;
  justify-content: flex-end;

  color: ${({ theme }) => theme.$text.regular};
  
  text-align: right;
}

& .input {
  display: flex;
  height: 100%;
  
  color: ${({ theme }) => theme.$text.primary};
}
`;
