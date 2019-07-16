import _ from 'lodash';
import $$ from 'lodash/fp';

import CONSTANTS from './constants';
import { renderWeeklySchedule } from './renderers';
import { computeChecksum } from './utils';

const UTILS = {
  computeChecksum,
  renderWeeklySchedule,
};

const VSG = { CONSTANTS, UTILS };

Object.assign(window, { VSG, _, $$ });
