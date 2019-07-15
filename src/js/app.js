import { DAILY_SCHEDULES, WEEKLY_SCHEDULES } from './constants';
import { renderWeeklySchedule } from './renderers';
import { computeChecksum } from './utils';

window.VSG = {
  DAILY_SCHEDULES,
  WEEKLY_SCHEDULES,
  computeChecksum,
  renderWeeklySchedule,
};
