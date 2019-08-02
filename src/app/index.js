import { render } from 'preact';

import * as CONSTANTS from 'app/constants';
import App from 'app/pages';

/* eslint-disable */
if (!CONSTANTS.IS_PRODUCTION) {
  Object.assign(window, {
    CONSTANTS,
    Calc: require('app/utils/Calc').default,
  });
}
/* eslint-enable */

render(<App />, document.body);
