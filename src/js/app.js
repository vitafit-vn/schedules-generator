import { dailySchedules, weeklySchedules } from './configs';
import { renderWeeklySchedule } from './renderers';
import { computeChecksum } from './utils';

window.VSG = {
  computeChecksum, dailySchedules, weeklySchedules, renderWeeklySchedule,
};
