import _ from 'lodash';

// Locals
import { /* parseDailySchedules, */ parseWeeklySchedules } from './parsers';
import { /* parseDailySchedules, */ renderWeeklySchedule } from './renderers';

async function parseAndGenerate() {
  try {
    // const beginnerDailySchedules = await parseDailySchedules('beginner');
    // const intermediateDailySchedules = await parseDailySchedules('intermediate');
    const weeklySchedules = await parseWeeklySchedules();
    _.each(weeklySchedules, renderWeeklySchedule);
  } catch (error) {
    console.error(error);
  }
}

parseAndGenerate();
