import { UTC } from '@packages/shared/util/time';
import ErrorBoundary from './components/ErrorBoundary';
import { request } from './api/index';

export function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <div>
        APP
        <p>{UTC.MILLIS()}</p>
        <button
          className="btn"
          onClick={() => {
            request.json.post('http://127.0.0.1:3000/auth/login', {
              body: {
                username: 'admin',
                password: 'admin',
              },
            });
          }}
        >button</button>
      </div>
    </ErrorBoundary>
  );
}
