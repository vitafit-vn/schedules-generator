// import fp from 'lodash/fp';

// import CONSTANTS from './constants';
// import { renderDailySchedule, renderPersonalizedRows, renderWeeklySchedule } from './renderers';
// import { computeChecksum } from './utils';

// const UTILS = {
//   computeChecksum,
//   renderDailySchedule,
//   renderPersonalizedRows,
//   renderWeeklySchedule,
// };

// const VSG = { CONSTANTS, UTILS };
// Object.assign(window, { VSG, fp });

import Preact from 'preact';
import App from './views';

Preact.render(<App />, document.body);
