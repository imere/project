import { runAnalytics } from '@packages/analytics-front/index';
import { render } from 'react-dom';
import { App } from './App';
import './styles/global.css';

runAnalytics();

render(<App />, document.getElementById('__root'));
