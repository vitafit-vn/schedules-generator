import * as constants from './constants';
import { renderWeeklySchedule } from './renderers';
import { computeChecksum } from './utils';

window.VSG = {
  ...constants,
  computeChecksum,
  renderWeeklySchedule,
};
