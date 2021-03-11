import { FC } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ErrorBoundary from './components/ErrorBoundary';
import { LandPage } from './pages/LandPage';
import { defaultTheme } from './util/theme';

export const App: FC = function App() {
  return (
    <ErrorBoundary>
      <span data-testid="testid" style={{ display: 'none' }} />
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <Switch>
            <Route path='/landing'>
              <LandPage />
            </Route>
            <Route path='*'>
              <LandPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
