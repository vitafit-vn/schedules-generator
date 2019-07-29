import { render } from 'preact';
import App from './pages';

/* eslint-disable */
Object.assign(window, {
  calc: require('app/utils/calc'),
});
/* eslint-enable */

render(<App />, document.body);
