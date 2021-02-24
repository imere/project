import { Component, ErrorInfo, ReactNode } from 'react';
import { TObject } from '@packages/shared/design/types/common';
import { Logger } from '../shared/Logger';

interface IProps extends Record<string, unknown> {
  children: ReactNode
}

interface IState extends Record<string, unknown> {
  hasError: boolean
  errorObject: { error?: Error, errorInfo?: ErrorInfo }
}

export default class ErrorBoundary extends Component<IProps, IState> {
  constructor(_: IProps) {
    super(_);
    this.state = {
      hasError: false,
      errorObject: {
        error: undefined,
        errorInfo: undefined,
      },
    };
  }

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
