import preact from 'preact';
import App from './views';

/* eslint-disable */

import * as CONSTANTS from './constants';

const VSG = {
  ...CONSTANTS,
};

Object.assign(window, {
  VSG,
  preact,
  luxon: require('luxon'),
});

/* eslint-enable */

preact.render(<App />, document.body);
