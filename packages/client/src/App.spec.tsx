import { render } from '@testing-library/react';
import { App } from './App';

describe('App', function () {

  it('renders', async function () {
    const { findByTestId } = render(<App />);
    const element = await findByTestId('testid');
    expect(element).toBeInTheDocument();
  });

});
