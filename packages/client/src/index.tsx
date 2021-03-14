import { runAnalytics } from '@package/analytics-front/src/index';
import { render } from 'react-dom';
import { App } from './App';
import './polyfill';
import './styles/global.css';

runAnalytics();

document.body.style.minWidth = CSS.px(outerWidth);
document.body.style.minHeight = CSS.px(innerHeight);

render(<App />, document.getElementById('__root'));
