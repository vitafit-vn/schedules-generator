// Locals
import { /* parseDailySchedules, */ parseWeeklySchedules } from './parsers';
import { /* parseDailySchedules, */ renderWeeklySchedules } from './renderers';

async function parseAndGenerate() {
  try {
    // const beginnerDailySchedules = await parseDailySchedules('beginner');
    // const intermediateDailySchedules = await parseDailySchedules('intermediate');
    const weeklySchedules = await parseWeeklySchedules();
    const week1Schedule = renderWeeklySchedules(weeklySchedules);
    console.debug(week1Schedule);
  } catch (error) {
    console.error(error);
  }
}

parseAndGenerate();
