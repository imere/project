import { TObject } from '@packages/shared/design/types/common';
import { FC, ReactNode } from 'react';

interface IDefaultProps extends TObject {
  children?: ReactNode
}

type InferFCProps<C> = C extends FC<infer P> ? P : unknown
