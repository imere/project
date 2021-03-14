import { Component, ErrorInfo, ReactNode } from 'react';
import type { TObject } from '@package/shared/src/design/types/common';
import type { IDefaultProps } from '../types';
import { Logger } from '../util/logger';

interface IState extends Record<string, unknown> {
  hasError: boolean
  errorObject: { error?: Error, errorInfo?: ErrorInfo }
}

export default class ErrorBoundary extends Component<IDefaultProps, IState> {
  state: IState = {
    hasError: false,
    errorObject: {
      error: undefined,
      errorInfo: undefined,
    },
  };

  static getDerivedStateFromError(): TObject {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    Logger.warn(error, errorInfo);
    this.setState({
      errorObject: {
        error,
        errorInfo,
      },
    });
  }

  render(): ReactNode {
    const { children } = this.props;
    const { hasError, errorObject } = this.state;

    return (
      hasError
        ? (
          <strong>{errorObject.error?.message}</strong>
        )
        : children
    );
  }
}
