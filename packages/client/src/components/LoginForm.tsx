import { createMirror } from '@packages/shared/util/object';
import { AnimationProps, motion, useCycle } from 'framer-motion';
import { FC, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { InferFCProps } from '../types';
import { classnames } from '../util/classnames';
import { Button } from './basic/Button';
import { Col } from './basic/Col';
import { Form, FormItem } from './basic/Form';
import { Input } from './basic/Input';
import { Label } from './basic/Label';
import { Plus } from './icon/Plus';
import { userListItemClassNames } from './UserList';

const Phase = createMirror(
  'ACTIVE', 'INACTIVE',
  'LOGIN', 'REGISTER'
);

export type TActive = typeof Phase['ACTIVE'] | typeof Phase['INACTIVE']
export type TMode = typeof Phase['LOGIN'] | typeof  Phase['REGISTER']

interface IProps {
  onModeChange?(mode: TMode): void
  onActiveChange?(active: TActive): void

}

export const LoginForm: FC<IProps> = function ({ onModeChange, onActiveChange }: IProps) {
  const [modeCycle, toggleMode] = useCycle(Phase.LOGIN, Phase.REGISTER);
  const isLogin = modeCycle === 'LOGIN';

  useEffect(() => {
    onModeChange?.(modeCycle);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeCycle]);

  const [activeCycle, toggleActive] = useCycle(Phase.INACTIVE, Phase.ACTIVE);
  const isActive = activeCycle === Phase.ACTIVE;

  useEffect(() => {
    onActiveChange?.(activeCycle);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCycle]);

  return (
    <Container
      active={activeCycle}
      className={classnames(
        userListItemClassNames
      )}
      initial={false}
      variants={containerVariants}
      animate={[
        activeCycle,
        modeCycle,
      ]}
    >

      <CloseButton
        active={activeCycle}
        onTap={() => toggleActive()}
      />

      <FormItem className="tw-justify-center">
        <motion.div
          className="tw-text-xl tw-font-bold tw-relative tw-w-full tw-text-center"
          variants={headerVariants}
        >
          <ModeButton
            className="tw-text-lg"
            mode={modeCycle}
            onTap={() => toggleMode()}
          >{isLogin ? '注册' : '登录'}</ModeButton>

          <motion.span
            key={`title@${modeCycle}`}
            style={{ color: 'ivory' }}
            initial={false}
            variants={{
              [Phase.INACTIVE]: {
                opacity: 0,
                transition: { duration: 0 },
              },
              [Phase.ACTIVE]: {
                opacity: 1,
                translateX: [50, 0],
                transition: { duration: 0.2 },
              },
            }}
          >{isLogin ? '登录' : '注册'}
          </motion.span>
        </motion.div>
      </FormItem>

      <FormItem
        variants={rowVariants}
      >
        <FormLabel>用户名&nbsp;:</FormLabel>
        <FormInput />
      </FormItem>

      <FormItem
        variants={rowVariants}
      >
        <FormLabel>密码&nbsp;:</FormLabel>
        <FormInput type="password"/>
      </FormItem>

      <FormItem></FormItem>

    </Container>
  );
};


const Container = styled(Form) <{ active: TActive; }>`
position: relative;
padding: 1.5rem 2.5rem 1.75rem;
box-shadow: inset 0 0 20px rgba(210, 224, 239, 0.527);
overflow: hidden;
`;


const CloseButton = styled(Plus)<{ active: TActive }>`
position: absolute;
cursor: pointer;
transition-property: top, right, width, height, transform;
transition-duration: 0.2s;
${({ active }) => active === Phase.INACTIVE
    ? css`
    right: 1.5rem;
    width: 3rem;
    height: 3rem;
    transform: rotateZ(0turn);
    `
    : css`
    top: 1.5rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    transform: rotateZ(0.875turn);
    `
}
`;


const ModeButton = styled(Button) <{ mode: TMode; }>`
position: absolute;
left: -0.5rem;
opacity: 0.7;
transition: opacity 0.5s;
@media (hover: hover) and (pointer: fine) {
  &:hover {
    opacity: 0.9;
  }
}
`;


const FormTitle = styled(motion.div)
  .attrs({
    initial: false,
    animate: {
      translateX: [50, 0],
    },
  })``;


function FormLabel(props: InferFCProps<typeof Label>) {
  return (
    <Col span={6}>
      <Label className="tw-font-semibold" {...props} />
    </Col>
  );
}


function FormInput(props: InferFCProps<typeof Input>) {
  return (
    <Col offset={1} span={16}>
      <Input className="tw-w-full" {...props} />
    </Col>
  );
}


const containerVariants: AnimationProps['variants'] = {
  [Phase.INACTIVE]: {
    borderRadius: '999px',
  },
  [Phase.ACTIVE]: {
    width: '31rem',
    height: '18rem',
    borderRadius: '10px',
    transition: {
      duration: 0.2,
    },
  },
};


const rowVariants: AnimationProps['variants'] = {
  [Phase.INACTIVE]: {
    opacity: 0,
    pointerEvents: 'none',
  },
  [Phase.ACTIVE]: {
    opacity: 1,
    pointerEvents: 'auto',
    transition: {
      delay: 0.1,
    },
  },
};


const headerVariants: AnimationProps['variants'] = {
  [Phase.INACTIVE]: {
    opacity: 0,
    pointerEvents: 'none',
    transition: { duration: 0 },
  },
  [Phase.ACTIVE]: {
    opacity: 1,
    pointerEvents: 'auto',
    transition: {
      duration: 0,
      delayChildren: 0.2,
    },
  },
};
