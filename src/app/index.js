import { render } from 'preact';
import App from './pages';

/* eslint-disable */
Object.assign(window, {
  LZString: require('lz-string'),
});
/* eslint-enable */

render(<App />, document.body);
