import Preact from 'preact';
import App from './views';

/* eslint-disable */

import * as CONSTANTS from './constants';

const VSG = { ...CONSTANTS };
Object.assign(window, {
  VSG,
  luxon: require('luxon'),
});

/* eslint-enable */

Preact.render(<App />, document.body);
