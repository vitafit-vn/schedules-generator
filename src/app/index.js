import fp from 'lodash/fp';

import CONSTANTS from './constants';
import { renderDailySchedule, renderPersonalizedRows, renderWeeklySchedule } from './renderers';
import { renderHomePage } from './views';
import { computeChecksum } from './utils';

const UTILS = {
  computeChecksum,
  renderDailySchedule,
  renderPersonalizedRows,
  renderWeeklySchedule,
};

const VIEWS = {
  renderHomePage,
};

const VSG = { CONSTANTS, UTILS, VIEWS };
Object.assign(window, { VSG, fp });
