import { UTC } from '@packages/shared/util/time';
import ErrorBoundary from './components/ErrorBoundary';

export function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <div>
        APP
        <p>{UTC.MILLIS()}</p>
        <button className="btn">button</button>
      </div>
    </ErrorBoundary>
  );
}
