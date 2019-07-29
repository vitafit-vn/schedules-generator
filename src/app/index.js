import { render } from 'preact';
import App from './pages';

/* eslint-disable */
Object.assign(window, {
  Calc: require('app/utils/Calc').default,
});
/* eslint-enable */

render(<App />, document.body);
