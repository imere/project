import { createMirror } from '@packages/shared/util/object';
import { AnimationProps, motion, TargetAndTransition, useCycle } from 'framer-motion';
import { FC, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { InferFCProps } from '../types';
import { Button } from './basic/Button';
import { Col } from './basic/Col';
import { Form, FormItem } from './basic/Form';
import { Input } from './basic/Input';
import { Label } from './basic/Label';
import { Plus } from './icon/Plus';

const Phase = createMirror(
  'ACTIVE', 'INACTIVE',
  'LOGIN', 'REGISTER'
);

export type TActive = typeof Phase['ACTIVE'] | typeof Phase['INACTIVE']
export type TMode = typeof Phase['LOGIN'] | typeof Phase['REGISTER']

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

  useEffect(() => {
    onActiveChange?.(activeCycle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCycle]);

  useEffect(() => toggleActive(), []);

  return (
    <FormContainer active={activeCycle} animate={[activeCycle, modeCycle]}>

      <CloseButton
        active={activeCycle}
        onTap={() => toggleActive()}
      />

      <FormHeader variants={headerVariants}>
        <FormTitle
          active={activeCycle}
        >{isLogin ? '登录' : '注册'}</FormTitle>
      </FormHeader>

      <FormItem variants={rowVariants}>
        <FormLabel>用户名&nbsp;:</FormLabel>
        <FormInput />
      </FormItem>

      <FormItem variants={rowVariants}>
        <FormLabel>密码&nbsp;:</FormLabel>
        <FormInput type="password" />
      </FormItem>

      <FormItem variants={rowVariants}>
        <FormLabel variants={{ [Phase.LOGIN]: inoperableVariant }}
        >确认密码&nbsp;:</FormLabel>
        {!isLogin && <FormInput type="password" />}
      </FormItem>

      <FormItem className="tw-flex tw-justify-center tw-relative" variants={rowVariants}>
        <Button>{isLogin ? '登录' : '注册'}</Button>
        <ModeButton
          mode={modeCycle}
          onClick={() => toggleMode()}
        >{isLogin ? '注册' : '登录'}-&gt;</ModeButton>
      </FormItem>

    </FormContainer>
  );
};

const FormContainer = styled(Form) <{ active: TActive; }>`
position: relative;

width: 6rem;
height: 6rem;
padding: 1.5rem 2.5rem 1.75rem;

border-radius: 999px;
box-shadow: inset 0 0 20px rgba(210, 224, 239, 0.527);

overflow: hidden;

transition: all 0.2s;
${({ active }) => {
    return active === Phase.ACTIVE &&
    css`
    width: 32rem;
    height: 20rem;
    border-radius: 10px;
   `;
  }}
`;


const CloseButton = styled(Plus) <{ active: TActive }>`
position: absolute;

cursor: pointer;

transition: all 0.2s;
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
right: 0;

color: ${({ theme: { $text: { secondary } } }) => secondary};

opacity: 0.7;

transition: all 0.5s;
@media (hover: hover) and (pointer: fine) {
  &:hover {
    opacity: 0.9;
  }
}
`;

const FormHeader = styled(FormItem)`
position: relative;
display: flex;
justify-content: center;
font-size: 1.25rem;
line-height: 1.75rem;
`;

const FormTitle = styled(motion.div) <{ active: TActive; }>`
color: ${({ theme: { $text: { primary } } }) => primary};
`;

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

const inoperableVariant: TargetAndTransition = { opacity: 0, pointerEvents: 'none' };

const headerVariants: AnimationProps['variants'] = {
  [Phase.INACTIVE]: inoperableVariant,
  [Phase.ACTIVE]: { opacity: 1, pointerEvents: 'auto' },
};

const rowVariants: AnimationProps['variants'] = headerVariants;
