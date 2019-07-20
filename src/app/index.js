import Preact from 'preact';
import App from './views';

import * as CONSTANTS from './constants';

const VSG = { CONSTANTS };
Object.assign(window, { VSG });

Preact.render(<App />, document.body);
