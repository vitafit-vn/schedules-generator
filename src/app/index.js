import CONSTANTS from './constants';
import { renderPersonalizedRows, renderWeeklySchedule } from './renderers';
import { computeChecksum } from './utils';

const UTILS = {
  computeChecksum,
  renderPersonalizedRows,
  renderWeeklySchedule,
};

const VSG = { CONSTANTS, UTILS };
Object.assign(window, { VSG });
