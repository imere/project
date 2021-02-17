import { Component, ErrorInfo } from 'react';
import { Logger } from '../util/Logger';
import { TElement } from '../types/elements';

interface IProps extends Record<string, unknown> {
  children: TElement
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

  static getDerivedStateFromError(): Record<string, unknown> {
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

  render(): TElement {
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
